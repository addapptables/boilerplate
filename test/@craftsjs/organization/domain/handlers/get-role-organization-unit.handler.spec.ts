import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { GetRolesOrganizationUnitHandler } from '../../../../../lib/@craftsjs/organization/domain/handlers/get-role-organization-unit.handler';
import { OrganizationUnitDomainService } from '../../../../../lib/@craftsjs/organization/domain/services/organization-unit.service';
import { GetRolesOrganizationUnitQuery } from '../../../../../lib/@craftsjs/organization/application/queries/get-roles-organization-unit.query';

describe('GetRolesOrganizationUnitHandler', () => {
  let handler: GetRolesOrganizationUnitHandler;
  let testingModule: TestingModule;

  before(async () => {
    const repository = {
      getRoles: () => {
        return Promise.resolve([{ id: 135461, name: 'test' }]);
      }
    };
    testingModule = await Test.createTestingModule({
      providers: [
        OrganizationUnitDomainService,
        GetRolesOrganizationUnitHandler,
      ],
    })
      .overrideProvider(OrganizationUnitDomainService)
      .useValue(repository)
      .compile();
    await testingModule.init();
    handler = testingModule.get<GetRolesOrganizationUnitHandler>(GetRolesOrganizationUnitHandler);
  });

  after(async () => {
    await testingModule.close();
  });

  it('should be defined', async () => {
    expect(handler).to.be.not.undefined;
  });

  describe('handle', () => {
    it('should must return all roles associate to organizationUnit', async () => {
      const result = await handler.handle(new GetRolesOrganizationUnitQuery({ id: 123465 }));
      expect(result).to.be.not.undefined;
      expect(result).to.be.length(1);
      expect(result).deep.contains({ id: 135461, name: 'test' });
    });
  })
});
