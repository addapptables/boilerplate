import { Column, ManyToOne, Entity } from 'typeorm';
import { CreationAuditedEntity } from '../../../../core';
import { OrganizationUnit } from '../../../../organization/infrastructure/database/entities/organization-unit.entity';
import { User } from './user.entity';

@Entity('user_organization_units')
export class UserOrganizationUnit extends CreationAuditedEntity {

  @Column()
  userId!: number;

  @Column()
  organizationUnitId!: number;

  @ManyToOne(() => User, user => user.userOrganizationUnits)
  user!: User;

  @ManyToOne(() => OrganizationUnit, organizationUnit => organizationUnit.userOrganizationUnits)
  organizationUnit!: OrganizationUnit;

}
