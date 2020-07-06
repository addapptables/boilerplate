import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { FindOneRoleHandler } from '../../../../../lib/@craftsjs/role/domain/handlers/find-one-role.handler';
import { RoleDomainService } from '../../../../../lib/@craftsjs/role/domain/services/role.service';
import { FindOneRoleQuery } from '../../../../../lib/@craftsjs/role/application/queries/find-one-role.query';

describe('FindOneRoleHandler', () => {
  let handler: FindOneRoleHandler;
  let testingModule: TestingModule;

  before(async () => {
    const repository = {
      findOneByQuery: (input) => {
        return Promise.resolve({ id: input.id, name: 'test', permissions: [] });
      }
    };
    testingModule = await Test.createTestingModule({
      providers: [
        RoleDomainService,
        FindOneRoleHandler,
      ],
    })
      .overrideProvider(RoleDomainService)
      .useValue(repository)
      .compile();
    await testingModule.init();
    handler = testingModule.get<FindOneRoleHandler>(FindOneRoleHandler);
  });

  after(async () => {
    await testingModule.close();
  });

  it('should be defined', async () => {
    expect(handler).to.be.not.undefined;
  });

  describe('handle', () => {
    it('should return a role', async () => {
      const result = await handler.handle(new FindOneRoleQuery({ id: 1234561 }));
      expect(result).to.be.not.undefined;
      expect(result.id).to.be.equal(1234561);
      expect(result.name).to.be.equal('test');
    });
  })
});
