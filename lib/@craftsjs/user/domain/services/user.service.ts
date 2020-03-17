import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as R from 'ramda';
import { mergeAndRemoveEmpty } from '../../../utils';
import { AlreadyExists, PaginatedDto, PaginatedResultDto } from '../../../core';
import { GetUserDto } from '../../application';
import { CrudAppService } from '../../../core/services/crud-app.service';
import { User } from '../../infrastructure/database/entities/user.entity';
import { UserRepository } from '../../infrastructure/database/repositories/user.repository';
import { Connection } from 'typeorm';
import { UserRole } from '@craftsjs/user/infrastructure/database/entities';

@Injectable()
export class UserDomainService extends CrudAppService<UserRepository> {

  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly connection: Connection,
  ) {
    super(userRepository);
  }

  async insert(user: User): Promise<User> {
    await this.validateUserName(user);
    await this.validateEmail(user);
    return await this.connection.transaction(async entityManager => {
      const userDb = await entityManager.save(user);
      userDb.roles.forEach(role => role.userId = userDb.id);
      await entityManager.save(userDb.roles);
      return userDb;
    });
  }

  async update(user: User): Promise<User> {
    const userDb = await this.userRepository.findOne({ where: { id: user.id } });
    if (user.userName !== userDb.userName) {
      await this.validateUserName(user);
    }
    if (user.emailAddress !== userDb.emailAddress) {
      await this.validateEmail(user);
    }
    return await this.connection.transaction(async entityManager => {
      const userToUpdate = R.omit(['roles'], Object.assign({}, userDb, user));
      await entityManager.update(User, userToUpdate.id, userToUpdate);
      await entityManager.delete(UserRole, { userId: userToUpdate.id });
      user.roles.forEach(userRole => userRole.userId = user.id);
      await entityManager.save(user.roles);
      return user;
    });
  }

  private async validateUserName(user: User) {
    const existsUserName = await this.findOneByQuery({ userName: user.userName, tenantId: user.tenantId } as GetUserDto);
    if (existsUserName) {
      throw new AlreadyExists('user.existsUserName');
    }
  }

  private async validateEmail(user: User) {
    const existsEmailAddress = await this.findOneByQuery({ emailAddress: user.emailAddress, tenantId: user.tenantId } as GetUserDto);
    if (existsEmailAddress) {
      throw new AlreadyExists('user.existsEmailAddress');
    }
  }

  findOneByQuery(userQuery: GetUserDto) {
    const query = mergeAndRemoveEmpty(userQuery)({});
    return this.userRepository.findOne({
      where: query,
      relations: ['roles'],
    });
  }

  async getAll(input: PaginatedDto) {
    const query = R.omit(['skip', 'take', 'currentUserId'], R.reject(R.isNil, input));
    const data = await this.repository.findAndCount({ skip: input.skip, take: input.take, where: query, relations: ['roles'] });
    return {
      data: data[0],
      total: data[1],
    } as PaginatedResultDto<any>;
  }

  async getUserPermissions(id: number) {
    const user = await this.userRepository.findOne({
      where: { id }, relations: ['permissions', 'permissions.permission', 'roles', 'roles.role', 'roles.role.permissions', 'roles.role.permissions.permission'],
    });
    const userPermissions = user?.permissions?.map(userPermission => userPermission.permission?.name) || [];
    const rolePermissions = user?.roles?.map(userRole =>
      userRole.role?.permissions?.map(rolePermission => rolePermission.permission?.name),
    ) || [];
    const permissionsNames = [].concat(userPermissions, ...rolePermissions);
    return permissionsNames;
  }

}
