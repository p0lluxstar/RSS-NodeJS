import { games } from './CreateGame';
import { players } from './Reg';
import { Websocket } from '../types/interfaces';

const RandomAttack = (ws: Websocket) => {
  const randomAttack = {
    type: 'randomAttack',
    data: JSON.stringify({ gameId: games[0].idGame, indexPlayer: players[0].index }),
    id: 0,
  };

  ws.send(JSON.stringify(randomAttack));
};

export default RandomAttack;
