import { rooms } from './CreateRoom';
import { players } from './Reg';
import { CreatGame, Websocket } from '../types/interfaces';

export let games: Array<{ idGame: string; idPlayer: string }> = [];
let currentUserInGame = 1;

export let createGame: CreatGame = {
  type: 'create_game',
  data: [],
  id: 0,
};

const CreateGame = (ws: Websocket) => {
  games.push({
    idGame: rooms[0].index,
    idPlayer: players[currentUserInGame].index,
  });

  createGame.data[0] = JSON.stringify({
    idGame: games[0].idGame,
    idPlayer: players[currentUserInGame].index,
  });
  ws.send(JSON.stringify(createGame));
  currentUserInGame--;
  console.log('games', games);
};

export default CreateGame;
