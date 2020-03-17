import * as dotenvSafe from 'dotenv-safe';
dotenvSafe.config();
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as passport from 'passport';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as connectRedis from 'connect-redis';
import * as redis from 'redis';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const redisStore = connectRedis(session);
  const redisClient = redis.createClient({ url: process.env.REDIS_URL });
  app.use(
    session({
      store: new redisStore({ client: redisClient }),
      secret: process.env.SECRET_SESSION,
      resave: false,
      saveUninitialized: true,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: true, transformOptions: { excludeExtraneousValues: true } }));

  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Craftsjs')
    .setDescription('Boilerplate')
    .setVersion('1.0')
    .addTag('Craftsjs')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
