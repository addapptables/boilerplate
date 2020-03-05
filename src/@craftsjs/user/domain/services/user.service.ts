import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { mergeAndRemoveEmpty } from '../../../utils';
import { AlreadyExists } from '../../../core';
import { GetUserDto } from '../../application';
import { CrudAppService } from '../../../core/services/crud-app.service';
import { User } from '../../infrastructure/database/entities/user.entity';
import { UserRepository } from '../../infrastructure/database/repositories/user.repository';

@Injectable()
export class UserService extends CrudAppService<UserRepository> {

  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {
    super(userRepository);
  }

  async insert(user: User): Promise<User> {
    const existsUserName = await this.findOneByQuery({ userName: user.userName, tenantId: user.tenantId } as GetUserDto);
    if (existsUserName) {
      throw new AlreadyExists('user.existsUserName');
    }
    const existsEmailAddress = await this.findOneByQuery({ emailAddress: user.emailAddress, tenantId: user.tenantId } as GetUserDto);
    if (existsEmailAddress) {
      throw new AlreadyExists('user.existsEmailAddress');
    }
    return super.insert(user);
  }

  async update(user: User): Promise<User> {
    const userDb = await this.userRepository.findOne({ where: { id: user.id } });
    if (user.userName !== userDb.userName) {
      const existsUserName = await this.findOneByQuery({ userName: user.userName, tenantId: user.tenantId } as GetUserDto);
      if (existsUserName) {
        throw new AlreadyExists('user.existsUserName');
      }
    }
    if (user.emailAddress !== userDb.emailAddress) {
      const existsEmailAddress = await this.findOneByQuery({ emailAddress: user.emailAddress, tenantId: user.tenantId } as GetUserDto);
      if (existsEmailAddress) {
        throw new AlreadyExists('user.existsEmailAddress');
      }
    }
    await super.update(Object.assign({}, userDb, user));
    return Object.assign({}, userDb, user);
  }

  findOneByQuery(userQuery: GetUserDto) {
    const query = mergeAndRemoveEmpty(userQuery)({});
    return this.userRepository.findOne({
      where: query,
    });
  }

  async getUserPermissions(id: number) {
    const user = await this.userRepository.findOne({
      where: { id }, relations: ['permissions', 'permissions.permission', 'roles', 'roles.role', 'roles.role.permissions'],
    });
    const userPermissions = user?.permissions.map(userPermission => userPermission.permission?.name) || [];
    const rolePermissions = user?.roles.map(userRole =>
      userRole.role?.permissions.map(rolePermission => rolePermission.permission?.name),
    ) || [];
    const permissionsNames = [].concat(userPermissions, ...rolePermissions);
    return permissionsNames;
  }

}
