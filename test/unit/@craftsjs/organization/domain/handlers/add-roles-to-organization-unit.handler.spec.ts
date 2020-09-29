import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { AddRolesToOrganizationUnitHandler } from '../../../../../../lib/@craftsjs/organization/domain/handlers/add-roles-to-organization-unit.handler';
import { OrganizationUnitDomainService } from '../../../../../../lib/@craftsjs/organization/domain/services/organization-unit.service';
import { AddRolesToOrganizationUnitCommand } from '../../../../../../lib/@craftsjs/organization/application/commands/add-roles-to-organization-unit.command';
import { OrganizationUnitRole } from '../../../../../../lib/@craftsjs/organization/infrastructure/database/entities/organization-unit-role.entity';
import { v4 as uuid } from 'uuid';

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
      const roleId = uuid();
      const organizationUnitId = uuid();
      const result = await handler.handle(new AddRolesToOrganizationUnitCommand({ id: 'adf45', roles: [roleId], organizationUnitId }));
      expect(result).to.be.not.undefined;
      expect(result).to.be.length(1);
      const id = result[0].id;
      const organizationUnitRole = new OrganizationUnitRole();
      organizationUnitRole.id = id;
      organizationUnitRole.roleId = roleId;
      organizationUnitRole.organizationUnitId = organizationUnitId;
      expect(result).to.deep.contains(organizationUnitRole);
    });
  })
});
