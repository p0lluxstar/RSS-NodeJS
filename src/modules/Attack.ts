import { players } from './Reg';
import Turn from './Turn';
import { webSocketArray } from '../ws_server';
import { dataPositionShipsAll } from './StartGame';
import Finish from './Finish';
import { Websocket } from '../types/interfaces';

const Attack = (ws: Websocket, positionX: number, positionY: number) => {
  const XY = `${positionX},${positionY}`;
  let status = 'miss';

  if (dataPositionShipsAll[ws.id].ships) {
    dataPositionShipsAll[ws.id].ships.forEach((el: string) => {
      if (el === XY) {
        status = 'shot';
        dataPositionShipsAll[ws.id].quantityHit++;
        return;
      }
    });
  }

  const attack = {
    type: 'attack',
    data: JSON.stringify({
      position: {
        x: positionX,
        y: positionY,
      },
      currentPlayer: players[ws.id].index,
      status: status,
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

  if (dataPositionShipsAll[ws.id].quantityHit === 20) {
    Finish(ws);
  }
};

export default Attack;
