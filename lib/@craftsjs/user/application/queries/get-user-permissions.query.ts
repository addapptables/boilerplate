import { Query } from '@addapptables/microservice';
import { GetUserPermissionsDto } from '../dtos/get-user-permissions.dto';

export class GetUserPermissionsQuery extends Query<GetUserPermissionsDto> {
  public readonly action = 'getUserPermissions';
  public readonly context = 'user';
}
