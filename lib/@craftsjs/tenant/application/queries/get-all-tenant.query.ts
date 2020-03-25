import { Query } from '@addapptables/microservice';
import { GetTenantDto } from '../dtos/get-tenant.dto';

export class findAllTenantQuery extends Query<GetTenantDto> {
  public readonly action = 'findAllTenants';
  public readonly context = 'tenant';
}
