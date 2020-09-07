import { Module } from '@nestjs/common';
import { TypeOrmModule } from '../typeorm/typeorm.module';
import { PermissionDomainService } from './domain/services/permission.service';
import { PermissionRepository } from './infrastructure/database/repositories/permission.repository';
import { FindAllPermissionHandler } from './domain/handlers/find-all-permission.handler';
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
    FindAllPermissionHandler,
  ],
  exports: [
    PermissionService,
    PermissionDomainService,
    TypeOrmModule.forFeature([PermissionRepository])
  ],
})
export class PermissionModule { }
