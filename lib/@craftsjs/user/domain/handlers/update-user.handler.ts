import { CommandHandler, ICommandHandler } from '@addapptables/microservice';
import { UserDomainService } from '../services/user.service';
import { User } from '../../infrastructure/database/entities/user.entity';
import { UpdateUserCommand } from '../../application/commands/update-user.command';
import { mapper } from '../../../utils';
import { UserRole } from '../../../user/infrastructure/database/entities/user-role.entity';
import { v4 as uuid } from 'uuid';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {

  constructor(
    private readonly userService: UserDomainService,
  ) { }

  handle(event: UpdateUserCommand): any {
    const user = mapper(User, event.data);
    user.roles = event.data.roles.map(role => {
      const userRole = new UserRole();
      userRole.id = uuid();
      userRole.creationTime = new Date();
      userRole.roleId = role;
      return userRole;
    });
    return this.userService.update(user);
  }

}
