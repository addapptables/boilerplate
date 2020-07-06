import { EntityRepository } from 'typeorm';
import { CraftsRepository } from '../../../../core/repositories/crafts.repository';
import { Role } from '../entities';
import { Injectable } from '@nestjs/common';

@EntityRepository(Role)
@Injectable()
export class RoleRepository extends CraftsRepository<Role> { }
