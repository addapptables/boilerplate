import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { TenantDomainService } from '../../../../../lib/@craftsjs/tenant/domain/services/tenant.service';
import { PermissionDomainService } from '../../../../../lib/@craftsjs/permission/domain/services/permission.service';
import { TenantRepository } from '../../../../../lib/@craftsjs/tenant/infrastructure/database/repositories/tenant.repository';
import { afterEach } from 'mocha';
import { Connection, EntityManager } from 'typeorm';
import { SecurityService } from '../../../../../lib/@craftsjs/security';

describe('TenantDomainService', () => {
  let service: TenantDomainService;
  let testingModule: TestingModule;
  let sandbox: sinon.SinonSandbox;
  const tenant = {
    id: 1235489,
    isActive: true,
    name: 'test',
    subDomain: 'test'
  }

  before(async () => {
    const repository = {
      findOne: (input) => {
        return Promise.resolve(input.where?.name?.return || input.where?.id?.return);
      },
      save: (input) => Promise.resolve(input),
      update: (_, input) => Promise.resolve(input),
      findAndCount: () => Promise.resolve()
    };
    const connection = {
      transaction: (runInTransaction: (entityManager: EntityManager) => Promise<any>) => {
        return runInTransaction(new EntityManager(undefined));
      }
    }
    const permissionDomain = {
      findAll: () => [{ name: 'Page', isHost: true }]
    }

    testingModule = await Test.createTestingModule({
      providers: [
        TenantDomainService,
        TenantRepository,
        Connection,
        SecurityService,
        PermissionDomainService,
      ],
    })
      .overrideProvider(TenantRepository)
      .useValue(repository)
      .overrideProvider(Connection)
      .useValue(connection)
      .overrideProvider(PermissionDomainService)
      .useValue(permissionDomain)
      .compile();
    await testingModule.init();
    service = testingModule.get<TenantDomainService>(TenantDomainService);
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

    it('should return created tenant', async () => {
      sandbox.stub(EntityManager.prototype, 'save').returns(Promise.resolve(tenant));
      const result = await service.insert(tenant as any);
      expect(result).to.be.not.undefined;
      expect(result).deep.equal(tenant);
    });

    it('should return an error', async () => {
      try {
        sandbox.stub((service as any).tenantRepository, 'findOne').returns(Promise.resolve({ name: 'test', permissions: [] }));
        await service.insert({
          name: 'test'
        } as any);
        expect('error').to.be.equal('test-error');
      } catch (error) {
        expect(error.message).to.be.equal('tenant.existsName');
      }
    });

  })

  describe('update', () => {

    it('should return updated tenant', async () => {
      sandbox.stub((service as any).tenantRepository, 'findOne').returns(Promise.resolve(tenant));
      const result = await service.update(tenant as any);
      expect(result).to.be.not.undefined;
      expect(result.name).to.be.equal('test');
    });

    it('should return an error', async () => {
      try {
        sandbox.stub((service as any).tenantRepository, 'findOne').returns(Promise.resolve({ name: 'test1', subdomain: 'test1' }));
        await service.update({
          name: 'test'
        } as any);
        expect('error').to.be.equal('test-error');
      } catch (error) {
        expect(error.message).to.be.equal('tenant.existsName');
      }
    });

  })

  describe('findOneByQuery', () => {
    it('should return found tenant', async () => {
      sandbox.stub((service as any).tenantRepository, 'findOne').returns(tenant)
      const result = await service.findOneByQuery({});
      expect(result).to.be.not.undefined;
      expect(result).deep.equal(tenant);
    });
  })

  describe('getTenantBySubdomain', () => {
    it('should return found tenant', async () => {
      sandbox.stub((service as any).tenantRepository, 'findOne').returns(tenant)
      const result = await service.findOneByQuery({});
      expect(result).to.be.not.undefined;
      expect(result).deep.equal(tenant);
    });
  })
});
