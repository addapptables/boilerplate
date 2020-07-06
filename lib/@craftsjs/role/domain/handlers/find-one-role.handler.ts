import { IQueryHandler, QueryHandler } from '@addapptables/microservice';
import { RoleDomainService } from '../services/role.service';
import { FindOneRoleQuery } from '../../../role/application/queries/find-one-role.query';

@QueryHandler(FindOneRoleQuery)
export class FindOneRoleHandler implements IQueryHandler<FindOneRoleQuery> {

  constructor(private readonly roleService: RoleDomainService) { }

  handle(event: FindOneRoleQuery): any {
    return this.roleService.findOneByQuery(event.data);
  }

}
