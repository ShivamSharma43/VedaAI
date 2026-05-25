"use client";

import { Assignment } from "@/types";

/* Pulled from the institution profile in the design; constant for now. */
const SCHOOL_NAME = "Delhi Public School, Sector-4, Bokaro";

const DIFFICULTY_LABEL: Record<string, string> = {
  easy: "Easy",
  medium: "Moderate",
  hard: "Challenging",
};

export function PaperView({ a }: { a: Assignment }) {
  const paper = a.generatedPaper;
  if (!paper) return null;

  const totalQuestions = paper.sections.reduce(
    (n, s) => n + s.questions.length,
    0
  );

  return (
    <article
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
      className="flex w-full flex-col items-center gap-[24px] rounded-[32px] bg-white p-[32px] text-[#303030]"
    >
      {/* ── HEADER ── */}
      <div className="w-full text-center leading-[1.6]">
        <h1 className="text-[32px] font-bold tracking-[-0.96px]">
          {SCHOOL_NAME}
        </h1>
        <p className="text-[24px] font-semibold tracking-[-0.96px]">
          Subject: {a.subject}
        </p>
      </div>

      {/* ── TOTALS ── */}
      <div className="flex w-full items-center justify-between text-[18px] font-semibold leading-[1.6] tracking-[-0.72px]">
        <span>Total Questions: {totalQuestions}</span>
        <span>Maximum Marks: {a.config.totalMarks}</span>
      </div>

      {/* ── GENERAL INSTRUCTION ── */}
      <p className="w-full text-[18px] font-semibold leading-[1.6] tracking-[-0.72px]">
        All questions are compulsory unless stated otherwise.
      </p>

      {/* ── STUDENT FIELDS ── */}
      <div className="flex w-full flex-col text-[18px] font-semibold leading-[1.6] tracking-[-0.72px]">
        <span>Name: ______________________</span>
        <span>Roll Number: ________________</span>
        <span>Class: ____ Section: __________</span>
      </div>

      {/* ── SECTIONS ── */}
      {paper.sections.map((s, i) => (
        <div key={i} className="flex w-full flex-col gap-[16px]">
          <h2 className="text-center text-[24px] font-semibold leading-[1.6] tracking-[-0.96px]">
            {s.title}
          </h2>
          {s.instruction && (
            <p className="text-[16px] italic leading-[1.6]">{s.instruction}</p>
          )}
          <ol className="list-decimal space-y-[10px] pl-[24px] text-[16px] leading-[1.6]">
            {s.questions.map((q, j) => (
              <li key={j} className="pl-[4px]">
                [{DIFFICULTY_LABEL[q.difficulty] ?? q.difficulty}] {q.text} [
                {q.marks} {q.marks === 1 ? "Mark" : "Marks"}]
              </li>
            ))}
          </ol>
        </div>
      ))}

      {/* ── END ── */}
      <p className="w-full text-[16px] font-bold leading-[1.6]">
        End of Question Paper
      </p>
    </article>
  );
}
