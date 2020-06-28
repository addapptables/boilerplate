import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { expect } from 'chai';
import { Server } from 'http';
import * as request from 'supertest';
import { Broker } from '@addapptables/microservice';
import { EditionService } from '../../../../../../lib/@craftsjs/edition';
import { EditionController } from '../../../../../../lib/@craftsjs/edition/application/api/controllers/edition.controller';
import { createMockBrokerWithTransferData } from '../../../../../mock/broker.mock';
import { AuthenticatedGuard } from '../../../../../../lib/@craftsjs/auth/guard/authentication.guard';
import { v4 as uuid } from 'uuid';

describe('EditionController', () => {

  let controller: EditionController;
  let app: INestApplication;
  let server: Server;

  before(async () => {
    const broker = createMockBrokerWithTransferData();
    const guard = () => ({ canActivate: () => true });
    const module = await Test.createTestingModule({
      controllers: [
        EditionController,
      ],
      providers: [
        EditionService,
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
    controller = app.get<EditionController>(EditionController);
  });

  after(async () => {
    await app.close();
  });

  it('should be defined', async () => {
    expect(controller).to.be.not.undefined;
  });

  describe('insert', () => {
    it(`should return created edition`, () => {
      return request(server)
        .post('/editions')
        .send({ isFree: true, name: 'testFreeEdition', })
        .expect(201)
        .expect((response) => {
          const edition = response.body;
          expect(edition).to.be.not.undefined;
          expect(edition.isFree).to.be.equal(true);
          expect(edition.name).to.be.equal('testFreeEdition');
        });
    });
  });

  describe('update', () => {
    it(`should return updated edition`, () => {
      return request(server)
        .put('/editions')
        .send({
          id: uuid(),
          isFree: true,
          name: 'testFreeEdition',
        })
        .expect(200)
        .expect((response) => {
          const edition = response.body;
          expect(edition).to.be.not.undefined;
          expect(edition.isFree).to.be.equal(true);
          expect(edition.name).to.be.equal('testFreeEdition');
        });
    });
  });

  describe('find', () => {
    it('should return an edition', async () => {
      const id = uuid();
      return request(server)
        .get('/editions/' + id)
        .expect(200)
        .expect((response) => {
          const edition = response.body;
          expect(edition).to.be.not.undefined;
          expect(edition.id).to.be.equal(id);
        });
    });
  })

  describe('findAll', () => {
    it('should return all editions', async () => {
      return request(server)
        .get('/editions')
        .query('skip=0')
        .query('take=10')
        .expect(200)
        .expect((response) => {
          const edition = response.body;
          expect(edition).to.be.not.undefined;
        })
    });
  })

  describe('remove', () => {
    it('should return removed id edition', async () => {
      const id = uuid();
      return request(server)
        .delete('/editions/' + id)
        .expect(200)
        .expect((response) => {
          const edition = response.body;
          expect(edition).to.be.not.undefined;
        });
    });
  })
});
