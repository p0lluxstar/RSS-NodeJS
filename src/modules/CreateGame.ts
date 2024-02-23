import { rooms } from './CreateRoom';
import { players } from './Reg';
import { CreatGame, Websocket } from '../types/interfaces';

export let games: Array<{ idGame: number; idPlayer: number }> = [];

export let createGame: CreatGame = {
  type: 'create_game',
  data: [],
  id: 0,
};

const CreateGame = (ws: Websocket) => {
    games.push({
        idGame: rooms[0].index,  
        idPlayer: players[1].index, 
    })

    createGame.data[0] = JSON.stringify([
        {
            idGame: games[0].idGame, 
            idPlayer: games[0].idPlayer
        },
      ]);
    ws.send(JSON.stringify(createGame));
};

export default CreateGame;
