import { ITenantResolve } from '../interfaces';
import { TENANT_ID } from '../../config/constants.config';

export class TenantHeaderContributor implements ITenantResolve {

  private next: ITenantResolve;

  resolveTenant(request: any) {
    const result = request.get(TENANT_ID);
    if (result) {
      return result;
    }
    return this.next.resolveTenant(request);
  }

  registerNext(next: ITenantResolve) {
    this.next = next;
  }
}
