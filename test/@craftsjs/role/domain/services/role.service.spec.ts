import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { RoleDomainService } from '../../../../../lib/@craftsjs/role/domain/services/role.service';
import { RoleRepository } from '../../../../../lib/@craftsjs/role/infrastructure/database/repositories/role.repository';
import { afterEach } from 'mocha';
import { Connection, EntityManager } from 'typeorm';

describe('RoleDomainService', () => {
  let service: RoleDomainService;
  let testingModule: TestingModule;
  let sandbox: sinon.SinonSandbox;

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
    testingModule = await Test.createTestingModule({
      providers: [
        RoleDomainService,
        RoleRepository,
        Connection,
      ],
    })
      .overrideProvider(RoleRepository)
      .useValue(repository)
      .overrideProvider(Connection)
      .useValue(connection)
      .compile();
    await testingModule.init();
    service = testingModule.get<RoleDomainService>(RoleDomainService);
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

    it('should return created role', async () => {
      sandbox.stub(EntityManager.prototype, 'save').returns(Promise.resolve({ name: 'test', permissions: [] }));
      const result = await service.insert({
        name: 'test',
        permissions: []
      });
      expect(result).to.be.not.undefined;
      expect(result.name).to.be.equal('test');
    });

    it('should return an error', async () => {
      try {
        sandbox.stub((service as any).roleRepository, 'findOne').returns(Promise.resolve({ name: 'test', permissions: [] }));
        await service.insert({
          name: 'test'
        } as any);
        expect('error').to.be.equal('test-error');
      } catch (error) {
        expect(error.message).to.be.equal('role.existsName');
      }
    });

  })

  describe('update', () => {

    it('should return updated role', async () => {
      const update = sandbox.stub(EntityManager.prototype, 'update');
      const deleteFunction = sandbox.stub(EntityManager.prototype, 'delete');
      sandbox.stub(EntityManager.prototype, 'save').returns(Promise.resolve({ name: 'test', permissions: [] }));
      sandbox.stub((service as any).roleRepository, 'findOne').returns(Promise.resolve({ name: 'test', permissions: [] }));
      const result = await service.update({
        id: 123546,
        name: 'test',
        permissions: []
      });
      expect(update.calledOnce).to.be.true;
      expect(deleteFunction.calledOnce).to.be.true;
      expect(result).to.be.not.undefined;
      expect(result.name).to.be.equal('test');
    });

    it('should return an error', async () => {
      try {
        sandbox.stub((service as any).roleRepository, 'findOne').returns(Promise.resolve({ name: 'test1', permissions: [] }));
        await service.update({
          name: 'test'
        } as any);
        expect('error').to.be.equal('test-error');
      } catch (error) {
        expect(error.message).to.be.equal('role.existsName');
      }
    });

  })

  describe('findOneByQuery', () => {
    it('should return a role', async () => {
      sandbox.stub((service as any).roleRepository, 'findOne').returns({ id: 123456, name: 'test', permissions: [] })
      const result = await service.findOneByQuery({});
      expect(result).to.be.not.undefined;
      expect(result.name).to.be.equal('test');
    });
  })

  describe('findAll', () => {
    it('should return all roles', async () => {
      sandbox.stub((service as any).roleRepository, 'findAndCount').returns([[{ id: 123456, name: 'test', permissions: [] }], 1])
      const result = await service.findAll({});
      expect(result).to.be.not.undefined;
      expect(result.data).to.be.length(1);
      expect(result.total).to.be.equal(1);
      expect(result.data).deep.contains({ id: 123456, name: 'test', permissions: [] });
    });
  })
});
