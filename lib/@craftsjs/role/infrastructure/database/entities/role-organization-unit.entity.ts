import { Column, ManyToOne, Entity } from 'typeorm';
import { CreationAuditedEntity, IMayHaveTenant } from '../../../../core';
import { OrganizationUnit } from '../../../../organization/infrastructure/database/entities/organization-unit.entity';
import { Role } from './role.entity';

@Entity('role_organization_units')
export class RoleOrganizationUnit extends CreationAuditedEntity implements IMayHaveTenant {

  @Column({ nullable: true })
  tenantId?: number;

  @Column()
  roleId!: number;

  @Column()
  organizationUnitId!: number;

  @ManyToOne(() => Role)
  role!: Role;

  @ManyToOne(() => OrganizationUnit)
  organizationUnit: OrganizationUnit;

}
