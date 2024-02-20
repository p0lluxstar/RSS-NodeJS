import WebSocket from 'ws';
import { Player, UpdateRoom, UpdateWinners } from '../types/interfaces';

export const wsServerStart = () => {
  const wsServer = new WebSocket.Server({ port: 3000 });

  let players: Array<{ id: number; index: number; name: string; password: string }> = [];
  let playersId = 0;

  let winners: Array<{}> = [];

  let updateRoom: UpdateRoom = {
    type: 'update_room',
    data: [],
    id: 0,
  };

  const updateWinners: UpdateWinners = {
    type: 'update_winners',
    data: [],
    id: 0,
  };

  wsServer.on('connection', function connection(ws) {
    console.log('Client connected');

    ws.on('message', function incoming(message: string) {
      const messageJSON = JSON.parse(message);
      const index = Date.now();

      if (messageJSON.type === 'reg') {
        const dataAuth = JSON.parse(JSON.parse(message).data);

        players.push({
          id: playersId,
          index: index,
          name: dataAuth.name,
          password: dataAuth.password,
        });

        const player: Player = {
          type: 'reg',
          data: JSON.stringify({
            name: players[playersId].name,
            index: players[playersId].index,
            error: false,
            errorText: 'err',
          }),
          id: playersId,
        };

        ws.send(JSON.stringify(player));
        ws.send(JSON.stringify(updateWinners));
        ws.send(JSON.stringify(updateRoom));
      }

      if (messageJSON.type === 'create_room') {
        updateRoom.data[0] = JSON.stringify([
          {
            roomId: index,
            roomUsers: [
              {
                name: '',
                index: 0,
              },
            ],
          },
        ]);
        ws.send(JSON.stringify(updateRoom));
      }

      if (messageJSON.type === 'add_user_to_room') {
        updateRoom.data[0] = JSON.stringify([
          {
            roomId: index,
            roomUsers: [
              {
                name: players[playersId].name,
                index: playersId,
              },
            ],
          },
        ]);
        ws.send(JSON.stringify(updateRoom));
      }
    });

    ws.on('close', function close() {
      console.log('Client disconnected');
    });
  });
};
