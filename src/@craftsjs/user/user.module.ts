import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPermission } from './infrastructure/database/entities/user-permission.entity';
import { UserRole } from './infrastructure/database/entities/user-role.entity';
import { UserService } from './domain/services/user.service';
import { GetUserHandler } from './domain';
import { GetUserPermissionHandler } from './domain/handlers/get-user-permission.handler';
import { CreateUserHandler } from './domain/handlers/create-user.handler';
import { UserRepository } from './infrastructure/database/repositories/user.repository';
import { GetUsersHandler } from './domain/handlers/get-users.handler';
import { UpdateUserHandler } from './domain/handlers/update-user.handler';
import { DeleteUserHandler } from './domain/handlers/delete-user.handler';
import { SecurityModule } from '@craftsjs/security/security.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserPermission, UserRole, UserRepository]),
    SecurityModule,
  ],
  providers: [
    UserService,
    GetUserHandler,
    GetUserPermissionHandler,
    UpdateUserHandler,
    CreateUserHandler,
    GetUsersHandler,
    DeleteUserHandler,
  ],
  exports: [
    UserService,
  ],
})
export class UserModule { }
