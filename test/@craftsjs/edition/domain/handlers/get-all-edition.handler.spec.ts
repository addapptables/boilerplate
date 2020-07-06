import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { EditionDomainService } from '../../../../../lib/@craftsjs/edition';
import { FindAllEditionHandler } from '../../../../../lib/@craftsjs/edition/domain/handlers/find-all-edition.handler';
import { findAllEditionQuery } from '../../../../../lib/@craftsjs/edition/application/queries/get-all-edition.query';

describe('findAllEditionHandler', () => {
  let handler: FindAllEditionHandler;
  let testingModule: TestingModule;

  before(async () => {
    const repository = {
      findAll: () => {
        return Promise.resolve({ total: 1, data: [{ name: 'test' }] });
      }
    };
    testingModule = await Test.createTestingModule({
      providers: [
        EditionDomainService,
        FindAllEditionHandler,
      ],
    })
      .overrideProvider(EditionDomainService)
      .useValue(repository)
      .compile();
    await testingModule.init();
    handler = testingModule.get<FindAllEditionHandler>(FindAllEditionHandler);
  });

  after(async () => {
    await testingModule.close();
  });

  it('should be defined', async () => {
    expect(handler).to.be.not.undefined;
  });

  describe('handle', () => {
    it('should return multiple editions', async () => {
      const edition = await handler.handle(new findAllEditionQuery({}));
      expect(edition.total).to.be.equal(1);
      expect(edition.data).to.be.length(1);
    });
  })
});
