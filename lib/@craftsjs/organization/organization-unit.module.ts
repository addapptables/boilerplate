import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationUnitDomainService } from './domain/services/organization-unit.service';
import { CreateOrganizationUnitHandler } from './domain/handlers/create-organization-unit.handler';
import { OrganizationUnitRepository } from './infrastructure/database/repositories/organization-unit.repository';
import { findAllOrganizationUnitHandler } from './domain/handlers/get-all-organization-unit.handler';
import { UpdateOrganizationUnitHandler } from './domain/handlers/update-organization-unit.handler';
import { DeleteOrganizationUnitHandler } from './domain/handlers/delete-organization-unit.handler';
import { OrganizationUnitController } from './application/api/controllers/organization-unit.controller';
import { OrganizationUnitService } from './application/api/services/organization-unit.service';
import { FindOneOrganizationUnitHandler } from './domain/handlers/find-one-organization-unit.handler';
import { OrganizationUnitCodeService } from './domain/services/organization-unit-code.service';
import { OrganizationUnitUser } from './infrastructure/database/entities/organization-unit-user.entity';
import { AddRolesToOrganizationUnitHandler } from './domain/handlers/add-roles-to-organization-unit.handler';
import { OrganizationUnitRoleRepository } from './infrastructure/database/repositories/organization-unit-role.repository';
import { RoleModule } from '../role/role.module';
import { GetRolesOrganizationUnitHandler } from './domain/handlers/get-role-organization-unit.handler';
import { DeleteOrganizationUnitRoleHandler } from './domain/handlers/delete-organization-unit-role.handler';
import { GetRolesAssociateToOrganizationUnitHandler } from './domain/handlers/get-role-associate-to-organization-unit.handler';

@Module({
  controllers: [OrganizationUnitController],
  imports: [
    TypeOrmModule.forFeature([OrganizationUnitRepository, OrganizationUnitUser, OrganizationUnitRoleRepository]),
    RoleModule
  ],
  providers: [
    OrganizationUnitDomainService,
    OrganizationUnitService,
    UpdateOrganizationUnitHandler,
    CreateOrganizationUnitHandler,
    findAllOrganizationUnitHandler,
    DeleteOrganizationUnitHandler,
    FindOneOrganizationUnitHandler,
    OrganizationUnitCodeService,
    AddRolesToOrganizationUnitHandler,
    GetRolesOrganizationUnitHandler,
    DeleteOrganizationUnitRoleHandler,
    GetRolesAssociateToOrganizationUnitHandler
  ],
  exports: [
    OrganizationUnitService,
  ],
})
export class OrganizationUnitModule { }
