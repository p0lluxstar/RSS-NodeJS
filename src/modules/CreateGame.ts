import { rooms } from './CreateRoom';
import { players } from './Reg';
import { CreatGame, Websocket } from '../types/interfaces';
import { webSocketArray } from '../ws_server';

export let games: Array<{ idGame: string; idPlayer: string }> = [];

export let createGame: CreatGame = {
  type: 'create_game',
  data: [],
  id: 0,
};

const CreateGame = (ws: Websocket) => {
  games.push({
    idGame: rooms[0].index,
    idPlayer: players[ws.id].index,
  });

  createGame.data[0] = JSON.stringify({
    idGame: games[0].idGame,
    idPlayer: players[ws.id].index,
  });
  webSocketArray[ws.id].send(JSON.stringify(createGame));

  console.log('games', games);
};

export default CreateGame;
