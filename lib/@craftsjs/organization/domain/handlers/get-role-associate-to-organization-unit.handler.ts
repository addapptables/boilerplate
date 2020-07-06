import { ICommandHandler, QueryHandler } from '@addapptables/microservice';
import { OrganizationUnitDomainService } from '../services/organization-unit.service';
import { GetRolesAssociateToOrganizationUnitQuery } from '../../application/queries/get-roles-associate-to-organization-unit.query';

@QueryHandler(GetRolesAssociateToOrganizationUnitQuery)
export class GetRolesAssociateToOrganizationUnitHandler implements ICommandHandler<GetRolesAssociateToOrganizationUnitQuery> {

  constructor(
    private readonly organizationUnitService: OrganizationUnitDomainService,
  ) { }

  handle(event: GetRolesAssociateToOrganizationUnitQuery): any {
    return this.organizationUnitService.getRolesAssociate(event.data.id);
  }

}
