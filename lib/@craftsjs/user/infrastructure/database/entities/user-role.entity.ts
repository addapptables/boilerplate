import { Entity, Column, ManyToOne, TableInheritance } from 'typeorm';
import { CreationAuditedEntity } from '../../../../core';
import { Role } from '../../../../role/infrastructure/database/entities/role.entity';
import { User } from './user.entity';

@Entity('user_roles')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class UserRole extends CreationAuditedEntity {

  @Column()
  userId !: string;

  @Column()
  roleId !: string;

  @ManyToOne(() => Role, role => role.users)
  role!: Role;

  @ManyToOne(() => User, user => user.roles)
  user!: User;

}
