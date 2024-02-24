import { Websocket } from '../types/interfaces';

const Turn = (ws: Websocket, currentPlayer: string) => {
  const turn = {
    type: 'turn',
    data: JSON.stringify({currentPlayer: currentPlayer}),
    id: 0,
  };

  ws.send(JSON.stringify(turn));
};

export default Turn;
