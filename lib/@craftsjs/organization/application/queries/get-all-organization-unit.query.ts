import { Query } from '@addapptables/microservice';
import { GetOrganizationUnitDto } from '../dtos/get-organization-unit.dto';

export class GetAllOrganizationUnitQuery extends Query<GetOrganizationUnitDto> {
  public readonly action = 'getAllOrganizationUnits';
  public readonly context = 'organizationUnit';
}
