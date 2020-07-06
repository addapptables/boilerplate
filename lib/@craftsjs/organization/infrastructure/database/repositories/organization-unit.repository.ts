import { EntityRepository } from 'typeorm';
import { CraftsRepository } from '../../../../core/repositories/crafts.repository';
import { OrganizationUnit } from '../entities/organization-unit.entity';
import { Injectable } from '@nestjs/common';

@EntityRepository(OrganizationUnit)
@Injectable()
export class OrganizationUnitRepository extends CraftsRepository<OrganizationUnit> { }
