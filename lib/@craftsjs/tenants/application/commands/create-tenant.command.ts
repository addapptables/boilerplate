import { Command } from '@addapptables/microservice';
import { CreateTenantDto } from '../dtos/create-tenant.dto';

export class CreateTenantCommand extends Command<CreateTenantDto> {
  public readonly action = 'createTenant';
  public readonly context = 'tenant';
}
