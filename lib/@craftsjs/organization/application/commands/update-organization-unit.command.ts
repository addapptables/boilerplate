import { Command } from '@addapptables/microservice';
import { UpdateOrganizationUnitDto } from '../dtos/update-organization-unit.dto';

export class UpdateOrganizationUnitCommand extends Command<UpdateOrganizationUnitDto> {
  public readonly action = 'updateOrganizationUnit';
  public readonly context = 'organizationUnit';
}
