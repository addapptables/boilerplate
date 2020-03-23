import { Query } from '@addapptables/microservice';
import { GetTenantDto } from '../dtos/get-tenant.dto';

export class GetAllTenantQuery extends Query<GetTenantDto> {
  public readonly action = 'getAllTenants';
  public readonly context = 'tenant';
}
