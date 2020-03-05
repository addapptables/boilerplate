import { Column, ManyToOne, Entity } from 'typeorm';
import { CreationAuditedEntity, IMayHaveTenant } from '../../../../core';
import { OrganizationUnit } from '../../../../organization/entities/organization-unit.entity';
import { User } from './user.entity';

@Entity('user_organization_units')
export class UserOrganizationUnit extends CreationAuditedEntity implements IMayHaveTenant {

  @Column({ nullable: true })
  tenantId?: number;

  @Column()
  userId!: number;

  @Column()
  organizationUnitId!: number;

  @ManyToOne(() => User, user => user.userOrganizationUnits)
  user!: User;

  @ManyToOne(() => OrganizationUnit, organizationUnit => organizationUnit.userOrganizationUnits)
  organizationUnit!: OrganizationUnit;

}
