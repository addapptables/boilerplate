import { Column, Entity, OneToMany, TableInheritance } from 'typeorm';
import { FullAuditedEntity, IMayHaveTenant } from '../../core';
import { MAX_NAME_LENGTH } from '../../config';
import { UserRole } from '../../user/infrastructure/database/entities/user-role.entity';
import { RolePermission } from './role-permission.entity';

@Entity('roles')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Role extends FullAuditedEntity implements IMayHaveTenant {

  @Column({ nullable: true })
  tenantId?: number;

  @Column({ nullable: false, length: MAX_NAME_LENGTH })
  name!: string;

  @Column({ nullable: false })
  isStatic!: boolean;

  @Column({ nullable: false })
  isDefault!: boolean;

  @OneToMany(() => RolePermission, permission => permission.role)
  permissions!: RolePermission[];

  @OneToMany(() => UserRole, user => user.role)
  users!: UserRole[];

}
