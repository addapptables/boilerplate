import { IQueryHandler, QueryHandler } from '@addapptables/microservice';
import { UserDomainService } from '../services/user.service';
import { findAllUserQuery } from '../../application/queries/get-all-user.query';

@QueryHandler(findAllUserQuery)
export class findAllUserHandler implements IQueryHandler<findAllUserQuery> {

  constructor(private readonly userService: UserDomainService) { }

  handle(event: findAllUserQuery): any {
    return this.userService.findAll(event.data);
  }

}
