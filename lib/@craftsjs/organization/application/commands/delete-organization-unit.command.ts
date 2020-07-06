import { Command } from '@addapptables/microservice';
import { CommandDto } from '../../../core';

export class DeleteOrganizationUnitCommand extends Command<CommandDto> {
  public readonly action = 'deleteOrganizationUnit';
  public readonly context = 'organizationUnit';
}
