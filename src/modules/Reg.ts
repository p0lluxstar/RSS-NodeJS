import { updateRoom } from './CreateRoom';
import { updateWinners } from './UpdateWinners';
import { currentUser } from './AddUserToRoom';
import { Player, Websocket} from '../types/interfaces';

export let players: Array<{ id: number; index: number; name: string; password: string }> = [];

const Reg = (index: number, message: string, ws: Websocket) => {
  const dataAuth = JSON.parse(JSON.parse(message).data);

  players.push({
    id: currentUser,
    index: index,
    name: dataAuth.name,
    password: dataAuth.password,
  });

  const player: Player = {
    type: 'reg',
    data: JSON.stringify({
      name: players[currentUser].name,
      index: players[currentUser].index,
      error: false,
      errorText: 'err',
    }),
    id: currentUser,
  };

  ws.send(JSON.stringify(player));
  ws.send(JSON.stringify(updateWinners));
  ws.send(JSON.stringify(updateRoom));
};

export default Reg;
