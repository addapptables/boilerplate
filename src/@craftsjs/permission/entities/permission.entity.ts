import { Entity, Column, TableInheritance, OneToMany } from 'typeorm';
import { CreationAuditedEntity } from '../../core';
import { MAX_NAME_LENGTH } from '../../config';
import { UserPermission } from '../../user/infrastructure/database/entities/user-permission.entity';
import { RolePermission } from '../../role/entities/role-permission.entity';

@Entity('permissions')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Permission extends CreationAuditedEntity {

  @Column({ length: MAX_NAME_LENGTH })
  name!: string;

  @Column()
  isHost!: boolean;

  @OneToMany(() => UserPermission, userPermission => userPermission.permission)
  userPermissions: UserPermission[];

  @OneToMany(() => RolePermission, rolePermission => rolePermission.permission)
  roles: RolePermission[];

}
