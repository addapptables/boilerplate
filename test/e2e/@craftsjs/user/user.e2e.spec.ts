import * as request from 'supertest';
import { Server } from 'http';
import { expect } from 'chai';
import login from "../utils/login.e2e.spec";
import testingModule, { close } from "../utils/testing-module.e2e.spec";
import { UserDomainService } from "../../../../lib/@craftsjs/user";
import seedConfiguration from '../../../../lib/@craftsjs/seed/static';

describe('user', () => {

  let server: Server;
  let access_token: string;
  let id: string;
  let userDomainService: UserDomainService;

  before(async () => {
    const testing = await testingModule();
    server = testing.server;
    userDomainService = testing.app.get(UserDomainService);
    access_token = await login(server);
  });

  after(async () => {
    await userDomainService.remove(id);
    await close();
  })

  describe('/GET users', () => {
    it('should return all users', () => {
      return request(server)
        .get('/users')
        .set('Authorization', 'Bearer ' + access_token)
        .query({ skip: 0, take: 10 })
        .expect(200)
        .expect((result) => {
          expect(result.body.data).to.be.an('array');
          expect(result.body.total).to.be.an('number');
          expect(result.body.data).to.be.length(1);
        })
    })

    it('should return one user', () => {
      return request(server)
        .get('/users/' + seedConfiguration.user.hostId)
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
      return request(server)
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
  })

  describe('/PUT users', () => {
    it('should return updated user', () => {
      const user = {
        id,
        userName: 'test',
        emailAddress: 'test@test.com',
        name: 'updated',
        surname: 'test',
        phoneNumber: 'test',
        isActive: true,
        roles: ['6fc3d212-6edd-48d8-9dd9-90f8ffa71e7f']
      };
      return request(server)
        .put('/users')
        .set('Authorization', 'Bearer ' + access_token)
        .send(user)
        .expect(200)
        .expect((result) => {
          expect(result.body).to.be.an('object');
          expect(result.body).to.deep.include(user);
        })
    })
  })
})