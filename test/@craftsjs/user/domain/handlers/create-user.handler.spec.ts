import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { CreateUserHandler } from '../../../../../lib/@craftsjs/user/domain/handlers/create-user.handler';
import { UserDomainService } from '../../../../../lib/@craftsjs/user/domain/services/user.service';
import { CreateUserCommand } from '../../../../../lib/@craftsjs/user/application/commands/create-user.command';
import { SecurityService } from '../../../../../lib/@craftsjs/security';

describe('CreateUserHandler', () => {
  let handler: CreateUserHandler;
  let testingModule: TestingModule;

  before(async () => {
    const repository = {
      insert: (input) => {
        return Promise.resolve(input);
      }
    };
    testingModule = await Test.createTestingModule({
      providers: [
        UserDomainService,
        CreateUserHandler,
        SecurityService,
      ],
    })
      .overrideProvider(UserDomainService)
      .useValue(repository)
      .compile();
    await testingModule.init();
    handler = testingModule.get<CreateUserHandler>(CreateUserHandler);
  });

  after(async () => {
    await testingModule.close();
  });

  it('should be defined', async () => {
    expect(handler).to.be.not.undefined;
  });

  describe('handle', () => {
    it('should return created user', async () => {
      const user = {
        name: 'test',
        emailAddress: 'test@test.com',
        userName: 'test',
        surname: 'test',
        roles: [1],
        isStatic: true,
        isDefault: true
      };
      const result = await handler.handle(new CreateUserCommand(user as any));
      expect(result).to.be.not.undefined;
      expect(result.name).to.be.equal('test');
      expect(result.isStatic).to.be.equal(false);
      expect(result.roles).to.be.length(1);
      const creationTime = result.roles[0].creationTime;
      expect(result.roles).deep.contains({ roleId: 1, creationTime });
    });
  })
});
