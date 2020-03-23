import { Role } from '@craftsjs/role/infrastructure/database/entities/role.entity';
import { SecurityService } from '@craftsjs/security/services/security.service';
import { User } from '@craftsjs/user/infrastructure/database/entities/user.entity';
import { UserRole } from '@craftsjs/user/infrastructure/database/entities/user-role.entity';

export class DefaultGenerator {

  static generateRole(tenantId: number) {
    const role = new Role();
    role.name = 'Admin';
    role.isStatic = true;
    role.creationTime = new Date();
    role.tenantId = tenantId;
    role.isDefault = false;
    return role;
  }

  static generateUser(tenantId: number, securityService: SecurityService) {
    const user = new User();
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

  static generateUserRole(userId: number, roleId: number) {
    const userRole = new UserRole();
    userRole.roleId = roleId;
    userRole.userId = userId;
    return userRole;
  }

}
