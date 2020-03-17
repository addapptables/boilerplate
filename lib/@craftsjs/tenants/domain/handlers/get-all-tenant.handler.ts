import { IQueryHandler, QueryHandler } from '@addapptables/microservice';
import { GetAllTenantQuery } from '../../application/queries/get-all-tenant.query';
import { TenantDomainService } from '../services/tenant.service';

@QueryHandler(GetAllTenantQuery)
export class GetAllTenantHandler implements IQueryHandler<GetAllTenantQuery> {

  constructor(private readonly tenantService: TenantDomainService) { }

  handle(event: GetAllTenantQuery): any {
    return this.tenantService.getAll(event.data);
  }

}
