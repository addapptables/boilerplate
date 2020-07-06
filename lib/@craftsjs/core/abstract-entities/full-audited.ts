import { Column } from 'typeorm';
import { IFullAudited } from '../interfaces/full-audited.interface';
import { AuditedEntity } from './audited';

export abstract class FullAuditedEntity extends AuditedEntity implements IFullAudited {

  @Column({ nullable: true })
  deleterUserId?: string;

  @Column({ nullable: true })
  deletionTime?: Date;

  @Column()
  isDeleted: boolean;

}
