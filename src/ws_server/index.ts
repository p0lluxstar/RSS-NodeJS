import WebSocket from 'ws';

interface A {
  type: string;
  data: { name: string; index: number; error: boolean; errorText: string };
  id: number;
}

interface B {
    type: string,
    data:
        [
            {
                name: string,
                wins: number,
            }
        ],
    id: 0,
}

export const wsServerStart = () => {
  const wsServer = new WebSocket.Server({ port: 3000 });

  const a:A = {
    type: 'reg',
    data: {
      name: 'Jonh',
      index: 1,
      error: false,
      errorText: 'err',
    },
    id: 1,
  };

  const b:B = {
    type: "update_winners",
    data:
        [
            {
                name: "Jonh",
                wins: 0,
            }
        ],
    id: 0,
}

  wsServer.on('connection', function connection(ws) {
    console.log('Client connected');

    ws.on('message', function incoming(message: string) {
      console.log(`Received message: ${message}`);
      ws.send(JSON.stringify(a));
      ws.send(JSON.stringify(b));
    });

    ws.on('close', function close() {
      console.log('Client disconnected');
    });
  });
};
