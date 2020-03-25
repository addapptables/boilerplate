import { IQueryHandler, QueryHandler } from '@addapptables/microservice';
import { findAllPermissionQuery } from '../../application/queries/get-all-permission.query';
import { PermissionDomainService } from '../services/permission.service';

@QueryHandler(findAllPermissionQuery)
export class findAllPermissionHandler implements IQueryHandler<findAllPermissionQuery> {

  constructor(private readonly permissionService: PermissionDomainService) { }

  handle(event: findAllPermissionQuery): any {
    return this.permissionService.findAll(event.data);
  }

}
