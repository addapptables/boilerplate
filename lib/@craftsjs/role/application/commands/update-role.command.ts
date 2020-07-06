import { Command } from '@addapptables/microservice';
import { UpdateRoleDto } from '../dtos/update-role.dto';

export class UpdateRoleCommand extends Command<UpdateRoleDto> {
  public readonly action = 'updateRole';
  public readonly context = 'role';
}
