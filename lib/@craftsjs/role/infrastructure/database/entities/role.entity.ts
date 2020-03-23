import { Column, Entity, OneToMany, TableInheritance } from 'typeorm';
import { Expose } from 'class-transformer';
import { FullAuditedEntity, IMayHaveTenant } from '../../../../core';
import { MAX_NAME_LENGTH } from '../../../../config';
import { UserRole } from '../../../../user/infrastructure/database/entities/user-role.entity';
import { RolePermission } from './role-permission.entity';
import { OrganizationUnitRole } from '../../../../organization/infrastructure/database/entities/organization-unit-role.entity';

@Entity('roles')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Role extends FullAuditedEntity implements IMayHaveTenant {

  @Column({ nullable: true })
  @Expose()
  tenantId?: number;

  @Column({ nullable: false, length: MAX_NAME_LENGTH })
  @Expose()
  name!: string;

  @Column({ nullable: false })
  isStatic!: boolean;

  @Column({ nullable: false })
  isDefault!: boolean;

  @OneToMany(() => RolePermission, permission => permission.role)
  permissions!: RolePermission[];

  @OneToMany(() => UserRole, user => user.role)
  users!: UserRole[];

  @OneToMany(() => OrganizationUnitRole, organizationUnitRole => organizationUnitRole.role)
  organizationUnitRoles!: OrganizationUnitRole[];

}
