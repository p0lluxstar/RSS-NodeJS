import { ServerResponse } from 'http';

export const handlerResAnswer = (res: ServerResponse, resCodeAnswer: number, resJSON: object) => {
  res.writeHead(resCodeAnswer, { 'Content-type': 'application/json' });
  res.end(JSON.stringify(resJSON));
};
