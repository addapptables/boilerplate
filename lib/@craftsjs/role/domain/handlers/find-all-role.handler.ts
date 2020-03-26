import { IQueryHandler, QueryHandler } from '@addapptables/microservice';
import { FindAllRoleQuery } from '../../application/queries/find-all-role.query';
import { RoleDomainService } from '../services/role.service';

@QueryHandler(FindAllRoleQuery)
export class FindAllRoleHandler implements IQueryHandler<FindAllRoleQuery> {

  constructor(private readonly roleService: RoleDomainService) { }

  handle(event: FindAllRoleQuery): any {
    return this.roleService.findAll(event.data);
  }

}
