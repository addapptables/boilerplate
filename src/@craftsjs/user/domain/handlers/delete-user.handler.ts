import { CommandHandler, ICommandHandler } from '@addapptables/microservice';
import { UserService } from '../services/user.service';
import { DeleteUserCommand } from '../../application/commands/delete-user.command';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {

  constructor(
    private readonly userService: UserService,
  ) { }

  handle(event: DeleteUserCommand): any {
    return this.userService.remove(event.data.id, event.data.currentUserId);
  }

}
