import { Command } from '@addapptables/microservice';
import { CommandDto } from '@craftsjs/core';

export class DeleteOrganizationUnitCommand extends Command<CommandDto> {
  public readonly action = 'deleteOrganizationUnit';
  public readonly context = 'organizationUnit';
}
