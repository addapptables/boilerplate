import { IQueryHandler, QueryHandler } from '@addapptables/microservice';
import { GetAllRoleQuery } from '../../application/queries/get-all-role.query';
import { RoleDomainService } from '../services/role.service';

@QueryHandler(GetAllRoleQuery)
export class GetAllRoleHandler implements IQueryHandler<GetAllRoleQuery> {

  constructor(private readonly roleService: RoleDomainService) { }

  handle(event: GetAllRoleQuery): any {
    return this.roleService.getAll(event.data);
  }

}
