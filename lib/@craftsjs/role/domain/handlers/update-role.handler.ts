import { CommandHandler, ICommandHandler } from '@addapptables/microservice';
import { RoleDomainService } from '../services/role.service';
import { Role } from '../../infrastructure/database/entities/role.entity';
import { UpdateRoleCommand } from '../../application/commands/update-role.command';
import { mapper } from '../../../utils';
import { RolePermission } from '../../../role/infrastructure/database/entities/role-permission.entity';
import { v4 as uuid } from 'uuid';

@CommandHandler(UpdateRoleCommand)
export class UpdateRoleHandler implements ICommandHandler<UpdateRoleCommand> {

  constructor(
    private readonly roleService: RoleDomainService,
  ) { }

  handle(event: UpdateRoleCommand): any {
    const role = mapper(Role, event.data);
    role.permissions = event.data.permissions.map(permission => {
      const rolePermission = new RolePermission();
      rolePermission.id = uuid();
      rolePermission.isGranted = true;
      rolePermission.permissionId = permission;
      rolePermission.creationTime = new Date();
      return rolePermission;
    });
    return this.roleService.update(role);
  }

}
