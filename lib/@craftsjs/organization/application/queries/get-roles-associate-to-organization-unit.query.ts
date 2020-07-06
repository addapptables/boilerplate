import { Query } from '@addapptables/microservice';
import { FindOneDto } from '../../../core';

export class GetRolesAssociateToOrganizationUnitQuery extends Query<FindOneDto> {
  public readonly action = 'getRolesAssociateToOrganizationUnit';
  public readonly context = 'organizationUnit';
}
