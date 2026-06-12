import { useState, useEffect } from "react";

import {
  checkWinner,
  isBoardFull,
  makeMove,
  resetGame,
  resetScores,
} from "./logic/gameLogic";

import type { Board, Player, Scores } from "./types";

import BoardComponent from "./components/Board";
import Scoreboard from "./components/Scoreboard";

const API = "http://localhost:3001/scores";

export default function App() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [winner, setWinner] = useState<Player | null>(null);
  const [isDraw, setIsDraw] = useState(false);
  const [scores, setScores] = useState<Scores>({ x: 0, o: 0, draws: 0 });
  const [winningCombination, setWinningCombination] = useState<number[] | null>(
    null,
  );
  useEffect(() => {
    fetch(API)
      .then((r) => r.json())
      .then(setScores);
  }, []);

  function handleCellClick(index: number) {
    if (winner || isDraw) return;

    const newBoard = makeMove(board, index, currentPlayer);
    if (newBoard === board) return;

    const win = checkWinner(newBoard);
    const draw = !win && isBoardFull(newBoard);

    setBoard(newBoard);

    if (win) {
      setWinner(win.winner);
      setWinningCombination(win.combination);
      const updated = {
        ...scores,
        [win.winner.toLowerCase()]:
          scores[win.winner.toLowerCase() as keyof Scores] + 1,
      };
      setScores(updated);
      fetch(API, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
    } else if (draw) {
      setIsDraw(true);
      const updated = { ...scores, draws: scores.draws + 1 };
      setScores(updated);
      fetch(API, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  }

  function handleReset() {
    setBoard(resetGame());
    setCurrentPlayer("X");
    setWinner(null);
    setIsDraw(false);
    setWinningCombination(null);
  }

  async function handleResetScores() {
    const reset = resetScores();
    await fetch(API, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reset),
    });
    setScores(reset);
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center gap-8">
      <h1 className="text-3xl font-bold tracking-widest">
        X-O Game <span className="text-lg">with</span>{" "}
        <span className="text-purple-800"> Zaki</span>
      </h1>
      <Scoreboard scores={scores} />
      <p className="text-lg text-gray-400">
        {winner
          ? `🎉 Winner: ${winner}`
          : isDraw
            ? "🤝 Draw!"
            : `Turn: ${currentPlayer}`}
      </p>
      <BoardComponent
        board={board}
        onCellClick={handleCellClick}
        winningCombination={winningCombination}
      />

      <button
        onClick={handleReset}
        className="mt-4 px-6 py-2 w-50 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition"
      >
        Reset
      </button>
      <button
        onClick={handleResetScores}
        className="px-6 py-2  w-50 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition"
      >
        Reset Scores
      </button>
    </div>
  );
}
