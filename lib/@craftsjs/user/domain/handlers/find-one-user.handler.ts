import { IQueryHandler, QueryHandler } from '@addapptables/microservice';
import { FindOneUserQuery } from '../../application/queries/find-one-user.query';
import { UserDomainService } from '../services/user.service';

@QueryHandler(FindOneUserQuery)
export class FindOneUserHandler implements IQueryHandler<FindOneUserQuery> {

  constructor(private readonly userService: UserDomainService) { }

  handle(event: FindOneUserQuery): any {
    return this.userService.findOneByQuery(event.data);
  }

}
