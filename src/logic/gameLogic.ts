import type { Board, Scores, Player, WinResult } from "../types";

export const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function checkWinner(board: Board): WinResult | null {
  for (const [a, b, c] of WINNING_COMBINATIONS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a] as Player, combination: [a, b, c] };
    }
  }
  return null;
}

export function isBoardFull(board: Board): boolean {
  return board.every((cell) => cell !== null);
}

export function makeMove(
  board: Board,
  index: number,
  currentPlayer: Player,
): Board {
  if (board[index] !== null) return board;
  const newBoard = [...board];
  newBoard[index] = currentPlayer;
  return newBoard;
}

export function resetGame(): Board {
  return Array(9).fill(null);
}

export function resetScores(): Scores {
  return { x: 0, o: 0, draws: 0 };
}
