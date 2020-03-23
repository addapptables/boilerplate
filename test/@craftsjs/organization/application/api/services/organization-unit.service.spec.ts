import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { Broker } from '@addapptables/microservice';
import { OrganizationUnitService } from '../../../../../../lib/@craftsjs/organization';
import { createMockBrokerWithTransferData } from '../../../../../mock/broker.mock';

describe('OrganizationUnitService', () => {
  let service: OrganizationUnitService;
  let testingModule: TestingModule;

  before(async () => {
    const broker = createMockBrokerWithTransferData();
    testingModule = await Test.createTestingModule({
      providers: [
        OrganizationUnitService,
        Broker,
      ],
    })
      .overrideProvider(Broker)
      .useValue(broker)
      .compile();
    await testingModule.init();
    service = testingModule.get<OrganizationUnitService>(OrganizationUnitService);
  });

  after(async () => {
    await testingModule.close();
  });

  it('should be defined', async () => {
    expect(service).to.be.not.undefined;
  });

  describe('insert', () => {

    it('should return created organization unit', async () => {
      const result = await service.insert({
        name: 'testFree',
      });
      expect(result).to.be.not.undefined;
      expect(result.name).to.be.equal('testFree');
    });

    it('should return an error', async () => {
      try {
        await service.insert({
          name: 'testFree',
          error: 'test-error'
        } as any);
        expect('error').to.be.equal('test-error');
      } catch (error) {
        expect(error.message).to.be.equal('test-error');
      }
    });

  })

  describe('update', () => {

    it('should return updated organization unit', async () => {
      const result = await service.Update({
        id: 123456,
        name: 'testFree',
      });
      expect(result).to.be.not.undefined;
      expect(result.name).to.be.equal('testFree');
    });

    it('should return an error', async () => {
      try {
        await service.Update({
          id: 123456,
          isFree: true,
          name: 'testFree',
          error: 'test-error'
        } as any);
        expect('error').to.be.equal('test-error');
      } catch (error) {
        expect(error.message).to.be.equal('test-error');
      }
    });

  })

  describe('find', () => {

    it('should return an organization unit', async () => {
      const result = await service.find({ id: 12345689 });
      expect(result).to.be.not.undefined;
      expect(result.id).to.be.equal(12345689);
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

    it('should return organization units', async () => {
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

    it('should return removed id organization unit', async () => {
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
