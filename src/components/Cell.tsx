import type { Cell as CellType } from "../types";

interface Props {
  value: CellType;
  onClick: () => void;
}

export default function Cell({ value, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="w-24 h-24 text-5xl font-bold border-2 border-gray-700 rounded-xl bg-gray-900 hover:bg-gray-800 transition"
    >
      {value}
    </button>
  );
}
