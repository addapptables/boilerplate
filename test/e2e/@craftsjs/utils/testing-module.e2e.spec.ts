import * as session from 'express-session';
import * as passport from 'passport';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { LocalBusAdapter, ManagerAdapterBus, MicroserviceModule } from '@addapptables/microservice';
import { resolve } from 'path';
import { BoilerplateModule } from '../../../../lib/@craftsjs/core';

export function useApplicationServer() {
    let app: INestApplication;

    before(async () => {
        const module = await Test.createTestingModule({
            imports: [
                MicroserviceModule.withConfig({
                    adapter: ManagerAdapterBus.getInstance(LocalBusAdapter).build(),
                    logger: {
                        debug: false
                    }
                }),
                BoilerplateModule.forRoot({
                    jwt: {
                        secret: process.env.SECRET_SESSION,
                    },
                    typeOrm: {
                        type: 'sqlite',
                        database: ':memory:',
                        synchronize: true,
                        dropSchema: true,
                        entities: [
                            resolve(__dirname, '../../../../src/**/*.entity{.ts,.js}'),
                            resolve(__dirname, '../../../../lib/**/*.entity{.ts,.js}'),
                        ],
                    },
                }),
            ]
        }).compile();
        app = module.createNestApplication();
        app.use(
            session({
                secret: process.env.SECRET_SESSION,
                resave: false,
                saveUninitialized: true,
            }),
        );
        app.use(passport.initialize());
        app.use(passport.session());
        app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: true, transformOptions: { excludeExtraneousValues: true } }));
        await app.init();
    });

    after(async () => await app.close());

    return {
        getApp: () => app,
    };
}
