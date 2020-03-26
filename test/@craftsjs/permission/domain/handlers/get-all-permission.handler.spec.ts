import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { PermissionDomainService } from '../../../../../lib/@craftsjs/permission/domain/services/permission.service';
import { FindAllPermissionHandler } from '../../../../../lib/@craftsjs/permission/domain/handlers/find-all-permission.handler';
import { FindAllPermissionQuery } from '../../../../../lib/@craftsjs/permission/application/queries/find-all-permission.query';

describe('findAllPermissionHandler', () => {
  let handler: FindAllPermissionHandler;
  let testingModule: TestingModule;

  before(async () => {
    const repository = {
      findAll: () => {
        return Promise.resolve([{ id: 123456, name: 'test' }]);
      }
    };
    testingModule = await Test.createTestingModule({
      providers: [
        PermissionDomainService,
        FindAllPermissionHandler,
      ],
    })
      .overrideProvider(PermissionDomainService)
      .useValue(repository)
      .compile();
    await testingModule.init();
    handler = testingModule.get<FindAllPermissionHandler>(FindAllPermissionHandler);
  });

  after(async () => {
    await testingModule.close();
  });

  it('should be defined', async () => {
    expect(handler).to.be.not.undefined;
  });

  describe('handle', () => {
    it('should return all permissions', async () => {
      const edition = await handler.handle(new FindAllPermissionQuery({}));
      expect(edition).to.be.length(1);
      expect(edition).deep.contains({ id: 123456, name: 'test' });
    });
  })
});
