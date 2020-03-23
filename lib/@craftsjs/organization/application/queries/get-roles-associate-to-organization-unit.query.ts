import { Query } from '@addapptables/microservice';
import { FindOneDto } from '@craftsjs/core';

export class GetRolesAssociateToOrganizationUnitQuery extends Query<FindOneDto> {
  public readonly action = 'getRolesAssociateToOrganizationUnit';
  public readonly context = 'organizationUnit';
}
