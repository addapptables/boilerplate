import { Column, Entity, OneToMany, TableInheritance } from 'typeorm';
import { Expose } from 'class-transformer';
import { FullAuditedEntity, IMayHaveTenant } from '../../../../core';
import { MAX_NAME_LENGTH, MAX_EMAIL_LENGTH, MAX_PASSWORD_LENGTH, MAX_CODE_LENGTH, MAX_PHONE_NUMBER_LENGTH } from '../../../../config';
import { UserRole } from './user-role.entity';
import { UserPermission } from './user-permission.entity';
import { OrganizationUnitUser } from '../../../../organization/infrastructure/database/entities/organization-unit-user.entity';

@Entity('users')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class User extends FullAuditedEntity implements IMayHaveTenant {

  @Column({ nullable: true })
  @Expose()
  tenantId?: number;

  @Column({ nullable: false, length: MAX_NAME_LENGTH })
  @Expose()
  userName!: string;

  @Column({ nullable: false, length: MAX_EMAIL_LENGTH })
  @Expose()
  emailAddress!: string;

  @Column({ nullable: false, length: MAX_NAME_LENGTH })
  @Expose()
  name!: string;

  @Column({ nullable: false, length: MAX_NAME_LENGTH })
  @Expose()
  surname!: string;

  @Column({ nullable: false, length: MAX_PASSWORD_LENGTH })
  password!: string;

  @Column({ nullable: true, length: MAX_CODE_LENGTH })
  emailConfirmationCode?: string;

  @Column({ nullable: true, length: MAX_CODE_LENGTH })
  passwordResetCode?: string;

  @Column({ nullable: true })
  lockoutEndDateUtc?: Date;

  @Column({ nullable: true })
  accessFailedCount?: number;

  @Column({ nullable: true, length: MAX_PHONE_NUMBER_LENGTH })
  @Expose()
  phoneNumber?: string;

  @Column({ nullable: true })
  isEmailConfirmed?: boolean;

  @Column({ nullable: true })
  @Expose()
  isActive?: boolean;

  @Column({ nullable: false })
  isStatic!: boolean;

  @OneToMany(() => UserRole, role => role.user)
  roles!: UserRole[];

  @OneToMany(() => UserPermission, permission => permission.user)
  permissions!: UserPermission[];

  @OneToMany(() => OrganizationUnitUser, userOrganizationUnit => userOrganizationUnit.user)
  organizationUnitUsers!: OrganizationUnitUser[];

}
