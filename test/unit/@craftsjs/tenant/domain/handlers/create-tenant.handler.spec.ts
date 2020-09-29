import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { CreateTenantHandler } from '../../../../../../lib/@craftsjs/tenant/domain/handlers/create-tenant.handler';
import { TenantDomainService } from '../../../../../../lib/@craftsjs/tenant/domain/services/tenant.service';
import { CreateTenantCommand } from '../../../../../../lib/@craftsjs/tenant/application/commands/create-tenant.command';

describe('CreateTenantHandler', () => {
  let handler: CreateTenantHandler;
  let testingModule: TestingModule;
  const tenant = {
    id: '1235489',
    isActive: true,
    name: 'test',
    subDomain: 'test'
  }

  before(async () => {
    const repository = {
      insert: (input) => {
        return Promise.resolve(input);
      }
    };
    testingModule = await Test.createTestingModule({
      providers: [
        TenantDomainService,
        CreateTenantHandler,
      ],
    })
      .overrideProvider(TenantDomainService)
      .useValue(repository)
      .compile();
    await testingModule.init();
    handler = testingModule.get<CreateTenantHandler>(CreateTenantHandler);
  });

  after(async () => {
    await testingModule.close();
  });

  it('should be defined', async () => {
    expect(handler).to.be.not.undefined;
  });

  describe('handle', () => {
    it('should return created tenant', async () => {
      const result = await handler.handle(new CreateTenantCommand(tenant));
      expect(result).to.be.not.undefined;
      expect(result).deep.contains(tenant);
    });
  })
});
