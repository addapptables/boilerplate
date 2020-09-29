import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { UpdateTenantHandler } from '../../../../../../lib/@craftsjs/tenant/domain/handlers/update-tenant.handler';
import { TenantDomainService } from '../../../../../../lib/@craftsjs/tenant/domain/services/tenant.service';
import { UpdateTenantCommand } from '../../../../../../lib/@craftsjs/tenant/application/commands/update-tenant.command';

describe('UpdateTenantHandler', () => {
  let handler: UpdateTenantHandler;
  let testingModule: TestingModule;
  const tenant = {
    id: '1235489',
    isActive: true,
    name: 'test',
    subDomain: 'test'
  }

  before(async () => {
    const repository = {
      update: (input) => {
        return Promise.resolve(input);
      }
    };
    testingModule = await Test.createTestingModule({
      providers: [
        TenantDomainService,
        UpdateTenantHandler,
      ],
    })
      .overrideProvider(TenantDomainService)
      .useValue(repository)
      .compile();
    await testingModule.init();
    handler = testingModule.get<UpdateTenantHandler>(UpdateTenantHandler);
  });

  after(async () => {
    await testingModule.close();
  });

  it('should be defined', async () => {
    expect(handler).to.be.not.undefined;
  });

  describe('handle', () => {
    it('should return updated tenant', async () => {
      const result = await handler.handle(new UpdateTenantCommand(tenant));
      expect(result).to.be.not.undefined;
      expect(result).deep.contains(tenant);
    });
  })
});
