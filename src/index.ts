import http from 'http';
import {
  handleGetUsers,
  handleGetUserById,
  handlePostUser,
  handlePutUser,
  handleDeleteUser,
  pageNotFound,
} from './util/handlers';
import dotenv from 'dotenv';
dotenv.config();

const port: string = process.env.PORT || '';

const server = http.createServer((req, res) => {
  const urlParts = req.url?.split('/') ?? [];
  const userId = urlParts[urlParts.length - 1];

  if ((req.url === '/api/users' || req.url === '/api/users/') && req.method === 'GET') {
    return handleGetUsers(res);
  }

  if (req.url === `/api/users/${userId}` && req.method === 'GET') {
    return handleGetUserById(res, userId);
  }

  if (req.url === '/api/users' && req.method === 'POST') {
    return handlePostUser(req, res);
  }

  if (req.url === `/api/users/${userId}` && req.method === 'PUT') {
    return handlePutUser(req, res, userId);
  }

  if (req.url === `/api/users/${userId}` && req.method === 'DELETE') {
    return handleDeleteUser(req, res, userId);
  }

  pageNotFound(res);
});

server.listen(Number(port), 'localhost', () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
