import { CommandHandler, ICommandHandler } from '@addapptables/microservice';
import { TenantDomainService } from '../services/tenant.service';
import { mapper } from '../../../utils';
import { CreateTenantCommand } from '../../application/commands/create-tenant.command';
import { Tenant } from '../../infrastructure/database/entities/tenant.entity';

@CommandHandler(CreateTenantCommand)
export class CreateTenantHandler implements ICommandHandler<CreateTenantCommand> {

  constructor(
    private readonly tenantService: TenantDomainService,
  ) { }

  handle(event: CreateTenantCommand): any {
    const tenant = mapper(Tenant, event.data);
    return this.tenantService.insert(tenant);
  }

}
