import { Entity, Column, OneToMany, TableInheritance } from 'typeorm';
import { Expose } from 'class-transformer';
import { FullAuditedEntity } from '../../../../core';
import { MAX_NAME_LENGTH } from '../../../../config';
import { EditionType } from '../enums/edition-type.enum';
import { Tenant } from '../../../../tenant/infrastructure/database/entities/tenant.entity';

@Entity('editions')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Edition extends FullAuditedEntity {

  @Column({ length: MAX_NAME_LENGTH })
  @Expose()
  name!: string;

  @Column()
  @Expose()
  isFree!: boolean;

  @Column({ type: 'decimal', nullable: true })
  @Expose()
  price?: number;

  @Column({ nullable: true })
  @Expose()
  numberOfUsers?: number;

  @Column({ nullable: true })
  @Expose()
  trialDayCount?: number;

  @Column({ type: 'enum', enum: EditionType, nullable: true })
  @Expose()
  editionType?: EditionType;

  @OneToMany(() => Tenant, tenant => tenant.edition)
  tenants: Tenant[];

}
