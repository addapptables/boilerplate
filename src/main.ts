import * as dotenvSafe from 'dotenv-safe';
dotenvSafe.config();
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(passport.initialize());
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: true, transformOptions: { excludeExtraneousValues: true } }));
  app.setGlobalPrefix('api');
  app.enableCors({ origin: '*' })

  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Craftsjs')
    .setDescription('Boilerplate')
    .setVersion('1.0')
    .addTag('Craftsjs')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
