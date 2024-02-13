import { ServerResponse } from 'http';

export const handlerResAnswer = (res: ServerResponse, resCodeAnswer: number, resJSON: object) => {
  try {
    /*  throw new Error('err'); */
    res.writeHead(resCodeAnswer, { 'Content-type': 'application/json' });
    res.end(JSON.stringify(resJSON));
  } catch (error) {
    res.writeHead(500, { 'Content-type': 'application/json' });
    res.end(JSON.stringify({ code: 500, message: 'Internal server error' }));
  }
};
