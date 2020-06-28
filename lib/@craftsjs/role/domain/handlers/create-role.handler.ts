import { CommandHandler, ICommandHandler } from '@addapptables/microservice';
import { RoleDomainService } from '../services/Role.service';
import { mapper } from '../../../utils';
import { CreateRoleCommand } from '../../application/commands/create-Role.command';
import { Role } from '../../../role/infrastructure/database/entities/role.entity';
import { RolePermission } from '../../../role/infrastructure/database/entities';
import { v4 as uuid } from 'uuid';

@CommandHandler(CreateRoleCommand)
export class CreateRoleHandler implements ICommandHandler<CreateRoleCommand> {

  constructor(
    private readonly roleService: RoleDomainService,
  ) { }

  handle(event: CreateRoleCommand): any {
    const role = mapper(Role, event.data);
    role.isStatic = false;
    role.isDefault = false;
    role.permissions = event.data.permissions.map(permission => {
      const rolePermission = new RolePermission();
      rolePermission.id = uuid();
      rolePermission.isGranted = true;
      rolePermission.permissionId = permission;
      rolePermission.creationTime = new Date();
      return rolePermission;
    });
    return this.roleService.insert(role);
  }

}
