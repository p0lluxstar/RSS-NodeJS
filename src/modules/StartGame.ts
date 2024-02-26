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

interface DataPositionShips {
    player: string;
    ships: Array<string>;
    quantityHit: number;
  }

let start = false;

export let dataPositionShipsAll:any[] = [];

const StartGame = (ws: Websocket, dataShips: DataShips) => {
  const dataPositionShips: DataPositionShips = {
    player: '',
    ships: [],
    quantityHit: 0
  };

  dataPositionShips.player = players[ws.id].index;
  dataShips.ships.forEach((el) => {
    if (el.direction === false) {
      for (let i = 0; i < el.length; i++) {
        dataPositionShips.ships.push(`${el.position.x + i},${el.position.y}`);
      }
    } else {
      for (let i = 0; i < el.length; i++) {
        dataPositionShips.ships.push(`${el.position.x},${el.position.y + i}`);
      }
    }
  });

  dataPositionShipsAll.push(dataPositionShips);

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
