import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { Broker } from '@addapptables/microservice';
import { RoleService } from '../../../../../../lib/@craftsjs/role/application/api/services/role.service';
import { createMockBrokerWithTransferData } from '../../../../../mock/broker.mock';
import * as uuid from 'uuid/v4';

describe('RoleService', () => {
  let service: RoleService;
  let testingModule: TestingModule;

  before(async () => {
    const broker = createMockBrokerWithTransferData();
    testingModule = await Test.createTestingModule({
      providers: [
        RoleService,
        Broker,
      ],
    })
      .overrideProvider(Broker)
      .useValue(broker)
      .compile();
    await testingModule.init();
    service = testingModule.get<RoleService>(RoleService);
  });

  after(async () => {
    await testingModule.close();
  });

  it('should be defined', async () => {
    expect(service).to.be.not.undefined;
  });

  describe('insert', () => {

    it('should return created role', async () => {
      const role = await service.insert({
        name: 'test',
        permissions: []
      });
      expect(role).to.be.not.undefined;
      expect(role.name).to.be.equal('test');
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

    it('should return updated role', async () => {
      const id = uuid();
      const role = await service.Update({
        id,
        name: 'test',
        permissions: []
      });
      expect(role).to.be.not.undefined;
      expect(role.id).to.be.equal(id);
      expect(role.name).to.be.equal('test');
    });

    it('should return an error', async () => {
      try {
        await service.Update({
          error: 'test-error'
        } as any);
        expect('error').to.be.equal('test-error');
      } catch (error) {
        expect(error.message).to.be.equal('test-error');
      }
    });

  })

  describe('find', () => {

    it('should return a role', async () => {
      const id = uuid();
      const result = await service.find({ id });
      expect(result).to.be.not.undefined;
      expect(result.id).to.be.equal(id);
    });

    it('should return an error', async () => {
      try {
        await service.find({ error: 'test-error' });
        expect('error').to.be.equal('test-error');
      } catch (error) {
        expect(error.message).to.be.equal('test-error');
      }
    });

  })

  describe('findAll', () => {

    it('should return all roles', async () => {
      const result = await service.findAll({ total: 2 } as any);
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

    it('should return removed id role', async () => {
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
