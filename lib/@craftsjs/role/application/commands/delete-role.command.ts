import { Command } from '@addapptables/microservice';
import { CommandDto } from '@craftsjs/core';

export class DeleteRoleCommand extends Command<CommandDto> {
  public readonly action = 'deleteRole';
  public readonly context = 'role';
}
