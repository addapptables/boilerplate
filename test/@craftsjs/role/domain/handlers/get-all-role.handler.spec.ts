import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { GetAllRoleHandler } from '../../../../../lib/@craftsjs/role/domain/handlers/get-all-role.handler';
import { RoleDomainService } from '../../../../../lib/@craftsjs/role/domain/services/role.service';
import { GetAllRoleQuery } from '../../../../../lib/@craftsjs/role/application/queries/get-all-role.query';

describe('GetAllRoleHandler', () => {
  let handler: GetAllRoleHandler;
  let testingModule: TestingModule;

  before(async () => {
    const repository = {
      getAll: (input) => {
        return Promise.resolve([{ id: 123456, name: 'test', permissions: [] }]);
      }
    };
    testingModule = await Test.createTestingModule({
      providers: [
        RoleDomainService,
        GetAllRoleHandler,
      ],
    })
      .overrideProvider(RoleDomainService)
      .useValue(repository)
      .compile();
    await testingModule.init();
    handler = testingModule.get<GetAllRoleHandler>(GetAllRoleHandler);
  });

  after(async () => {
    await testingModule.close();
  });

  it('should be defined', async () => {
    expect(handler).to.be.not.undefined;
  });

  describe('handle', () => {
    it('should return all roles', async () => {
      const result = await handler.handle(new GetAllRoleQuery({}));
      expect(result).to.be.not.undefined;
      expect(result).to.be.length(1);
      expect(result).deep.contains({ id: 123456, name: 'test', permissions: [] })
    });
  })
});
