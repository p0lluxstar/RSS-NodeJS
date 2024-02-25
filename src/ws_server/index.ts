import WebSocket from 'ws';
import Reg from '../modules/Reg';
import CreateRoom from '../modules/CreateRoom';
import AddUserToRoom from '../modules/AddUserToRoom';
import CreateGame from '../modules/CreateGame';
import StartGame from '../modules/StartGame';
import RandomAttack from '../modules/RandomAttack';
import Attack from '../modules/Attack';

interface CustomWebSocket extends WebSocket {
  id: number;
}

export let webSocketArray: any[] = [];

let idWebSocket = 0;

export const wsServerStart = () => {
  const wsServer: WebSocket.Server = new WebSocket.Server({ port: 3000 });
  wsServer.on('connection', function connection(ws: CustomWebSocket) {
    console.log('Client connected');

    ws.id = idWebSocket;
    idWebSocket++;

    webSocketArray.push(ws);

    ws.on('message', function incoming(message: string) {
      const messageJSON = JSON.parse(message);
      const index = String(Date.now());

      if (messageJSON.type === 'reg') {
        Reg(index, message, ws);
      }

      if (messageJSON.type === 'create_room') {
        CreateRoom(index, ws);
      }

      if (messageJSON.type === 'add_user_to_room') {
        AddUserToRoom(ws, messageJSON);
      }

      /* if (messageJSON.type === 'create_game') {
        AddUserToRoom(ws);
      } */

      if (messageJSON.type === 'add_ships') {
        const dataShips = JSON.parse(messageJSON.data);
        StartGame(ws, dataShips);
      }

      if (messageJSON.type === 'randomAttack') {
        RandomAttack(ws);
      }

      if (messageJSON.type === 'attack') {
        const data = messageJSON.data;
        const x = JSON.parse(data).x;
        const y = JSON.parse(data).y;
        Attack(ws, x, y)
      }
    });

    ws.on('close', function close() {
      CreateGame(ws);
    });
  });
};
