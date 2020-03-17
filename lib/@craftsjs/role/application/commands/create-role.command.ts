import { Command } from '@addapptables/microservice';
import { CreateRoleDto } from '../dtos/create-role.dto';

export class CreateRoleCommand extends Command<CreateRoleDto> {
  public readonly action = 'createRole';
  public readonly context = 'role';
}
