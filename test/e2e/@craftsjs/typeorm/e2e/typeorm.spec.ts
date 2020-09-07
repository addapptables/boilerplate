import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { ApplicationModule } from '../src/app.module';
import { Server } from 'http';
import { CircularDependencyException } from '../../../../../lib/@craftsjs/typeorm/exceptions/circular-dependency.exception';

describe('TypeOrm', () => {
  let server: Server;
  let app: INestApplication;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ApplicationModule],
    }).compile();

    app = module.createNestApplication();
    server = app.getHttpServer();
    new CircularDependencyException('context');
    await app.init();
  });

  it(`should return created entity`, () => {
    return request(server)
      .post('/photo')
      .expect(201, { name: 'Nest', description: 'Is great!', views: 6000 });
  });

  afterEach(async () => {
    await app.close();
  });
});
