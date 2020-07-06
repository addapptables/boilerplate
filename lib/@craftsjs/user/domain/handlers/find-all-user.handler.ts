import { IQueryHandler, QueryHandler } from '@addapptables/microservice';
import { UserDomainService } from '../services/user.service';
import { FindAllUserQuery } from '../../application/queries/find-all-user.query';

@QueryHandler(FindAllUserQuery)
export class FindAllUserHandler implements IQueryHandler<FindAllUserQuery> {

  constructor(private readonly userService: UserDomainService) { }

  handle(event: FindAllUserQuery): any {
    return this.userService.findAll(event.data);
  }

}
