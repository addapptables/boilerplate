import { Query } from '@addapptables/microservice';
import { GetOrganizationUnitDto } from '../dtos/get-organization-unit.dto';

export class FindAllOrganizationUnitQuery extends Query<GetOrganizationUnitDto> {
  public readonly action = 'findAllOrganizationUnits';
  public readonly context = 'organizationUnit';
}
