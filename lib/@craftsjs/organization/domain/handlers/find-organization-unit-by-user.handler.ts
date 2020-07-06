import { IQueryHandler, QueryHandler } from '@addapptables/microservice';
import { OrganizationUnitUserService } from '../services/organization-unit-code-user.service';
import { FindOrganizationUnitUserQuery } from '../../application/queries/find-organization-unit-by-user.query';

@QueryHandler(FindOrganizationUnitUserQuery)
export class FindOrganizationUnitUserHandler implements IQueryHandler<FindOrganizationUnitUserQuery> {

  constructor(private readonly organizationUnitUserService: OrganizationUnitUserService) { }

  handle(): any {
    return this.organizationUnitUserService.getOrganizationUnitUser();
  }

}
