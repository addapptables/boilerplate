import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { Broker } from '@addapptables/microservice';
import { EditionService } from '../../../../../../lib/@craftsjs/edition';
import { createMockBrokerWithTransferData } from '../../../../../mock/broker.mock';
import { v4 as uuid } from 'uuid';

describe('EditionService', () => {
  let service: EditionService;
  let testingModule: TestingModule;

  before(async () => {
    const broker = createMockBrokerWithTransferData();
    testingModule = await Test.createTestingModule({
      providers: [
        EditionService,
        Broker,
      ],
    })
      .overrideProvider(Broker)
      .useValue(broker)
      .compile();
    await testingModule.init();
    service = testingModule.get<EditionService>(EditionService);
  });

  after(async () => {
    await testingModule.close();
  });

  it('should be defined', async () => {
    expect(service).to.be.not.undefined;
  });

  describe('insert', () => {

    it('should return created edition', async () => {
      const edition = await service.insert({
        isFree: true,
        name: 'testFreeEdition',
      });
      expect(edition).to.be.not.undefined;
      expect(edition.isFree).to.be.equal(true);
      expect(edition.name).to.be.equal('testFreeEdition');
    });

    it('should return an error', async () => {
      try {
        await service.insert({
          isFree: true,
          name: 'testFreeEdition',
          error: 'test-error'
        } as any);
        expect('error').to.be.equal('test-error');
      } catch (error) {
        expect(error.message).to.be.equal('test-error');
      }
    });

  })

  describe('update', () => {

    it('should return updated edition', async () => {
      const edition = await service.Update({
        id: uuid(),
        isFree: true,
        name: 'testFreeEdition',
      });
      expect(edition).to.be.not.undefined;
      expect(edition.isFree).to.be.equal(true);
      expect(edition.name).to.be.equal('testFreeEdition');
    });

    it('should return an error', async () => {
      try {
        await service.Update({
          id: 123456,
          isFree: true,
          name: 'testFreeEdition',
          error: 'test-error'
        } as any);
        expect('error').to.be.equal('test-error');
      } catch (error) {
        expect(error.message).to.be.equal('test-error');
      }
    });

  })

  describe('find', () => {

    it('should return an edition', async () => {
      const edition = await service.find({ id: 12345689 });
      expect(edition).to.be.not.undefined;
      expect(edition.id).to.be.equal(12345689);
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

    it('should return editions', async () => {
      const edition = await service.findAll({ total: 2 } as any);
      expect(edition).to.be.not.undefined;
      expect(edition.total).to.be.equal(2);
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

    it('should return removed id edition', async () => {
      const edition = await service.remove({ id: 1 });
      expect(edition).to.be.not.undefined;
      expect(edition).to.be.equal(1);
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
