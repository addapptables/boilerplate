import { Query } from '@addapptables/microservice';
import { QueryDto } from '../../../core/dto/query.dto';

export class GetAllPermissionQuery extends Query<QueryDto> {
  public readonly action = 'getAllPermissions';
  public readonly context = 'permission';
}
