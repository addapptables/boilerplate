import { TenantHeaderContributor } from '../../../../lib/@craftsjs/tenant/contributor/tenant-header.contributor';
import { ITenantResolve } from '../../../../lib/@craftsjs/tenant/interfaces';
import { expect } from 'chai';

describe('TenantHeaderContributor', () => {

  let contributor: TenantHeaderContributor;

  before(() => {
    contributor = new TenantHeaderContributor();
    const next: ITenantResolve = {
      resolveTenant: () => 1
    }
    contributor.registerNext(next);
  })

  it('should return found tenant id', () => {
    const request = {
      get: () => 1,
      session: {}
    }
    const result = contributor.resolveTenant(request);
    expect(result).to.be.equal(1);
  })

  it('should execute next contributor', () => {
    const request = { cookies: {}, get: () => undefined }
    const result = contributor.resolveTenant(request);
    expect(result).to.be.equal(1);
  })

})