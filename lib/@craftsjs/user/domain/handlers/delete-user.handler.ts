import { CommandHandler, ICommandHandler } from '@addapptables/microservice';
import { UserDomainService } from '../services/user.service';
import { DeleteUserCommand } from '../../application/commands/delete-user.command';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {

  constructor(
    private readonly userService: UserDomainService,
  ) { }

  handle(event: DeleteUserCommand): any {
    return this.userService.remove(event.data.id);
  }

}
