import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { UpdateOrganizationUnitHandler } from '../../../../../lib/@craftsjs/organization/domain/handlers/update-organization-unit.handler';
import { OrganizationUnitDomainService } from '../../../../../lib/@craftsjs/organization/domain/services/organization-unit.service';
import { UpdateOrganizationUnitCommand } from '../../../../../lib/@craftsjs/organization/application/commands/update-organization-unit.command';

describe('UpdateOrganizationUnitHandler', () => {
  let handler: UpdateOrganizationUnitHandler;
  let testingModule: TestingModule;

  before(async () => {
    const repository = {
      update: (input) => {
        return Promise.resolve(input);
      }
    };
    testingModule = await Test.createTestingModule({
      providers: [
        OrganizationUnitDomainService,
        UpdateOrganizationUnitHandler,
      ],
    })
      .overrideProvider(OrganizationUnitDomainService)
      .useValue(repository)
      .compile();
    await testingModule.init();
    handler = testingModule.get<UpdateOrganizationUnitHandler>(UpdateOrganizationUnitHandler);
  });

  after(async () => {
    await testingModule.close();
  });

  it('should be defined', async () => {
    expect(handler).to.be.not.undefined;
  });

  describe('handle', () => {
    it('should return created organization unit', async () => {
      const result = await handler.handle(new UpdateOrganizationUnitCommand({ id: 123456, name: 'test' }));
      expect(result).to.be.not.undefined;
      expect(result.name).to.be.equal('test');
      expect(result.id).to.be.equal(123456);
    });
  })
});
