import { players } from './Reg';
import { UpdateRoom, Websocket } from '../types/interfaces';

export let rooms: Array<{ id: number; index: number; name: string }> = [];
export let currentRoom = 0;

export let updateRoom: UpdateRoom = {
  type: 'update_room',
  data: [],
  id: 0,
};

const CreateRoom = (index: number, ws: Websocket) => {
  rooms.push({
    id: currentRoom,
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
  ws.send(JSON.stringify(updateRoom));
};

export default CreateRoom;
