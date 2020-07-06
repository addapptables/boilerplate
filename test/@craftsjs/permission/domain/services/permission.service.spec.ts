import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { PermissionDomainService } from '../../../../../lib/@craftsjs/permission/domain/services/permission.service';
import { PermissionRepository } from '../../../../../lib/@craftsjs/permission/infrastructure/database/repositories/permission.repository';

describe('PermissionDomainService', () => {
  let service: PermissionDomainService;
  let testingModule: TestingModule;

  before(async () => {
    const repository = {
      find: () => {
        return Promise.resolve([{ id: 126456, name: 'Page' }]);
      }
    };
    testingModule = await Test.createTestingModule({
      providers: [
        PermissionDomainService,
        PermissionRepository,
      ],
    })
      .overrideProvider(PermissionRepository)
      .useValue(repository)
      .compile();
    await testingModule.init();
    service = testingModule.get<PermissionDomainService>(PermissionDomainService);
  });

  after(async () => {
    await testingModule.close();
  });

  it('should be defined', async () => {
    expect(service).to.be.not.undefined;
  });

  describe('findAll', () => {
    it('should return all permissions', async () => {
      const result = await service.findAll({});
      expect(result).to.be.not.undefined;
      expect(result).to.be.length(1);
      expect(result).deep.contains({ id: 126456, name: 'Page' });
    });
  })
});
