import { Query } from '@addapptables/microservice';
import { FindOneTenantDto } from '../dtos/find-one-tenant.dto';

export class FindOneTenantQuery extends Query<FindOneTenantDto> {
  public readonly action = 'findOneTenant';
  public readonly context = 'tenant';
}
