import { Column, ManyToOne, OneToMany, Entity } from 'typeorm';
import { Expose } from 'class-transformer';
import { FullAuditedEntity, IMayHaveTenant } from '../../../../core';
import { MAX_NAME_LENGTH } from '../../../../config';
import { OrganizationUnitUser } from './organization-unit-user.entity';
import { OrganizationUnitRole } from './organization-unit-role.entity';
import { User } from '../../../../user/infrastructure/database/entities/user.entity';

const MAX_DEPTH = 16;
const CODE_UNIT_LENGTH = 5;
const MAX_CODE_LENGTH = MAX_DEPTH * (CODE_UNIT_LENGTH + 1) - 1;

@Entity('organization_units')
export class OrganizationUnit extends FullAuditedEntity implements IMayHaveTenant {

  @Column({ nullable: true })
  @Expose()
  tenantId?: string;

  @Column({ nullable: true })
  @Expose()
  parentId?: string;

  @Column({ length: MAX_CODE_LENGTH })
  code: string;

  @Column({ length: MAX_NAME_LENGTH })
  @Expose()
  name: string;

  @ManyToOne(() => OrganizationUnit, organizationUnit => organizationUnit.children)
  parent: OrganizationUnit;

  @OneToMany(() => OrganizationUnit, organizationUnit => organizationUnit.parent)
  children: OrganizationUnit[];

  @OneToMany(() => OrganizationUnitUser, organizationUnitUsers => organizationUnitUsers.organizationUnit)
  organizationUnitUsers: OrganizationUnitUser[];

  @OneToMany(() => OrganizationUnitRole, organizationUnitRole => organizationUnitRole.role)
  organizationUnitRoles: OrganizationUnitRole[];

  @OneToMany(() => User, user => user.lastOrganizationUnit)
  users: User[];

}
