import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { OrganizationUnitDomainService, OrganizationUnitCodeService } from '../../../../../lib/@craftsjs/organization';
import { OrganizationUnitRepository } from '../../../../../lib/@craftsjs/organization/infrastructure/database/repositories/organization-unit.repository';
import { OrganizationUnitRoleRepository } from '../../../../../lib/@craftsjs/organization/infrastructure/database/repositories/organization-unit-role.repository';
import { RoleRepository } from '../../../../../lib/@craftsjs/role/infrastructure/database/repositories/role.repository';
import { afterEach } from 'mocha';
import * as uuid from 'uuid/v4';

describe('OrganizationUnitDomainService', () => {
  let service: OrganizationUnitDomainService;
  let testingModule: TestingModule;
  let sandbox: sinon.SinonSandbox;

  before(async () => {
    const repository = {
      findOne: (input) => {
        return Promise.resolve(input.where?.name?.return || input.where?.id?.return);
      },
      save: (input) => Promise.resolve(input),
      update: (_, input) => Promise.resolve(input),
      createQueryBuilder: () => ({
        where: () => ({
          delete: () => ({
            execute: () => Promise.resolve({ id: 1 })
          })
        })
      }),
      find: () => Promise.resolve()
    };
    testingModule = await Test.createTestingModule({
      providers: [
        OrganizationUnitDomainService,
        OrganizationUnitRepository,
        OrganizationUnitRoleRepository,
        RoleRepository,
        OrganizationUnitCodeService
      ],
    })
      .overrideProvider(OrganizationUnitRepository)
      .useValue(repository)
      .overrideProvider(OrganizationUnitRoleRepository)
      .useValue(repository)
      .overrideProvider(RoleRepository)
      .useValue(repository)
      .compile();
    await testingModule.init();
    service = testingModule.get<OrganizationUnitDomainService>(OrganizationUnitDomainService);
  });

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  })

  after(async () => {
    await testingModule.close();
    sandbox.restore();
  });

  afterEach(() => {
    sandbox.restore();
  })

  it('should be defined', async () => {
    expect(service).to.be.not.undefined;
  });

  describe('insert', () => {

    it('should return created organization unit', async () => {
      const organizationUnit = await service.insert({
        name: 'test',
      } as any);
      expect(organizationUnit).to.be.not.undefined;
      expect(organizationUnit.name).to.be.equal('test');
    });

    it('should return an error', async () => {
      try {
        sandbox.stub((service as any).organizationUnitRepository, 'findOne').returns({ name: 'name', code: '0001' })
        await service.insert({
          isFree: true,
          name: 'name'
        } as any);
        expect('error').to.be.equal('test-error');
      } catch (error) {
        expect(error.message).to.be.equal('organizationUnit.existsName');
      }
    });

  })

  describe('update', () => {

    it('should return updated organization unit', async () => {
      sandbox.stub((service as any).organizationUnitRepository, 'findOne').returns({ name: 'test', code: '0001' })
      const organizationUnit = await service.update({
        id: 1,
        name: 'test',
      } as any);
      expect(organizationUnit).to.be.not.undefined;
      expect(organizationUnit.name).to.be.equal('test');
    });

    it('should return an error', async () => {
      try {
        sandbox.stub((service as any).organizationUnitRepository, 'findOne').returns({ name: 'name', code: '0001' })
        await service.insert({
          name: 'name2'
        } as any);
        expect('error').to.be.equal('test-error');
      } catch (error) {
        expect(error.message).to.be.equal('organizationUnit.existsName');
      }
    });

  })

  describe('findOneByQuery', () => {
    it('should return an organizationUnit', async () => {
      sandbox.stub((service as any).organizationUnitRepository, 'findOne').returns({ name: 'name', code: '0001' })
      const organizationUnit = await service.findOneByQuery({});
      expect(organizationUnit).to.be.not.undefined;
      expect(organizationUnit.name).to.be.equal('name');
      expect(organizationUnit.code).to.be.equal('0001');
    });
  })

  describe('addRolesToOrganizationUnit', () => {
    it('should return created organizationUnitRole', async () => {
      sandbox.stub((service as any).organizationUnitRoleRepository, 'save').returns([{ roleId: 1, organizationUnitId: 1 }])
      const organizationUnitRoles = await service.addRolesToOrganizationUnit([{ roleId: 1, organizationUnitId: 1 }] as any);
      expect(organizationUnitRoles).to.be.not.undefined;
      expect(organizationUnitRoles).to.be.length(1);
    });
  })

  describe('deleteOrganizationUnitRole', () => {
    it('should return deleted id organizationUnitRole', async () => {
      const organizationUnitRole = await service.deleteOrganizationUnitRole(uuid());
      expect(organizationUnitRole).to.be.not.undefined;
      expect(organizationUnitRole.id).to.be.equal(1);
    });
  })

  describe('getRolesAssociate', () => {
    it('should return associated role to organizationUnit', async () => {
      sandbox.stub((service as any).organizationUnitRoleRepository, 'find').returns([{ role: { name: 'role' } }])
      const roles = await service.getRolesAssociate(uuid());
      expect(roles).to.be.not.undefined;
      expect(roles).to.be.length(1);
    });
  })

});
