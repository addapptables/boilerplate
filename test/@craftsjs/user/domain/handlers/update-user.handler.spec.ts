import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { UpdateUserHandler } from '../../../../../lib/@craftsjs/user/domain/handlers/update-user.handler';
import { UserDomainService } from '../../../../../lib/@craftsjs/user/domain/services/user.service';
import { UpdateUserCommand } from '../../../../../lib/@craftsjs/user/application/commands/update-user.command';
import { v4 as uuid } from 'uuid';

describe('UpdateUserHandler', () => {
  let handler: UpdateUserHandler;
  let testingModule: TestingModule;

  before(async () => {
    const repository = {
      update: (input) => {
        return Promise.resolve(input);
      }
    };
    testingModule = await Test.createTestingModule({
      providers: [
        UserDomainService,
        UpdateUserHandler,
      ],
    })
      .overrideProvider(UserDomainService)
      .useValue(repository)
      .compile();
    await testingModule.init();
    handler = testingModule.get<UpdateUserHandler>(UpdateUserHandler);
  });

  after(async () => {
    await testingModule.close();
  });

  it('should be defined', async () => {
    expect(handler).to.be.not.undefined;
  });

  describe('handle', () => {
    it('should return updated user', async () => {
      const roleId = uuid();
      const user = {
        name: 'test',
        emailAddress: 'test@test.com',
        userName: 'test',
        surname: 'test',
        roles: [roleId],
        isStatic: true,
        isDefault: true
      };
      const result = await handler.handle(new UpdateUserCommand(user as any));
      expect(result).to.be.not.undefined;
      expect(result.name).to.be.equal('test');
      expect(result.roles).to.be.length(1);
      const id = result.roles[0].id;
      const creationTime = result.roles[0].creationTime;
      expect(result.roles).deep.contains({ id, roleId, creationTime });
    });
  })
});
