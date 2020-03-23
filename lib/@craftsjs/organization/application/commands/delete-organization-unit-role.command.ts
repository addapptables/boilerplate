import { Command } from '@addapptables/microservice';
import { CommandDto } from '@craftsjs/core';

export class DeleteOrganizationUnitRoleCommand extends Command<CommandDto> {
  public readonly action = 'deleteOrganizationUnitRole';
  public readonly context = 'organizationUnit';
}
