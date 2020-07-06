import { Entity, Column, TableInheritance, ManyToOne } from 'typeorm';
import { CreationAuditedEntity } from '../../../../core';
import { Permission } from '../../../../permission/infrastructure/database/entities/permission.entity';
import { Role } from './role.entity';

@Entity('role_permissions')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class RolePermission extends CreationAuditedEntity {

  @Column()
  permissionId!: string;

  @Column()
  roleId!: string;

  @Column({ nullable: false })
  isGranted!: boolean;

  @ManyToOne(() => Permission, permission => permission.roles)
  permission!: Permission;

  @ManyToOne(() => Role, role => role.permissions)
  role!: Role;

}
