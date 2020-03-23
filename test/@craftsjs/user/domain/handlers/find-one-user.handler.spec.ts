import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { FindOneUserHandler } from '../../../../../lib/@craftsjs/user/domain/handlers/find-one-user.handler';
import { UserDomainService } from '../../../../../lib/@craftsjs/user/domain/services/user.service';
import { FindOneUserQuery } from '../../../../../lib/@craftsjs/user/application/queries/find-one-user.query';

describe('FindOneUserHandler', () => {
  let handler: FindOneUserHandler;
  let testingModule: TestingModule;

  before(async () => {
    const repository = {
      findOneByQuery: (data) => {
        return Promise.resolve({ id: data.id });
      }
    };
    testingModule = await Test.createTestingModule({
      providers: [
        UserDomainService,
        FindOneUserHandler,
      ],
    })
      .overrideProvider(UserDomainService)
      .useValue(repository)
      .compile();
    await testingModule.init();
    handler = testingModule.get<FindOneUserHandler>(FindOneUserHandler);
  });

  after(async () => {
    await testingModule.close();
  });

  it('should be defined', async () => {
    expect(handler).to.be.not.undefined;
  });

  describe('handle', () => {
    it('should return found user', async () => {
      const result = await handler.handle(new FindOneUserQuery({ id: 123456 }));
      expect(result).to.be.not.undefined;
      expect(result.id).to.be.equal(123456);
    });
  })
});
