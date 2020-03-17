import { Column } from 'typeorm';
import { CreationAuditedEntity } from './creation-audited';
import { IAudited } from '../interfaces/audited.interface';

export abstract class AuditedEntity extends CreationAuditedEntity implements IAudited {

  @Column({ nullable: true })
  lastModifierUserId?: number;

  @Column({ nullable: true })
  lastModificationTime?: Date;

}
