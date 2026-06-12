import type { Scores } from "../types";

interface Props {
  scores: Scores;
}

export default function Scoreboard({ scores }: Props) {
  return (
    <div className="flex gap-8 text-center">
      <div>
        <p className="text-2xl font-bold text-blue-400">{scores.x}</p>
        <p className="text-gray-500">X Wins</p>
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-400">{scores.draws}</p>
        <p className="text-gray-500">Draws</p>
      </div>
      <div>
        <p className="text-2xl font-bold text-red-400">{scores.o}</p>
        <p className="text-gray-500">O Wins</p>
      </div>
    </div>
  );
}
