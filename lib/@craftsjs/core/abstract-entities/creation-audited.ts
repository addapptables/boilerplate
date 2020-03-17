import { Column } from 'typeorm';
import { Entity } from './abstract-entity';
import { ICreationAudited } from '../interfaces/creation-audited.interface';

export abstract class CreationAuditedEntity extends Entity implements ICreationAudited {

  @Column({ nullable: true })
  creatorUserId?: number;

  @Column({ nullable: true })
  creationTime?: Date;

}
