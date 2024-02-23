import { updateRoom, rooms, currentRoom } from './CreateRoom';
import { players } from './Reg';
import { Websocket } from '../types/interfaces';
import CreateGame from './CreateGame';

export let currentUser = 0;

const AddUserToRoom = (ws: Websocket) => {
  if (players.length < 2) {
    updateRoom.data[0] = JSON.stringify([
      {
        roomId: rooms[currentRoom].index,
        roomUsers: [
          {
            name: players[currentUser].name,
            index: players[currentUser].index,
          },
        ],
      },
    ]);
    ws.send(JSON.stringify(updateRoom));
    currentUser++;
  } else {
    CreateGame(ws);
    updateRoom.data[0] = JSON.stringify([]);
    ws.send(JSON.stringify(updateRoom));
  }
};

export default AddUserToRoom;
