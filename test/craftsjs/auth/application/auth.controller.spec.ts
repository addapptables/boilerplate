import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { expect } from 'chai';
import { Server } from 'http';
import * as cookieParser from 'cookie-parser';
import * as request from 'supertest';
import * as session from 'express-session';
import * as passport from 'passport';
import { AppModule } from '../../../../src/app.module';
import { AuthController } from '../../../../lib/@craftsjs/auth';
import { createMockBrokerService } from '../../../mock/broker.mock';
import { Broker } from '@addapptables/microservice';

describe('AuthController', () => {

  let controller: AuthController;
  let app: INestApplication;
  let server: Server;

  before(async () => {
    const broker = createMockBrokerService({ data: { username: 'admin', password: '46f94c8de14fb36680850768ff1b7f2a' } });
    const module = await Test.createTestingModule({
      imports: [
        AppModule,
      ],
    })
      .overrideProvider(Broker)
      .useValue(broker)
      .compile();
    app = module.createNestApplication(undefined, {
      logger: false,
    });
    server = app.getHttpServer();
    app.use(cookieParser());
    app.use(
      session({
        secret: process.env.SECRET_SESSION,
        resave: false,
        saveUninitialized: false,
      }),
    );
    app.use(passport.initialize());
    app.use(passport.session());
    app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: true, transformOptions: { excludeExtraneousValues: true } }));
    await app.init();
    controller = app.get<AuthController>(AuthController);
  });

  after(async () => {
    await app.close();
  });

  it('should be defined', async () => {
    expect(controller).to.be.not.undefined;
  });

  describe('Login', () => {
    it(`should return access token`, () => {
      return request(server)
        .post('/auth/login')
        .send({ username: 'admin', password: '123qwe' })
        .expect(201)
        .expect((response) => {
          expect(response.body.accessToken).to.be.not.undefined;
        });
    });
  });
});
