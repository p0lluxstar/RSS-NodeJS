import { players } from './Reg';
import { UpdateRoom, Websocket } from '../types/interfaces';
import { webSocketArray } from '../ws_server';

export let rooms: Array<{ idRoom: number; index: string; name: string }> = [];
export let currentRoom = 0;

export let updateRoom: UpdateRoom = {
  type: 'update_room',
  data: [],
  id: 0,
};

const CreateRoom = (index: string, ws: Websocket) => {
  rooms.push({
    idRoom: currentRoom,
    index: index,
    name: players[currentRoom].name,
  });

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
  
  webSocketArray[ws.id].send(JSON.stringify(updateRoom));

  console.log('rooms', rooms)
};

export default CreateRoom;
