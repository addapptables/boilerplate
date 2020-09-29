import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { CreateRoleHandler } from '../../../../../../lib/@craftsjs/role/domain/handlers/create-role.handler';
import { RoleDomainService } from '../../../../../../lib/@craftsjs/role/domain/services/role.service';
import { CreateRoleCommand } from '../../../../../../lib/@craftsjs/role/application/commands/create-role.command';
import { v4 as uuid } from 'uuid';

describe('CreateRoleHandler', () => {
  let handler: CreateRoleHandler;
  let testingModule: TestingModule;

  before(async () => {
    const repository = {
      insert: (input) => {
        return Promise.resolve(input);
      }
    };
    testingModule = await Test.createTestingModule({
      providers: [
        RoleDomainService,
        CreateRoleHandler,
      ],
    })
      .overrideProvider(RoleDomainService)
      .useValue(repository)
      .compile();
    await testingModule.init();
    handler = testingModule.get<CreateRoleHandler>(CreateRoleHandler);
  });

  after(async () => {
    await testingModule.close();
  });

  it('should be defined', async () => {
    expect(handler).to.be.not.undefined;
  });

  describe('handle', () => {
    it('should return created role', async () => {
      const id = uuid();
      const result = await handler.handle(new CreateRoleCommand({ id: 'asd', name: 'test', permissions: [id] }));
      expect(result).to.be.not.undefined;
      expect(result.name).to.be.equal('test');
      expect(result.isStatic).to.be.equal(false);
      expect(result.isDefault).to.be.equal(false);
      expect(result.permissions).to.be.length(1);
    });
  })
});
