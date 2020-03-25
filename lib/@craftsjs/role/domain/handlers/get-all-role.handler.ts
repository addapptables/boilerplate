import { IQueryHandler, QueryHandler } from '@addapptables/microservice';
import { findAllRoleQuery } from '../../application/queries/get-all-role.query';
import { RoleDomainService } from '../services/role.service';

@QueryHandler(findAllRoleQuery)
export class findAllRoleHandler implements IQueryHandler<findAllRoleQuery> {

  constructor(private readonly roleService: RoleDomainService) { }

  handle(event: findAllRoleQuery): any {
    return this.roleService.findAll(event.data);
  }

}
