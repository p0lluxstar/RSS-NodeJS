import { updateRoom, rooms, currentRoom } from './CreateRoom';
import { players } from './Reg';
import CreateGame from './CreateGame';
import { Websocket } from '../types/interfaces';
import { webSocketArray } from '../ws_server';

/* export let currentUser = 0; */

const AddUserToRoom = (ws: Websocket, messageJSON: string) => {
  console.log('addUser', messageJSON);
  if (players.length < 2) {
    updateRoom.data[0] = JSON.stringify([
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
    updateRoom.data[0] = JSON.stringify([]);
    webSocketArray[ws.id].send(JSON.stringify(updateRoom));
  }
};

export default AddUserToRoom;
