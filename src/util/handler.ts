import { IncomingMessage, ServerResponse } from 'http';
import { v4 as uuidv4 } from 'uuid';
import { users } from '../db/users';
import { User } from '../interface/users';

export const handleGetUsers = (res: ServerResponse) => {
  res.writeHead(200, { 'Content-type': 'application/json' });
  res.end(JSON.stringify(users));
};

export const handleGetUserById = (res: ServerResponse, userId: string) => {
  const lengthID = 36;
  if (userId.length != lengthID) {
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
    const userDataWithoutID: User = JSON.parse(userJSON);
    if (userDataWithoutID.username && userDataWithoutID.age && userDataWithoutID.hobbies.length > 0) {
      const id = uuidv4();
      const userDataWithID = {id, ...userDataWithoutID}
      users.push(userDataWithID);
      res.writeHead(200, { 'Content-type': 'application/json' });
      res.end(JSON.stringify(userDataWithID ));
    } else {
      res.writeHead(400, { 'Content-type': 'application/json' });
      res.end(JSON.stringify({ code: 400, message: 'Invalid user data' }));
    }
  });
};

export const pageNotFound = (res: ServerResponse) => {
  res.writeHead(404, { 'Content-type': 'application/json' });
  res.end(JSON.stringify({ code: 404, message: 'Page not found' }));
};
