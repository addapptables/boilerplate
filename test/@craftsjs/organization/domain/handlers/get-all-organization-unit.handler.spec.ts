import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { FindAllOrganizationUnitHandler } from '../../../../../lib/@craftsjs/organization/domain/handlers/find-all-organization-unit.handler';
import { OrganizationUnitDomainService } from '../../../../../lib/@craftsjs/organization/domain/services/organization-unit.service';
import { FindAllOrganizationUnitQuery } from '../../../../../lib/@craftsjs/organization/application/queries/find-all-organization-unit.query';

describe('FindAllOrganizationUnitHandler', () => {
  let handler: FindAllOrganizationUnitHandler;
  let testingModule: TestingModule;

  before(async () => {
    const repository = {
      findAll: () => {
        return Promise.resolve([{ id: 135461, name: 'test' }]);
      }
    };
    testingModule = await Test.createTestingModule({
      providers: [
        OrganizationUnitDomainService,
        FindAllOrganizationUnitHandler,
      ],
    })
      .overrideProvider(OrganizationUnitDomainService)
      .useValue(repository)
      .compile();
    await testingModule.init();
    handler = testingModule.get<FindAllOrganizationUnitHandler>(FindAllOrganizationUnitHandler);
  });

  after(async () => {
    await testingModule.close();
  });

  it('should be defined', async () => {
    expect(handler).to.be.not.undefined;
  });

  describe('handle', () => {
    it('should must return all organization units', async () => {
      const result = await handler.handle(new FindAllOrganizationUnitQuery({}));
      expect(result).to.be.not.undefined;
      expect(result).to.be.length(1);
      expect(result).deep.contains({ id: 135461, name: 'test' });
    });
  })
});
