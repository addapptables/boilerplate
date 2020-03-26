import { Query } from '@addapptables/microservice';
import { FindOneDto } from '../../../core';

export class FindOneRoleQuery extends Query<FindOneDto> {
  public readonly action = 'findOneRole';
  public readonly context = 'role';
}
