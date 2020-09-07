import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { Broker } from '@addapptables/microservice';
import { TenantService } from '../../../../../../../lib/@craftsjs/tenant/application/api/services/tenant.service';
import { createMockBrokerWithTransferData } from '../../../../../../unit/mock/broker.mock';

describe('TenantService', () => {
  let service: TenantService;
  let testingModule: TestingModule;
  const tenant = {
    id: "1235489",
    isActive: true,
    name: 'test',
    subDomain: 'test'
  }

  before(async () => {
    const broker = createMockBrokerWithTransferData();
    testingModule = await Test.createTestingModule({
      providers: [
        TenantService,
        Broker,
      ],
    })
      .overrideProvider(Broker)
      .useValue(broker)
      .compile();
    await testingModule.init();
    service = testingModule.get<TenantService>(TenantService);
  });

  after(async () => {
    await testingModule.close();
  });

  it('should be defined', async () => {
    expect(service).to.be.not.undefined;
  });

  describe('insert', () => {

    it('should return created tenant', async () => {
      const result = await service.insert(tenant as any);
      expect(result).to.be.not.undefined;
      expect(result).deep.contains(tenant);
    });

    it('should return an error', async () => {
      try {
        await service.insert({
          error: 'test-error'
        } as any);
        expect('error').to.be.equal('test-error');
      } catch (error) {
        expect(error.message).to.be.equal('test-error');
      }
    });

  })

  describe('update', () => {

    it('should return updated tenant', async () => {
      const result = await service.update({ id: "123456", ...tenant } as any);
      expect(result).to.be.not.undefined;
      expect(result).deep.contains({ id: "123456", ...tenant });
    });

    it('should return an error', async () => {
      try {
        await service.update({
          error: 'test-error'
        } as any);
        expect('error').to.be.equal('test-error');
      } catch (error) {
        expect(error.message).to.be.equal('test-error');
      }
    });

  })

  describe('find', () => {

    it('should return found tenant', async () => {
      const result = await service.find({ id: "12345689" }) as any;
      expect(result).to.be.not.undefined;
      expect(result.id).to.be.equal("12345689");
    });

    it('should return an error', async () => {
      try {
        await service.find({ error: 'test-error' } as any);
        expect('error').to.be.equal('test-error');
      } catch (error) {
        expect(error.message).to.be.equal('test-error');
      }
    });

  })

  describe('findAll', () => {

    it('should return all found tenants', async () => {
      const result = await service.findAll({ total: 2 } as any);
      expect(result).to.be.not.undefined;
      expect(result.total).to.be.equal(2);
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

  describe('remove', () => {

    it('should return removed tenant id', async () => {
      const result = await service.remove({ id: "1" });
      expect(result).to.be.not.undefined;
      expect(result).to.deep.equal({ id: "1" });
    });

    it('should return an error', async () => {
      try {
        await service.remove({ error: 'test-error' } as any);
        expect('error').to.be.equal('test-error');
      } catch (error) {
        expect(error.message).to.be.equal('test-error');
      }
    });

  })

});
