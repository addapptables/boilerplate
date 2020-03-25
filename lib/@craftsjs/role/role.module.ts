import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolePermission } from './infrastructure/database/entities/role-permission.entity';
import { RoleDomainService } from './domain/services/role.service';
import { CreateRoleHandler } from './domain/handlers/create-role.handler';
import { RoleRepository } from './infrastructure/database/repositories/role.repository';
import { findAllRoleHandler } from './domain/handlers/get-all-role.handler';
import { UpdateRoleHandler } from './domain/handlers/update-role.handler';
import { DeleteRoleHandler } from './domain/handlers/delete-role.handler';
import { RoleController } from './application/api/controllers/role.controller';
import { RoleService } from './application/api/services/role.service';
import { FindOneRoleHandler } from './domain/handlers/find-one-role.handler';

@Module({
  controllers: [RoleController],
  imports: [
    TypeOrmModule.forFeature([RolePermission, RoleRepository]),
  ],
  providers: [
    RoleDomainService,
    RoleService,
    UpdateRoleHandler,
    CreateRoleHandler,
    findAllRoleHandler,
    DeleteRoleHandler,
    FindOneRoleHandler,
  ],
  exports: [
    RoleService,
    TypeOrmModule.forFeature([RoleRepository])
  ],
})
export class RoleModule { }
