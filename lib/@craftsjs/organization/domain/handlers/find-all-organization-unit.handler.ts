import { IQueryHandler, QueryHandler } from '@addapptables/microservice';
import { FindAllOrganizationUnitQuery } from '../../application/queries/find-all-organization-unit.query';
import { OrganizationUnitDomainService } from '../services/organization-unit.service';

@QueryHandler(FindAllOrganizationUnitQuery)
export class FindAllOrganizationUnitHandler implements IQueryHandler<FindAllOrganizationUnitQuery> {

  constructor(private readonly organizationUnitService: OrganizationUnitDomainService) { }

  handle(event: FindAllOrganizationUnitQuery): any {
    return this.organizationUnitService.findAll(event.data);
  }

}
