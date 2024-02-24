import { updateRoom } from './CreateRoom';
import { updateWinners } from './UpdateWinners';
import { Player, Websocket } from '../types/interfaces';

export let players: Array<{ idUser: number; index: string; name: string; password: string }> = [];
let currentUser = 0;

const Reg = (index: string, message: string, ws: Websocket) => {
  const dataAuth = JSON.parse(JSON.parse(message).data);

  players.push({
    idUser: currentUser,
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

  currentUser++;
  console.log('plauers', players);
};

export default Reg;
