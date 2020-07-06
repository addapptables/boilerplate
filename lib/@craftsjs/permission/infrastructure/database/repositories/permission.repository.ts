import { EntityRepository } from 'typeorm';
import { CraftsRepository } from '../../../../core/repositories/crafts.repository';
import { Permission } from '../entities/permission.entity';
import { Injectable } from '@nestjs/common';

@EntityRepository(Permission)
@Injectable()
export class PermissionRepository extends CraftsRepository<Permission> { }
