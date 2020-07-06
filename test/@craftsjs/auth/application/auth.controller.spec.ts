import { INestApplication, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { expect } from 'chai';
import { Server } from 'http';
import * as request from 'supertest';
import { AuthController, AuthService, LocalStrategy, JwtStrategy, AuthenticatedGuard, LoginGuard, SessionSerializer } from '../../../../lib/@craftsjs/auth';
import { createMockBrokerService } from '../../../mock/broker.mock';
import { Broker } from '@addapptables/microservice';
import { JwtModule } from '@nestjs/jwt';
import { SecurityModule } from '../../../../lib/@craftsjs/security';
import { SessionService } from '../../../../lib/@craftsjs/auth/services/session.service';
import { JWT_SECRET } from '../../../../lib/@craftsjs/config';
import { PassportModule } from '@nestjs/passport';
import * as passport from 'passport';
import * as session from 'express-session';

describe('AuthController', () => {

  let controller: AuthController;
  let app: INestApplication;
  let server: Server;

  before(async () => {
    const broker = createMockBrokerService({ data: { username: 'admin', password: '46f94c8de14fb36680850768ff1b7f2a' } });
    const jwtSecret: Provider = {
      provide: JWT_SECRET,
      useValue: 'test',
    };
    const module = await Test.createTestingModule({
      controllers: [
        AuthController,
      ],
      imports: [
        JwtModule.register({ secret: 'test' }),
        SecurityModule,
        PassportModule.register({
          defaultStrategy: 'jwt',
        }),
      ],
      providers: [
        SessionService,
        AuthService,
        Broker,
        LocalStrategy,
        JwtStrategy,
        AuthenticatedGuard,
        LoginGuard,
        jwtSecret,
        SessionSerializer
      ]
    })
      .overrideProvider(Broker)
      .useValue(broker)
      .compile();
    app = module.createNestApplication();
    app.use(
      session({
        secret: process.env.SECRET_SESSION,
        resave: false,
        saveUninitialized: true,
      }),
    );
    app.use(passport.initialize());
    app.use(passport.session());
    server = app.getHttpServer()
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

  describe('Logout', () => {
    it(`should remove the user session`, async () => {
      const result = await request(server)
        .post('/auth/login')
        .send({ username: 'admin', password: '123qwe' })
        .expect(201)
        .expect((response) => {
          expect(response.body.accessToken).to.be.not.undefined;
        });
      return request(server)
        .post('/auth/logout')
        .set({ 'Authorization': 'Bearer ' + result.body.accessToken })
        .expect(201)
    });
  });
});
