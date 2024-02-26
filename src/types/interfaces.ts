export interface Player {
  type: string;
  data: string;
  id: number;
}

export interface UpdateWinners {
  type: string;
  data: any;
  id: number;
}

export interface UpdateRoom {
  type: string;
  data: string;
  id: number;
}

export interface CreatGame {
  type: string;
  data: string;
  id: number;
}

export interface Websocket {
  send(data: string): void;
  id: number;
}
