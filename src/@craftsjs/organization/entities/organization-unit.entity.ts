import { Column, ManyToOne, OneToMany, Entity } from 'typeorm';
import { FullAuditedEntity, IMayHaveTenant } from '../../core';
import { MAX_NAME_LENGTH } from '../../config';
import { UserOrganizationUnit } from '../../user/infrastructure/database/entities/user-organization-unit.entity';

const MAX_DEPTH = 16;
const CODE_UNIT_LENGTH = 5;
const MAX_CODE_LENGTH = MAX_DEPTH * (CODE_UNIT_LENGTH + 1) - 1;

@Entity('organization_units')
export class OrganizationUnit extends FullAuditedEntity implements IMayHaveTenant {

  @Column({ nullable: true })
  tenantId?: number;

  @Column({ nullable: true })
  parentId?: number;

  @Column({ length: MAX_CODE_LENGTH })
  code: string;

  @Column({ length: MAX_NAME_LENGTH })
  name: string;

  @ManyToOne(() => OrganizationUnit, organizationUnit => organizationUnit.children)
  parent: OrganizationUnit;

  @OneToMany(() => OrganizationUnit, organizationUnit => organizationUnit.parent)
  children: OrganizationUnit[];

  @OneToMany(() => UserOrganizationUnit, userOrganizationUnit => userOrganizationUnit.organizationUnit)
  userOrganizationUnits: UserOrganizationUnit[];

}
