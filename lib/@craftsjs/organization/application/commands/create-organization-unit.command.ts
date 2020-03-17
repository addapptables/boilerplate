import { Command } from '@addapptables/microservice';
import { CreateOrganizationUnitDto } from '../dtos/create-organization-unit.dto';

export class CreateOrganizationUnitCommand extends Command<CreateOrganizationUnitDto> {
  public readonly action = 'createOrganizationUnit';
  public readonly context = 'organizationUnit';
}
