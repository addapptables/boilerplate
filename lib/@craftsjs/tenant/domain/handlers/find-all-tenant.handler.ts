import { IQueryHandler, QueryHandler } from '@addapptables/microservice';
import { FindAllTenantQuery } from '../../application/queries/find-all-tenant.query';
import { TenantDomainService } from '../services/tenant.service';

@QueryHandler(FindAllTenantQuery)
export class FindAllTenantHandler implements IQueryHandler<FindAllTenantQuery> {

  constructor(private readonly tenantService: TenantDomainService) { }

  handle(event: FindAllTenantQuery): any {
    return this.tenantService.findAll(event.data);
  }

}
