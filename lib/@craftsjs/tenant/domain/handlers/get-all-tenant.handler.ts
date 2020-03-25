import { IQueryHandler, QueryHandler } from '@addapptables/microservice';
import { findAllTenantQuery } from '../../application/queries/get-all-tenant.query';
import { TenantDomainService } from '../services/tenant.service';

@QueryHandler(findAllTenantQuery)
export class findAllTenantHandler implements IQueryHandler<findAllTenantQuery> {

  constructor(private readonly tenantService: TenantDomainService) { }

  handle(event: findAllTenantQuery): any {
    return this.tenantService.findAll(event.data);
  }

}
