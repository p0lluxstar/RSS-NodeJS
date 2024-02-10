import { ServerResponse } from 'http';
import { users } from '../db/users';

export const handleGetUsers = (res: ServerResponse) => {
  res.writeHead(200, { 'Content-type': 'application/json' });
  res.end(JSON.stringify(users));
};

export const handleGetUserById = (res: ServerResponse, userId: string) => {
  if (userId.length < 3) {
    res.writeHead(400, { 'Content-type': 'application/json' });
    res.end(JSON.stringify({ message: 'Bad request' }));
  } else {
    const user = users.find((user) => user.id === userId);
    if (user) {
      res.writeHead(200, { 'Content-type': 'application/json' });
      res.end(JSON.stringify(user));
    } else {
      res.writeHead(404, { 'Content-type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found' }));
    }
  }
};

export const pageNotFound = (res: ServerResponse) => {
  res.writeHead(404, { 'Content-type': 'application/json' });
  res.end(JSON.stringify({ message: 'Page not found' }));
};
