import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { AddRolesToOrganizationUnitHandler } from '../../../../../lib/@craftsjs/organization/domain/handlers/add-roles-to-organization-unit.handler';
import { OrganizationUnitDomainService } from '../../../../../lib/@craftsjs/organization/domain/services/organization-unit.service';
import { AddRolesToOrganizationUnitCommand } from '../../../../../lib/@craftsjs/organization/application/commands/add-roles-to-organization-unit.command';
import { OrganizationUnitRole } from '../../../../../lib/@craftsjs/organization/infrastructure/database/entities/organization-unit-role.entity';

describe('AddRolesToOrganizationUnitHandler', () => {
  let handler: AddRolesToOrganizationUnitHandler;
  let testingModule: TestingModule;

  before(async () => {
    const repository = {
      addRolesToOrganizationUnit: (input) => {
        return Promise.resolve(input);
      }
    };
    testingModule = await Test.createTestingModule({
      providers: [
        OrganizationUnitDomainService,
        AddRolesToOrganizationUnitHandler,
      ],
    })
      .overrideProvider(OrganizationUnitDomainService)
      .useValue(repository)
      .compile();
    await testingModule.init();
    handler = testingModule.get<AddRolesToOrganizationUnitHandler>(AddRolesToOrganizationUnitHandler);
  });

  after(async () => {
    await testingModule.close();
  });

  it('should be defined', async () => {
    expect(handler).to.be.not.undefined;
  });

  describe('handle', () => {
    it('should return created organization unit roles', async () => {
      const result = await handler.handle(new AddRolesToOrganizationUnitCommand({ roles: [1], organizationUnitId: 1 }));
      expect(result).to.be.not.undefined;
      expect(result).to.be.length(1);
      const organizationUnitRole = new OrganizationUnitRole();
      organizationUnitRole.roleId = 1;
      organizationUnitRole.organizationUnitId = 1;
      expect(result).to.deep.include(organizationUnitRole);
    });
  })
});
