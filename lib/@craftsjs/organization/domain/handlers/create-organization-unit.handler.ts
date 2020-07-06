import { CommandHandler, ICommandHandler } from '@addapptables/microservice';
import { OrganizationUnitDomainService } from '../services/organization-unit.service';
import { mapper } from '../../../utils';
import { CreateOrganizationUnitCommand } from '../../application/commands/create-organization-unit.command';
import { OrganizationUnit } from '../../infrastructure/database/entities/organization-unit.entity';

@CommandHandler(CreateOrganizationUnitCommand)
export class CreateOrganizationUnitHandler implements ICommandHandler<CreateOrganizationUnitCommand> {

  constructor(
    private readonly organizationUnitService: OrganizationUnitDomainService,
  ) { }

  handle(event: CreateOrganizationUnitCommand): any {
    const organizationUnit = mapper(OrganizationUnit, event.data);
    return this.organizationUnitService.insert(organizationUnit);
  }

}
