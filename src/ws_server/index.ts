import WebSocket from 'ws';
import Reg from '../modules/Reg';
import CreateRoom from '../modules/CreateRoom';
import AddUserToRoom from '../modules/AddUserToRoom';
import CreateGame from '../modules/CreateGame';

export const wsServerStart = () => {
  const wsServer = new WebSocket.Server({ port: 3000 });
  wsServer.on('connection', function connection(ws) {
    console.log('Client connected');

    ws.on('message', function incoming(message: string) {
      const messageJSON = JSON.parse(message);
      const index = Date.now();

      if (messageJSON.type === 'reg') {
        Reg(index, message, ws);
      }

      if (messageJSON.type === 'create_room') {
        CreateRoom(index, ws);
      }

      if (messageJSON.type === 'add_user_to_room') {
        AddUserToRoom(ws);
      }

      /* if (messageJSON.type === 'create_game') {
        AddUserToRoom(ws);
      } */
    });

    ws.on('close', function close() {
      CreateGame(ws);
    });
  });
};
