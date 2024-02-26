import { UpdateWinners } from '../types/interfaces';

let winners: Array<{}> = [];

export const updateWinners: UpdateWinners = {
  type: 'update_winners',
  data: JSON.stringify([]),
  id: 0,
};
