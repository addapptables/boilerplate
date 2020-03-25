import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { findAllRoleHandler } from '../../../../../lib/@craftsjs/role/domain/handlers/get-all-role.handler';
import { RoleDomainService } from '../../../../../lib/@craftsjs/role/domain/services/role.service';
import { findAllRoleQuery } from '../../../../../lib/@craftsjs/role/application/queries/get-all-role.query';

describe('findAllRoleHandler', () => {
  let handler: findAllRoleHandler;
  let testingModule: TestingModule;

  before(async () => {
    const repository = {
      findAll: (input) => {
        return Promise.resolve([{ id: 123456, name: 'test', permissions: [] }]);
      }
    };
    testingModule = await Test.createTestingModule({
      providers: [
        RoleDomainService,
        findAllRoleHandler,
      ],
    })
      .overrideProvider(RoleDomainService)
      .useValue(repository)
      .compile();
    await testingModule.init();
    handler = testingModule.get<findAllRoleHandler>(findAllRoleHandler);
  });

  after(async () => {
    await testingModule.close();
  });

  it('should be defined', async () => {
    expect(handler).to.be.not.undefined;
  });

  describe('handle', () => {
    it('should return all roles', async () => {
      const result = await handler.handle(new findAllRoleQuery({}));
      expect(result).to.be.not.undefined;
      expect(result).to.be.length(1);
      expect(result).deep.contains({ id: 123456, name: 'test', permissions: [] })
    });
  })
});
