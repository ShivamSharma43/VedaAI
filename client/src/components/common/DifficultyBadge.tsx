import { Difficulty } from "@/types";
import clsx from "clsx";

export function DifficultyBadge({ d }: { d: Difficulty }) {
  return (
    <span
      className={clsx(
        "inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
        d === "easy" && "bg-green-100 text-green-700",
        d === "medium" && "bg-yellow-100 text-yellow-700",
        d === "hard" && "bg-red-100 text-red-700"
      )}
    >
      {d}
    </span>
  );
}