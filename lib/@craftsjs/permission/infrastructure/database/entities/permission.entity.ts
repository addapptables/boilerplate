import { Entity, Column, TableInheritance, OneToMany, ManyToOne } from 'typeorm';
import { CreationAuditedEntity } from '../../../../core';
import { MAX_NAME_LENGTH } from '../../../../config';
import { UserPermission } from '../../../../user/infrastructure/database/entities/user-permission.entity';
import { RolePermission } from '../../../../role/infrastructure/database/entities/role-permission.entity';

@Entity('permissions')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Permission extends CreationAuditedEntity {

  @Column({ length: MAX_NAME_LENGTH })
  name!: string;

  @Column()
  isHost!: boolean;

  @Column({ nullable: true })
  parentId?: number;

  @ManyToOne(() => Permission, permission => permission.children)
  parent!: Permission;

  @OneToMany(() => Permission, permission => permission.parent)
  children!: Permission[];

  @OneToMany(() => UserPermission, userPermission => userPermission.permission)
  userPermissions!: UserPermission[];

  @OneToMany(() => RolePermission, rolePermission => rolePermission.permission)
  roles!: RolePermission[];

}
