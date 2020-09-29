import { Column, Entity } from 'typeorm';
import { FullAuditedEntity, IMayHaveTenant } from '../../../../../../lib/@craftsjs/core';

@Entity()
export class FullAuditedTest extends FullAuditedEntity implements IMayHaveTenant {

  @Column({ length: 500 })
  name: string;

  @Column({ nullable: true })
  tenantId: string;

}
