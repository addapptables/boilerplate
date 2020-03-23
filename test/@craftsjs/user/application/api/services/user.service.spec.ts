import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { Broker } from '@addapptables/microservice';
import { UserService } from '../../../../../../lib/@craftsjs/user/application/api/services/user.service';
import { createMockBrokerWithTransferData } from '../../../../../mock/broker.mock';

describe('UserService', () => {
  let service: UserService;
  let testingModule: TestingModule;

  before(async () => {
    const broker = createMockBrokerWithTransferData();
    testingModule = await Test.createTestingModule({
      providers: [
        UserService,
        Broker,
      ],
    })
      .overrideProvider(Broker)
      .useValue(broker)
      .compile();
    await testingModule.init();
    service = testingModule.get<UserService>(UserService);
  });

  after(async () => {
    await testingModule.close();
  });

  it('should be defined', async () => {
    expect(service).to.be.not.undefined;
  });

  describe('insert', () => {

    it('should return created user', async () => {
      const user = await service.insert({
        name: 'test',
        emailAddress: 'test@test.com',
        userName: 'test',
        surname: 'test',
        roles: [],
      } as any);
      expect(user).to.be.not.undefined;
      expect(user).deep.contains({
        name: 'test',
        emailAddress: 'test@test.com',
        userName: 'test',
        surname: 'test',
        roles: [],
      });
    });

    it('should return an error', async () => {
      try {
        await service.insert({
          error: 'test-error'
        } as any);
        expect('error').to.be.equal('test-error');
      } catch (error) {
        expect(error.message).to.be.equal('test-error');
      }
    });

  })

  describe('update', () => {

    it('should return updated user', async () => {
      const user = await service.update({
        id: 123456,
        name: 'test',
        emailAddress: 'test@test.com',
        userName: 'test',
        surname: 'test',
        roles: [],
      });
      expect(user).to.be.not.undefined;
      expect(user).deep.contains({
        id: 123456,
        name: 'test',
        emailAddress: 'test@test.com',
        userName: 'test',
        surname: 'test',
        roles: [],
      });
    });

    it('should return an error', async () => {
      try {
        await service.update({
          error: 'test-error'
        } as any);
        expect('error').to.be.equal('test-error');
      } catch (error) {
        expect(error.message).to.be.equal('test-error');
      }
    });

  })

  describe('find', () => {

    it('should return an user', async () => {
      const result = await service.find({ id: 12345689, roles: [] } as any);
      expect(result).to.be.not.undefined;
      expect(result.id).to.be.equal(12345689);
    });

    it('should return an error', async () => {
      try {
        await service.find({ error: 'test-error' } as any);
        expect('error').to.be.equal('test-error');
      } catch (error) {
        expect(error.message).to.be.equal('test-error');
      }
    });

  })

  describe('findAll', () => {

    it('should return all users', async () => {
      const result = await service.findAll({ total: 2, data: [{ id: 1232456, roles: [] }] } as any);
      expect(result).to.be.not.undefined;
      expect(result.total).to.be.equal(2);
    });

    it('should return an error', async () => {
      try {
        await service.findAll({ error: 'test-error' } as any);
        expect('error').to.be.equal('test-error');
      } catch (error) {
        expect(error.message).to.be.equal('test-error');
      }
    });

  })

  describe('remove', () => {

    it('should return removed user id', async () => {
      const result = await service.remove({ id: 1 });
      expect(result).to.be.not.undefined;
      expect(result).to.be.equal(1);
    });

    it('should return an error', async () => {
      try {
        await service.remove({ error: 'test-error' } as any);
        expect('error').to.be.equal('test-error');
      } catch (error) {
        expect(error.message).to.be.equal('test-error');
      }
    });

  })

});
