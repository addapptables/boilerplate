import { Entity, Column, ManyToOne, TableInheritance } from 'typeorm';
import { CreationAuditedEntity, IMayHaveTenant } from '../../../../core';
import { Permission } from '../../../../permission/entities/permission.entity';
import { User } from './user.entity';

@Entity('user_permissions')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class UserPermission extends CreationAuditedEntity implements IMayHaveTenant {

  @Column({ nullable: true })
  tenantId?: number;

  @Column()
  permissionId!: number;

  @Column()
  userId!: number;

  @Column()
  isGranted!: boolean;

  @ManyToOne(() => Permission, permission => permission.userPermissions)
  permission!: Permission;

  @ManyToOne(() => User, user => user.permissions)
  user!: User;

}
