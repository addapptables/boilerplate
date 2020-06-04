import { CommandHandler, ICommandHandler } from '@addapptables/microservice';
import { UserDomainService } from '../services/user.service';
import { ChangePasswordCommand } from '../../application/commands/change-password.command';

@CommandHandler(ChangePasswordCommand)
export class ChangePasswordHandler implements ICommandHandler<ChangePasswordCommand> {

  constructor(
    private readonly userService: UserDomainService,
  ) { }

  handle(event: ChangePasswordCommand): any {
    return this.userService.changePassword(event.data);
  }

}
