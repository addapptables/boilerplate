import { Entity, Column, ManyToOne, TableInheritance } from 'typeorm';
import { CreationAuditedEntity } from '../../../../core';
import { Permission } from '../../../../permission/infrastructure/database/entities/permission.entity';
import { User } from './user.entity';

@Entity('user_permissions')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class UserPermission extends CreationAuditedEntity {

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
