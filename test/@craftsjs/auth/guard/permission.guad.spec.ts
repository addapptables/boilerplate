import { expect } from 'chai';
import { Test } from '@nestjs/testing';
import { PermissionGuard, AuthService } from '../../../../lib/@craftsjs/auth';
import { Reflector } from '@nestjs/core';

describe('PermissionGuard', () => {

  let guard: PermissionGuard;

  before(async () => {
    const authService = {
      validatePermissions: () => true
    };
    const reflector = {
      get: () => 'Page'
    }
    const module = await Test.createTestingModule({
      providers: [
        PermissionGuard,
        Reflector,
        AuthService,
      ]
    })
      .overrideProvider(AuthService)
      .useValue(authService)
      .overrideProvider(Reflector)
      .useValue(reflector)
      .compile();
    await module.init();
    guard = module.get<PermissionGuard>(PermissionGuard);
  })

  it('should be defined', async () => {
    expect(guard).to.be.not.undefined;
  });

  it('should validate user in session', async () => {
    const context = {
      getHandler: () => undefined,
      switchToHttp: () => ({
        getRequest: () => ({ session: { user: { id: 1 } } })
      })
    }
    const result = await guard.canActivate(context as any);
    expect(result).to.be.equal(true);
  });

  it('should validate user in session', async () => {
    const context = {
      getHandler: () => undefined,
      switchToHttp: () => ({
        getRequest: () => ({ session: {} })
      })
    }
    const result = await guard.canActivate(context as any);
    expect(result).to.be.equal(false);
  });

})