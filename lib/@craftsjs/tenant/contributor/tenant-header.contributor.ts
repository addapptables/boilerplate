import { ITenantResolve } from '../interfaces';
import { TENANT_ID } from '@craftsjs/config/constants.config';

export class TenantHeaderContributor implements ITenantResolve {

  private next: ITenantResolve;

  resolveTenant(request: any) {
    const result = request.get(TENANT_ID);
    if (result) {
      request.session.tenantId = +result;
      return +result;
    }
    return this.next.resolveTenant(request);
  }

  registerNext(next: ITenantResolve) {
    this.next = next;
  }
}
