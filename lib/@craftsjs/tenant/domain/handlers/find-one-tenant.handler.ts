import { IQueryHandler, QueryHandler } from '@addapptables/microservice';
import { TenantDomainService } from '../services/tenant.service';
import { FindOneTenantQuery } from '../../application/queries/find-one-tenant.query';

@QueryHandler(FindOneTenantQuery)
export class FindOneTenantHandler implements IQueryHandler<FindOneTenantQuery> {

  constructor(private readonly tenantService: TenantDomainService) { }

  handle(event: FindOneTenantQuery): any {
    return this.tenantService.findOneByQuery(event.data);
  }

}
