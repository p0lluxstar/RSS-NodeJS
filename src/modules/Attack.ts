import { games } from './CreateGame';
import { players } from './Reg';
import Turn from './Turn';
import { Websocket } from '../types/interfaces';

const Attack = (ws: Websocket) => {
  const attack = {
    type: 'attack',
    data: JSON.stringify({
      position: {
        x: 0,
        y: 0,
      },
      currentPlayer: players[0].index,
      status: 'miss',
    }),
    id: 0,
  };

  ws.send(JSON.stringify(attack));
  Turn(ws, players[0].index);
};

export default Attack;
