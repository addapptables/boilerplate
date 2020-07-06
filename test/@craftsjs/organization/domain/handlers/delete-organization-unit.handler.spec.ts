import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { DeleteOrganizationUnitHandler } from '../../../../../lib/@craftsjs/organization/domain/handlers/delete-organization-unit.handler';
import { OrganizationUnitDomainService } from '../../../../../lib/@craftsjs/organization/domain/services/organization-unit.service';
import { DeleteOrganizationUnitCommand } from '../../../../../lib/@craftsjs/organization/application/commands/delete-organization-unit.command';

describe('DeleteOrganizationUnitHandler', () => {
  let handler: DeleteOrganizationUnitHandler;
  let testingModule: TestingModule;

  before(async () => {
    const repository = {
      remove: (id) => {
        return Promise.resolve({ id });
      },
      deleteOrganizationUnit: (id) => {
        return Promise.resolve({ id });
      }
    };
    testingModule = await Test.createTestingModule({
      providers: [
        OrganizationUnitDomainService,
        DeleteOrganizationUnitHandler,
      ],
    })
      .overrideProvider(OrganizationUnitDomainService)
      .useValue(repository)
      .compile();
    await testingModule.init();
    handler = testingModule.get<DeleteOrganizationUnitHandler>(DeleteOrganizationUnitHandler);
  });

  after(async () => {
    await testingModule.close();
  });

  it('should be defined', async () => {
    expect(handler).to.be.not.undefined;
  });

  describe('handle', () => {
    it('should return deleted id organization unit', async () => {
      const result = await handler.handle(new DeleteOrganizationUnitCommand({ id: "123456" }));
      expect(result).to.be.not.undefined;
      expect(result.id).to.be.equal("123456");
    });
  })
});
