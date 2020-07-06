import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { EditionDomainService } from '../../../../../lib/@craftsjs/edition';
import { UpdateEditionHandler } from '../../../../../lib/@craftsjs/edition/domain/handlers/update-edition.handler';
import { UpdateEditionCommand } from '../../../../../lib/@craftsjs/edition/application/commands/update-edition.command';

describe('UpdateEditionHandler', () => {
  let handler: UpdateEditionHandler;
  let testingModule: TestingModule;

  before(async () => {
    const repository = {
      update: (input) => {
        return Promise.resolve(input);
      }
    };
    testingModule = await Test.createTestingModule({
      providers: [
        EditionDomainService,
        UpdateEditionHandler,
      ],
    })
      .overrideProvider(EditionDomainService)
      .useValue(repository)
      .compile();
    await testingModule.init();
    handler = testingModule.get<UpdateEditionHandler>(UpdateEditionHandler);
  });

  after(async () => {
    await testingModule.close();
  });

  it('should be defined', async () => {
    expect(handler).to.be.not.undefined;
  });

  describe('handle', () => {
    it('should return updated edition', async () => {
      const edition = await handler.handle(new UpdateEditionCommand({ id: 123546, isFree: true, name: 'testFreeEdition' }));
      expect(edition.isFree).to.be.equal(true);
      expect(edition.name).to.be.equal('testFreeEdition');
      expect(edition.id).to.be.equal(123546);
    });
  })
});
