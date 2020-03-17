import { CommandHandler, ICommandHandler } from '@addapptables/microservice';
import { RoleDomainService } from '../services/role.service';
import { DeleteRoleCommand } from '../../application/commands/delete-role.command';

@CommandHandler(DeleteRoleCommand)
export class DeleteRoleHandler implements ICommandHandler<DeleteRoleCommand> {

  constructor(
    private readonly roleService: RoleDomainService,
  ) { }

  handle(event: DeleteRoleCommand): any {
    return this.roleService.remove(event.data.id, event.data.currentUserId);
  }

}
