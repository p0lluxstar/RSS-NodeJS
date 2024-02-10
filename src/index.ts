import http from 'http';
import { handleGetUsers, handleGetUserById, pageNotFound } from './util/handler';
import dotenv from 'dotenv';
dotenv.config();

const port: string = process.env.PORT || '';

const server = http.createServer((req, res) => {
  const urlParts = req.url?.split('/') ?? [];
  const userId = urlParts[urlParts.length - 1];

  if (req.url === '/api/users' && req.method === 'GET') {
    return handleGetUsers(res);
  }

  if (req.url === `/api/users/${userId}` && req.method === 'GET') {
    return handleGetUserById(res, userId);
  }

  pageNotFound(res);
});

server.listen(Number(port), 'localhost', () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
