import { Column, ManyToOne, Entity } from 'typeorm';
import { CreationAuditedEntity } from '../../../../core';
import { OrganizationUnit } from './organization-unit.entity';
import { User } from '../../../../user/infrastructure/database/entities/user.entity';

@Entity('organization_unit_users')
export class OrganizationUnitUser extends CreationAuditedEntity {

  @Column()
  userId: string;

  @Column()
  organizationUnitId: string;

  @ManyToOne(() => User, user => user.organizationUnitUsers)
  user: User;

  @ManyToOne(() => OrganizationUnit, organizationUnit => organizationUnit.organizationUnitUsers)
  organizationUnit: OrganizationUnit;

}
