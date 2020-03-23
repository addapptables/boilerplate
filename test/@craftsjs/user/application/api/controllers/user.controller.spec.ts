import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as sinon from 'sinon';
import { expect } from 'chai';
import { Server } from 'http';
import * as request from 'supertest';
import { Broker } from '@addapptables/microservice';
import { UserController } from '../../../../../../lib/@craftsjs/user/application/api/controllers/user.controller';
import { createMockBrokerWithTransferData } from '../../../../../mock/broker.mock';
import { AuthenticatedGuard } from '../../../../../../lib/@craftsjs/auth/guard/authentication.guard';
import { UserService } from '../../../../../../lib/@craftsjs/user/application/api/services/user.service';

describe('UserController', () => {

  let controller: UserController;
  let app: INestApplication;
  let server: Server;
  let sandbox: sinon.SinonSandbox;

  before(async () => {
    const broker = createMockBrokerWithTransferData();
    const guard = () => ({ canActivate: () => true });
    const module = await Test.createTestingModule({
      controllers: [
        UserController,
      ],
      providers: [
        UserService,
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
    controller = app.get<UserController>(UserController);
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
    it(`should return created user`, () => {
      const user = {
        name: 'test',
        emailAddress: 'test@test.com',
        userName: 'test',
        surname: 'test',
        roles: [],
      };
      sandbox.stub((controller as any).userService, 'insert').returns(Promise.resolve(user));
      return request(server)
        .post('/users')
        .send(user)
        .expect((response) => {
          const result = response.body;
          expect(result).to.be.not.undefined;
          expect(result).deep.contains(user);
        });
    });
  });

  describe('update', () => {
    it(`should return updated user`, () => {
      const user = {
        id: 1232568,
        name: 'test',
        emailAddress: 'test@test.com',
        userName: 'test',
        surname: 'test',
        roles: [],
      };
      sandbox.stub((controller as any).userService, 'update').returns(Promise.resolve(user));
      return request(server)
        .put('/users')
        .send(user)
        .expect(200)
        .expect((response) => {
          const result = response.body;
          expect(result).to.be.not.undefined;
          expect(result).deep.contains(user);
        });
    });
  });

  describe('find', () => {
    it('should return a user', async () => {
      const user = {
        id: 1232568,
        name: 'test',
        emailAddress: 'test@test.com',
        userName: 'test',
        surname: 'test',
        roles: [],
      };
      sandbox.stub((controller as any).userService, 'find').returns(Promise.resolve(user));
      return request(server)
        .get('/users/1232568')
        .expect(200)
        .expect((response) => {
          const result = response.body;
          expect(result).to.be.not.undefined;
          expect(result).deep.contains(user);
        });
    });
  })

  describe('findAll', () => {
    it('should return all users', async () => {
      const user = {
        id: 1232568,
        name: 'test',
        emailAddress: 'test@test.com',
        userName: 'test',
        surname: 'test',
        roles: [],
      };
      sandbox.stub((controller as any).userService, 'findAll').returns(Promise.resolve([user]));
      return request(server)
        .get('/users')
        .query('skip=0')
        .query('take=10')
        .expect(200)
        .expect((response) => {
          const result = response.body;
          expect(result).to.be.not.undefined;
          expect(result).deep.contains(user);
        })
    });
  })

  describe('remove', () => {
    it('should return removed user id', async () => {
      sandbox.stub((controller as any).userService, 'remove').returns(Promise.resolve(1));
      return request(server)
        .delete('/users/1')
        .expect(200)
        .expect((response) => {
          const result = response.body;
          expect(result).to.be.not.undefined;
        });
    });
  })
});
