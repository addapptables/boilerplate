import { Entity, TableInheritance, Column, ManyToOne, JoinColumn } from 'typeorm';
import { FullAuditedEntity } from '../../core';
import { MAX_NAME_LENGTH, SHORT_MAX_NAME_LENGTH } from '../../config';
import { Edition } from '../../editions/entities/edition.entity';

@Entity('tenants')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Tenant extends FullAuditedEntity {

  @Column({ length: MAX_NAME_LENGTH })
  name!: string;

  @Column({ length: SHORT_MAX_NAME_LENGTH })
  subDomain!: string;

  @Column()
  isActive!: boolean;

  @Column({ nullable: true })
  connectionString?: string;

  @Column({ nullable: true })
  subscriptionEndDate?: Date;

  @Column({ nullable: true })
  isInTrialPeriod?: boolean;

  @Column({ nullable: true })
  editionId?: number;

  @ManyToOne(() => Edition, edition => edition.tenants)
  @JoinColumn({ name: 'editionId' })
  edition: Edition;

  public get isSubscriptionEnded(): boolean {
    if (!this.subscriptionEndDate) { return false; }
    const subscriptionEndDate = this.subscriptionEndDate.getUTCDate();
    const currentDate = new Date().getUTCDate();
    return subscriptionEndDate < currentDate;
  }

  public get remainingDayCount(): number {
    if (!this.subscriptionEndDate) { return 0; }
    const differencePerDay = 1000 * 60 * 60 * 24;
    const subscriptionEndDate = this.subscriptionEndDate.getUTCDate();
    const currentDate = new Date().getUTCDate();
    return Math.floor((subscriptionEndDate - currentDate) / differencePerDay);
  }
}
