import { Test } from '@nestjs/testing';
import { AppModule } from '../../../../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';
import { Server } from 'http';

let app: INestApplication;
let server: Server;

export default async function (): Promise<{app, server}> {
    return new Promise(async (resolve, reject) => {
        try {
            if(app) return resolve({ app, server });
            const module = await Test.createTestingModule({
                imports: [AppModule]
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
            server = app.getHttpServer();
            await app.init();
            setTimeout(() => {
                resolve({ app, server });
            }, 100);
        } catch (error) {
            reject(error);
        }
    })
}

async function close() {
    await app.close();
    app = null;
}

export {
    app,
    server,
    close
}