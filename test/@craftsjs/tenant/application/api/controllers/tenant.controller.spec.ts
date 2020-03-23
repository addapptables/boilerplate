import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as sinon from 'sinon';
import { expect } from 'chai';
import { Server } from 'http';
import * as request from 'supertest';
import { Broker } from '@addapptables/microservice';
import { TenantController } from '../../../../../../lib/@craftsjs/tenant/application/api/controllers/tenant.controller';
import { createMockBrokerWithTransferData } from '../../../../../mock/broker.mock';
import { AuthenticatedGuard } from '../../../../../../lib/@craftsjs/auth/guard/authentication.guard';
import { TenantService } from '../../../../../../lib/@craftsjs/tenant/application/api/services/tenant.service';

describe('TenantController', () => {

  let controller: TenantController;
  let app: INestApplication;
  let server: Server;
  let sandbox: sinon.SinonSandbox;
  const tenant = {
    id: 1235489,
    isActive: true,
    name: 'test',
    subDomain: 'test'
  }

  before(async () => {
    const broker = createMockBrokerWithTransferData();
    const guard = () => ({ canActivate: () => true });
    const module = await Test.createTestingModule({
      controllers: [
        TenantController,
      ],
      providers: [
        TenantService,
        AuthenticatedGuard,
        Broker
      ]
    })
      .overrideProvider(Broker)
      .useValue(broker)
      .overrideGuard(AuthenticatedGuard)
      .useValue(guard)
      .compile();
    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: true, transformOptions: { excludeExtraneousValues: true } }));
    server = app.getHttpServer()
    await app.init();
    controller = app.get<TenantController>(TenantController);
  });

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  })

  after(async () => {
    await app.close();
  });

  afterEach(() => {
    sandbox.restore();
  })

  it('should be defined', async () => {
    expect(controller).to.be.not.undefined;
  });

  describe('insert', () => {
    it(`should return created tenant`, () => {
      sandbox.stub((controller as any).tenantService, 'insert').returns(Promise.resolve(tenant));
      return request(server)
        .post('/tenants')
        .send(tenant)
        .expect((response) => {
          const result = response.body;
          expect(result).to.be.not.undefined;
          expect(result).deep.contains(tenant);
        });
    });
  });

  describe('update', () => {
    it(`should return updated tenant`, () => {
      sandbox.stub((controller as any).tenantService, 'update').returns(Promise.resolve(tenant));
      return request(server)
        .put('/tenants')
        .send(tenant)
        .expect(200)
        .expect((response) => {
          const result = response.body;
          expect(result).to.be.not.undefined;
          expect(result).deep.contains(tenant);
        });
    });
  });

  describe('find', () => {
    it('should return found tenant', async () => {
      sandbox.stub((controller as any).tenantService, 'find').returns(Promise.resolve(tenant));
      return request(server)
        .get('/tenants/1232568')
        .expect(200)
        .expect((response) => {
          const result = response.body;
          expect(result).to.be.not.undefined;
          expect(result).deep.contains(tenant);
        });
    });
  })

  describe('findAll', () => {
    it('should return all found tenants', async () => {
      sandbox.stub((controller as any).tenantService, 'findAll').returns(Promise.resolve([tenant]));
      return request(server)
        .get('/tenants')
        .query('skip=0')
        .query('take=10')
        .expect(200)
        .expect((response) => {
          const result = response.body;
          expect(result).to.be.not.undefined;
          expect(result).deep.contains(tenant);
        })
    });
  })

  describe('remove', () => {
    it('should return removed tenant id', async () => {
      sandbox.stub((controller as any).tenantService, 'remove').returns(Promise.resolve(1));
      return request(server)
        .delete('/tenants/1')
        .expect(200)
        .expect((response) => {
          const result = response.body;
          expect(result).to.be.not.undefined;
        });
    });
  })
});
