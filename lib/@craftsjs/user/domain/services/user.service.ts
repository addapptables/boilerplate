import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as R from 'ramda';
import { removeEmpty } from '../../../utils';
import { AlreadyExists, PaginatedDto, PaginatedResultDto } from '../../../core';
import { CrudAppService } from '../../../core/services/crud-app.service';
import { User } from '../../infrastructure/database/entities/user.entity';
import { UserRepository } from '../../infrastructure/database/repositories/user.repository';
import { Connection } from 'typeorm';
import { UserRole } from '../../../user/infrastructure/database/entities';
import { FindOneUserDto } from '../../../user/application/dtos/find-one-user.dto';
import { ChangePasswordDto } from '../../application/dtos/change-password.dto';
import { SecurityService } from '../../../security';

@Injectable()
export class UserDomainService extends CrudAppService<UserRepository> {

  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly connection: Connection,
    private readonly securityService: SecurityService
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

  async changePassword(changePassword: ChangePasswordDto) {
    const currentPassword = this.securityService.convertStringToMd5(changePassword.currentPassword);
    const user = await this.userRepository.findOne({ where: { id: changePassword.id } });
    if (user.password !== currentPassword) {
      throw new Error('user.passwordDotNotMatch');
    }
    const newPassword = this.securityService.convertStringToMd5(changePassword.newPassword);
    user.password = newPassword;
    return super.update(user);
  }

  async updateProfile(user: User): Promise<User> {
    const userDb = await this.userRepository.findOne({ where: { id: user.id } });
    if (user.userName !== userDb.userName) {
      await this.validateUserName(user);
    }
    if (user.emailAddress !== userDb.emailAddress) {
      await this.validateEmail(user);
    }
    const userToUpdate = R.omit(['roles'], Object.assign({}, userDb, user));
    return super.update(userToUpdate);
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
    const existsUserName = await this.findOneByQuery({ userName: user.userName, tenantId: user.tenantId });
    if (existsUserName) {
      throw new AlreadyExists('user.existsUserName');
    }
  }

  private async validateEmail(user: User) {
    const existsEmailAddress = await this.findOneByQuery({ emailAddress: user.emailAddress, tenantId: user.tenantId });
    if (existsEmailAddress) {
      throw new AlreadyExists('user.existsEmailAddress');
    }
  }

  findOneByQuery(userQuery: FindOneUserDto) {
    const query = removeEmpty(userQuery);
    return this.userRepository.findOne({
      where: query,
      relations: ['roles'],
    });
  }

  async findAll(input: PaginatedDto) {
    const query = R.omit(['skip', 'take', 'currentUserId'], removeEmpty(input));
    const data = await this.repository.findAndCount({ skip: input.skip, take: input.take, where: query, relations: ['roles'] });
    return {
      data: data[0],
      total: data[1],
    } as PaginatedResultDto<any>;
  }

  async getUserPermissions(id: string) {
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
