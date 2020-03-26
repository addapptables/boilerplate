import { EntityRepository } from 'typeorm';
import { CraftsRepository } from '../../../../core/repositories/crafts.repository';
import { Role } from '../entities';

@EntityRepository(Role)
export class RoleRepository extends CraftsRepository<Role> { }
