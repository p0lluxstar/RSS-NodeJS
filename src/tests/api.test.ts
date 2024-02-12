import http from 'http';
import supertest from 'supertest';
import { handleGetUsers, handleGetUserById } from '../util/handlers';
import { IncomingMessage, ServerResponse } from 'http';

const port = 3000;

describe('GET /api/users', () => {
  let server: any;

  beforeAll(() => {
    server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
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
    const response = await supertest(server).get('/api/users');

    expect(response.status).toBe(200);
  });

  test('should return an array of users', async () => {
    const response = await supertest(server).get('/api/users');

    expect(Array.isArray(response.body)).toBe(true);
  });

  test('should return 400 - User in invalid', async () => {
    const response = await supertest(server).get('/api/users/invalid-id-user');
    expect(response.status).toBe(400);
  });
});
