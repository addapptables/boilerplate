import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { removeEmpty } from '../../../utils';
import { AlreadyExists } from '../../../core';
import { CrudAppService } from '../../../core/services/crud-app.service';
import { FindOneDto } from '../../../core/dto/find-one.dto';
import { OrganizationUnitRepository } from '../../infrastructure/database/repositories/organization-unit.repository';
import { OrganizationUnit } from '../../infrastructure/database/entities/organization-unit.entity';
import { OrganizationUnitCodeService } from './organization-unit-code.service';
import { OrganizationUnitRole } from '../../infrastructure/database/entities/organization-unit-role.entity';
import { OrganizationUnitRoleRepository } from '../../infrastructure/database/repositories/organization-unit-role.repository';
import { RoleRepository } from '../../../role/infrastructure/database/repositories/role.repository';

@Injectable()
export class OrganizationUnitDomainService extends CrudAppService<OrganizationUnitRepository> {

  constructor(
    @InjectRepository(OrganizationUnitRepository)
    private readonly organizationUnitRepository: OrganizationUnitRepository,
    @InjectRepository(OrganizationUnitRoleRepository)
    private readonly organizationUnitRoleRepository: OrganizationUnitRoleRepository,
    @InjectRepository(RoleRepository)
    private readonly roleRepository: RoleRepository,
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

  private async validateUnitName(name: string, parentId?: string) {
    const anyOrganizationUnit = await this.organizationUnitRepository.findOne({ where: { parentId, name } });
    if (anyOrganizationUnit) {
      throw new AlreadyExists('organizationUnit.existsName');
    }
  }

  findOneByQuery(organizationUnitQuery: FindOneDto) {
    const query = removeEmpty(organizationUnitQuery);
    return this.organizationUnitRepository.findOne({
      where: query,
    });
  }

  addRolesToOrganizationUnit(input: OrganizationUnitRole[]) {
    return this.organizationUnitRoleRepository.save(input);
  }

  deleteOrganizationUnit(organizationUnit: string, currentUserId: string) {
    return this.organizationUnitRepository.createQueryBuilder()
      .update(OrganizationUnit)
      .set({ isDeleted: true, deleterUserId: currentUserId })
      .andWhere('id = :id', { id: organizationUnit })
      .orWhere('parentId = :id', { id: organizationUnit })
      .execute()
  }

  deleteOrganizationUnitRole(organizationUnitRoleId: string) {
    return this.organizationUnitRoleRepository.createQueryBuilder()
      .where('id = :id', { id: organizationUnitRoleId })
      .delete()
      .execute()
  }

  async getRolesAssociate(organizationUnitId: string) {
    const organizationUnitRoles = await this.organizationUnitRoleRepository.find({ where: { organizationUnitId }, relations: ['role'] });
    return organizationUnitRoles.map(y => ({ ...y.role, id: y.id }));
  }

  getRoles(organizationUnitId: string, tenantId: string) {
    const subQuery = this.organizationUnitRoleRepository.createQueryBuilder('organizationUnitRole')
      .andWhere('organizationUnitRole.organizationUnitId = :organizationUnitId')
      .select('organizationUnitRole.roleId');

    return this.roleRepository.createQueryBuilder('role')
      .andWhere('role.tenantId = :tenantId', { tenantId })
      .andWhere(`NOT EXISTS(${subQuery.andWhere('organizationUnitRole.roleId=role.id').getQuery()})`)
      .setParameter('organizationUnitId', organizationUnitId)
      .getMany();
  }

}
