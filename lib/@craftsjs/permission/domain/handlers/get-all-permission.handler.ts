import { IQueryHandler, QueryHandler } from '@addapptables/microservice';
import { GetAllPermissionQuery } from '../../application/queries/get-all-permission.query';
import { PermissionDomainService } from '../services/permission.service';

@QueryHandler(GetAllPermissionQuery)
export class GetAllPermissionHandler implements IQueryHandler<GetAllPermissionQuery> {

  constructor(private readonly permissionService: PermissionDomainService) { }

  handle(event: GetAllPermissionQuery): any {
    return this.permissionService.findAll(event.data);
  }

}
