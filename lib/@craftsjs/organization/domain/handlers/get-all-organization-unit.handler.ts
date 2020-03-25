import { IQueryHandler, QueryHandler } from '@addapptables/microservice';
import { findAllOrganizationUnitQuery } from '../../application/queries/get-all-organization-unit.query';
import { OrganizationUnitDomainService } from '../services/organization-unit.service';

@QueryHandler(findAllOrganizationUnitQuery)
export class findAllOrganizationUnitHandler implements IQueryHandler<findAllOrganizationUnitQuery> {

  constructor(private readonly organizationUnitService: OrganizationUnitDomainService) { }

  handle(event: findAllOrganizationUnitQuery): any {
    return this.organizationUnitService.findAll(event.data);
  }

}
