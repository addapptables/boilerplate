import { CommandHandler, ICommandHandler } from '@addapptables/microservice';
import { OrganizationUnitDomainService } from '../services/organization-unit.service';
import { DeleteOrganizationUnitRoleCommand } from '../../application/commands/delete-organization-unit-role.command';

@CommandHandler(DeleteOrganizationUnitRoleCommand)
export class DeleteOrganizationUnitRoleHandler implements ICommandHandler<DeleteOrganizationUnitRoleCommand> {

  constructor(
    private readonly organizationUnitService: OrganizationUnitDomainService,
  ) { }

  handle(event: DeleteOrganizationUnitRoleCommand): any {
    return this.organizationUnitService.deleteOrganizationUnitRole(event.data.id);
  }

}
