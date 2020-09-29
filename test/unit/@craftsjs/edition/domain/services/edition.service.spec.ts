import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { EditionDomainService } from '../../../../../../lib/@craftsjs/edition';
import { EditionRepository } from '../../../../../../lib/@craftsjs/edition/infrastructure/database/repositories/edition.repository';
import { afterEach } from 'mocha';

describe('EditionDomainService', () => {
  let service: EditionDomainService;
  let testingModule: TestingModule;
  let sandbox: sinon.SinonSandbox;

  before(async () => {
    const repository = {
      findOne: (input) => {
        return Promise.resolve(input.where?.name?.return || input.where?.id?.return);
      },
      save: (input) => Promise.resolve(input),
      update: (_, input) => Promise.resolve(input)
    };
    testingModule = await Test.createTestingModule({
      providers: [
        EditionDomainService,
        EditionRepository,
      ],
    })
      .overrideProvider(EditionRepository)
      .useValue(repository)
      .compile();
    await testingModule.init();
    service = testingModule.get<EditionDomainService>(EditionDomainService);
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

    it('should return created edition', async () => {
      const edition = await service.insert({
        isFree: true,
        name: 'testFreeEdition',
      } as any);
      expect(edition).to.be.not.undefined;
      expect(edition.isFree).to.be.equal(true);
      expect(edition.name).to.be.equal('testFreeEdition');
    });

    it('should return an error', async () => {
      try {
        await service.insert({
          isFree: true,
          name: { return: { name: 'exists' } }
        } as any);
        expect('error').to.be.equal('test-error');
      } catch (error) {
        expect(error.message).to.be.equal('edition.existsName');
      }
    });

  })

  describe('update', () => {

    it('should return updated edition', async () => {
      const edition = await service.update({
        id: { return: { name: 'name' } },
        isFree: true,
        name: 'name',
      } as any);
      expect(edition).to.be.not.undefined;
      expect(edition.isFree).to.be.equal(true);
    });

    it('should return an error', async () => {
      try {
        sandbox.stub((service as any).editionRepository, 'findOne').returns({ name: 'name' })
        await service.update({
          id: 126459816894,
          isFree: true,
          name: 'name2'
        } as any);
        expect('error').to.be.equal('test-error');
      } catch (error) {
        expect(error.message).to.be.equal('edition.existsName');
      }
    });
  })

  describe('findOneByQuery', () => {
    it('should return an edition', async () => {
      sandbox.stub((service as any).editionRepository, 'findOne').returns({ name: 'testFreeEdition', isFree: true })
      const edition = await service.findOneByQuery({} as any);
      expect(edition).to.be.not.undefined;
      expect(edition.isFree).to.be.equal(true);
      expect(edition.name).to.be.equal('testFreeEdition');
    });
  })
});
