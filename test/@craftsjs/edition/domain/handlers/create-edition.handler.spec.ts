import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { EditionDomainService } from '../../../../../lib/@craftsjs/edition';
import { CreateEditionHandler } from '../../../../../lib/@craftsjs/edition/domain/handlers/create-edition.handler';
import { CreateEditionCommand } from '../../../../../lib/@craftsjs/edition/application/commands/create-edition.command';

describe('CreateEditionHandler', () => {
  let handler: CreateEditionHandler;
  let testingModule: TestingModule;

  before(async () => {
    const repository = {
      insert: (input) => {
        return Promise.resolve(input);
      }
    };
    testingModule = await Test.createTestingModule({
      providers: [
        EditionDomainService,
        CreateEditionHandler,
      ],
    })
      .overrideProvider(EditionDomainService)
      .useValue(repository)
      .compile();
    await testingModule.init();
    handler = testingModule.get<CreateEditionHandler>(CreateEditionHandler);
  });

  after(async () => {
    await testingModule.close();
  });

  it('should be defined', async () => {
    expect(handler).to.be.not.undefined;
  });

  describe('handle', () => {
    it('should return created edition', async () => {
      const edition = await handler.handle(new CreateEditionCommand({ isFree: true, name: 'testFreeEdition' }));
      expect(edition.isFree).to.be.equal(true);
      expect(edition.name).to.be.equal('testFreeEdition');
    });
  })
});
