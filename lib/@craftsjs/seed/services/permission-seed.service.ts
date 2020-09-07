import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@craftsjs/typeorm';
import { PermissionRepository } from '@craftsjs/permission/infrastructure/database/repositories/permission.repository';
import seedConfiguration from '../static';

@Injectable()
export class PermissionSeedService {

    constructor(
        @InjectRepository(PermissionRepository)
        private readonly permissionRepository: PermissionRepository,
    ) { }

    async seed() {
        const permission = await this.permissionRepository.findOne({ where: { id: seedConfiguration.permission.page } });
        if (permission) {
            return;
        }
        await this.permissionRepository.insert({
            id: seedConfiguration.permission.page,
            isHost: true,
            name: 'Page',
        });
        await this.permissionRepository.insert({
            id: seedConfiguration.permission.administration,
            isHost: true,
            name: 'Page.Administration',
            parentId: seedConfiguration.permission.page
        });
        await this.permissionRepository.insert({
            id: seedConfiguration.permission.pageTenant,
            isHost: false,
            name: 'Page',
        });
        await this.permissionRepository.insert({
            id: seedConfiguration.permission.administrationTenant,
            isHost: false,
            name: 'Page.Administration',
            parentId: seedConfiguration.permission.pageTenant
        });
        await this.createCrudPermission(seedConfiguration.permission.user.id, 'User');
        await this.createCrudPermission(seedConfiguration.permission.role.id, 'Role');
        await this.createAdminPermission(seedConfiguration.permission.edition.id, 'Edition');
        await this.createTenantPermission();
        await this.createCrudTenantPermission(seedConfiguration.permission.userTenant.id, 'User', 'userTenant');
        await this.createCrudTenantPermission(seedConfiguration.permission.roleTenant.id, 'Role', 'roleTenant');
        await this.createCrudTenantPermission(seedConfiguration.permission.organizationUnit.id, 'OrganizationUnit', 'organizationUnit');
        await this.permissionRepository.insert({
            id: seedConfiguration.permission.organizationUnit.addUsers,
            isHost: false,
            name: 'Page.Administration.OrganizationUnit.AddUsers',
            parentId: seedConfiguration.permission.organizationUnit.id
        });
        await this.permissionRepository.insert({
            id: seedConfiguration.permission.organizationUnit.addRoles,
            isHost: false,
            name: 'Page.Administration.OrganizationUnit.AddRoles',
            parentId: seedConfiguration.permission.organizationUnit.id
        });
    }

    private async createCrudPermission(id: string, name: string) {
        const permission = await this.permissionRepository.findOne({ where: { id } });
        if (!permission) {
            const permissionName = name.toLowerCase();
            await this.permissionRepository.insert({
                id: seedConfiguration.permission[permissionName].id,
                isHost: true,
                name: `Page.Administration.${name}`,
                parentId: seedConfiguration.permission.administration
            });
            await this.permissionRepository.insert({
                id: seedConfiguration.permission[permissionName].create,
                isHost: true,
                name: `Page.Administration.${name}.Create`,
                parentId: seedConfiguration.permission[permissionName].id
            });
            await this.permissionRepository.insert({
                id: seedConfiguration.permission[permissionName].update,
                isHost: true,
                name: `Page.Administration.${name}.Update`,
                parentId: seedConfiguration.permission[permissionName].id
            });
            await this.permissionRepository.insert({
                id: seedConfiguration.permission[permissionName].getAll,
                isHost: true,
                name: `Page.Administration.${name}.GetAll`,
                parentId: seedConfiguration.permission[permissionName].id
            });
            await this.permissionRepository.insert({
                id: seedConfiguration.permission[permissionName].delete,
                isHost: true,
                name: `Page.Administration.${name}.Delete`,
                parentId: seedConfiguration.permission[permissionName].id
            });
        }
    }

    private async createTenantPermission() {
        await this.createAdminPermission(seedConfiguration.permission.tenant.id, 'Tenant');
        const permission = await this.permissionRepository.findOne({ where: { id: seedConfiguration.permission.tenant.impersonation } });
        if (!permission) {
            await this.permissionRepository.insert({
                id: seedConfiguration.permission.tenant.impersonation,
                isHost: true,
                name: 'Page.Tenant.Impersonation',
                parentId: seedConfiguration.permission.tenant.id
            });
        }
    }

    private async createAdminPermission(id: string, name: string) {
        const permission = await this.permissionRepository.findOne({ where: { id } });
        if (!permission) {
            const permissionName = name.toLowerCase();
            await this.permissionRepository.insert({
                id: seedConfiguration.permission[permissionName].id,
                isHost: true,
                name: `Page.${name}`,
                parentId: seedConfiguration.permission.page
            });
            await this.permissionRepository.insert({
                id: seedConfiguration.permission[permissionName].create,
                isHost: true,
                name: `Page.${name}.Create`,
                parentId: seedConfiguration.permission[permissionName].id
            });
            await this.permissionRepository.insert({
                id: seedConfiguration.permission[permissionName].update,
                isHost: true,
                name: `Page.${name}.Update`,
                parentId: seedConfiguration.permission[permissionName].id
            });
            await this.permissionRepository.insert({
                id: seedConfiguration.permission[permissionName].getAll,
                isHost: true,
                name: `Page.${name}.GetAll`,
                parentId: seedConfiguration.permission[permissionName].id
            });
            await this.permissionRepository.insert({
                id: seedConfiguration.permission[permissionName].delete,
                isHost: true,
                name: `Page.${name}.Delete`,
                parentId: seedConfiguration.permission[permissionName].id
            });
        }
    }

    private async createCrudTenantPermission(id: string, name: string, objectName: string) {
        const permission = await this.permissionRepository.findOne({ where: { id } });
        if (!permission) {
            const permissionName = objectName;
            await this.permissionRepository.insert({
                id: seedConfiguration.permission[permissionName].id,
                isHost: false,
                name: `Page.Administration.${name}`,
                parentId: seedConfiguration.permission.administrationTenant
            });
            await this.permissionRepository.insert({
                id: seedConfiguration.permission[permissionName].create,
                isHost: false,
                name: `Page.Administration.${name}.Create`,
                parentId: seedConfiguration.permission[permissionName].id
            });
            await this.permissionRepository.insert({
                id: seedConfiguration.permission[permissionName].update,
                isHost: false,
                name: `Page.Administration.${name}.Update`,
                parentId: seedConfiguration.permission[permissionName].id
            });
            await this.permissionRepository.insert({
                id: seedConfiguration.permission[permissionName].getAll,
                isHost: false,
                name: `Page.Administration.${name}.GetAll`,
                parentId: seedConfiguration.permission[permissionName].id
            });
            await this.permissionRepository.insert({
                id: seedConfiguration.permission[permissionName].delete,
                isHost: false,
                name: `Page.Administration.${name}.Delete`,
                parentId: seedConfiguration.permission[permissionName].id
            });
        }
    }

}
