import { expect } from 'chai';
import { Test } from '@nestjs/testing';
import { SessionMiddleware } from '../../../../lib/@craftsjs/auth/middleware/session.middleware';
import { SessionService } from '../../../../lib/@craftsjs/auth/services/session.service';
import { TenantDomainService } from '../../../../lib/@craftsjs/tenant/domain/services/tenant.service';
import { JwtModule } from '@nestjs/jwt';

describe('SessionMiddleware', () => {

  let middleware: SessionMiddleware;
  const tenant = {
    id: 1235489,
    isActive: true,
    name: 'test',
    subDomain: 'test'
  }

  before(async () => {
    const tenantService = {
      getTenantBySubdomain: () => Promise.resolve(tenant)
    }
    const module = await Test.createTestingModule({
      imports: [
        JwtModule.register({ secret: 'test' }),
      ],
      providers: [
        SessionMiddleware,
        SessionService,
        TenantDomainService
      ]
    })
      .overrideProvider(TenantDomainService)
      .useValue(tenantService)
      .compile();
    await module.init();
    middleware = module.get<SessionMiddleware>(SessionMiddleware);
  })

  it('should be defined', async () => {
    expect(middleware).to.be.not.undefined;
  });

  it('should validate user in session', async () => {
    const request = {
      body: {},
      query: {},
      get: () => undefined,
      session: {
        user: { id: 1, tenantId: 1 }
      }
    } as any;
    middleware.use(request as any, undefined, () => { });
  });

  // it('should validate user in session', async () => {
  //   const context = {
  //     getHandler: () => undefined,
  //     switchToHttp: () => ({
  //       getRequest: () => ({ session: {} })
  //     })
  //   }
  //   const result = await guard.canActivate(context as any);
  //   expect(result).to.be.equal(false);
  // });

})