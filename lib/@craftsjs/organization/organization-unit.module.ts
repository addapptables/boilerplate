import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationUnitDomainService } from './domain/services/organization-unit.service';
import { CreateOrganizationUnitHandler } from './domain/handlers/create-organization-unit.handler';
import { OrganizationUnitRepository } from './infrastructure/database/repositories/organization-unit.repository';
import { GetAllOrganizationUnitHandler } from './domain/handlers/get-all-organization-unit.handler';
import { UpdateOrganizationUnitHandler } from './domain/handlers/update-organization-unit.handler';
import { DeleteOrganizationUnitHandler } from './domain/handlers/delete-organization-unit.handler';
import { OrganizationUnitController } from './application/api/controllers/organization-unit.controller';
import { OrganizationUnitService } from './application/api/services/organization-unit.service';
import { FindOneOrganizationUnitHandler } from './domain/handlers/find-one-organization-unit.handler';
import { OrganizationUnitCodeService } from './domain/services/organization-unit-code.service';

@Module({
  controllers: [OrganizationUnitController],
  imports: [
    TypeOrmModule.forFeature([OrganizationUnitRepository]),
  ],
  providers: [
    OrganizationUnitDomainService,
    OrganizationUnitService,
    UpdateOrganizationUnitHandler,
    CreateOrganizationUnitHandler,
    GetAllOrganizationUnitHandler,
    DeleteOrganizationUnitHandler,
    FindOneOrganizationUnitHandler,
    OrganizationUnitCodeService,
  ],
  exports: [
    OrganizationUnitService,
  ],
})
export class OrganizationUnitModule { }
