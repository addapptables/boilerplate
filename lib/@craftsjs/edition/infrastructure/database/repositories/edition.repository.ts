import { EntityRepository } from 'typeorm';
import { CraftsRepository } from '../../../../core/repositories/crafts.repository';
import { Edition } from '../entities/edition.entity';

@EntityRepository(Edition)
export class EditionRepository extends CraftsRepository<Edition> { }
