import Attack from './Attack';
import { Websocket } from '../types/interfaces';

const RandomAttack = (ws: Websocket) => {
  const positionX = Math.floor(Math.random() * 10);
  const positionY = Math.floor(Math.random() * 10);
  Attack(ws, positionX, positionY);
};

export default RandomAttack;
