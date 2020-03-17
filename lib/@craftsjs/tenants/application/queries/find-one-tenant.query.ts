import { Query } from '@addapptables/microservice';
import { FindOneDto } from '@craftsjs/core';

export class FindOneTenantQuery extends Query<FindOneDto> {
  public readonly action = 'findOneTenant';
  public readonly context = 'tenant';
}
