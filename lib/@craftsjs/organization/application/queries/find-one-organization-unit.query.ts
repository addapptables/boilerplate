import { Query } from '@addapptables/microservice';
import { FindOneDto } from '../../../core';

export class FindOneOrganizationUnitQuery extends Query<FindOneDto> {
  public readonly action = 'findOneOrganizationUnit';
  public readonly context = 'organizationUnit';
}
