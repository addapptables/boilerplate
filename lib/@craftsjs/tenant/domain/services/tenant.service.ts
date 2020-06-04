import * as uuid from 'uuid/v4';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudAppService } from '../../../core/services/crud-app.service';
import { PermissionDomainService } from '../../../permission/domain/services/permission.service';
import { RolePermission } from '../../../role/infrastructure/database/entities/role-permission.entity';
import { AlreadyExists } from '../../../core/exceptions/already-exists.exception';
import { Connection } from 'typeorm';
import { TenantRepository } from '../../infrastructure/database/repositories/tenant.repository';
import { Tenant } from '../../infrastructure/database/entities/tenant.entity';
import { mergeAndRemoveEmpty } from '../../../utils';
import { SecurityService } from '../../../security/services/security.service';
import { DefaultGenerator } from './default-generator-tenant';
import { FindOneTenantDto } from '../../application/dtos/find-one-tenant.dto';

@Injectable()
export class TenantDomainService extends CrudAppService<TenantRepository> {

  constructor(
    @InjectRepository(TenantRepository)
    private readonly tenantRepository: TenantRepository,
    private readonly connection: Connection,
    private readonly securityService: SecurityService,
    private readonly permissionService: PermissionDomainService,
  ) {
    super(tenantRepository);
  }

  async insert(tenant: Tenant): Promise<Tenant> {
    await this.ValidateName(tenant);
    await this.ValidateSubDomain(tenant);
    return await this.connection.transaction(async entityManager => {
      const tenantDb = await entityManager.save(tenant);
      const role = DefaultGenerator.generateRole(tenantDb.id);
      const permissions = await this.permissionService.findAll({ tenantId: tenantDb.id });
      const roleDb = await entityManager.save(role);
      const rolesPermission = permissions.map(permission => {
        const rolePermission = new RolePermission();
        rolePermission.id = uuid()
        rolePermission.roleId = roleDb.id;
        rolePermission.isGranted = true;
        rolePermission.permissionId = permission.id;
        return rolePermission;
      });
      await entityManager.save(rolesPermission);
      const user = DefaultGenerator.generateUser(tenantDb.id, this.securityService);
      await entityManager.save(user);
      const userRole = DefaultGenerator.generateUserRole(user.id, role.id);
      await entityManager.save(userRole);
      return tenantDb;
    });
  }

  async update(tenant: Tenant): Promise<Tenant> {
    const tenantDb = await this.tenantRepository.findOne({ where: { id: tenant.id } });
    if (tenant.name !== tenantDb.name) {
      await this.ValidateName(tenant);
    }
    if (tenant.subDomain !== tenantDb.subDomain) {
      await this.ValidateSubDomain(tenant);
    }
    const tenantToUpdate = Object.assign({}, tenantDb, tenant);
    await super.update(tenantToUpdate);
    return tenantToUpdate;
  }

  private async ValidateName(tenant: Tenant) {
    const existsTenantName = await this.tenantRepository.findOne({ where: { name: tenant.name } });
    if (existsTenantName) {
      throw new AlreadyExists('tenant.existsName');
    }
  }

  private async ValidateSubDomain(tenant: Tenant) {
    const existsTenantName = await this.tenantRepository.findOne({ where: { name: tenant.subDomain } });
    if (existsTenantName) {
      throw new AlreadyExists('tenant.existsSubDomain');
    }
  }

  findOneByQuery(tenantQuery: FindOneTenantDto) {
    const query = mergeAndRemoveEmpty(tenantQuery)({});
    return this.tenantRepository.findOne({
      where: query,
    });
  }

  getTenantBySubdomain(subDomain: string) {
    return this.tenantRepository.findOne({
      where: {
        subDomain,
      },
    });
  }
}
