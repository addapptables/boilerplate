import { ICommandHandler, QueryHandler } from '@addapptables/microservice';
import { OrganizationUnitDomainService } from '../services/organization-unit.service';
import { GetRolesOrganizationUnitQuery } from '../../application/queries/get-roles-organization-unit.query';

@QueryHandler(GetRolesOrganizationUnitQuery)
export class GetRolesOrganizationUnitHandler implements ICommandHandler<GetRolesOrganizationUnitQuery> {

  constructor(
    private readonly organizationUnitService: OrganizationUnitDomainService,
  ) { }

  handle(event: GetRolesOrganizationUnitQuery): any {
    return this.organizationUnitService.getRoles(event.data.id);
  }

}
