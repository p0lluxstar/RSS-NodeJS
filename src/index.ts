import http from 'http';
import dotenv from 'dotenv';
dotenv.config();

const port: string = process.env.PORT || '';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello world!');
});

server.listen(Number(port), 'localhost', () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
