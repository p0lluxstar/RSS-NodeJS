import { updateRoom } from './CreateRoom';
import { updateWinners } from './UpdateWinners';
import { Player, Websocket } from '../types/interfaces';
import { webSocketArray } from '../ws_server';

export let players: Array<{ idUser: number; index: string; name: string; password: string, win: number }> = [];

const Reg = (index: string, message: string, ws: Websocket) => {
  const dataAuth = JSON.parse(JSON.parse(message).data);

  players.push({
    idUser: ws.id,
    index: index,
    name: dataAuth.name,
    password: dataAuth.password,
    win: 0
  });

  const player: Player = {
    type: 'reg',
    data: JSON.stringify({
      name: players[ws.id].name,
      index: players[ws.id].index,
      error: false,
      errorText: 'err',
    }),
    id: 0,
  };

  webSocketArray[ws.id].send(JSON.stringify(player));
  webSocketArray[ws.id].send(JSON.stringify(updateWinners));
  webSocketArray[ws.id].send(JSON.stringify(updateRoom));

  console.log('players', players);
};

export default Reg;
