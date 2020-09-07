import * as request from 'supertest';
import { Server } from 'http';
import { expect } from 'chai';
import login from "../utils/login.e2e.spec";
import testingModule, { close } from "../utils/testing-module.e2e.spec";
import { EditionType } from '../../../../lib/@craftsjs/edition';

describe('edition', () => {

    let server: Server;
    let access_token: string;
    let id: string;

    const edition = {
        name: 'crafts',
        isFree: false,
        price: 20,
        editionType: EditionType.Monthly
    };

    before(async () => {
        const testing = await testingModule();
        server = testing.server;
        access_token = await login(server);
    });

    after(async () => {
        await close();
    })

    describe('/POST editions', () => {
        it('should return created edition', () => {
            return request(server)
                .post('/editions')
                .set('Authorization', 'Bearer ' + access_token)
                .send(edition)
                .expect(201)
                .expect((result) => {
                    expect(result.body).to.be.not.undefined;
                    expect(result.body).contains.keys('id', 'name', 'isFree', 'price', 'editionType');
                    expect(result.body).to.deep.include(edition);
                    id = result.body.id;
                })
        })
    })

    describe('/GET editions', () => {
        it('should return all editions', () => {
            return request(server)
                .get('/editions')
                .set('Authorization', 'Bearer ' + access_token)
                .query({ skip: 0, take: 10 })
                .expect(200)
                .expect((result) => {
                    expect(result.body.data).to.be.an('array');
                    expect(result.body.total).to.be.an('number');
                    expect(result.body.data).to.be.length(1);
                })
        })
    })

    describe('/DELETE editions', () => {
        it('should return validation error', () => {
            return request(server)
                .delete('/editions/asdf')
                .set('Authorization', 'Bearer ' + access_token)
                .send(edition)
                .expect(400);
        })
    })

    describe('/DELETE editions', () => {
        it('should return deleted id', () => {
            return request(server)
                .delete('/editions/' + id)
                .set('Authorization', 'Bearer ' + access_token)
                .send(edition)
                .expect(200)
                .expect((result) => {
                    expect(result.body).to.be.not.undefined;
                    expect(result.body).to.have.any.keys('id');
                    expect(result.body.id).to.equal(id);
                })
        })
    })

    describe('/DELETE editions', () => {
        it('should return 403', () => {
            return request(server)
                .delete('/editions/asdf')
                .send(edition)
                .expect(403);
        })
    })
})