import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { DeleteOrganizationUnitRoleHandler } from '../../../../../lib/@craftsjs/organization/domain/handlers/delete-organization-unit-role.handler';
import { OrganizationUnitDomainService } from '../../../../../lib/@craftsjs/organization/domain/services/organization-unit.service';
import { DeleteOrganizationUnitRoleCommand } from '../../../../../lib/@craftsjs/organization/application/commands/delete-organization-unit-role.command';

describe('DeleteOrganizationUnitRoleHandler', () => {
  let handler: DeleteOrganizationUnitRoleHandler;
  let testingModule: TestingModule;

  before(async () => {
    const repository = {
      deleteOrganizationUnitRole: (id) => {
        return Promise.resolve({ id });
      }
    };
    testingModule = await Test.createTestingModule({
      providers: [
        OrganizationUnitDomainService,
        DeleteOrganizationUnitRoleHandler,
      ],
    })
      .overrideProvider(OrganizationUnitDomainService)
      .useValue(repository)
      .compile();
    await testingModule.init();
    handler = testingModule.get<DeleteOrganizationUnitRoleHandler>(DeleteOrganizationUnitRoleHandler);
  });

  after(async () => {
    await testingModule.close();
  });

  it('should be defined', async () => {
    expect(handler).to.be.not.undefined;
  });

  describe('handle', () => {
    it('should return deleted id organization unit role', async () => {
      const result = await handler.handle(new DeleteOrganizationUnitRoleCommand({ id: 123456 }));
      expect(result).to.be.not.undefined;
      expect(result.id).to.be.equal(123456);
    });
  })
});
