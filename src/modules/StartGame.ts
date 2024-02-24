import { players } from './Reg';
import Turn from './Turn';
import { Websocket } from '../types/interfaces';

interface Data {
  ships: Array<{}>;
  indexPlayer: string;
}

const StartGame = (ws: Websocket, dataShips: Data) => {
  const startGame = {
    type: 'start_game',
    data: JSON.stringify({ ships: dataShips.ships, currentPlayerIndex: dataShips.indexPlayer }),
    id: 0,
  };

  ws.send(JSON.stringify(startGame));
  Turn(ws, dataShips.indexPlayer);
};

export default StartGame;
