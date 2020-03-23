import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { FindOneTenantHandler } from '../../../../../lib/@craftsjs/tenant/domain/handlers/find-one-tenant.handler';
import { TenantDomainService } from '../../../../../lib/@craftsjs/tenant/domain/services/tenant.service';
import { FindOneTenantQuery } from '../../../../../lib/@craftsjs/tenant/application/queries/find-one-tenant.query';

describe('FindOneTenantHandler', () => {
  let handler: FindOneTenantHandler;
  let testingModule: TestingModule;
  const tenant = {
    id: 1235489,
    isActive: true,
    name: 'test',
    subDomain: 'test'
  }

  before(async () => {
    const repository = {
      findOneByQuery: (input) => {
        return Promise.resolve(input);
      }
    };
    testingModule = await Test.createTestingModule({
      providers: [
        TenantDomainService,
        FindOneTenantHandler,
      ],
    })
      .overrideProvider(TenantDomainService)
      .useValue(repository)
      .compile();
    await testingModule.init();
    handler = testingModule.get<FindOneTenantHandler>(FindOneTenantHandler);
  });

  after(async () => {
    await testingModule.close();
  });

  it('should be defined', async () => {
    expect(handler).to.be.not.undefined;
  });

  describe('handle', () => {
    it('should return found tenant', async () => {
      const result = await handler.handle(new FindOneTenantQuery(tenant));
      expect(result).to.be.not.undefined;
      expect(result).to.be.contains(tenant);
    });
  })
});
