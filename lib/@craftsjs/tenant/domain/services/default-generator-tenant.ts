import { Role } from '../../../role/infrastructure/database/entities/role.entity';
import { SecurityService } from '../../../security/services/security.service';
import { User } from '../../../user/infrastructure/database/entities/user.entity';
import { UserRole } from '../../../user/infrastructure/database/entities/user-role.entity';
import * as uuid from 'uuid/v4';

export class DefaultGenerator {

  static generateRole(tenantId: string) {
    const role = new Role();
    role.id = uuid();
    role.name = 'Admin';
    role.isStatic = true;
    role.creationTime = new Date();
    role.tenantId = tenantId;
    role.isDefault = false;
    return role;
  }

  static generateUser(tenantId: string, securityService: SecurityService) {
    const user = new User();
    user.id = uuid();
    user.userName = 'admin';
    user.tenantId = tenantId;
    user.password = securityService.convertStringToMd5(process.env.DEFAULT_PASSWORD);
    user.name = 'Admin';
    user.surname = 'Admin';
    user.isStatic = true;
    user.isActive = true;
    user.creationTime = new Date();
    user.emailAddress = 'admin@admin.com';
    return user;
  }

  static generateUserRole(userId: string, roleId: string) {
    const userRole = new UserRole();
    userRole.id = uuid();
    userRole.roleId = roleId;
    userRole.userId = userId;
    return userRole;
  }

}
