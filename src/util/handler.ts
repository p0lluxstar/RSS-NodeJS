import { IncomingMessage, ServerResponse } from 'http';
import { users } from '../db/users';
import { User } from '../interface/users';

export const handleGetUsers = (res: ServerResponse) => {
  res.writeHead(200, { 'Content-type': 'application/json' });
  res.end(JSON.stringify(users));
};

export const handleGetUserById = (res: ServerResponse, userId: string) => {
  if (userId.length < 3) {
    res.writeHead(400, { 'Content-type': 'application/json' });
    res.end(JSON.stringify({ code: 400, message: 'User in invalid' }));
  } else {
    const user = users.find((user) => user.id === userId);
    if (user) {
      res.writeHead(200, { 'Content-type': 'application/json' });
      res.end(JSON.stringify(user));
    } else {
      res.writeHead(404, { 'Content-type': 'application/json' });
      res.end(JSON.stringify({ code: 404, message: 'User not found' }));
    }
  }
};

export const handlePostUser = (req: IncomingMessage, res: ServerResponse) => {
  let userJSON = '';
  req.on('data', (chunk: string) => (userJSON += chunk));
  req.on('end', () => {
    const userData: User = JSON.parse(userJSON);
    console.log('userData', userData);
    if(userData.username && userData.age && userData.hobbies.length > 0) {
      users.push(userData);
      res.writeHead(200, { 'Content-type': 'application/json' });
      res.end(JSON.stringify({ message: 'User added successfully' }));
    } else {
      res.writeHead(400, { 'Content-type': 'application/json' });
      res.end(JSON.stringify({code: 400, message: 'Invalid user data' }));
    } 
  });
};

export const pageNotFound = (res: ServerResponse) => {
  res.writeHead(404, { 'Content-type': 'application/json' });
  res.end(JSON.stringify({ code: 404, message: 'Page not found' }));
};
