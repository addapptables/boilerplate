import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { Broker } from '@addapptables/microservice';
import { EditionService } from '../../../../../../../lib/@craftsjs/edition';
import { createMockBrokerWithTransferData } from '../../../../../../unit/mock/broker.mock';
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
      } as any);
      expect(edition).to.be.not.undefined;
      expect(edition.isFree).to.be.equal(true);
      expect(edition.name).to.be.equal('testFreeEdition');
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
  })

  describe('find', () => {

    it('should return an edition', async () => {
      const edition = await service.find({ id: "12345689" });
      expect(edition).to.be.not.undefined;
      expect(edition.id).to.be.equal("12345689");
    });

  })

  describe('findAll', () => {

    it('should return editions', async () => {
      const edition = await service.findAll({ total: 2 } as any);
      expect(edition).to.be.not.undefined;
      expect(edition.total).to.be.equal(2);
    });

  })

  describe('remove', () => {

    it('should return removed id edition', async () => {
      const edition = await service.remove({ id: "1" });
      expect(edition).to.be.not.undefined;
      expect(edition).to.deep.equal({ id: "1" })
    });

  })

});
