import { Module, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantModule } from '../tenant';
import { EntitySubscriber } from './subscriber/entity.subscriber';
import { BoilerplateOptions } from './interfaces/boilerplate-options.interface';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { RoleModule } from '@craftsjs/role/role.module';
import { EditionModule } from '@craftsjs/edition/edition.module';
import { OrganizationUnitModule } from '@craftsjs/organization/organization-unit.module';
import { PermissionModule } from '@craftsjs/permission/permission.module';

@Module({
  imports: [
    UserModule,
    TenantModule,
    RoleModule,
    EditionModule,
    OrganizationUnitModule,
    PermissionModule,
  ],
  exports: [
    UserModule,
    TenantModule,
    RoleModule,
  ],
  providers: [
    EntitySubscriber,
  ],
})
export class BoilerplateModule {

  static forRoot(options: BoilerplateOptions): DynamicModule {
    return {
      module: BoilerplateModule,
      imports: [
        AuthModule.forRoot(options.jwt),
        TypeOrmModule.forRoot(options.typeOrm),
      ],
    };
  }
}
