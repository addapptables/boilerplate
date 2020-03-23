import { Command } from '@addapptables/microservice';
import { CommandDto } from '@craftsjs/core';

export class DeleteTenantCommand extends Command<CommandDto> {
  public readonly action = 'deleteTenant';
  public readonly context = 'tenant';
}
