import { rooms } from './CreateRoom';
import { players } from './Reg';
import { webSocketArray } from '../ws_server';
import { CreatGame, Websocket } from '../types/interfaces';

export let games: Array<{ idGame: string; idPlayer: string }> = [];

export let createGame: CreatGame = {
  type: 'create_game',
  data: JSON.stringify([]),
  id: 0,
};

const CreateGame = (ws: Websocket) => {
  if (rooms.length > 0) {
    games.push({
      idGame: rooms[0].index,
      idPlayer: players[ws.id].index,
    });

    createGame.data = JSON.stringify({
      idGame: games[0].idGame,
      idPlayer: players[ws.id].index,
    });
    webSocketArray[ws.id].send(JSON.stringify(createGame));
  }
};

export default CreateGame;
