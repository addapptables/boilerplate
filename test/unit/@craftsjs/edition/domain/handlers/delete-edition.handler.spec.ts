import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { EditionDomainService } from '../../../../../../lib/@craftsjs/edition';
import { DeleteEditionHandler } from '../../../../../../lib/@craftsjs/edition/domain/handlers/delete-edition.handler';
import { DeleteEditionCommand } from '../../../../../../lib/@craftsjs/edition/application/commands/delete-edition.command';

describe('DeleteEditionHandler', () => {
  let handler: DeleteEditionHandler;
  let testingModule: TestingModule;

  before(async () => {
    const repository = {
      remove: (input) => {
        return Promise.resolve({ id: input });
      }
    };
    testingModule = await Test.createTestingModule({
      providers: [
        EditionDomainService,
        DeleteEditionHandler,
      ],
    })
      .overrideProvider(EditionDomainService)
      .useValue(repository)
      .compile();
    await testingModule.init();
    handler = testingModule.get<DeleteEditionHandler>(DeleteEditionHandler);
  });

  after(async () => {
    await testingModule.close();
  });

  it('should be defined', async () => {
    expect(handler).to.be.not.undefined;
  });

  describe('handle', () => {
    it('should return deleted id edition', async () => {
      const edition = await handler.handle(new DeleteEditionCommand({ id: '123456789' }));
      expect(edition.id).to.be.equal('123456789');
    });
  })
});
