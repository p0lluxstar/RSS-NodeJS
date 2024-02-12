import cluster from 'cluster';
import http from 'http';
import os from 'os';
import { hadlerReqUrl } from './util/handlerReqUrl';
import dotenv from 'dotenv';
dotenv.config();

const numCPUs = os.cpus().length;
const port: string = process.env.PORT || '';

if (cluster.isMaster) {
  console.log(`Starting Master!`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', () => {
    console.log(`Server has stopped!`);
  });
} else {
  const newPort:number = Number(port) + (cluster.worker ? cluster.worker.id - 1 : 0);

  http
    .createServer((req, res) => {
      hadlerReqUrl(req, res);
      
    })
    .listen(newPort, 'localhost', () => {
      console.log(
        `Server is running on http://localhost:${newPort}/`
      );
    });
}
