import { Query } from '@addapptables/microservice';
import { GetRoleDto } from '../dtos/get-role.dto';

export class GetAllRoleQuery extends Query<GetRoleDto> {
  public readonly action = 'getAllRoles';
  public readonly context = 'role';
}
