import { IQueryHandler, QueryHandler } from '@addapptables/microservice';
import { GetUserQuery } from '../../application/queries/get-user.query';
import { UserService } from '../services/user.service';
import { GetUsersQuery } from '../../application/queries/get-users.query';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUserQuery> {

  constructor(private readonly userService: UserService) { }

  handle(event: GetUserQuery): any {
    return this.userService.getAll(event.data);
  }

}
