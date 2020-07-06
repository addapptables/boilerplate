import { Module } from '@nestjs/common';
import { TypeOrmModule } from '../typeorm/typeorm.module';
import { SecurityModule } from '../security/security.module';
import { UserPermission } from './infrastructure/database/entities/user-permission.entity';
import { UserRole } from './infrastructure/database/entities/user-role.entity';
import { UserDomainService } from './domain/services/user.service';
import { FindOneUserHandler } from './domain/handlers/find-one-user.handler';
import { GetUserPermissionHandler } from './domain/handlers/get-user-permission.handler';
import { CreateUserHandler } from './domain/handlers/create-user.handler';
import { UserRepository } from './infrastructure/database/repositories/user.repository';
import { FindAllUserHandler } from './domain/handlers/find-all-user.handler';
import { UpdateUserHandler } from './domain/handlers/update-user.handler';
import { DeleteUserHandler } from './domain/handlers/delete-user.handler';
import { UserController } from './application/api/controllers/user.controller';
import { UserService } from './application/api/services/user.service';
import { UpdateProfileHandler } from './domain/handlers/update-profile.handler';
import { ChangePasswordHandler } from './domain/handlers/change-password.handler';
import { UpdateUserOrganizationUnitHandler } from './domain/handlers/update-user-organization-unit.handler';

@Module({
  controllers: [UserController],
  imports: [
    TypeOrmModule.forFeature([UserPermission, UserRole, UserRepository]),
    SecurityModule,
  ],
  providers: [
    UserDomainService,
    UserService,
    FindOneUserHandler,
    GetUserPermissionHandler,
    UpdateUserHandler,
    CreateUserHandler,
    FindAllUserHandler,
    DeleteUserHandler,
    UpdateProfileHandler,
    ChangePasswordHandler,
    UpdateUserOrganizationUnitHandler
  ],
  exports: [
    UserService,
    TypeOrmModule.forFeature([UserPermission, UserRole, UserRepository])
  ],
})
export class UserModule { }
