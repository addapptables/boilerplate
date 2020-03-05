import { Entity, Column, OneToMany, TableInheritance } from 'typeorm';
import { FullAuditedEntity } from '../../core';
import { MAX_NAME_LENGTH } from '../../config';
import { EditionType } from '../enums/edition-type.enum';
import { Tenant } from '../../tenants/entities/tenant.entity';

@Entity('editions')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Edition extends FullAuditedEntity {

  @Column({ length: MAX_NAME_LENGTH })
  name!: string;

  @Column()
  isFree!: boolean;

  @Column({ type: 'decimal', nullable: true })
  price?: number;

  @Column({ nullable: true })
  numberOfUsers?: number;

  @Column({ nullable: true })
  trialDayCount?: number;

  @Column({ type: 'enum', enum: EditionType, nullable: true })
  editionType?: EditionType;

  @OneToMany(() => Tenant, tenant => tenant.edition)
  tenants: Tenant[];

}
