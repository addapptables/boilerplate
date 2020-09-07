import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { EditionDomainService } from '../../../../../../lib/@craftsjs/edition';
import { FindOneEditionHandler } from '../../../../../../lib/@craftsjs/edition/domain/handlers/find-one-edition.handler';
import { FindOneEditionQuery } from '../../../../../../lib/@craftsjs/edition/application/queries/find-one-edition.query';

describe('FindOneEditionHandler', () => {
  let handler: FindOneEditionHandler;
  let testingModule: TestingModule;

  before(async () => {
    const repository = {
      findOneByQuery: (input) => {
        return Promise.resolve({ id: input.id, name: 'test' });
      }
    };
    testingModule = await Test.createTestingModule({
      providers: [
        EditionDomainService,
        FindOneEditionHandler,
      ],
    })
      .overrideProvider(EditionDomainService)
      .useValue(repository)
      .compile();
    await testingModule.init();
    handler = testingModule.get<FindOneEditionHandler>(FindOneEditionHandler);
  });

  after(async () => {
    await testingModule.close();
  });

  it('should be defined', async () => {
    expect(handler).to.be.not.undefined;
  });

  describe('handle', () => {
    it('should return an edition', async () => {
      const edition = await handler.handle(new FindOneEditionQuery({ id: '123456789' }));
      expect(edition.id).to.be.equal('123456789');
      expect(edition.name).to.be.equal('test');
    });
  })
});
