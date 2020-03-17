import { ITenantResolve } from '../interfaces';

export class TenantCookieContributor implements ITenantResolve {

  private readonly TENANT_ID = 'tenantId';

  private next: ITenantResolve;

  resolveTenant(request: any) {
    const result = request.cookies[this.TENANT_ID];
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
