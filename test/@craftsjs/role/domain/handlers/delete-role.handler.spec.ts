import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { DeleteRoleHandler } from '../../../../../lib/@craftsjs/role/domain/handlers/delete-role.handler';
import { RoleDomainService } from '../../../../../lib/@craftsjs/role/domain/services/role.service';
import { DeleteRoleCommand } from '../../../../../lib/@craftsjs/role/application/commands/delete-role.command';

describe('DeleteRoleHandler', () => {
  let handler: DeleteRoleHandler;
  let testingModule: TestingModule;

  before(async () => {
    const repository = {
      remove: (id) => {
        return Promise.resolve({ id });
      }
    };
    testingModule = await Test.createTestingModule({
      providers: [
        RoleDomainService,
        DeleteRoleHandler,
      ],
    })
      .overrideProvider(RoleDomainService)
      .useValue(repository)
      .compile();
    await testingModule.init();
    handler = testingModule.get<DeleteRoleHandler>(DeleteRoleHandler);
  });

  after(async () => {
    await testingModule.close();
  });

  it('should be defined', async () => {
    expect(handler).to.be.not.undefined;
  });

  describe('handle', () => {
    it('should return deleted id organization unit', async () => {
      const result = await handler.handle(new DeleteRoleCommand({ id: 1234561 }));
      expect(result).to.be.not.undefined;
      expect(result.id).to.be.equal(1234561);
    });
  })
});
