"use client";
import { Assignment } from "@/types";
import { DifficultyBadge } from "../common/DifficultyBadge";

export function PaperView({ a }: { a: Assignment }) {
  if (!a.generatedPaper) return null;
  return (
    <article className="card p-10 font-serif">
      <header className="text-center border-b-4 border-double border-slate-800 pb-4">
        <h1 className="text-3xl font-bold">{a.generatedPaper.title}</h1>
        <p className="text-sm mt-1 text-slate-600">
          {a.subject} · Total Marks: {a.config.totalMarks}
        </p>
      </header>

      <div className="grid grid-cols-3 gap-4 my-6 text-sm">
        <div className="border-b border-slate-400 pb-1">
          Name: <span className="text-slate-400">__________________</span>
        </div>
        <div className="border-b border-slate-400 pb-1">
          Roll No: <span className="text-slate-400">__________</span>
        </div>
        <div className="border-b border-slate-400 pb-1">
          Section: <span className="text-slate-400">____</span>
        </div>
      </div>

      {a.generatedPaper.sections.map((s, i) => (
        <section key={i} className="mt-8">
          <h2 className="text-xl font-bold border-b-2 border-slate-800 pb-1">
            {s.title}
          </h2>
          <p className="italic text-slate-600 mt-1">{s.instruction}</p>
          <ol className="list-decimal pl-6 mt-4 space-y-5">
            {s.questions.map((q, j) => (
              <li key={j}>
                <p className="leading-relaxed">{q.text}</p>
                <div className="flex items-center gap-3 mt-2 text-xs">
                  <DifficultyBadge d={q.difficulty} />
                  <span className="text-slate-500">
                    [{q.marks} marks · {q.type}]
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </section>
      ))}
    </article>
  );
}