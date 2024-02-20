export interface Player {
  type: string;
  data: string;
  id: number;
}

export interface UpdateWinners {
  type: string;
  data: [];
  id: 0;
}

export interface UpdateRoom {
  type: string;
  data: Array<{}>;
  id: number;
}
