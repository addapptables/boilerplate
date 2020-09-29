import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { PermissionSeedService } from './services/permission-seed.service';
import { RoleSeedService } from './services/role-seed.service';
import { TenantSeedService } from './services/tenant-seed.service';
import { UserPermissionSeedService } from './services/user-permission-seed.service';
import { UserRoleSeedService } from './services/user-role-seed.service';
import { UserSeedService } from './services/user-seed.service';
import { TenantModule } from '@craftsjs/tenant';
import { PermissionModule } from '@craftsjs/permission/permission.module';
import { RoleModule } from '@craftsjs/role/role.module';
import { UserModule } from '@craftsjs/user';
import { ModuleRef } from '@nestjs/core';
import { OptionDisposableService } from '@craftsjs/core/disposable/option.disposable';
import { using } from 'using-statement';
import { CraftsLogger } from '@addapptables/microservice';
import { DisposableOptionModule } from '@craftsjs/core/disposable/disposable-option.module';
import { SessionModule } from '@craftsjs/auth/session/session.module';

@Module({
    imports: [
        TenantModule,
        PermissionModule,
        RoleModule,
        UserModule,
        DisposableOptionModule,
        SessionModule
    ],
    providers: [
        PermissionSeedService,
        RoleSeedService,
        TenantSeedService,
        UserPermissionSeedService,
        UserRoleSeedService,
        UserSeedService
    ]
})
export class SeedModule implements OnApplicationBootstrap {

    constructor(
        private readonly moduleRef: ModuleRef,
        private readonly logger: CraftsLogger,
        private readonly optionDisposableService: OptionDisposableService
    ) {
        this.logger.setContext(SeedModule.name);
    }

    async onApplicationBootstrap() {
        this.optionDisposableService.newOptions({ defaultFilter: { applyIsDeleted: false, applyTenant: false } });
        await using(this.optionDisposableService, async () => {
            try {
                const tenantSeed = await this.moduleRef.resolve(TenantSeedService);
                await tenantSeed.seed();
                this.logger.debug('Inserted default tenant');

                const userSeed = await this.moduleRef.resolve(UserSeedService);
                await userSeed.seed();
                this.logger.debug('Inserted default user');

                const roleSeed = await this.moduleRef.resolve(RoleSeedService);
                await roleSeed.seed();
                this.logger.debug('Inserted default role');

                const userRoleSeed = await this.moduleRef.resolve(UserRoleSeedService);
                await userRoleSeed.seed();
                this.logger.debug('Inserted default userRole');

                const permissionSeed = await this.moduleRef.resolve(PermissionSeedService);
                await permissionSeed.seed();
                this.logger.debug('Inserted default permissions');

                const userPermissionSeed = await this.moduleRef.resolve(UserPermissionSeedService);
                await userPermissionSeed.seed();
                this.logger.debug('Inserted default userPermissions');
            } catch (error) {
                this.logger.error(error);
            }
        })
    }

}