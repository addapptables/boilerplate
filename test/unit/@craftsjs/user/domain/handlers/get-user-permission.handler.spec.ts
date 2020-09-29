import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { GetUserPermissionHandler } from '../../../../../../lib/@craftsjs/user/domain/handlers/get-user-permission.handler';
import { UserDomainService } from '../../../../../../lib/@craftsjs/user/domain/services/user.service';
import { GetUserPermissionsQuery } from '../../../../../../lib/@craftsjs/user/application/queries/get-user-permissions.query';

describe('GetUserPermissionHandler', () => {
  let handler: GetUserPermissionHandler;
  let testingModule: TestingModule;

  before(async () => {
    const repository = {
      getUserPermissions: () => {
        return Promise.resolve(['Page']);
      }
    };
    testingModule = await Test.createTestingModule({
      providers: [
        UserDomainService,
        GetUserPermissionHandler,
      ],
    })
      .overrideProvider(UserDomainService)
      .useValue(repository)
      .compile();
    await testingModule.init();
    handler = testingModule.get<GetUserPermissionHandler>(GetUserPermissionHandler);
  });

  after(async () => {
    await testingModule.close();
  });

  it('should be defined', async () => {
    expect(handler).to.be.not.undefined;
  });

  describe('handle', () => {
    it('should return found user', async () => {
      const result = await handler.handle(new GetUserPermissionsQuery({ id: '123456' }));
      expect(result).to.be.not.undefined;
      expect(result).to.be.length(1);
      expect(result).deep.contains('Page');
    });
  })
});
