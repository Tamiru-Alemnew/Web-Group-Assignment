import { chromium } from 'playwright';
import { Test, TestingModule } from '@nestjs/testing';
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
  it('/auth/signup (POST)', async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('http://localhost:3000/auth/signup');

    await page.fill('input[name="email"]', 'test@exaaample.com');
    await page.fill('input[name="password"]', 'Password1@');
    await page.fill('input[name="role"]', 'children');

    await Promise.all([
      page.waitForNavigation(),
      page.click('button[type="submit"]'),
    ]);

    const url = page.url();

    await browser.close();

    expect(url).toEqual('http://localhost:3000/auth/signup');
  });

  it('/auth/login (POST)', async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('http://localhost:3000/auth/login');

    await page.fill('input[name="email"]', 'test@exaaample.com');
    await page.fill('input[name="password"]', 'Password1@');

    await Promise.all([
      page.waitForNavigation(),
      page.click('button[type="submit"]'),
    ]);

    const url = page.url();

    await browser.close();

    expect(url).toEqual('http://localhost:3000/auth/login');
  });

  it('/auth/user (GET)', async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('http://localhost:3000/auth/user');

    // Wait for the next response
    const response = await page.waitForResponse(
      (response) => response.url() === 'http://localhost:3000/expense',
    );

    // Check the status of the response
    const status = response.status();
    expect(status).toBe(200);

    await browser.close();
  });

  // Expense routes
  it('/expense (GET)', async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('http://localhost:3000/expense');

    // Wait for the next response
    const response = await page.waitForResponse(
      (response) => response.url() === 'http://localhost:3000/expense',
    );

    // Check the status of the response
    const status = response.status();

    await browser.close();

    expect(status).toEqual(200);
  });

  it('/expense (POST)', async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('http://localhost:3000/expense');

    await page.fill('input[name="amount"]', '100');
    await page.fill('input[name="date"]', new Date().toISOString());
    await page.fill('input[name="userId"]', '1');
    await page.fill('input[name="category"]', 'test');

    await Promise.all([
      page.waitForNavigation(),
      page.click('button[type="submit"]'),
    ]);

    const url = page.url();

    await browser.close();

    expect(url).toEqual('http://localhost:3000/expense');
  });

  // Category routes
  it('/category (GET)', async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('http://localhost:3000/category');
    // Wait for the next response
    const response = await page.waitForResponse(
      (response) => response.url() === 'http://localhost:3000/category',
    );

    // Check the status of the response
    const status = response.status();

    await browser.close();

    expect(status).toEqual(200);
  });

  it('/category (POST)', async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('http://localhost:3000/category');

    await page.fill('input[name="name"]', 'TestCategory');
    await page.fill('input[name="description"]', 'Test Description');

    await Promise.all([
      page.waitForNavigation(),
      page.click('button[type="submit"]'),
    ]);

    const url = page.url();

    await browser.close();

    expect(url).toEqual('http://localhost:3000/category');
  });

  afterAll(async () => {
    await app.close();
  });
});
