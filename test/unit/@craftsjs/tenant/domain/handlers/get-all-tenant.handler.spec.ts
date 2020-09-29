import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { FindAllTenantHandler } from '../../../../../../lib/@craftsjs/tenant/domain/handlers/find-all-tenant.handler';
import { TenantDomainService } from '../../../../../../lib/@craftsjs/tenant/domain/services/tenant.service';
import { FindAllTenantQuery } from '../../../../../../lib/@craftsjs/tenant/application/queries/find-all-tenant.query';

describe('FindAllTenantHandler', () => {
  let handler: FindAllTenantHandler;
  let testingModule: TestingModule;
  const tenant = {
    id: '1235489',
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
        FindAllTenantHandler,
      ],
    })
      .overrideProvider(TenantDomainService)
      .useValue(repository)
      .compile();
    await testingModule.init();
    handler = testingModule.get<FindAllTenantHandler>(FindAllTenantHandler);
  });

  after(async () => {
    await testingModule.close();
  });

  it('should be defined', async () => {
    expect(handler).to.be.not.undefined;
  });

  describe('handle', () => {
    it('should return all found tenants', async () => {
      const result = await handler.handle(new FindAllTenantQuery({ skip: 0, take: 10}));
      expect(result).to.be.not.undefined;
      expect(result).to.be.contains(tenant);
    });
  })
});
