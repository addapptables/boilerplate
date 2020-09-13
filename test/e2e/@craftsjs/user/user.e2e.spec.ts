import * as request from 'supertest';
import { expect } from 'chai';
import login from "../utils/login.e2e.spec";
import seedConfiguration from '../../../../lib/@craftsjs/seed/static';
import { useApplicationServer } from '../utils/testing-module.e2e.spec';
import { validateSchema } from '../utils/validate-schema.util';
import { UserDto } from '../../../../lib/@craftsjs/user';

describe('user', () => {

  let access_token: string;
  let id: string;

  const app = useApplicationServer();

  before(async () => {
    access_token = await login(app.getApp().getHttpServer());
  });

  describe('/GET users', () => {
    it('should return all users', () => {
      return request(app.getApp().getHttpServer())
        .get('/users')
        .set('Authorization', 'Bearer ' + access_token)
        .query({ skip: 0, take: 10 })
        .expect(200)
        .then(async (result) => {
          expect(result.body.data).to.be.an('array');
          expect(result.body.total).to.be.an('number');
          expect(result.body.data).to.be.length(1);
          await validateSchema(UserDto, result.body.data);
        })
    })

    it('should return one user', () => {
      return request(app.getApp().getHttpServer())
        .get('/users/' + seedConfiguration.user.tenantId)
        .set('Authorization', 'Bearer ' + access_token)
        .expect(200)
        .expect((result) => {
          expect(result.body).to.be.an('object');
          expect(result.body).to.deep.include({
            userName: 'admin',
            emailAddress: 'admin@crafts.com',
            name: 'Admin',
            surname: 'Admin',
            isStatic: true,
            isActive: true,
          });
        })
    })

    it('should return current profile', () => {
      return request(app.getApp().getHttpServer())
        .get('/users/profile/get')
        .set('Authorization', 'Bearer ' + access_token)
        .expect(200)
        .expect((result) => {
          expect(result.body).to.be.an('object');
          expect(result.body).to.deep.include({
            userName: 'admin',
            emailAddress: 'admin@crafts.com',
            name: 'Admin',
            surname: 'Admin',
            isStatic: true,
            isActive: true,
          });
        })
    })
  })

  describe('/POST users', () => {
    it('should return created user', () => {
      return request(app.getApp().getHttpServer())
        .post('/users')
        .set('Authorization', 'Bearer ' + access_token)
        .send({
          userName: 'test',
          emailAddress: 'test@test.com',
          name: 'test',
          surname: 'test',
          phoneNumber: 'test',
          isActive: true,
          roles: ['6fc3d212-6edd-48d8-9dd9-90f8ffa71e7f']
        })
        .expect(201)
        .expect((result) => {
          expect(result.body).to.be.an('object');
          id = result.body.id;
        })
    })

    it('should return error exists user', () => {
      return request(app.getApp().getHttpServer())
        .post('/users')
        .set('Authorization', 'Bearer ' + access_token)
        .send({
          userName: 'test1',
          emailAddress: 'test@test.com',
          name: 'test',
          surname: 'test',
          phoneNumber: 'test',
          isActive: true,
          roles: ['6fc3d212-6edd-48d8-9dd9-90f8ffa71e7f']
        })
        .expect(400);
    })
  })

  describe('/PUT users', () => {
    it('should return updated user', () => {
      const user = {
        id,
        userName: 'test1',
        emailAddress: 'test@test1.com',
        name: 'updated',
        surname: 'test',
        phoneNumber: 'test',
        isActive: true,
        roles: ['6fc3d212-6edd-48d8-9dd9-90f8ffa71e7f']
      };
      return request(app.getApp().getHttpServer())
        .put('/users')
        .set('Authorization', 'Bearer ' + access_token)
        .send(user)
        .expect(200)
        .expect((result) => {
          expect(result.body).to.be.an('object');
          expect(result.body).to.deep.include(user);
        })
    })

    it('should update current user', () => {
      const user = {
        userName: 'admin1',
        emailAddress: 'admin1@test.com',
        name: 'updated',
        surname: 'test'
      };
      return request(app.getApp().getHttpServer())
        .put('/users/profile/update')
        .set('Authorization', 'Bearer ' + access_token)
        .send(user)
        .expect(200)
        .expect((result) => {
          expect(result.body).to.be.an('object');
          expect(result.body).to.deep.include(user);
        })
    })

    it('should return change password error', () => {
      const user = {
        currentPassword: '216548',
        newPassword: 'qwe123'
      };
      return request(app.getApp().getHttpServer())
        .put('/users/profile/update/change-password')
        .set('Authorization', 'Bearer ' + access_token)
        .send(user)
        .expect(500);
    })

    it('should update current password', () => {
      const user = {
        currentPassword: '123qwe',
        newPassword: 'qwe123'
      };
      return request(app.getApp().getHttpServer())
        .put('/users/profile/update/change-password')
        .set('Authorization', 'Bearer ' + access_token)
        .send(user)
        .expect(200)
        .expect((result) => {
          expect(result.body).to.be.an('object');
        })
    })
  })

  describe('/DELETE users', () => {
    it('should return deleted user', () => {
      return request(app.getApp().getHttpServer())
        .delete('/users/' + id)
        .set('Authorization', 'Bearer ' + access_token)
        .expect(200)
        .expect((result) => {
          expect(result.body).to.be.an('object');
          expect(result.body.id).to.be.eq(id);
        })
    })
  })
})