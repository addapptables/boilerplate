import * as request from 'supertest';
import { Server } from 'http';
import { expect } from 'chai';
import testingModule, { close } from "../utils/testing-module.e2e.spec";
import login from "../utils/login.e2e.spec";
import seedConfiguration from '../../../../lib/@craftsjs/seed/static';

describe('auth', () => {

  let server: Server;
  let access_token: string;

  before(async () => {
    const testing = await testingModule();
    server = testing.server;
    access_token = await login(server);
  });

  after(async () => {
    await close();
  })

  describe('/POST login', () => {
    it(`should return 401 unauthorized`, () => {
      return request(server)
        .post('/auth/login')
        .send({ username: 'aadf', password: 'pas' })
        .expect(401)
    });

    it(`should return acces_token`, () => {
      return request(server)
        .post('/auth/login')
        .send({ username: 'admin', password: '123qwe' })
        .expect((result) => {
          expect(result?.body).to.be.not.undefined;
          expect(result?.body).contains.keys(['accessToken', 'expiresIn']);
        })
    });
  })

  describe('/GET login information', () => {
    it(`should return user login information`, () => {
      return request(server)
        .get('/auth/login-information')
        .set('Authorization', 'Bearer ' + access_token)
        .expect((result) => {
          expect(result?.body).to.be.not.undefined;
          expect(result.body).to.have.any.keys('user');
          expect(result.body.user).to.have.all.keys(
            'id', 'userName', 'emailAddress', 'name', 'surname', 'isStatic', 
            'phoneNumber', 'isActive', 'lastOrganizationUnitId', 'roles', 'permissions'
          );
          expect(result.body.user).to.deep.include({
            userName: 'admin',
            emailAddress: 'admin@crafts.com',
            name: 'Admin',
            surname: 'Admin',
            isStatic: true,
            isActive: true,
          });
        })
    });
  })

  describe('/POST impersonated', () => {
    it(`should return impersonated access token`, () => {
      return request(server)
        .post('/auth/impersonated')
        .set('Authorization', 'Bearer ' + access_token)
        .send({ tenantImpersonationId: seedConfiguration.tenantId, userId: seedConfiguration.user.tenantId })
        .expect((result) => {
          expect(result?.body).to.be.not.undefined;
          expect(result.body).to.have.any.keys('accessToken', 'expiresIn');
        })
    });
  })

  describe('/GET back-to-impersonate', () => {
    it(`should return lasted user access token`, async () => {
      const result = await request(server)
        .post('/auth/impersonated')
        .set('Authorization', 'Bearer ' + access_token)
        .send({ tenantImpersonationId: seedConfiguration.tenantId, userId: seedConfiguration.user.tenantId });
      return request(server)
        .get('/auth/back-to-impersonate')
        .set('Authorization', 'Bearer ' + result.body.accessToken)
        .expect((result) => {
          expect(result?.body).to.be.not.undefined;
          expect(result.body).to.have.any.keys('accessToken', 'expiresIn');
        })
    });
  })

  describe('/POST logout', () => {
    it(`should return status code 200`, async () => {
      return request(server)
        .post('/auth/logout')
        .set('Authorization', 'Bearer ' + access_token)
        .expect(201)
    });
  })
})