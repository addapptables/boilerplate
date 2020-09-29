import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { expect } from 'chai';
import { Server } from 'http';
import * as request from 'supertest';
import { Broker } from '@addapptables/microservice';
import { OrganizationUnitService } from '../../../../../../../lib/@craftsjs/organization';
import { OrganizationUnitController } from '../../../../../../../lib/@craftsjs/organization/application/api/controllers/organization-unit.controller';
import { createMockBrokerWithTransferData } from '../../../../../../unit/mock/broker.mock';
import { AuthenticatedGuard } from '../../../../../../../lib/@craftsjs/auth/guard/authentication.guard';
import { v4 as uuid } from 'uuid';

describe('OrganizationUnitController', () => {

  let controller: OrganizationUnitController;
  let app: INestApplication;
  let server: Server;

  before(async () => {
    const broker = createMockBrokerWithTransferData();
    const guard = () => ({ canActivate: () => true });
    const module = await Test.createTestingModule({
      controllers: [
        OrganizationUnitController,
      ],
      providers: [
        OrganizationUnitService,
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
    controller = app.get<OrganizationUnitController>(OrganizationUnitController);
  });

  after(async () => {
    await app.close();
  });

  it('should be defined', async () => {
    expect(controller).to.be.not.undefined;
  });

  describe('insert', () => {
    it(`should return created organization unit`, () => {
      return request(server)
        .post('/organization-units')
        .send({ name: 'testFree', })
        .expect(201)
        .expect((response) => {
          const result = response.body;
          expect(result).to.be.not.undefined;
          expect(result.name).to.be.equal('testFree');
        });
    });
  });

  describe('update', () => {
    it(`should return updated organization unit`, () => {
      const id = uuid();
      return request(server)
        .put('/organization-units')
        .send({
          id,
          name: 'testFree',
        })
        .expect(200)
        .expect((response) => {
          const result = response.body;
          expect(result).to.be.not.undefined;
          expect(result.id).to.be.equal(id);
          expect(result.name).to.be.equal('testFree');
        });
    });
  });

  describe('find', () => {
    const id = uuid();
    it('should return an organization unit', async () => {
      return request(server)
        .get('/organization-units/' + id)
        .expect(200)
        .expect((response) => {
          const result = response.body;
          expect(result).to.be.not.undefined;
          expect(result.id).to.be.equal(id);
        });
    });
  })

  describe('findAll', () => {
    it('should return all organization units', async () => {
      return request(server)
        .get('/organization-units')
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
    const id = uuid();
    it('should return removed id organization unit', async () => {
      return request(server)
        .delete('/organization-units/' + id)
        .expect(200)
        .expect((response) => {
          const result = response.body;
          expect(result).to.be.not.undefined;
        });
    });
  })
});
