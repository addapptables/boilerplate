import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { DeleteTenantHandler } from '../../../../../../lib/@craftsjs/tenant/domain/handlers/delete-tenant.handler';
import { TenantDomainService } from '../../../../../../lib/@craftsjs/tenant/domain/services/tenant.service';
import { DeleteTenantCommand } from '../../../../../../lib/@craftsjs/tenant/application/commands/delete-tenant.command';

describe('DeleteTenantHandler', () => {
  let handler: DeleteTenantHandler;
  let testingModule: TestingModule;
  const tenant = {
    id: '1235489',
    isActive: true,
    name: 'test',
    subDomain: 'test'
  }

  before(async () => {
    const repository = {
      remove: (input) => {
        return Promise.resolve({ id: input });
      }
    };
    testingModule = await Test.createTestingModule({
      providers: [
        TenantDomainService,
        DeleteTenantHandler,
      ],
    })
      .overrideProvider(TenantDomainService)
      .useValue(repository)
      .compile();
    await testingModule.init();
    handler = testingModule.get<DeleteTenantHandler>(DeleteTenantHandler);
  });

  after(async () => {
    await testingModule.close();
  });

  it('should be defined', async () => {
    expect(handler).to.be.not.undefined;
  });

  describe('handle', () => {
    it('should return deleted tenant id', async () => {
      const result = await handler.handle(new DeleteTenantCommand(tenant));
      expect(result).to.be.not.undefined;
      expect(result.id).to.be.equal(tenant.id);
    });
  })
});
