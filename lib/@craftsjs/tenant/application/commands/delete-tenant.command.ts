import { Command } from '@addapptables/microservice';
import { CommandDto } from '../../../core';

export class DeleteTenantCommand extends Command<CommandDto> {
  public readonly action = 'deleteTenant';
  public readonly context = 'tenant';
}
