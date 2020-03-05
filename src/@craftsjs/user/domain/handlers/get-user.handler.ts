import { IQueryHandler, QueryHandler } from '@addapptables/microservice';
import { GetUserQuery } from '../../application/queries/get-user.query';
import { UserService } from '../services/user.service';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {

  constructor(private readonly userService: UserService) { }

  handle(event: GetUserQuery): any {
    return this.userService.findOneByQuery(event.data);
  }

}
