import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import * as R from 'ramda';
import { RoleRepository } from '@craftsjs/role/infrastructure/database/repositories/role.repository';
import { Role } from '@craftsjs/role/infrastructure/database/entities/role.entity';
import { AlreadyExists } from '@craftsjs/core/exceptions/already-exists.exception';
import { removeEmpty, mergeAndRemoveEmpty } from '@craftsjs/utils';
import { CrudAppService } from '@craftsjs/core/services/crud-app.service';
import { FindOneDto } from '@craftsjs/core/dto/find-one.dto';
import { PaginatedDto } from '@craftsjs/core/dto/paginated.dto';
import { PaginatedResultDto } from '@craftsjs/core/dto/paginated-result.dto';
import { RolePermission } from '@craftsjs/role/infrastructure/database/entities';

@Injectable()
export class RoleDomainService extends CrudAppService<RoleRepository> {

  constructor(
    @InjectRepository(RoleRepository)
    private readonly roleRepository: RoleRepository,
    private readonly connection: Connection,
  ) {
    super(roleRepository);
  }

  async insert(role: Role): Promise<Role> {
    const query = removeEmpty({ name: role.name, tenantId: role.tenantId });
    const existsRoleName = await this.roleRepository.findOne({ where: query });
    if (existsRoleName) {
      throw new AlreadyExists('role.existsName');
    }
    return await this.connection.transaction(async entityManager => {
      const roleDb = await entityManager.save(role);
      role.permissions.forEach(permission => permission.roleId = roleDb.id);
      await entityManager.save(role.permissions);
      return roleDb;
    });
  }

  async update(role: Role): Promise<Role> {
    const roleDb = await this.roleRepository.findOne({ where: { id: role.id } });
    if (role.name !== roleDb.name) {
      const query = removeEmpty({ name: role.name, tenantId: role.tenantId });
      const existsRoleName = await this.roleRepository.findOne({ where: query });
      if (existsRoleName) {
        throw new AlreadyExists('role.existsName');
      }
    }
    return await this.connection.transaction(async entityManager => {
      const roleToUpdate = R.omit(['permissions'], Object.assign({}, roleDb, role));
      await entityManager.update(Role, roleToUpdate.id, roleToUpdate);
      await entityManager.delete(RolePermission, { roleId: roleToUpdate.id });
      role.permissions.forEach(permission => permission.roleId = roleDb.id);
      await entityManager.save(role.permissions);
      return role;
    });
  }

  findOneByQuery(roleQuery: FindOneDto) {
    const query = mergeAndRemoveEmpty(roleQuery)({});
    return this.roleRepository.findOne({
      where: query,
      relations: ['permissions'],
    });
  }

  async getAll(input: PaginatedDto) {
    const query = R.omit(['skip', 'take', 'currentUserId'], R.reject(R.isNil, input));
    const data = await this.roleRepository.findAndCount({ skip: input.skip, take: input.take, where: query, relations: ['permissions'] });
    return {
      data: data[0],
      total: data[1],
    } as PaginatedResultDto<any>;
  }

}
