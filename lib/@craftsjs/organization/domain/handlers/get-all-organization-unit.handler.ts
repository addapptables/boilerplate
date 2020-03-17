import { IQueryHandler, QueryHandler } from '@addapptables/microservice';
import { GetAllOrganizationUnitQuery } from '../../application/queries/get-all-organization-unit.query';
import { OrganizationUnitDomainService } from '../services/organization-unit.service';

@QueryHandler(GetAllOrganizationUnitQuery)
export class GetAllOrganizationUnitHandler implements IQueryHandler<GetAllOrganizationUnitQuery> {

  constructor(private readonly organizationUnitService: OrganizationUnitDomainService) { }

  handle(event: GetAllOrganizationUnitQuery): any {
    return this.organizationUnitService.getAll(event.data);
  }

}
