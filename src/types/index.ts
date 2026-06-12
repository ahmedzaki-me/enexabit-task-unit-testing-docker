export type Player = "X" | "O";
export type Cell = Player | null;
export type Board = Cell[];

export interface Scores {
  x: number;
  o: number;
  draws: number;
}

export interface WinResult {
  winner: Player;
  combination: number[];
}
