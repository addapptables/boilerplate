import { Module, DynamicModule, OnModuleInit } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '../typeorm';
import { TenantModule } from '../tenant';
import { EntitySubscriber } from './subscriber/entity.subscriber';
import { BoilerplateOptions } from './interfaces/boilerplate-options.interface';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { RoleModule } from '../role/role.module';
import { EditionModule } from '../edition/edition.module';
import { OrganizationUnitModule } from '../organization/organization-unit.module';
import { PermissionModule } from '../permission/permission.module';
import { HttpExceptionFilter } from './exception-filter';
import { DisposableOptionModule } from './disposable/disposable-option.module';
import { SeedModule } from '../seed/seed.module';
import { Connection } from 'typeorm';

@Module({
  imports: [
    UserModule,
    TenantModule,
    RoleModule,
    EditionModule,
    OrganizationUnitModule,
    PermissionModule,
    DisposableOptionModule,
    SeedModule
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
    }
  ],
})
export class BoilerplateModule implements OnModuleInit {

  constructor(private readonly connection: Connection) {}

  static forRoot(options: BoilerplateOptions): DynamicModule {
    return {
      module: BoilerplateModule,
      imports: [
        AuthModule.forRoot(options.jwt),
        TypeOrmModule.forRoot(options.typeOrm),
      ],
    };
  }

  async onModuleInit() {
    await this.connection.runMigrations();
  }
}
