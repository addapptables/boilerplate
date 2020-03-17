import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { mergeAndRemoveEmpty } from '@craftsjs/utils';
import { CrudAppService } from '@craftsjs/core/services/crud-app.service';
import { FindOneDto } from '@craftsjs/core/dto/find-one.dto';
import { OrganizationUnitRepository } from '../../infrastructure/database/repositories/organization-unit.repository';
import { OrganizationUnit } from '../../infrastructure/database/entities/organization-unit.entity';
import { AlreadyExists } from '@craftsjs/core';
import { OrganizationUnitCodeService } from './organization-unit-code.service';

@Injectable()
export class OrganizationUnitDomainService extends CrudAppService<OrganizationUnitRepository> {

  constructor(
    @InjectRepository(OrganizationUnitRepository)
    private readonly organizationUnitRepository: OrganizationUnitRepository,
    private readonly organizationUnitCodeService: OrganizationUnitCodeService,
  ) {
    super(organizationUnitRepository);
  }

  async insert(organizationUnit: OrganizationUnit): Promise<OrganizationUnit> {
    organizationUnit.code = await this.organizationUnitCodeService.getNextChildCodeAsync(organizationUnit.tenantId);
    await this.validateUnitName(organizationUnit.name, organizationUnit.parentId);
    return super.insert(organizationUnit);
  }

  async update(organizationUnit: OrganizationUnit) {
    const organizationUnitDb = await this.organizationUnitRepository.findOne({ id: organizationUnit.id });
    if (organizationUnitDb.name !== organizationUnit.name) {
      await this.validateUnitName(organizationUnit.name, organizationUnit.parentId);
    }
    const organizationUnitToUpdate = Object.assign({}, organizationUnitDb, organizationUnit);
    await super.update(organizationUnitToUpdate);
    return organizationUnitToUpdate;
  }

  private async validateUnitName(name: string, parentId?: number) {
    const anyOrganizationUnit = await this.organizationUnitRepository.findOne({ where: { parentId, name } });
    if (anyOrganizationUnit) {
      throw new AlreadyExists('organizationUnit.existsName');
    }
  }

  findOneByQuery(organizationUnitQuery: FindOneDto) {
    const query = mergeAndRemoveEmpty(organizationUnitQuery)({});
    return this.organizationUnitRepository.findOne({
      where: query,
    });
  }

}
