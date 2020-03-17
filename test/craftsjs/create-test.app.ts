import { Test } from '@nestjs/testing';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';
import { AppModule } from '../../src/app.module';

export async function createTestApp() {
  const module = await Test.createTestingModule({
    imports: [
      AppModule,
    ],
  }).compile();
  const app = module.createNestApplication(undefined, {
    logger: false,
  });
  app.use(
    session({
      secret: process.env.SECRET_SESSION,
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: true, transformOptions: { excludeExtraneousValues: true } }));
  return app;
}
