import request from 'supertest';
import mongoose from 'mongoose';
import app from './server.js';

describe('Product API Routes', () => {

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should return all products with a 200 OK status', async () => {
    const response = await request(app).get('/api/products');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

});