import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { GetAllOrganizationUnitHandler } from '../../../../../lib/@craftsjs/organization/domain/handlers/get-all-organization-unit.handler';
import { OrganizationUnitDomainService } from '../../../../../lib/@craftsjs/organization/domain/services/organization-unit.service';
import { GetAllOrganizationUnitQuery } from '../../../../../lib/@craftsjs/organization/application/queries/get-all-organization-unit.query';

describe('GetAllOrganizationUnitHandler', () => {
  let handler: GetAllOrganizationUnitHandler;
  let testingModule: TestingModule;

  before(async () => {
    const repository = {
      getAll: () => {
        return Promise.resolve([{ id: 135461, name: 'test' }]);
      }
    };
    testingModule = await Test.createTestingModule({
      providers: [
        OrganizationUnitDomainService,
        GetAllOrganizationUnitHandler,
      ],
    })
      .overrideProvider(OrganizationUnitDomainService)
      .useValue(repository)
      .compile();
    await testingModule.init();
    handler = testingModule.get<GetAllOrganizationUnitHandler>(GetAllOrganizationUnitHandler);
  });

  after(async () => {
    await testingModule.close();
  });

  it('should be defined', async () => {
    expect(handler).to.be.not.undefined;
  });

  describe('handle', () => {
    it('should must return all organization units', async () => {
      const result = await handler.handle(new GetAllOrganizationUnitQuery({}));
      expect(result).to.be.not.undefined;
      expect(result).to.be.length(1);
      expect(result).deep.contains({ id: 135461, name: 'test' });
    });
  })
});
