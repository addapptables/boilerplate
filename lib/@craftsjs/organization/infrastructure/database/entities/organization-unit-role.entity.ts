import { Entity, Column, ManyToOne } from 'typeorm';
import { CreationAuditedEntity } from '../../../../core/abstract-entities/creation-audited';
import { Role } from '../../../../role/infrastructure/database/entities/role.entity';
import { OrganizationUnit } from './organization-unit.entity';

@Entity('organization_unit_roles')
export class OrganizationUnitRole extends CreationAuditedEntity {

  @Column()
  roleId!: number;

  @Column()
  organizationUnitId!: number;

  @ManyToOne(() => Role, role => role.organizationUnitRoles)
  role!: Role;

  @ManyToOne(() => OrganizationUnit, organizationUnit => organizationUnit.organizationUnitRoles)
  organizationUnit: OrganizationUnit;

}
