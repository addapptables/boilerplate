import { Query } from '@addapptables/microservice';
import { FindOneDto } from '../../../core';

export class FindOneTenantQuery extends Query<FindOneDto> {
  public readonly action = 'findOneTenant';
  public readonly context = 'tenant';
}
