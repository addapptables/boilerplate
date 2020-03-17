import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionDomainService } from './domain/services/permission.service';
import { PermissionRepository } from './infrastructure/database/repositories/permission.repository';
import { GetAllPermissionHandler } from './domain/handlers/get-all-permission.handler';
import { PermissionController } from './application/api/controllers/permission.controller';
import { PermissionService } from './application/api/services/permission.service';

@Module({
  controllers: [PermissionController],
  imports: [
    TypeOrmModule.forFeature([PermissionRepository]),
  ],
  providers: [
    PermissionDomainService,
    PermissionService,
    GetAllPermissionHandler,
  ],
  exports: [
    PermissionService,
    PermissionDomainService,
  ],
})
export class PermissionModule { }
