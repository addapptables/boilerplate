import { CommandHandler, ICommandHandler } from '@addapptables/microservice';
import { OrganizationUnitDomainService } from '../services/organization-unit.service';
import { DeleteOrganizationUnitCommand } from '../../application/commands/delete-organization-unit.command';

@CommandHandler(DeleteOrganizationUnitCommand)
export class DeleteOrganizationUnitHandler implements ICommandHandler<DeleteOrganizationUnitCommand> {

  constructor(
    private readonly organizationUnitService: OrganizationUnitDomainService,
  ) { }

  handle(event: DeleteOrganizationUnitCommand): any {
    return this.organizationUnitService.remove(event.data.id, event.data.currentUserId);
  }

}
