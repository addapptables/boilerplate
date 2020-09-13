import { ITenantResolve } from '../interfaces';
import { SessionService } from '@craftsjs/auth/services/session.service';

export class TenantUserContributor implements ITenantResolve {

  private next: ITenantResolve;

  constructor(private readonly sessionService: SessionService) {}

  resolveTenant(request: any) {
    if(this.sessionService.user?.tenantId) {
        return this.sessionService.user?.tenantId;
    }
    return this.next.resolveTenant(request);
  }

  registerNext(next: ITenantResolve) {
    this.next = next;
  }
}
