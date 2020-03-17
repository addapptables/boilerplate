import { CommandHandler, ICommandHandler } from '@addapptables/microservice';
import { OrganizationUnitDomainService } from '../services/organization-unit.service';
import { OrganizationUnit } from '../../infrastructure/database/entities/organization-unit.entity';
import { UpdateOrganizationUnitCommand } from '../../application/commands/update-organization-unit.command';
import { mapper } from '../../../utils';

@CommandHandler(UpdateOrganizationUnitCommand)
export class UpdateOrganizationUnitHandler implements ICommandHandler<UpdateOrganizationUnitCommand> {

  constructor(
    private readonly organizationUnitService: OrganizationUnitDomainService,
  ) { }

  handle(event: UpdateOrganizationUnitCommand): any {
    const organizationUnit = mapper(OrganizationUnit, event.data);
    return this.organizationUnitService.update(organizationUnit);
  }

}
