import { Query } from '@addapptables/microservice';
import { FindOneDto } from '@craftsjs/core';

export class GetRolesOrganizationUnitQuery extends Query<FindOneDto> {
  public readonly action = 'getRolesOrganizationUnit';
  public readonly context = 'organizationUnit';
}
