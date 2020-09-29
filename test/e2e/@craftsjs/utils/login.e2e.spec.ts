import { Server } from "http";
import * as request from 'supertest';

let token = null;

export default function (server: Server, hostUser: boolean = false): Promise<string> {
    return new Promise(async (resolve, reject) => {
        try {
            if (token) return resolve(token);
            const data = request(server)
                .post('/auth/login');

            if (!hostUser) {
                data.set('craftsjs-tenantId', 'f1bfe9d7-9671-4b7d-90e5-080835d8e487')
            }

            await data.send({ username: 'admin', password: '123qwe' })
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

export function clearToken() {
    token = null;
}
