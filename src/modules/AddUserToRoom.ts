import { updateRoom, rooms, currentRoom } from './CreateRoom';
import { players } from './Reg';
import CreateGame from './CreateGame';
import { webSocketArray } from '../ws_server';
import { Websocket } from '../types/interfaces';

const AddUserToRoom = (ws: Websocket, messageJSON: string) => {
  if (players.length < 2) {
    updateRoom.data = JSON.stringify([
      {
        roomId: rooms[currentRoom].index,
        roomUsers: [
          {
            name: players[0].name,
            index: players[0].index,
          },
        ],
      },
    ]);
    ws.send(JSON.stringify(updateRoom));
  } else {
    CreateGame(ws);
    updateRoom.data = JSON.stringify([]);
    webSocketArray[ws.id].send(JSON.stringify(updateRoom));
  }
};

export default AddUserToRoom;
