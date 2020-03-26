import { EntityRepository } from 'typeorm';
import { CraftsRepository } from '../../../../core/repositories/crafts.repository';
import { Permission } from '../entities/permission.entity';

@EntityRepository(Permission)
export class PermissionRepository extends CraftsRepository<Permission> { }
