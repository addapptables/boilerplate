import { CommandHandler, ICommandHandler } from '@addapptables/microservice';
import { UserDomainService } from '../services/user.service';
import { UpdateUserOrganizationUnitCommand } from '../../application/commands/update-user-organization-unit.command';

@CommandHandler(UpdateUserOrganizationUnitCommand)
export class UpdateUserOrganizationUnitHandler implements ICommandHandler<UpdateUserOrganizationUnitCommand> {

  constructor(
    private readonly userService: UserDomainService,
  ) { }

  handle(event: UpdateUserOrganizationUnitCommand): any {
    return this.userService.updateUserOrganizationUnit(event.data.organizationUnitId);
  }

}
