import { IQueryHandler, QueryHandler } from '@addapptables/microservice';
import { FindAllPermissionQuery } from '../../application/queries/find-all-permission.query';
import { PermissionDomainService } from '../services/permission.service';

@QueryHandler(FindAllPermissionQuery)
export class FindAllPermissionHandler implements IQueryHandler<FindAllPermissionQuery> {

  constructor(private readonly permissionService: PermissionDomainService) { }

  handle(event: FindAllPermissionQuery): any {
    return this.permissionService.findAll(event.data);
  }

}
