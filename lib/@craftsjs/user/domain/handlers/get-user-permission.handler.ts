import { QueryHandler, IQueryHandler } from '@addapptables/microservice';
import { GetUserPermissionsQuery } from '../../application/queries/get-user-permissions.query';
import { UserDomainService } from '../services/user.service';

@QueryHandler(GetUserPermissionsQuery)
export class GetUserPermissionHandler implements IQueryHandler<GetUserPermissionsQuery> {

  constructor(private readonly userService: UserDomainService) { }

  handle(event: GetUserPermissionsQuery): any {
    return this.userService.getUserPermissions(event.data.id);
  }

}
