import * as request from 'supertest';
import { Server } from 'http';
import { expect } from 'chai';
import login from "../utils/login.e2e.spec";
import testingModule, { close } from "../utils/testing-module.e2e.spec";

describe('tenant', () => {

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

    describe('/GET tenants', () => {
        it('should return all tenants', () => {
            return request(server)
                .get('/tenants')
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
})