import { CommandHandler, ICommandHandler } from '@addapptables/microservice';
import { UserDomainService } from '../services/user.service';
import { mapper } from '../../../utils';
import { CreateUserCommand } from '../../application/commands/create-user.command';
import { User } from '../../infrastructure/database/entities/user.entity';
import { SecurityService } from '../../../security';
import { UserRole } from '../../../user/infrastructure/database/entities';
import * as uuid from 'uuid/v4';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {

  constructor(
    private readonly userService: UserDomainService,
    private readonly securityService: SecurityService,
  ) { }

  handle(event: CreateUserCommand): any {
    const user = mapper(User, event.data);
    user.password = this.securityService.convertStringToMd5(process.env.DEFAULT_PASSWORD);
    user.isStatic = false;
    user.roles = event.data.roles.map(role => {
      const userRole = new UserRole();
      userRole.id = uuid();
      userRole.creationTime = new Date();
      userRole.roleId = role;
      return userRole;
    });
    return this.userService.insert(user);
  }

}
