import { TenantCacheContributor } from '../../../../../lib/@craftsjs/tenant/contributor/tenant-cache.contributor';
import { ITenantResolve } from '../../../../../lib/@craftsjs/tenant/interfaces';
import { expect } from 'chai';

describe('TenantCacheContributor', () => {

  let contributor: TenantCacheContributor;

  before(() => {
    contributor = new TenantCacheContributor();
    const next: ITenantResolve = {
      resolveTenant: () => '1'
    }
    contributor.registerNext(next);
  })

  it('should return found tenant id', () => {
    const request = {
      session: {
        tenantId: '1'
      }
    }
    const result = contributor.resolveTenant(request);
    expect(result).to.be.equal('1');
  })

  it('should execute next contributor', () => {
    const request = {}
    const result = contributor.resolveTenant(request);
    expect(result).to.be.equal('1');
  })

})