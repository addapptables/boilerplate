import * as request from 'supertest';
import { expect } from 'chai';
import { EditionType } from '../../../../lib/@craftsjs/edition';
import { useApplicationServer } from "../utils/testing-module.e2e.spec";
import login, { clearToken } from "../utils/login.e2e.spec";
import * as R from 'ramda';
import { validateSchema } from "../utils/validate-schema.util";
import { EditionDto } from '../../../../lib/@craftsjs/edition/application/dtos/edition.dto';

describe('edition', () => {

    let access_token: string;
    let id: string;

    const edition = {
        name: 'crafts',
        isFree: false,
        price: 20,
        editionType: EditionType.Monthly
    };

    const app = useApplicationServer();

    before(async () => {
        clearToken();
        access_token = await login(app.getApp().getHttpServer(), true);
    });

    after(() => {
        clearToken();
    })

    describe('/POST editions', () => {
        it('should return created edition', () => {
            return request(app.getApp().getHttpServer())
                .post('/editions')
                .set('Authorization', 'Bearer ' + access_token)
                .send(edition)
                .expect(201)
                .then(R.prop('body'))
                .then(async (result) => {
                    expect(result).to.be.not.undefined;
                    expect(result).to.deep.include(edition);
                    await validateSchema(EditionDto, result);
                    id = result.id;
                })
        })
    })

    describe('/GET editions', () => {
        it('should return all editions', () => {
            return request(app.getApp().getHttpServer())
                .get('/editions')
                .set('Authorization', 'Bearer ' + access_token)
                .query({ skip: 0, take: 10 })
                .expect(200)
                .then(R.prop('body'))
                .then(async (result) => {
                    expect(result.data).to.be.an('array');
                    expect(result.total).to.be.an('number');
                    expect(result.data).to.be.length(1);
                    await validateSchema(EditionDto, result.data);
                })
        })
    })

    describe('/DELETE editions', () => {
        it('should return validation error', () => {
            return request(app.getApp().getHttpServer())
                .delete('/editions/asdf')
                .set('Authorization', 'Bearer ' + access_token)
                .send(edition)
                .expect(400);
        })
    })

    describe('/DELETE editions', () => {
        it('should return deleted id', () => {
            return request(app.getApp().getHttpServer())
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
            return request(app.getApp().getHttpServer())
                .delete('/editions/asdf')
                .send(edition)
                .expect(403);
        })
    })
})