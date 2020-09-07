import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { FindOneOrganizationUnitHandler } from '../../../../../../lib/@craftsjs/organization/domain/handlers/find-one-organization-unit.handler';
import { OrganizationUnitDomainService } from '../../../../../../lib/@craftsjs/organization/domain/services/organization-unit.service';
import { FindOneOrganizationUnitQuery } from '../../../../../../lib/@craftsjs/organization/application/queries/find-one-organization-unit.query';

describe('FindOneOrganizationUnitHandler', () => {
  let handler: FindOneOrganizationUnitHandler;
  let testingModule: TestingModule;

  before(async () => {
    const repository = {
      findOneByQuery: (input) => {
        return Promise.resolve({ id: input.id, name: 'test' });
      }
    };
    testingModule = await Test.createTestingModule({
      providers: [
        OrganizationUnitDomainService,
        FindOneOrganizationUnitHandler,
      ],
    })
      .overrideProvider(OrganizationUnitDomainService)
      .useValue(repository)
      .compile();
    await testingModule.init();
    handler = testingModule.get<FindOneOrganizationUnitHandler>(FindOneOrganizationUnitHandler);
  });

  after(async () => {
    await testingModule.close();
  });

  it('should be defined', async () => {
    expect(handler).to.be.not.undefined;
  });

  describe('handle', () => {
    it('should return found organization unit', async () => {
      const result = await handler.handle(new FindOneOrganizationUnitQuery({ id: '12464' }));
      expect(result).to.be.not.undefined;
      expect(result.id).to.be.equal('12464');
      expect(result.name).to.be.equal('test');
    });
  })
});
