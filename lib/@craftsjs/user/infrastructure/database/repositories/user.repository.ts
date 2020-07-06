import { EntityRepository } from 'typeorm';
import { CraftsRepository } from '../../../../core/repositories/crafts.repository';
import { User } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';

@EntityRepository(User)
@Injectable()
export class UserRepository extends CraftsRepository<User> { }
