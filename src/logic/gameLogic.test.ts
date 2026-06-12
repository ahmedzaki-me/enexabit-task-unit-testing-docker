import { describe, expect, it } from "vitest";
import {
  checkWinner,
  isBoardFull,
  WINNING_COMBINATIONS,
  makeMove,
  resetGame,
  resetScores,
} from "./gameLogic";
import type { Board, Player } from "../types";

const emptyBoard = (): Board => Array(9).fill(null);

describe("checkWinner", () => {
  it("returns null on empty board", () => {
    expect(checkWinner(emptyBoard())).toBeNull();
  });

  it("returns null when no winning combination is complete", () => {
    const board: Board = ["X", null, "O", null, "X", null, null, null, null];
    expect(checkWinner(board)).toBeNull();
  });

  describe.each<Player>(["X", "O"])("Player %s winning scenarios", (player) => {
    it.each(WINNING_COMBINATIONS)(
      `detects ${player} winning via combination [%i, %i, %i]`,
      (a, b, c) => {
        const board = emptyBoard();

        board[a] = player;
        board[b] = player;
        board[c] = player;

        const result = checkWinner(board);

        expect(result).not.toBeNull();
        expect(result?.winner).toBe(player);
        expect(result?.combination).toEqual([a, b, c]);
      },
    );
  });

  it("returns the first winning combination found when multiple exist", () => {
    // X wins on [0,1,2] & [0,3,6], So should return the first match
    const board: Board = ["X", "X", "X", "X", null, null, "X", null, null];
    const result = checkWinner(board);
    expect(result?.winner).toBe("X");
    expect(result?.combination).toEqual([0, 1, 2]);
  });
});

describe("isBoardFull", () => {
  it("returns false on empty board", () => {
    expect(isBoardFull(emptyBoard())).toBe(false);
  });

  it("returns false when no winning combination is complete", () => {
    const board: Board = ["X", null, "O", null, "X", null, null, null, null];
    expect(isBoardFull(board)).toBe(false);
  });

  it("returns true when all cells are filled", () => {
    const board: Board = ["X", "O", "X", "X", "O", "O", "O", "X", "X"];
    expect(isBoardFull(board)).toBe(true);
  });
});

describe("makeMove", () => {
  it("returns the original board unchanged when cell is already occupied", () => {
    const board: Board = ["X", null, "O", null, "X", null, null, null, null];
    const result = makeMove(board, 0, "O");

    expect(result).toBe(board); // Same board
    expect(result[0]).toBe("X"); // Same value
  });

  it("returns a new board when cell is empty", () => {
    const board = emptyBoard();
    const newBoard = makeMove(board, 0, "X");
    expect(newBoard[0]).toBe("X");
  });

  it("returns a new board reference (immutability)", () => {
    const board = emptyBoard();
    const newBoard = makeMove(board, 0, "X");
    expect(newBoard).not.toBe(board);
  });

  it("does not mutate other cells when making a move", () => {
    const board: Board = [null, "X", null, null, null, null, null, null, null];
    const newBoard = makeMove(board, 2, "O");
    expect(newBoard[1]).toBe("X");
    expect(newBoard[2]).toBe("O");
  });
});

describe("resetGame", () => {
  it("returns a board of 9 null cells", () => {
    expect(resetGame()).toEqual(Array(9).fill(null));
  });
});

describe("resetScores", () => {
  it("returns zeroed scores", () => {
    expect(resetScores()).toEqual({ x: 0, o: 0, draws: 0 });
  });
});
