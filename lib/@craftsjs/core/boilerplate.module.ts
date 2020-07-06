import { Module, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@craftsjs/typeorm';
import { TenantModule } from '../tenant';
import { EntitySubscriber } from './subscriber/entity.subscriber';
import { BoilerplateOptions } from './interfaces/boilerplate-options.interface';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { RoleModule } from '../role/role.module';
import { EditionModule } from '../edition/edition.module';
import { OrganizationUnitModule } from '../organization/organization-unit.module';
import { PermissionModule } from '../permission/permission.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './exception-filter';

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
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
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
