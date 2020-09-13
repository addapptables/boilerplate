import * as request from 'supertest';
import { expect } from 'chai';
import login, { clearToken } from "../utils/login.e2e.spec";
import { useApplicationServer } from '../utils/testing-module.e2e.spec';
import * as R from 'ramda';
import { validateSchema } from '../utils/validate-schema.util';
import { TenantDto } from '../../../../lib/@craftsjs/tenant/application/dtos/tenant.dto';

describe('tenant', () => {

    let access_token: string;

    const app = useApplicationServer();

    before(async () => {
        clearToken();
        access_token = await login(app.getApp().getHttpServer(), true);
    });

    after(() => {
        clearToken();
    })

    describe('/GET tenants', () => {
        it('should return all tenants', () => {
            return request(app.getApp().getHttpServer())
                .get('/tenants')
                .set('Authorization', 'Bearer ' + access_token)
                .query({ skip: 0, take: 10 })
                .expect(200)
                .then(R.prop('body'))
                .then(async (result) => {
                    expect(result.data).to.be.an('array');
                    expect(result.total).to.be.an('number');
                    expect(result.data).to.be.length(1);
                    await validateSchema(TenantDto, result.data);
                })
        })
    })
})