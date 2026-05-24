"use client";
import clsx from "clsx";

const TYPES = ["MCQ", "Theory", "Short Answer", "True/False", "Numerical"];

export function QuestionConfig({
  selected,
  onChange,
}: {
  selected: string[];
  onChange: (v: string[]) => void;
}) {
  function toggle(t: string) {
    onChange(selected.includes(t) ? selected.filter((x) => x !== t) : [...selected, t]);
  }
  return (
    <div className="flex flex-wrap gap-2">
      {TYPES.map((t) => (
        <button
          type="button"
          key={t}
          onClick={() => toggle(t)}
          className={clsx(
            "px-4 py-1.5 rounded-full text-sm border transition",
            selected.includes(t)
              ? "bg-brand-600 text-white border-brand-600"
              : "bg-white text-slate-600 border-slate-200 hover:border-brand-400"
          )}
        >
          {t}
        </button>
      ))}
    </div>
  );
}