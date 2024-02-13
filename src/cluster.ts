import cluster from 'cluster';
import http from 'http';
import os from 'os';
import fs from 'fs';
import { handlerResAnswer } from './util/handlerResAnswer';
import { pageNotFound } from './util/handlerMethods';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
dotenv.config();


const numCPUs = os.cpus().length;
const port: string = process.env.PORT || '';
const filePath = 'src/db/usersCluster.json';

if (cluster.isMaster) {
  console.log(`Starting Master!`);

  try {
    fs.writeFileSync(filePath, '[]');
  } catch (err) {
    console.error(err);
  }

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', () => {
    console.log(`Server has stopped!`);
  });
} else {
  const newPort: number = Number(port) + (cluster.worker ? cluster.worker.id - 1 : 0);

  http
    .createServer((req, res) => {
      const urlParts = req.url?.split('/') ?? [];
      const userId = urlParts[urlParts.length - 1];

      if ((req.url === '/api/users' || req.url === '/api/users/') && req.method === 'GET') {
        fs.readFile(filePath, 'utf8', (err, data) => {
          if (err) {
            res.statusCode = 500;
            res.end('Error reading users.json file');
          } else {
            res.setHeader('Content-Type', 'application/json');
            res.end(data);
          }
        });
        return;
      }

      if (req.url === `/api/users/${userId}` && req.method === 'GET') {
        fs.readFile(filePath, 'utf8', (err, data) => {
          if (err) {
            console.error(err);
            return;
          }

          const users = JSON.parse(data);
          const user = users.find((user: any) => user.id === userId);

          if (user) {
            handlerResAnswer(res, 200, user);
          } else {
            handlerResAnswer(res, 404, { code: 404, message: 'User not found' });
          }
        });
        return;
      }

      if (req.url === '/api/users' && req.method === 'POST') {
        let userJSON = '';

        req.on('data', (data) => {
          userJSON += data;
        });

        req.on('end', () => {
          const parseUserJSON = JSON.parse(userJSON);

          fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
              throw err;
            }

            let currentData = [];
            if (data) {
              currentData = JSON.parse(data);
            }

            if (
              parseUserJSON.username &&
              parseUserJSON.age &&
              Array.isArray(parseUserJSON.hobbies)
            ) {
              const id = uuidv4();
              const userDataWithID = { id, ...parseUserJSON };
              currentData.push(userDataWithID);

              fs.writeFile(filePath, JSON.stringify(currentData), (err) => {
                if (err) {
                  throw err;
                }
                handlerResAnswer(res, 201, userDataWithID);
              });
            } else {
              handlerResAnswer(res, 400, { code: 400, message: 'Invalid user data' });
            }
          });
        });
        return;
      }

      if (req.url === `/api/users/${userId}` && req.method === 'DELETE') {
        fs.readFile(filePath, 'utf8', (err, data) => {
          if (err) {
            console.error(err);
            return;
          }

          const users = JSON.parse(data);
          const index = users.findIndex((user: any) => user.id === userId);

          if (index !== -1) {
            users.splice(index, 1);
            fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
              if (err) {
                console.error(err);
                return;
              }
              handlerResAnswer(res, 204, {});
            });
          } else {
            handlerResAnswer(res, 404, { code: 404, message: 'User not found' });
          }
        });
        return;
      }

      pageNotFound(res);
      
    })
    .listen(newPort, 'localhost', () => {
      console.log(`Server is running on http://localhost:${newPort}/`);
    });
}
