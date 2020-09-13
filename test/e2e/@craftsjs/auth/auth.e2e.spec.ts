import * as request from 'supertest';
import { expect } from 'chai';
import login, { clearToken } from "../utils/login.e2e.spec";
import seedConfiguration from '../../../../lib/@craftsjs/seed/static';
import { useApplicationServer } from '../utils/testing-module.e2e.spec';

describe('auth', () => {

  let access_token: string;
  let tenant_access_token: string;

  const app = useApplicationServer();

  before(async () => {
    access_token = await login(app.getApp().getHttpServer(), true);
    clearToken();
    tenant_access_token = await login(app.getApp().getHttpServer());
  });

  describe('/POST login', () => {
    it(`should return 401 unauthorized`, () => {
      return request(app.getApp().getHttpServer())
        .post('/auth/login')
        .send({ username: 'aadf', password: 'pas' })
        .expect(401)
    });

    it(`should return acces_token`, () => {
      return request(app.getApp().getHttpServer())
        .post('/auth/login')
        .send({ username: 'admin', password: '123qwe' })
        .expect((result) => {
          expect(result?.body).to.be.not.undefined;
          expect(result?.body).contains.keys(['accessToken', 'expiresIn']);
        })
    });

    it(`should login with tenant user successfully`, () => {
      return request(app.getApp().getHttpServer())
        .post('/auth/login')
        .set('craftsjs-tenantId', 'f1bfe9d7-9671-4b7d-90e5-080835d8e487')
        .send({ username: 'admin', password: '123qwe' })
        .expect((result) => {
          expect(result?.body).to.be.not.undefined;
          expect(result?.body).contains.keys(['accessToken', 'expiresIn']);
        })
    });
  })

  describe('/GET login information', () => {
    it(`should return user login information successfully`, () => {
      return request(app.getApp().getHttpServer())
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

    it(`should return tenant user login information successfully`, () => {
      return request(app.getApp().getHttpServer())
        .get('/auth/login-information')
        .set('Authorization', 'Bearer ' + tenant_access_token)
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
      return request(app.getApp().getHttpServer())
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
      const result = await request(app.getApp().getHttpServer())
        .post('/auth/impersonated')
        .set('Authorization', 'Bearer ' + access_token)
        .send({ tenantImpersonationId: seedConfiguration.tenantId, userId: seedConfiguration.user.tenantId });
      return request(app.getApp().getHttpServer())
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
      return request(app.getApp().getHttpServer())
        .post('/auth/logout')
        .set('Authorization', 'Bearer ' + access_token)
        .expect(201)
    });
  })
})