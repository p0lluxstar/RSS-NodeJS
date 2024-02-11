import { IncomingMessage, ServerResponse } from 'http';
import { v4 as uuidv4 } from 'uuid';
import { users, deleteUsers } from '../db/users';
import { User } from '../types/interfaces';
import { handlerResAnswer } from './handlerResAnswer';

const LENGTH_ID = 36;

export const handleGetUsers = (res: ServerResponse) => {
  handlerResAnswer(res, 200, users);
};

export const handleGetUserById = (res: ServerResponse, userId: string) => {
  if (userId.length != LENGTH_ID) {
    handlerResAnswer(res, 400, { code: 400, message: 'User in invalid' });
  } else {
    const user = users.find((user) => user.id === userId);
    if (user) {
      handlerResAnswer(res, 200, user);
    } else {
      handlerResAnswer(res, 404, { code: 404, message: 'User not found' });
    }
  }
};

export const handlePostUser = (req: IncomingMessage, res: ServerResponse) => {
  let userJSON = '';
  req.on('data', (chunk: string) => (userJSON += chunk));
  req.on('end', () => {
    const userDataWithoutID: User = JSON.parse(userJSON);
    if (
      userDataWithoutID.username &&
      userDataWithoutID.age &&
      userDataWithoutID.hobbies.length > 0
    ) {
      const id = uuidv4();
      const userDataWithID = { id, ...userDataWithoutID };
      users.push(userDataWithID);
      handlerResAnswer(res, 201, userDataWithID);
    } else {
      handlerResAnswer(res, 400, { code: 400, message: 'Invalid user data' });
    }
  });
};

export const handlePutUser = (req: IncomingMessage, res: ServerResponse, userId: string) => {
  if (userId.length != LENGTH_ID) {
    handlerResAnswer(res, 400, { code: 400, message: 'User in invalid' });
  } else {
    const user = users.find((user) => user.id === userId);
    if (user) {
      let putUserJSON = '';
      req.on('data', (chunk: string) => (putUserJSON += chunk));
      req.on('end', () => {
        const newDataUser = JSON.parse(putUserJSON);
        Object.assign(user, newDataUser);
        handlerResAnswer(res, 200, user);
      });
    } else {
      handlerResAnswer(res, 404, { code: 404, message: 'User not found' });
    }
  }
};

export const handleDeleteUser = (req: IncomingMessage, res: ServerResponse, userId: string) => {
  if (userId.length != LENGTH_ID) {
    handlerResAnswer(res, 400, { code: 400, message: 'User in invalid' });
  } else {
    const user = users.find((user) => user.id === userId);
    if (user) {
      deleteUsers(userId);
      handlerResAnswer(res, 204, {});
    } else {
      handlerResAnswer(res, 404, { code: 404, message: 'User not found' });
    }
  }
};

export const pageNotFound = (res: ServerResponse) => {
  handlerResAnswer(res, 404, { code: 404, message: 'Page not found' });
};
