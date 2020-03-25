import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantDomainService } from './domain/services/tenant.service';
import { UpdateTenantHandler } from './domain/handlers/update-tenant.handler';
import { CreateTenantHandler } from './domain/handlers/create-tenant.handler';
import { findAllTenantHandler } from './domain/handlers/get-all-tenant.handler';
import { DeleteTenantHandler } from './domain/handlers/delete-tenant.handler';
import { FindOneTenantHandler } from './domain/handlers/find-one-tenant.handler';
import { TenantService } from './application/api/services/tenant.service';
import { TenantController } from './application/api/controllers/tenant.controller';
import { TenantRepository } from './infrastructure/database/repositories/tenant.repository';
import { SecurityModule } from '../security/security.module';
import { PermissionModule } from '@craftsjs/permission/permission.module';

@Module({
  controllers: [TenantController],
  imports: [
    TypeOrmModule.forFeature([TenantRepository]),
    SecurityModule,
    PermissionModule,
  ],
  providers: [
    TenantService,
    TenantDomainService,
    UpdateTenantHandler,
    CreateTenantHandler,
    findAllTenantHandler,
    DeleteTenantHandler,
    FindOneTenantHandler,
  ],
  exports: [
    TenantService,
    TenantDomainService,
  ],
})
export class TenantModule { }
