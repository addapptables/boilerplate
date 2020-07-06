import { EntityRepository } from 'typeorm';
import { CraftsRepository } from '../../../../core/repositories/crafts.repository';
import { Edition } from '../entities/edition.entity';
import { Injectable } from '@nestjs/common';

@EntityRepository(Edition)
@Injectable()
export class EditionRepository extends CraftsRepository<Edition> { }
