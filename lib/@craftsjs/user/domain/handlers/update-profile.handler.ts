import { CommandHandler, ICommandHandler } from '@addapptables/microservice';
import { UserDomainService } from '../services/user.service';
import { User } from '../../infrastructure/database/entities/user.entity';
import { mapper } from '../../../utils';
import { UpdateProfileCommand } from '../../application/commands/update-profile.command';

@CommandHandler(UpdateProfileCommand)
export class UpdateProfileHandler implements ICommandHandler<UpdateProfileCommand> {

  constructor(
    private readonly userService: UserDomainService,
  ) { }

  handle(event: UpdateProfileCommand): any {
    const user = mapper(User, event.data);
    return this.userService.updateProfile(user);
  }

}
