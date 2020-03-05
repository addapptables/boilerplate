import { ITenantResolve } from '../interfaces';

export class TenantHeaderContributor implements ITenantResolve {

  private readonly TENANT_ID = 'craftsjs-tenantId';

  private next: ITenantResolve;

  resolveTenant(request: any) {
    const result = request.get(this.TENANT_ID);
    if (result) {
      return +result;
    }
    return this.next.resolveTenant(request);
  }

  registerNext(next: ITenantResolve) {
    this.next = next;
  }
}
