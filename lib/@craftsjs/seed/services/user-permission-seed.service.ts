import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@craftsjs/typeorm';
import { CraftsRepository } from '@craftsjs/core';
import { v4 as uuid } from 'uuid';
import seedConfiguration from '../static';
import { RolePermission } from '@craftsjs/role';

@Injectable()
export class UserPermissionSeedService {

    constructor(
        @InjectRepository(RolePermission)
        private readonly rolePermissionRepository: CraftsRepository<RolePermission>
    ) {}

    async seed() {
        const userPermission = await this.rolePermissionRepository.findOne();
        if(!userPermission) {
            await this.createHostPermission();
            await this.createTenantPermission();
        }
    }

    private async createHostPermission() {
        const roleId = seedConfiguration.role.hostId;
        // Page permission
        await this.rolePermissionRepository.insert({ id: uuid(), permissionId: seedConfiguration.permission.page,isGranted: true, roleId });
        await this.rolePermissionRepository.insert({ id: uuid(), permissionId: seedConfiguration.permission.administration,isGranted: true, roleId });

        // User permission
        await this.rolePermissionRepository.insert({ id: uuid(), permissionId: seedConfiguration.permission.user.id,isGranted: true, roleId });
        await this.rolePermissionRepository.insert({ id: uuid(), permissionId: seedConfiguration.permission.user.create,isGranted: true, roleId });
        await this.rolePermissionRepository.insert({ id: uuid(), permissionId: seedConfiguration.permission.user.delete,isGranted: true, roleId });
        await this.rolePermissionRepository.insert({ id: uuid(), permissionId: seedConfiguration.permission.user.getAll,isGranted: true, roleId });
        await this.rolePermissionRepository.insert({ id: uuid(), permissionId: seedConfiguration.permission.user.update,isGranted: true, roleId });

        // Role permission
        await this.rolePermissionRepository.insert({ id: uuid(), permissionId: seedConfiguration.permission.role.id,isGranted: true, roleId });
        await this.rolePermissionRepository.insert({ id: uuid(), permissionId: seedConfiguration.permission.role.create,isGranted: true, roleId });
        await this.rolePermissionRepository.insert({ id: uuid(), permissionId: seedConfiguration.permission.role.delete,isGranted: true, roleId });
        await this.rolePermissionRepository.insert({ id: uuid(), permissionId: seedConfiguration.permission.role.getAll,isGranted: true, roleId });
        await this.rolePermissionRepository.insert({ id: uuid(), permissionId: seedConfiguration.permission.role.update,isGranted: true, roleId });

        // Edition permission
        await this.rolePermissionRepository.insert({ id: uuid(), permissionId: seedConfiguration.permission.edition.id,isGranted: true, roleId });
        await this.rolePermissionRepository.insert({ id: uuid(), permissionId: seedConfiguration.permission.edition.create,isGranted: true, roleId });
        await this.rolePermissionRepository.insert({ id: uuid(), permissionId: seedConfiguration.permission.edition.delete,isGranted: true, roleId });
        await this.rolePermissionRepository.insert({ id: uuid(), permissionId: seedConfiguration.permission.edition.getAll,isGranted: true, roleId });
        await this.rolePermissionRepository.insert({ id: uuid(), permissionId: seedConfiguration.permission.edition.update,isGranted: true, roleId });

        // Tenant permission
        await this.rolePermissionRepository.insert({ id: uuid(), permissionId: seedConfiguration.permission.tenant.id,isGranted: true, roleId });
        await this.rolePermissionRepository.insert({ id: uuid(), permissionId: seedConfiguration.permission.tenant.create,isGranted: true, roleId });
        await this.rolePermissionRepository.insert({ id: uuid(), permissionId: seedConfiguration.permission.tenant.delete,isGranted: true, roleId });
        await this.rolePermissionRepository.insert({ id: uuid(), permissionId: seedConfiguration.permission.tenant.getAll,isGranted: true, roleId });
        await this.rolePermissionRepository.insert({ id: uuid(), permissionId: seedConfiguration.permission.tenant.update,isGranted: true, roleId });
        await this.rolePermissionRepository.insert({ id: uuid(), permissionId: seedConfiguration.permission.tenant.impersonation,isGranted: true, roleId });
    }

    private async createTenantPermission() {
        const roleId = seedConfiguration.role.tenantId;
        // Page permission
        await this.rolePermissionRepository.insert({ id: uuid(), permissionId: seedConfiguration.permission.pageTenant,isGranted: true, roleId });
        await this.rolePermissionRepository.insert({ id: uuid(), permissionId: seedConfiguration.permission.administrationTenant,isGranted: true, roleId });

        // User permission
        await this.rolePermissionRepository.insert({ id: uuid(), permissionId: seedConfiguration.permission.userTenant.id,isGranted: true, roleId });
        await this.rolePermissionRepository.insert({ id: uuid(), permissionId: seedConfiguration.permission.userTenant.create,isGranted: true, roleId });
        await this.rolePermissionRepository.insert({ id: uuid(), permissionId: seedConfiguration.permission.userTenant.delete,isGranted: true, roleId });
        await this.rolePermissionRepository.insert({ id: uuid(), permissionId: seedConfiguration.permission.userTenant.getAll,isGranted: true, roleId });
        await this.rolePermissionRepository.insert({ id: uuid(), permissionId: seedConfiguration.permission.userTenant.update,isGranted: true, roleId });

        // Role permission
        await this.rolePermissionRepository.insert({ id: uuid(), permissionId: seedConfiguration.permission.roleTenant.id,isGranted: true, roleId });
        await this.rolePermissionRepository.insert({ id: uuid(), permissionId: seedConfiguration.permission.roleTenant.create,isGranted: true, roleId });
        await this.rolePermissionRepository.insert({ id: uuid(), permissionId: seedConfiguration.permission.roleTenant.delete,isGranted: true, roleId });
        await this.rolePermissionRepository.insert({ id: uuid(), permissionId: seedConfiguration.permission.roleTenant.getAll,isGranted: true, roleId });
        await this.rolePermissionRepository.insert({ id: uuid(), permissionId: seedConfiguration.permission.roleTenant.update,isGranted: true, roleId });

        // OrganizationUnit permission
        await this.rolePermissionRepository.insert({ id: uuid(), permissionId: seedConfiguration.permission.organizationUnit.id,isGranted: true, roleId });
        await this.rolePermissionRepository.insert({ id: uuid(), permissionId: seedConfiguration.permission.organizationUnit.create,isGranted: true, roleId });
        await this.rolePermissionRepository.insert({ id: uuid(), permissionId: seedConfiguration.permission.organizationUnit.delete,isGranted: true, roleId });
        await this.rolePermissionRepository.insert({ id: uuid(), permissionId: seedConfiguration.permission.organizationUnit.getAll,isGranted: true, roleId });
        await this.rolePermissionRepository.insert({ id: uuid(), permissionId: seedConfiguration.permission.organizationUnit.update,isGranted: true, roleId });
        await this.rolePermissionRepository.insert({ id: uuid(), permissionId: seedConfiguration.permission.organizationUnit.addUsers,isGranted: true, roleId });
        await this.rolePermissionRepository.insert({ id: uuid(), permissionId: seedConfiguration.permission.organizationUnit.addRoles,isGranted: true, roleId });
    }

}