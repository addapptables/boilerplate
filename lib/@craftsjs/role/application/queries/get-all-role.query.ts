import { Query } from '@addapptables/microservice';
import { GetRoleDto } from '../dtos/get-role.dto';

export class findAllRoleQuery extends Query<GetRoleDto> {
  public readonly action = 'findAllRoles';
  public readonly context = 'role';
}
