import { CommandHandler, ICommandHandler } from '@addapptables/microservice';
import { TenantDomainService } from '../services/tenant.service';
import { DeleteTenantCommand } from '../../application/commands/delete-tenant.command';

@CommandHandler(DeleteTenantCommand)
export class DeleteTenantHandler implements ICommandHandler<DeleteTenantCommand> {

  constructor(
    private readonly tenantService: TenantDomainService,
  ) { }

  handle(event: DeleteTenantCommand): any {
    return this.tenantService.remove(event.data.id, event.data.currentUserId);
  }

}
