import { Server } from "http";
import * as request from 'supertest';

let token = null;

export default function (server: Server): Promise<string> {
    return new Promise(async (resolve, reject) => {
        try {
            if (token) return resolve(token);
            await request(server)
                .post('/auth/login')
                .send({ username: 'admin', password: '123qwe' })
                .expect(201)
                .expect((result) => {
                    token = result?.body.accessToken;
                    resolve(token);
                })
        } catch (error) {
            reject(error);
        }
    });
}