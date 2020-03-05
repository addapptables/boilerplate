import { CommandHandler, ICommandHandler } from '@addapptables/microservice';
import { UserService } from '../services/user.service';
import { User } from '../../infrastructure/database/entities/user.entity';
import { UpdateUserCommand } from '../../application/commands/update-user.command';
import { mapper } from '../../../utils';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {

  constructor(
    private readonly userService: UserService,
  ) { }

  handle(event: UpdateUserCommand): any {
    const user = mapper(User, event.data);
    return this.userService.update(user);
  }

}
