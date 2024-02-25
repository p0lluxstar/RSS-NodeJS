import { players } from './Reg';
import Turn from './Turn';
import { games } from './CreateGame';
import { Websocket } from '../types/interfaces';
import { webSocketArray } from '../ws_server';

interface DataShips {
  ships: Array<{
    position: { x: number; y: number };
    direction: boolean;
    type: string;
    length: number;
  }>;
  indexPlayer: string;
}

let start = false;

let XY: any[] = [];

const StartGame = (ws: Websocket, dataShips: DataShips) => {
  console.log(dataShips.ships);
  dataShips.ships.forEach((el) => {
    if (el.direction === false) {
      for (let i = 0; i < el.length; i++) {
        XY.push(`${el.position.x + i},${el.position.y}`);
      }
    } else {
      for (let i = 0; i < el.length; i++) {
        XY.push(`${el.position.x},${el.position.y + i}`);
      }
    }
  });

  console.log(XY);

  const startGame = {
    type: 'start_game',
    data: JSON.stringify({ ships: dataShips.ships, currentPlayerIndex: dataShips.indexPlayer }),
    id: 0,
  };

  webSocketArray[ws.id].send(JSON.stringify(startGame));

  if (ws.id === 0) {
    Turn(ws, 0, players[1].index);
  }

  if (start === false) {
    Turn(ws, 1, players[1].index);
    start = true;
  }
};

export default StartGame;
