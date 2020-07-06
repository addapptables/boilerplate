import { Command } from '@addapptables/microservice';
import { UpdateTenantDto } from '../dtos/update-tenant.dto';

export class UpdateTenantCommand extends Command<UpdateTenantDto> {
  public readonly action = 'updateTenant';
  public readonly context = 'tenant';
}
