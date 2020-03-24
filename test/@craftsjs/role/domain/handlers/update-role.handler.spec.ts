import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { UpdateRoleHandler } from '../../../../../lib/@craftsjs/role/domain/handlers/update-role.handler';
import { RoleDomainService } from '../../../../../lib/@craftsjs/role/domain/services/role.service';
import { UpdateRoleCommand } from '../../../../../lib/@craftsjs/role/application/commands/update-role.command';
import * as uuid from 'uuid/v4';

describe('UpdateRoleHandler', () => {
  let handler: UpdateRoleHandler;
  let testingModule: TestingModule;

  before(async () => {
    const repository = {
      update: (input) => {
        return Promise.resolve(input);
      }
    };
    testingModule = await Test.createTestingModule({
      providers: [
        RoleDomainService,
        UpdateRoleHandler,
      ],
    })
      .overrideProvider(RoleDomainService)
      .useValue(repository)
      .compile();
    await testingModule.init();
    handler = testingModule.get<UpdateRoleHandler>(UpdateRoleHandler);
  });

  after(async () => {
    await testingModule.close();
  });

  it('should be defined', async () => {
    expect(handler).to.be.not.undefined;
  });

  describe('handle', () => {
    it('should return updated role', async () => {
      const permissionId = uuid();
      const result = await handler.handle(new UpdateRoleCommand({ id: uuid(), name: 'test', permissions: [permissionId] }));
      expect(result).to.be.not.undefined;
      expect(result.name).to.be.equal('test');
      expect(result.permissions).to.be.length(1);
      const creationTime = result.permissions[0].creationTime;
      const id = result.permissions[0].id;
      expect(result.permissions).deep.contains({ id, isGranted: true, permissionId, creationTime });
    });
  })
});
