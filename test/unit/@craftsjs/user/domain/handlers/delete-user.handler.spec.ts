import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { DeleteUserHandler } from '../../../../../../lib/@craftsjs/user/domain/handlers/delete-user.handler';
import { UserDomainService } from '../../../../../../lib/@craftsjs/user/domain/services/user.service';
import { DeleteUserCommand } from '../../../../../../lib/@craftsjs/user/application/commands/delete-user.command';

describe('DeleteUserHandler', () => {
  let handler: DeleteUserHandler;
  let testingModule: TestingModule;

  before(async () => {
    const repository = {
      remove: (id) => {
        return Promise.resolve({ id });
      }
    };
    testingModule = await Test.createTestingModule({
      providers: [
        UserDomainService,
        DeleteUserHandler,
      ],
    })
      .overrideProvider(UserDomainService)
      .useValue(repository)
      .compile();
    await testingModule.init();
    handler = testingModule.get<DeleteUserHandler>(DeleteUserHandler);
  });

  after(async () => {
    await testingModule.close();
  });

  it('should be defined', async () => {
    expect(handler).to.be.not.undefined;
  });

  describe('handle', () => {
    it('should return deleted user id', async () => {
      const result = await handler.handle(new DeleteUserCommand({ id: '123456' }));
      expect(result).to.be.not.undefined;
      expect(result.id).to.be.equal('123456');
    });
  })
});
