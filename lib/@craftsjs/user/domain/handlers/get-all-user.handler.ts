import { IQueryHandler, QueryHandler } from '@addapptables/microservice';
import { UserDomainService } from '../services/user.service';
import { GetAllUserQuery } from '../../application/queries/get-all-user.query';

@QueryHandler(GetAllUserQuery)
export class GetAllUserHandler implements IQueryHandler<GetAllUserQuery> {

  constructor(private readonly userService: UserDomainService) { }

  handle(event: GetAllUserQuery): any {
    return this.userService.getAll(event.data);
  }

}
