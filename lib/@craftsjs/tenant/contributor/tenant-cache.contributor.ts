import { ITenantResolve } from '../interfaces';

export class TenantCacheContributor implements ITenantResolve {

  private next: ITenantResolve;

  resolveTenant(request: any) {
    const result = request.session?.tenantId;
    if (result) {
      return result;
    }
    return this.next.resolveTenant(request);
  }

  registerNext(next: ITenantResolve) {
    this.next = next;
  }
}
