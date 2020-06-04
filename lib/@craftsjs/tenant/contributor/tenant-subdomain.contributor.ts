import { ITenantResolve } from '../interfaces';
import { NotImplementedException } from '@nestjs/common';
import { SubdomainTenancyNameFinder } from './helpers/subdomain-tenancy-name-finder.helper';
import { Request } from 'express';
import { TenantDomainService } from '../domain/services/tenant.service';

export class TenantSubdomainContributor implements ITenantResolve {

  constructor(
    private readonly tenantService: TenantDomainService,
  ) { }

  async resolveTenant(request: Request): Promise<string> {
    const fullUrl = request.protocol + '://' + request.hostname;
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
