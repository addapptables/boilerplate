import { ITenantResolve } from '../interfaces';
import { TENANT_ID } from '../../config';

export class TenantCookieContributor implements ITenantResolve {

  private next: ITenantResolve;

  resolveTenant(request: any) {
    const result = request.cookies ? request.cookies[TENANT_ID] : undefined;
    if (result) {
      return result;
    }
    return this.next.resolveTenant(request);
  }

  registerNext(next: ITenantResolve) {
    this.next = next;
  }
}
