import { Entity, TableInheritance, Column, ManyToOne, JoinColumn } from 'typeorm';
import { FullAuditedEntity } from '../../../../core';
import { MAX_NAME_LENGTH, SHORT_MAX_NAME_LENGTH } from '../../../../config';
import { Edition } from '../../../../edition/infrastructure/database/entities/edition.entity';
import { Expose } from 'class-transformer';

@Entity('tenants')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Tenant extends FullAuditedEntity {

  @Column({ length: MAX_NAME_LENGTH })
  @Expose()
  name!: string;

  @Column({ length: SHORT_MAX_NAME_LENGTH })
  @Expose()
  subDomain!: string;

  @Column()
  @Expose()
  isActive!: boolean;

  @Column({ nullable: true })
  connectionString?: string;

  @Column({ nullable: true })
  subscriptionEndDate?: Date;

  @Column({ nullable: true })
  isInTrialPeriod?: boolean;

  @Column({ nullable: true })
  @Expose()
  editionId?: string;

  @ManyToOne(() => Edition, edition => edition.tenants)
  @JoinColumn({ name: 'editionId' })
  edition: Edition;

  public get isSubscriptionEnded(): boolean {
    if (!this.subscriptionEndDate) { return false; }
    const currentDate = new Date();
    return this.subscriptionEndDate < currentDate;
  }

  public get remainingDayCount(): number {
    if (!this.subscriptionEndDate) { return undefined; }
    const differencePerDay = 1000 * 60 * 60 * 24;
    const subscriptionEndDate = this.subscriptionEndDate.getUTCDate();
    const currentDate = new Date().getUTCDate();
    return Math.floor((subscriptionEndDate - currentDate) / differencePerDay);
  }
}
