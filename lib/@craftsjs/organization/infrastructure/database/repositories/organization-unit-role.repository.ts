import { EntityRepository } from 'typeorm';
import { CraftsRepository } from '../../../../core/repositories/crafts.repository';
import { OrganizationUnitRole } from '../entities/organization-unit-role.entity';
import { Injectable } from '@nestjs/common';

@EntityRepository(OrganizationUnitRole)
@Injectable()
export class OrganizationUnitRoleRepository extends CraftsRepository<OrganizationUnitRole> { }
