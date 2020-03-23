import { CommandHandler, ICommandHandler } from '@addapptables/microservice';
import { OrganizationUnitDomainService } from '../services/organization-unit.service';
import { AddRolesToOrganizationUnitCommand } from '../../application/commands/add-roles-to-organization-unit.command';
import { OrganizationUnitRole } from '../../infrastructure/database/entities/organization-unit-role.entity';

@CommandHandler(AddRolesToOrganizationUnitCommand)
export class AddRolesToOrganizationUnitHandler implements ICommandHandler<AddRolesToOrganizationUnitCommand> {

  constructor(
    private readonly organizationUnitService: OrganizationUnitDomainService,
  ) { }

  handle(event: AddRolesToOrganizationUnitCommand): any {
    const organizationUnitRoles = event.data.roles.map(role => {
      const organizationUnitRole = new OrganizationUnitRole();
      organizationUnitRole.organizationUnitId = event.data.organizationUnitId;
      organizationUnitRole.roleId = role;
      return organizationUnitRole;
    });
    return this.organizationUnitService.addRolesToOrganizationUnit(organizationUnitRoles);
  }

}
