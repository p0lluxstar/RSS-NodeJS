import { IncomingMessage, ServerResponse } from 'http';
import { v4 as uuidv4 } from 'uuid';
import { users, deleteUsers } from '../db/users';
import { handlerResAnswer } from './handlerResAnswer';

const LENGTH_ID = 36;

const handleUserRequest = (res: ServerResponse, userId: string, callback: (user: any) => void) => {
  if (userId.length !== LENGTH_ID) {
    handlerResAnswer(res, 400, { code: 400, message: 'User in invalid' });
  } else {
    const user = users.find((user) => user.id === userId);
    if (user) {
      callback(user);
    } else {
      handlerResAnswer(res, 404, { code: 404, message: 'User not found' });
    }
  }
};

export const handleGetUsers = (res: ServerResponse) => {
  handlerResAnswer(res, 200, users);
};

export const handleGetUserById = (res: ServerResponse, userId: string) => {
  handleUserRequest(res, userId, (user: any) => {
    handlerResAnswer(res, 200, user);
  });
};

export const handlePostUser = (req: IncomingMessage, res: ServerResponse) => {
  let userJSON = '';
  req.on('data', (chunk: string) => (userJSON += chunk));
  req.on('end', () => {
    const parseUserJSON = JSON.parse(userJSON);
    if (parseUserJSON.username && parseUserJSON.age && Array.isArray(parseUserJSON.hobbies)) {
      const id = uuidv4();
      const userDataWithID = { id, ...parseUserJSON };
      users.push(userDataWithID);
      handlerResAnswer(res, 201, userDataWithID);
    } else {
      handlerResAnswer(res, 400, { code: 400, message: 'Invalid user data' });
    }
  });
};

export const handlePutUser = (req: IncomingMessage, res: ServerResponse, userId: string) => {
  handleUserRequest(res, userId, (user: any) => {
    let putUserJSON = '';
    req.on('data', (chunk: string) => (putUserJSON += chunk));
    req.on('end', () => {
      const newDataUser = JSON.parse(putUserJSON);
      Object.assign(user, newDataUser);
      handlerResAnswer(res, 200, user);
    });
  });
};

export const handleDeleteUser = (req: IncomingMessage, res: ServerResponse, userId: string) => {
  handleUserRequest(res, userId, (user: any) => {
    deleteUsers(userId);
    handlerResAnswer(res, 204, {});
  });
};

export const pageNotFound = (res: ServerResponse) => {
  handlerResAnswer(res, 404, { code: 404, message: 'Page not found' });
};
