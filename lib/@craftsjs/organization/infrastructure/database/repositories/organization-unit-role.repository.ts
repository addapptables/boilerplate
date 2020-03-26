import { EntityRepository } from 'typeorm';
import { CraftsRepository } from '../../../../core/repositories/crafts.repository';
import { OrganizationUnitRole } from '../entities/organization-unit-role.entity';

@EntityRepository(OrganizationUnitRole)
export class OrganizationUnitRoleRepository extends CraftsRepository<OrganizationUnitRole> { }
