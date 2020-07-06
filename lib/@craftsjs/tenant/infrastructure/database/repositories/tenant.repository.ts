import { EntityRepository } from 'typeorm';
import { CraftsRepository } from '../../../../core/repositories/crafts.repository';
import { Tenant } from '../entities/tenant.entity';
import { Injectable } from '@nestjs/common';

@EntityRepository(Tenant)
@Injectable()
export class TenantRepository extends CraftsRepository<Tenant> { }
