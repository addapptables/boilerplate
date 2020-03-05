import { EntityRepository } from 'typeorm';
import { CraftsRepository } from '../../../../core/repositories/crafts.repository';
import { User } from '../entities/user.entity';

@EntityRepository(User)
export class UserRepository extends CraftsRepository<User> { }
