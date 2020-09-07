import { TenantCookieContributor } from '../../../../../lib/@craftsjs/tenant/contributor/tenant-cookie.contributor';
import { ITenantResolve } from '../../../../../lib/@craftsjs/tenant/interfaces';
import { TENANT_ID } from '../../../../../lib/@craftsjs/config/constants.config';
import { expect } from 'chai';

describe('TenantCookieContributor', () => {

  let contributor: TenantCookieContributor;

  before(() => {
    contributor = new TenantCookieContributor();
    const next: ITenantResolve = {
      resolveTenant: () => '1'
    }
    contributor.registerNext(next);
  })

  it('should return found tenant id', () => {
    const request = {
      session: {},
      cookies: {
        [TENANT_ID]: '1'
      }
    }
    const result = contributor.resolveTenant(request);
    expect(result).to.be.equal('1');
  })

  it('should execute next contributor', () => {
    const request = { cookies: {} }
    const result = contributor.resolveTenant(request);
    expect(result).to.be.equal('1');
  })

})