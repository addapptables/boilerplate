import { ITenantResolve } from '../interfaces';
import { NotImplementedException } from '@nestjs/common';
import { TenantService } from '../services/tenant.service';
import { SubdomainTenancyNameFinder } from '../helpers/subdomain-tenancy-name-finder.helper';

export class TenantSubdomainContributor implements ITenantResolve {

  constructor(
    private readonly tenantService: TenantService,
  ) { }

  async resolveTenant(request: any): Promise<number> {
    const fullUrl = request.protocol + '://' + request.get('host');
    const subdomain = SubdomainTenancyNameFinder
      .getCurrentTenancyNameOrNull(process.env.ROOT_ADDRESS, process.env.TENANCY_NAME_PLACE_HOLDER_IN_URL, fullUrl);
    if (subdomain) {
      const tenant = await this.tenantService.getTenantBySubdomain(subdomain);
      return tenant?.id;
    }
    return undefined;
  }

  registerNext(_: ITenantResolve) {
    throw new NotImplementedException('End of tenant subdomain must be the end of the chain!');
  }
}
