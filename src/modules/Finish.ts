import { webSocketArray } from '../ws_server';
import { updateWinners } from './UpdateWinners';
import { players } from './Reg';
import { Websocket } from '../types/interfaces';

const finish = {
  type: 'finish',
  data: JSON.stringify({ winPlayer: '' }),
  id: 0,
};

const Finish = (ws: Websocket) => {
  const parsedData = JSON.parse(finish.data);
  parsedData.winPlayer = players[ws.id].index;
  finish.data = JSON.stringify(parsedData);

  updateWinners.data = JSON.stringify([
    { name: players[ws.id].name, wins: players[ws.id].win + 1 },
  ]);

  webSocketArray.forEach((el) => {
    el.send(JSON.stringify(finish));
    el.send(JSON.stringify(updateWinners));
  });
};

export default Finish;
