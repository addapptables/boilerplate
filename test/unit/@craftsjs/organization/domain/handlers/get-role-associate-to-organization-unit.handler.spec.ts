import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { GetRolesAssociateToOrganizationUnitHandler } from '../../../../../../lib/@craftsjs/organization/domain/handlers/get-role-associate-to-organization-unit.handler';
import { OrganizationUnitDomainService } from '../../../../../../lib/@craftsjs/organization/domain/services/organization-unit.service';
import { GetRolesAssociateToOrganizationUnitQuery } from '../../../../../../lib/@craftsjs/organization/application/queries/get-roles-associate-to-organization-unit.query';

describe('GetRolesAssociateToOrganizationUnitHandler', () => {
  let handler: GetRolesAssociateToOrganizationUnitHandler;
  let testingModule: TestingModule;

  before(async () => {
    const repository = {
      getRolesAssociate: () => {
        return Promise.resolve([{ id: '135461', name: 'test' }]);
      }
    };
    testingModule = await Test.createTestingModule({
      providers: [
        OrganizationUnitDomainService,
        GetRolesAssociateToOrganizationUnitHandler,
      ],
    })
      .overrideProvider(OrganizationUnitDomainService)
      .useValue(repository)
      .compile();
    await testingModule.init();
    handler = testingModule.get<GetRolesAssociateToOrganizationUnitHandler>(GetRolesAssociateToOrganizationUnitHandler);
  });

  after(async () => {
    await testingModule.close();
  });

  it('should be defined', async () => {
    expect(handler).to.be.not.undefined;
  });

  describe('handle', () => {
    it('should must return all roles associate to organizationUnit', async () => {
      const result = await handler.handle(new GetRolesAssociateToOrganizationUnitQuery({ id: '123465' }));
      expect(result).to.be.not.undefined;
      expect(result).to.be.length(1);
      expect(result).deep.contains({ id: '135461', name: 'test' });
    });
  })
});
