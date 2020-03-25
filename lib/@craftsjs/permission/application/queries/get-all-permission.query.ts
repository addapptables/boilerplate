import { Query } from '@addapptables/microservice';
import { QueryDto } from '../../../core/dto/query.dto';

export class findAllPermissionQuery extends Query<QueryDto> {
  public readonly action = 'findAllPermissions';
  public readonly context = 'permission';
}
