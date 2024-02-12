import cluster from 'cluster';
import http from 'http';
import os from 'os';
import { hadlerReqUrl } from './util/handlerReqUrl';
import dotenv from 'dotenv';
dotenv.config();

const numCPUs = os.cpus().length;
let port: string = process.env.PORT || '';

if (cluster.isMaster) {
  console.log(`Starting the server!`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  http
    .createServer((req, res) => {
      hadlerReqUrl(req, res);
    })
    .listen(Number(port) + (cluster.worker ? cluster.worker.id - 1 : 0), 'localhost', () => {
      console.log(
        `Server is running on http://localhost:${Number(port) + (cluster.worker ? cluster.worker.id - 1 : 0)}/`
      );
    });
}
