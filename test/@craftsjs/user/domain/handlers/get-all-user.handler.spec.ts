import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { FindAllUserHandler } from '../../../../../lib/@craftsjs/user/domain/handlers/find-all-user.handler';
import { UserDomainService } from '../../../../../lib/@craftsjs/user/domain/services/user.service';
import { FindAllUserQuery } from '../../../../../lib/@craftsjs/user/application/queries/find-all-user.query';

describe('FindAllUserHandler', () => {
  let handler: FindAllUserHandler;
  let testingModule: TestingModule;
  const user = {
    name: 'test',
    emailAddress: 'test@test.com',
    userName: 'test',
    surname: 'test',
    roles: [1],
    isStatic: true,
    isDefault: true
  };

  before(async () => {
    const repository = {
      findAll: () => {
        return Promise.resolve([user]);
      }
    };
    testingModule = await Test.createTestingModule({
      providers: [
        UserDomainService,
        FindAllUserHandler,
      ],
    })
      .overrideProvider(UserDomainService)
      .useValue(repository)
      .compile();
    await testingModule.init();
    handler = testingModule.get<FindAllUserHandler>(FindAllUserHandler);
  });

  after(async () => {
    await testingModule.close();
  });

  it('should be defined', async () => {
    expect(handler).to.be.not.undefined;
  });

  describe('handle', () => {
    it('should return all found users', async () => {
      const result = await handler.handle(new FindAllUserQuery({ skip: 0, take: 10 }));
      expect(result).to.be.not.undefined;
      expect(result).to.be.length(1);
      expect(result).deep.contains(user);
    });
  })
});
