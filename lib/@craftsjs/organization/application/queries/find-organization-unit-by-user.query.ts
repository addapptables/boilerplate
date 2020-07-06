import { Query } from '@addapptables/microservice';

export class FindOrganizationUnitUserQuery extends Query<any> {
  public readonly action = 'findOrganizationUnitByUser';
  public readonly context = 'organizationUnit';
}
