import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { FindAllRoleHandler } from '../../../../../../lib/@craftsjs/role/domain/handlers/find-all-role.handler';
import { RoleDomainService } from '../../../../../../lib/@craftsjs/role/domain/services/role.service';
import { FindAllRoleQuery } from '../../../../../../lib/@craftsjs/role/application/queries/find-all-role.query';

describe('FindAllRoleHandler', () => {
  let handler: FindAllRoleHandler;
  let testingModule: TestingModule;

  before(async () => {
    const repository = {
      findAll: (_) => {
        return Promise.resolve([{ id: 123456, name: 'test', permissions: [] }]);
      }
    };
    testingModule = await Test.createTestingModule({
      providers: [
        RoleDomainService,
        FindAllRoleHandler,
      ],
    })
      .overrideProvider(RoleDomainService)
      .useValue(repository)
      .compile();
    await testingModule.init();
    handler = testingModule.get<FindAllRoleHandler>(FindAllRoleHandler);
  });

  after(async () => {
    await testingModule.close();
  });

  it('should be defined', async () => {
    expect(handler).to.be.not.undefined;
  });

  describe('handle', () => {
    it('should return all roles', async () => {
      const result = await handler.handle(new FindAllRoleQuery({ skip: 0, take: 10}));
      expect(result).to.be.not.undefined;
      expect(result).to.be.length(1);
      expect(result).deep.contains({ id: 123456, name: 'test', permissions: [] })
    });
  })
});
