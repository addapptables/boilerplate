import { Module } from '@nestjs/common';
import { TypeOrmModule } from '../typeorm/typeorm.module';
import { OrganizationUnitDomainService } from './domain/services/organization-unit.service';
import { CreateOrganizationUnitHandler } from './domain/handlers/create-organization-unit.handler';
import { OrganizationUnitRepository } from './infrastructure/database/repositories/organization-unit.repository';
import { FindAllOrganizationUnitHandler } from './domain/handlers/find-all-organization-unit.handler';
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
import { FindOrganizationUnitUserHandler } from './domain/handlers/find-organization-unit-by-user.handler';
import { OrganizationUnitUserService } from './domain/services/organization-unit-code-user.service';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [OrganizationUnitController],
  imports: [
    TypeOrmModule.forFeature([OrganizationUnitRepository, OrganizationUnitUser, OrganizationUnitRoleRepository]),
    RoleModule,
    UserModule
  ],
  providers: [
    OrganizationUnitDomainService,
    OrganizationUnitService,
    UpdateOrganizationUnitHandler,
    CreateOrganizationUnitHandler,
    FindAllOrganizationUnitHandler,
    DeleteOrganizationUnitHandler,
    FindOneOrganizationUnitHandler,
    OrganizationUnitCodeService,
    AddRolesToOrganizationUnitHandler,
    GetRolesOrganizationUnitHandler,
    DeleteOrganizationUnitRoleHandler,
    GetRolesAssociateToOrganizationUnitHandler,
    FindOrganizationUnitUserHandler,
    OrganizationUnitUserService
  ],
  exports: [
    OrganizationUnitService,
    OrganizationUnitUserService
  ],
})
export class OrganizationUnitModule { }
