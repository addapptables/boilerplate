import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { findAllUserHandler } from '../../../../../lib/@craftsjs/user/domain/handlers/get-all-user.handler';
import { UserDomainService } from '../../../../../lib/@craftsjs/user/domain/services/user.service';
import { findAllUserQuery } from '../../../../../lib/@craftsjs/user/application/queries/get-all-user.query';

describe('findAllUserHandler', () => {
  let handler: findAllUserHandler;
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
        findAllUserHandler,
      ],
    })
      .overrideProvider(UserDomainService)
      .useValue(repository)
      .compile();
    await testingModule.init();
    handler = testingModule.get<findAllUserHandler>(findAllUserHandler);
  });

  after(async () => {
    await testingModule.close();
  });

  it('should be defined', async () => {
    expect(handler).to.be.not.undefined;
  });

  describe('handle', () => {
    it('should return all found users', async () => {
      const result = await handler.handle(new findAllUserQuery({ skip: 0, take: 10 }));
      expect(result).to.be.not.undefined;
      expect(result).to.be.length(1);
      expect(result).deep.contains(user);
    });
  })
});
