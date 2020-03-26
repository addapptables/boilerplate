import { EntityRepository } from 'typeorm';
import { CraftsRepository } from '../../../../core/repositories/crafts.repository';
import { OrganizationUnit } from '../entities/organization-unit.entity';

@EntityRepository(OrganizationUnit)
export class OrganizationUnitRepository extends CraftsRepository<OrganizationUnit> { }
