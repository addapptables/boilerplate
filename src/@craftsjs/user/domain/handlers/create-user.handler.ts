import { CommandHandler, ICommandHandler } from '@addapptables/microservice';
import { UserService } from '../services/user.service';
import { mapper } from '../../../utils';
import { CreateUserCommand } from '../../application/commands/create-user.command';
import { User } from '../../infrastructure/database/entities/user.entity';
import { SecurityService } from '../../../security';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {

  constructor(
    private readonly userService: UserService,
    private readonly securityService: SecurityService,
  ) { }

  handle(event: CreateUserCommand): any {
    const user = mapper(User, event.data);
    user.password = this.securityService.convertStringToMd5(process.env.DEFAULT_PASSWORD);
    return this.userService.insert(user);
  }

}
