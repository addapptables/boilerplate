import { CommandHandler, ICommandHandler } from '@addapptables/microservice';
import { TenantDomainService } from '../services/tenant.service';
import { Tenant } from '../../infrastructure/database/entities/tenant.entity';
import { UpdateTenantCommand } from '../../application/commands/update-tenant.command';
import { mapper } from '../../../utils';

@CommandHandler(UpdateTenantCommand)
export class UpdateTenantHandler implements ICommandHandler<UpdateTenantCommand> {

  constructor(
    private readonly tenantService: TenantDomainService,
  ) { }

  handle(event: UpdateTenantCommand): any {
    const tenant = mapper(Tenant, event.data);
    return this.tenantService.update(tenant);
  }

}
