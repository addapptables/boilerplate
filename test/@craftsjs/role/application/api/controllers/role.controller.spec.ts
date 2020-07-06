import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { expect } from 'chai';
import { Server } from 'http';
import * as request from 'supertest';
import { Broker } from '@addapptables/microservice';
import { RoleController } from '../../../../../../lib/@craftsjs/role/application/api/controllers/role.controller';
import { createMockBrokerWithTransferData } from '../../../../../mock/broker.mock';
import { AuthenticatedGuard } from '../../../../../../lib/@craftsjs/auth/guard/authentication.guard';
import { RoleService } from '../../../../../../lib/@craftsjs/role/application/api/services/role.service';
import { v4 as uuid } from 'uuid';

describe('RoleController', () => {

  let controller: RoleController;
  let app: INestApplication;
  let server: Server;

  before(async () => {
    const broker = createMockBrokerWithTransferData();
    const guard = () => ({ canActivate: () => true });
    const module = await Test.createTestingModule({
      controllers: [
        RoleController,
      ],
      providers: [
        RoleService,
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
    controller = app.get<RoleController>(RoleController);
  });

  after(async () => {
    await app.close();
  });

  it('should be defined', async () => {
    expect(controller).to.be.not.undefined;
  });

  describe('insert', () => {
    it(`should return created role`, () => {
      return request(server)
        .post('/roles')
        .send({ name: 'test', permissions: [] })
        .expect(201)
        .expect((response) => {
          const result = response.body;
          expect(result).to.be.not.undefined;
          expect(result.name).to.be.equal('test');
        });
    });
  });

  describe('update', () => {
    it(`should return updated role`, () => {
      return request(server)
        .put('/roles')
        .send({
          id: uuid(),
          name: 'test',
          permissions: []
        })
        .expect(200)
        .expect((response) => {
          const result = response.body;
          expect(result).to.be.not.undefined;
          expect(result.name).to.be.equal('test');
        });
    });
  });

  describe('find', () => {
    it('should return a role', async () => {
      const id = uuid();
      return request(server)
        .get('/roles/' + id)
        .expect(200)
        .expect((response) => {
          const result = response.body;
          expect(result).to.be.not.undefined;
          expect(result.id).to.be.equal(id);
        });
    });
  })

  describe('findAll', () => {
    it('should return all roles', async () => {
      return request(server)
        .get('/roles')
        .query('skip=0')
        .query('take=10')
        .expect(200)
        .expect((response) => {
          const result = response.body;
          expect(result).to.be.not.undefined;
        })
    });
  })

  describe('remove', () => {
    it('should return removed id role', async () => {
      return request(server)
        .delete('/roles/' + uuid())
        .expect(200)
        .expect((response) => {
          const result = response.body;
          expect(result).to.be.not.undefined;
        });
    });
  })
});
