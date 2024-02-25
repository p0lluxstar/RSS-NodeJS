import { Websocket } from '../types/interfaces';
import { webSocketArray } from '../ws_server';

const Turn = (ws: Websocket, num: number, currentPlayer: string ) => {
  const turn = {
    type: 'turn',
    data: JSON.stringify({ currentPlayer: currentPlayer }),
    id: 0,
  };

  if (num === 0 || num === 1) {
    webSocketArray[num].send(JSON.stringify(turn));
  }
};

export default Turn;
