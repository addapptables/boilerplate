import { EntityRepository } from 'typeorm';
import { CraftsRepository } from '../../../../core/repositories/crafts.repository';
import { Tenant } from '../entities/tenant.entity';

@EntityRepository(Tenant)
export class TenantRepository extends CraftsRepository<Tenant> { }
