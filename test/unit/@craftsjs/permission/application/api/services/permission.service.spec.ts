import { Test, TestingModule } from '@nestjs/testing';
import * as sinon from 'sinon';
import { expect } from 'chai';
import { Broker } from '@addapptables/microservice';
import { PermissionService } from '../../../../../../../lib/@craftsjs/permission';
import { createMockBrokerWithTransferData } from '../../../../../../unit/mock/broker.mock';
import * as mapper from '../../../../../../../lib/@craftsjs/utils/mapper.util';

describe('PermissionService', () => {
  let service: PermissionService;
  let testingModule: TestingModule;
  let sandbox: sinon.SinonSandbox;

  before(async () => {
    const broker = createMockBrokerWithTransferData();
    testingModule = await Test.createTestingModule({
      providers: [
        PermissionService,
        Broker,
      ],
    })
      .overrideProvider(Broker)
      .useValue(broker)
      .compile();
    await testingModule.init();
    service = testingModule.get<PermissionService>(PermissionService);
  });

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  })

  after(async () => {
    await testingModule.close();
  });

  afterEach(() => {
    sandbox.restore();
  })

  it('should be defined', async () => {
    expect(service).to.be.not.undefined;
  });

  describe('findAll', () => {

    it('should return all permissions', async () => {
      sandbox.stub(mapper, 'mapper').returns([{ name: 'Page', id: 1232165 }])
      const result = await service.findAll({});
      expect(result).to.be.not.undefined;
      expect(result).to.be.length(1);
      expect(result).deep.contains({ name: 'Page', id: 1232165 });
    });

    it('should return an error', async () => {
      try {
        await service.findAll({ error: 'test-error' } as any);
        expect('error').to.be.equal('test-error');
      } catch (error) {
        expect(error.message).to.be.equal('test-error');
      }
    });

  })

});
