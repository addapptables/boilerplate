import { IQueryHandler, QueryHandler } from '@addapptables/microservice';
import { OrganizationUnitDomainService } from '../services/organization-unit.service';
import { FindOneOrganizationUnitQuery } from '../../application/queries/find-one-organization-unit.query';

@QueryHandler(FindOneOrganizationUnitQuery)
export class FindOneOrganizationUnitHandler implements IQueryHandler<FindOneOrganizationUnitQuery> {

  constructor(private readonly organizationUnitService: OrganizationUnitDomainService) { }

  handle(event: FindOneOrganizationUnitQuery): any {
    return this.organizationUnitService.findOneByQuery(event.data);
  }

}
