import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { EditionDomainService } from '../../../../../lib/@craftsjs/edition';
import { GetAllEditionHandler } from '../../../../../lib/@craftsjs/edition/domain/handlers/get-all-edition.handler';
import { GetAllEditionQuery } from '../../../../../lib/@craftsjs/edition/application/queries/get-all-edition.query';

describe('GetAllEditionHandler', () => {
  let handler: GetAllEditionHandler;
  let testingModule: TestingModule;

  before(async () => {
    const repository = {
      getAll: () => {
        return Promise.resolve({ total: 1, data: [{ name: 'test' }] });
      }
    };
    testingModule = await Test.createTestingModule({
      providers: [
        EditionDomainService,
        GetAllEditionHandler,
      ],
    })
      .overrideProvider(EditionDomainService)
      .useValue(repository)
      .compile();
    await testingModule.init();
    handler = testingModule.get<GetAllEditionHandler>(GetAllEditionHandler);
  });

  after(async () => {
    await testingModule.close();
  });

  it('should be defined', async () => {
    expect(handler).to.be.not.undefined;
  });

  describe('handle', () => {
    it('should return multiple editions', async () => {
      const edition = await handler.handle(new GetAllEditionQuery({}));
      expect(edition.total).to.be.equal(1);
      expect(edition.data).to.be.length(1);
    });
  })
});
