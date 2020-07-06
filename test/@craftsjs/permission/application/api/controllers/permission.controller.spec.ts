import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as sinon from 'sinon';
import { expect } from 'chai';
import { Server } from 'http';
import * as request from 'supertest';
import { Broker } from '@addapptables/microservice';
import { PermissionController } from '../../../../../../lib/@craftsjs/permission/application/api/controllers/permission.controller';
import { createMockBrokerWithTransferData } from '../../../../../mock/broker.mock';
import { AuthenticatedGuard } from '../../../../../../lib/@craftsjs/auth/guard/authentication.guard';
import { PermissionService } from '../../../../../../lib/@craftsjs/permission/application/api/services/permission.service';
import * as mapper from '../../../../../../lib/@craftsjs/utils/mapper.util';

describe('PermissionController', () => {

  let controller: PermissionController;
  let app: INestApplication;
  let server: Server;
  let sandbox: sinon.SinonSandbox;

  before(async () => {
    sandbox = sinon.createSandbox();
    sandbox.stub(mapper, 'mapper').returns([{ name: 'Page', id: 1232165 }])
    const broker = createMockBrokerWithTransferData();
    const guard = () => ({ canActivate: () => true });
    const module = await Test.createTestingModule({
      controllers: [
        PermissionController,
      ],
      providers: [
        PermissionService,
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
    controller = app.get<PermissionController>(PermissionController);
  });

  after(async () => {
    await app.close();
    sandbox.restore();
  });

  it('should be defined', async () => {
    expect(controller).to.be.not.undefined;
  });

  describe('findAll', () => {
    it('should return all permission', async () => {
      return request(server)
        .get('/permissions')
        .query('skip=0')
        .query('take=10')
        .expect(200)
        .expect((response) => {
          const result = response.body;
          expect(result).to.be.not.undefined;
          expect(result).to.be.length(1);
          expect(result).deep.contains({ name: 'Page', id: 1232165 });
        })
    });
  })

});
