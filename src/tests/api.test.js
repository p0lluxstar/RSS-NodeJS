const http = require('http');
const request = require('supertest');
const { handleGetUsers, handleGetUserById } = require('../util/handlers');

const port = 3000;

describe('GET /api/users', () => {

  let server;

  beforeAll(() => {
    server = http.createServer((req, res) => {
      if ((req.url === '/api/users' || req.url === '/api/users/') && req.method === 'GET') {
        handleGetUsers(res);
      }
      if (req.url === '/api/users/invalid-id-user' && req.method === 'GET') {
        return handleGetUserById(res, 'invalid-id-user');
      }
    });

    server.listen(port);
  });

  afterAll((done) => {
    server.close(done);
  });

  test('should return status 200', async () => {
    const response = await request(server).get('/api/users');

    expect(response.status).toBe(200);
  });

  test('should return an array of users', async () => {
    const response = await request(server).get('/api/users');

    expect(Array.isArray(response.body)).toBe(true);
  });

  test('should return 400 - User in invalid', async () => {
    const response = await request(server).get('/api/users/invalid-id-user');
    expect(response.status).toBe(400);
  });
});