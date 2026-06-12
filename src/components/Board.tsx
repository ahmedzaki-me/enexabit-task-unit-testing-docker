import type { Board as BoardType } from "../types";
import Cell from "./Cell";

interface Props {
  board: BoardType;
  onCellClick: (index: number) => void;
  winningCombination: number[] | null;
}

function getCellCenter(index: number) {
  const col = index % 3;
  const row = Math.floor(index / 3);
  return {
    x: (col + 0.5) * (100 / 3),
    y: (row + 0.5) * (100 / 3),
  };
}

export default function Board({
  board,
  onCellClick,
  winningCombination,
}: Props) {
  const lineStart = winningCombination
    ? getCellCenter(winningCombination[0])
    : null;
  const lineEnd = winningCombination
    ? getCellCenter(winningCombination[2])
    : null;

  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-3">
        {board.map((cell, i) => (
          <Cell key={i} value={cell} onClick={() => onCellClick(i)} />
        ))}
      </div>

      {lineStart && lineEnd && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="5 0 90 100"
          preserveAspectRatio="none"
        >
          <line
            x1={lineStart.x}
            y1={lineStart.y}
            x2={lineEnd.x}
            y2={lineEnd.y}
            stroke="#7E22CE90"
            strokeWidth="2"
            strokeLinecap="round"
            className="winning-line"
          />
        </svg>
      )}
    </div>
  );
}
