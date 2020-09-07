import { IQueryHandler, QueryHandler } from '@addapptables/microservice';
import { FindByUserNameOrEmailQuery } from '../../application/queries/find-by-username-or-email.query';
import { UserDomainService } from '../services/user.service';

@QueryHandler(FindByUserNameOrEmailQuery)
export class FindByUsernameOrEmailHandler implements IQueryHandler<FindByUserNameOrEmailQuery> {

  constructor(private readonly userService: UserDomainService) { }

  handle(event: FindByUserNameOrEmailQuery): any {
    return this.userService.findByUserNameOrEmail(event.data?.userName);
  }

}
