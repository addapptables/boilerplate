import { Command } from '@addapptables/microservice';
import { UpdateUserOrganizationUnitDto } from '../dtos/update-user-organization-unit.dto';

export class UpdateUserOrganizationUnitCommand extends Command<UpdateUserOrganizationUnitDto> {
  public readonly action = 'updateUserOrganizationUnit';
  public readonly context = 'user';
}
