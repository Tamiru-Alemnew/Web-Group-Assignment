import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { INestApplication } from '@nestjs/common';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // Auth routes
  it('/auth/signup (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email: 'test@exaaample.com',
        password: 'Password1@',
        role: 'children',
      })
      .expect(201);
  });

  it('/auth/login (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'test@exaaample.com',
        password: 'Password1@',
      })
      .expect(201);
  });

  it('/auth/user (GET)', () => {
    return request(app.getHttpServer()).get('/auth/user').expect(200);
  });

  // Expense routes
  it('/expense (GET)', () => {
    return request(app.getHttpServer()).get('/expense').expect(200);
  });

  it('/expense (POST)', () => {
    return request(app.getHttpServer())
      .post('/expense')
      .send({
        amount: 100,
        date: new Date(),
        userId: 1,
        category: "test",
      })
      .expect(201);
  });


  // Category routes
  it('/category (GET)', () => {
    return request(app.getHttpServer()).get('/category').expect(200);
  });

  it('/category (POST)', () => {
    return request(app.getHttpServer())
      .post('/category')
      .send({
        name: 'TestCategory',
        description: 'Test Description',
      })
      .expect(201);
  });


  afterAll(async () => {
    await app.close();
  });
});
