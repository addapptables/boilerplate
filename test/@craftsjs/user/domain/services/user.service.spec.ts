import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { UserDomainService } from '../../../../../lib/@craftsjs/user/domain/services/user.service';
import { UserRepository } from '../../../../../lib/@craftsjs/user/infrastructure/database/repositories/user.repository';
import { afterEach } from 'mocha';
import { Connection, EntityManager } from 'typeorm';

describe('UserDomainService', () => {
  let service: UserDomainService;
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
        UserDomainService,
        UserRepository,
        Connection,
      ],
    })
      .overrideProvider(UserRepository)
      .useValue(repository)
      .overrideProvider(Connection)
      .useValue(connection)
      .compile();
    await testingModule.init();
    service = testingModule.get<UserDomainService>(UserDomainService);
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

    it('should return created user', async () => {
      const user = {
        name: 'test',
        emailAddress: 'test@test.com',
        userName: 'test',
        surname: 'test',
        roles: [],
        isStatic: true,
        isDefault: true
      };
      sandbox.stub(EntityManager.prototype, 'save').returns(Promise.resolve(user));
      const result = await service.insert(user as any);
      expect(result).to.be.not.undefined;
      expect(result).deep.equal(user);
    });

    it('should return an error', async () => {
      try {
        sandbox.stub((service as any).userRepository, 'findOne').returns(Promise.resolve({ name: 'test', permissions: [] }));
        await service.insert({
          name: 'test'
        } as any);
        expect('error').to.be.equal('test-error');
      } catch (error) {
        expect(error.message).to.be.equal('user.existsUserName');
      }
    });

  })

  describe('update', () => {

    it('should return updated user', async () => {
      const user = {
        name: 'test',
        emailAddress: 'test@test.com',
        userName: 'test',
        surname: 'test',
        roles: [],
        isStatic: true,
        isDefault: true
      };
      const update = sandbox.stub(EntityManager.prototype, 'update');
      const deleteFunction = sandbox.stub(EntityManager.prototype, 'delete');
      sandbox.stub(EntityManager.prototype, 'save').returns(Promise.resolve(user));
      sandbox.stub((service as any).userRepository, 'findOne').returns(Promise.resolve(user));
      const result = await service.update(user as any);
      expect(update.calledOnce).to.be.true;
      expect(deleteFunction.calledOnce).to.be.true;
      expect(result).to.be.not.undefined;
      expect(result.name).to.be.equal('test');
    });

    it('should return an error', async () => {
      try {
        sandbox.stub((service as any).userRepository, 'findOne').returns(Promise.resolve({ userName: 'test1', permissions: [] }));
        await service.update({
          userName: 'test'
        } as any);
        expect('error').to.be.equal('test-error');
      } catch (error) {
        expect(error.message).to.be.equal('user.existsUserName');
      }
    });

  })

  describe('findOneByQuery', () => {
    it('should return a user', async () => {
      const user = {
        name: 'test',
        emailAddress: 'test@test.com',
        userName: 'test',
        surname: 'test',
        roles: [],
        isStatic: true,
        isDefault: true
      };
      sandbox.stub((service as any).userRepository, 'findOne').returns(user)
      const result = await service.findOneByQuery({});
      expect(result).to.be.not.undefined;
      expect(result).deep.equal(user);
    });
  })

  describe('getAll', () => {
    it('should return all users', async () => {
      const user = {
        name: 'test',
        emailAddress: 'test@test.com',
        userName: 'test',
        surname: 'test',
        roles: [],
        isStatic: true,
        isDefault: true
      };
      sandbox.stub((service as any).userRepository, 'findAndCount').returns([[user], 1])
      const result = await service.getAll({} as any);
      expect(result).to.be.not.undefined;
      expect(result.data).to.be.length(1);
      expect(result.total).to.be.equal(1);
      expect(result.data).deep.contains(user);
    });
  })
});
