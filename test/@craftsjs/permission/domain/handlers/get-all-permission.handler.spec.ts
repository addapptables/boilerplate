import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { PermissionDomainService } from '../../../../../lib/@craftsjs/permission/domain/services/permission.service';
import { GetAllPermissionHandler } from '../../../../../lib/@craftsjs/permission/domain/handlers/get-all-permission.handler';
import { GetAllPermissionQuery } from '../../../../../lib/@craftsjs/permission/application/queries/get-all-permission.query';

describe('GetAllPermissionHandler', () => {
  let handler: GetAllPermissionHandler;
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
        GetAllPermissionHandler,
      ],
    })
      .overrideProvider(PermissionDomainService)
      .useValue(repository)
      .compile();
    await testingModule.init();
    handler = testingModule.get<GetAllPermissionHandler>(GetAllPermissionHandler);
  });

  after(async () => {
    await testingModule.close();
  });

  it('should be defined', async () => {
    expect(handler).to.be.not.undefined;
  });

  describe('handle', () => {
    it('should return all permissions', async () => {
      const edition = await handler.handle(new GetAllPermissionQuery({}));
      expect(edition).to.be.length(1);
      expect(edition).deep.contains({ id: 123456, name: 'test' });
    });
  })
});
