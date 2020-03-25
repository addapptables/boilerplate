import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { findAllTenantHandler } from '../../../../../lib/@craftsjs/tenant/domain/handlers/get-all-tenant.handler';
import { TenantDomainService } from '../../../../../lib/@craftsjs/tenant/domain/services/tenant.service';
import { findAllTenantQuery } from '../../../../../lib/@craftsjs/tenant/application/queries/get-all-tenant.query';

describe('findAllTenantHandler', () => {
  let handler: findAllTenantHandler;
  let testingModule: TestingModule;
  const tenant = {
    id: 1235489,
    isActive: true,
    name: 'test',
    subDomain: 'test'
  }

  before(async () => {
    const repository = {
      findAll: () => {
        return Promise.resolve(tenant);
      }
    };
    testingModule = await Test.createTestingModule({
      providers: [
        TenantDomainService,
        findAllTenantHandler,
      ],
    })
      .overrideProvider(TenantDomainService)
      .useValue(repository)
      .compile();
    await testingModule.init();
    handler = testingModule.get<findAllTenantHandler>(findAllTenantHandler);
  });

  after(async () => {
    await testingModule.close();
  });

  it('should be defined', async () => {
    expect(handler).to.be.not.undefined;
  });

  describe('handle', () => {
    it('should return all found tenants', async () => {
      const result = await handler.handle(new findAllTenantQuery({}));
      expect(result).to.be.not.undefined;
      expect(result).to.be.contains(tenant);
    });
  })
});
