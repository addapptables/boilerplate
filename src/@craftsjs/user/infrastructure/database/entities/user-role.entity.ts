import { Entity, Column, ManyToOne, TableInheritance } from 'typeorm';
import { CreationAuditedEntity, IMayHaveTenant } from '../../../../core';
import { Role } from '../../../../role/entities/role.entity';
import { User } from './user.entity';

@Entity('user_roles')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class UserRole extends CreationAuditedEntity implements IMayHaveTenant {

  @Column({ nullable: true })
  tenantId?: number;

  @Column()
  userId !: string;

  @Column()
  roleId !: string;

  @ManyToOne(() => Role, role => role.users)
  role!: Role;

  @ManyToOne(() => User, user => user.roles)
  user!: User;

}
