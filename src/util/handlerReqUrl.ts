import { IncomingMessage, ServerResponse } from 'http';
import {
  handleGetUsers,
  handleGetUserById,
  handlePostUser,
  handlePutUser,
  handleDeleteUser,
  pageNotFound,
} from './handlerMethods';

export const hadlerReqUrl = (req: IncomingMessage, res: ServerResponse) => {
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
};
