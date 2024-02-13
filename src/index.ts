import http from 'http';
import { hadlerReqUrl } from './util/handlerReqUrl';
import dotenv from 'dotenv';
dotenv.config();

const port: string = process.env.PORT || '';

export const server = http.createServer((req, res) => {
  hadlerReqUrl(req, res);
});

server.listen(Number(port), 'localhost', () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
