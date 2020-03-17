import { Query } from '@addapptables/microservice';
import { FindOneDto } from '@craftsjs/core';

export class FindOneOrganizationUnitQuery extends Query<FindOneDto> {
  public readonly action = 'findOneOrganizationUnit';
  public readonly context = 'organizationUnit';
}
