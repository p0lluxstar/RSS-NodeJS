import http from 'http';
import { users } from './db/users';
import dotenv from 'dotenv';
dotenv.config();

const port: string = process.env.PORT || '';

const server = http.createServer((req, res) => {
  if (req.url === 'api/users' && req.method === 'GET') {
    res.writeHead(200, { 'Content-type': 'application/json' });
  }
  res.end(JSON.stringify(users));
});

server.listen(Number(port), 'localhost', () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
