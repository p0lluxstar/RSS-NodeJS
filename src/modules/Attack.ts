import { games } from './CreateGame';
import { players } from './Reg';
import Turn from './Turn';
import RandomAttack from './RandomAttack';
import { Websocket } from '../types/interfaces';
import { webSocketArray } from '../ws_server';

const Attack = (ws: Websocket, positionX: number, positionY: number) => {
  const attack = {
    type: 'attack',
    data: JSON.stringify({
      position: {
        x: positionX,
        y: positionY,
      },
      currentPlayer: players[ws.id].index,
      status: 'miss',
    }),
    id: 0,
  };

  if (ws.id === 1) {
    webSocketArray[1].send(JSON.stringify(attack));
    webSocketArray[0].send(JSON.stringify(attack));
    Turn(ws, 0, players[0].index);
    Turn(ws, 1, players[0].index);
  } else {
    webSocketArray[0].send(JSON.stringify(attack));
    webSocketArray[1].send(JSON.stringify(attack));
    Turn(ws, 0, players[1].index);
    Turn(ws, 1, players[1].index);
  }
};

export default Attack;
