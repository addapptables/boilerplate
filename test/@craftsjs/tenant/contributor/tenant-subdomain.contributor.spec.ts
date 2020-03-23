import { TenantSubdomainContributor } from '../../../../lib/@craftsjs/tenant/contributor/tenant-subdomain.contributor';
import { ITenantResolve } from '../../../../lib/@craftsjs/tenant/interfaces';
import { expect } from 'chai';

describe('TenantSubdomainContributor', () => {

  let contributor: TenantSubdomainContributor;
  const tenant = {
    id: 1235489,
    isActive: true,
    name: 'test',
    subDomain: 'test'
  }

  before(() => {
    const tenantService = {
      getTenantBySubdomain: () => Promise.resolve(tenant)
    }
    contributor = new TenantSubdomainContributor(tenantService as any);
  })

  it('should return found tenant id', async () => {
    const request = {
      protocol: 'http',
      hostname: 'tenant.example.com',
      session: {}
    }
    process.env.ROOT_ADDRESS = 'http://{TENANCY_NAME}.example.com';
    process.env.TENANCY_NAME_PLACE_HOLDER_IN_URL = '{TENANCY_NAME}'
    const result = await contributor.resolveTenant(request as any);
    expect(result).to.be.equal(tenant.id);
  })

  it('should return undefined', async () => {
    const request = {
      protocol: 'http',
      hostname: 'localhost',
      session: {}
    }
    process.env.ROOT_ADDRESS = 'http://{TENANCY_NAME}.example.com';
    process.env.TENANCY_NAME_PLACE_HOLDER_IN_URL = '{TENANCY_NAME}'
    const result = await contributor.resolveTenant(request as any);
    expect(result).to.be.undefined;
  })

  describe('registerNext', () => {
    it('should return an error', async () => {
      try {
        const next: ITenantResolve = {
          resolveTenant: () => 1
        }
        contributor.registerNext(next);
      } catch (error) {
        expect(error.message).to.be.equal('End of tenant subdomain must be the end of the chain!');
      }
    })
  })

})