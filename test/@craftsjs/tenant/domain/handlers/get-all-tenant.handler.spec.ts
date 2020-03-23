import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { GetAllTenantHandler } from '../../../../../lib/@craftsjs/tenant/domain/handlers/get-all-tenant.handler';
import { TenantDomainService } from '../../../../../lib/@craftsjs/tenant/domain/services/tenant.service';
import { GetAllTenantQuery } from '../../../../../lib/@craftsjs/tenant/application/queries/get-all-tenant.query';

describe('GetAllTenantHandler', () => {
  let handler: GetAllTenantHandler;
  let testingModule: TestingModule;
  const tenant = {
    id: 1235489,
    isActive: true,
    name: 'test',
    subDomain: 'test'
  }

  before(async () => {
    const repository = {
      getAll: () => {
        return Promise.resolve(tenant);
      }
    };
    testingModule = await Test.createTestingModule({
      providers: [
        TenantDomainService,
        GetAllTenantHandler,
      ],
    })
      .overrideProvider(TenantDomainService)
      .useValue(repository)
      .compile();
    await testingModule.init();
    handler = testingModule.get<GetAllTenantHandler>(GetAllTenantHandler);
  });

  after(async () => {
    await testingModule.close();
  });

  it('should be defined', async () => {
    expect(handler).to.be.not.undefined;
  });

  describe('handle', () => {
    it('should return all found tenants', async () => {
      const result = await handler.handle(new GetAllTenantQuery({}));
      expect(result).to.be.not.undefined;
      expect(result).to.be.contains(tenant);
    });
  })
});
