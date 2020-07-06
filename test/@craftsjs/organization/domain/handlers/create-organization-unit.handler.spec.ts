import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { CreateOrganizationUnitHandler } from '../../../../../lib/@craftsjs/organization/domain/handlers/create-organization-unit.handler';
import { OrganizationUnitDomainService } from '../../../../../lib/@craftsjs/organization/domain/services/organization-unit.service';
import { CreateOrganizationUnitCommand } from '../../../../../lib/@craftsjs/organization/application/commands/create-organization-unit.command';

describe('CreateOrganizationUnitHandler', () => {
  let handler: CreateOrganizationUnitHandler;
  let testingModule: TestingModule;

  before(async () => {
    const repository = {
      insert: (input) => {
        return Promise.resolve(input);
      }
    };
    testingModule = await Test.createTestingModule({
      providers: [
        OrganizationUnitDomainService,
        CreateOrganizationUnitHandler,
      ],
    })
      .overrideProvider(OrganizationUnitDomainService)
      .useValue(repository)
      .compile();
    await testingModule.init();
    handler = testingModule.get<CreateOrganizationUnitHandler>(CreateOrganizationUnitHandler);
  });

  after(async () => {
    await testingModule.close();
  });

  it('should be defined', async () => {
    expect(handler).to.be.not.undefined;
  });

  describe('handle', () => {
    it('should return created organization unit', async () => {
      const result = await handler.handle(new CreateOrganizationUnitCommand({ name: 'test' }));
      expect(result).to.be.not.undefined;
      expect(result.name).to.be.equal('test');
    });
  })
});
