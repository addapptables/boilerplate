import { Command } from '@addapptables/microservice';
import { AddRolesToOrganizationUnitDto } from '../dtos/add-roles-to-organization-unit.dto';

export class AddRolesToOrganizationUnitCommand extends Command<AddRolesToOrganizationUnitDto> {
  public readonly action = 'addRolesToOrganizationUnit';
  public readonly context = 'organizationUnit';
}
