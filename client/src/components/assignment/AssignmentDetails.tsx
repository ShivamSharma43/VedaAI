"use client";

import { useEffect, useRef, useState } from "react";
import {
  UploadCloud,
  CalendarPlus,
  ChevronDown,
  X,
  Plus,
  Minus,
} from "lucide-react";

export type QuestionType = {
  id: number;
  label: string;
  count: number;
  marks: number;
};

/* Everything the parent needs to submit the assignment */
export type AssignmentFormData = {
  title: string;
  subject: string;
  dueDate: string;
  questionTypes: QuestionType[];
  totalQuestions: number;
  totalMarks: number;
  additionalInfo: string;
  file: File | null;
};

/* All selectable question types (the dropdown catalog) */
const QUESTION_TYPE_OPTIONS = [
  "Multiple Choice Questions",
  "Short Questions",
  "Long Questions",
  "Diagram/Graph-Based Questions",
  "Numerical Problems",
  "True/False",
  "Fill in the Blanks",
];

/* Default question type rows shown in the design */
const DEFAULT_QUESTION_TYPES: QuestionType[] = [
  { id: 0, label: "Multiple Choice Questions", count: 4, marks: 1 },
  { id: 1, label: "Short Questions", count: 3, marks: 2 },
  { id: 2, label: "Diagram/Graph-Based Questions", count: 5, marks: 5 },
  { id: 3, label: "Numerical Problems", count: 5, marks: 5 },
];

const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

/* yyyy-mm-dd -> DD-MM-YYYY */
function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}-${m}-${y}`;
}

/* A single rounded white +/- stepper. `full` stretches it to fill its
   column (mobile cards); otherwise it's the fixed 100px desktop width. */
function Stepper({
  value,
  onChange,
  full = false,
}: {
  value: number;
  onChange: (next: number) => void;
  full?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between rounded-[100px] bg-white ${
        full ? "w-full p-[8px]" : "h-[44px] w-[100px] px-[8px] py-[11px]"
      }`}
    >
      <button
        type="button"
        aria-label="Decrease"
        className="shrink-0"
        onClick={() => onChange(Math.max(0, value - 1))}
      >
        <Minus size={16} className="text-[#303030]" strokeWidth={2} />
      </button>
      <span className="text-[16px] font-medium leading-[1.4] tracking-[-0.64px] text-[#303030]">
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase"
        className="shrink-0"
        onClick={() => onChange(value + 1)}
      >
        <Plus size={16} className="text-[#303030]" strokeWidth={2} />
      </button>
    </div>
  );
}

/* Dropdown of selectable question types — shared by desktop & mobile.
   Already-used types (other than the current one) are disabled. */
function TypeMenu({
  open,
  currentLabel,
  usedLabels,
  onSelect,
  onClose,
  className = "",
}: {
  open: boolean;
  currentLabel: string;
  usedLabels: Set<string>;
  onSelect: (label: string) => void;
  onClose: () => void;
  className?: string;
}) {
  if (!open) return null;
  return (
    <>
      {/* click-away backdrop */}
      <button
        type="button"
        aria-hidden
        tabIndex={-1}
        className="fixed inset-0 z-10 cursor-default"
        onClick={onClose}
      />
      <ul
        className={`absolute left-0 top-[calc(100%+8px)] z-20 max-h-[240px] overflow-auto rounded-[16px] border-[1.25px] border-[#dadada] bg-white py-[6px] shadow-[0px_8px_24px_rgba(0,0,0,0.12)] ${className}`}
      >
        {QUESTION_TYPE_OPTIONS.map((opt) => {
          const isCurrent = opt === currentLabel;
          const isTaken = !isCurrent && usedLabels.has(opt);
          return (
            <li key={opt}>
              <button
                type="button"
                disabled={isTaken}
                onClick={() => onSelect(opt)}
                className={`flex w-full items-center px-[16px] py-[8px] text-left text-[14px] font-medium leading-[1.4] tracking-[-0.56px] ${
                  isTaken
                    ? "cursor-not-allowed text-[#a9a9a9]/60"
                    : isCurrent
                      ? "bg-[#f6f6f6] text-[#303030]"
                      : "text-[#5e5e5e] hover:bg-[#f6f6f6]"
                }`}
              >
                {opt}
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export function AssignmentDetails({
  onChange,
}: {
  onChange?: (data: AssignmentFormData) => void;
}) {
  const [questionTypes, setQuestionTypes] = useState<QuestionType[]>(
    DEFAULT_QUESTION_TYPES
  );
  const [openId, setOpenId] = useState<number | null>(null);
  const nextId = useRef(DEFAULT_QUESTION_TYPES.length);

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const usedLabels = new Set(questionTypes.map((q) => q.label));
  const allTypesUsed = QUESTION_TYPE_OPTIONS.every((opt) =>
    usedLabels.has(opt)
  );

  const totalQuestions = questionTypes.reduce((sum, q) => sum + q.count, 0);
  const totalMarks = questionTypes.reduce(
    (sum, q) => sum + q.count * q.marks,
    0
  );

  useEffect(() => {
    onChange?.({
      title,
      subject,
      dueDate,
      questionTypes,
      totalQuestions,
      totalMarks,
      additionalInfo,
      file,
    });
  }, [
    onChange,
    title,
    subject,
    dueDate,
    questionTypes,
    totalQuestions,
    totalMarks,
    additionalInfo,
    file,
  ]);

  function handleFile(selected?: File | null) {
    if (!selected) return;
    if (!ACCEPTED_FILE_TYPES.includes(selected.type)) {
      setFile(null);
      setFileName(null);
      setFileError("Only JPEG and PNG files are allowed.");
      return;
    }
    if (selected.size > MAX_FILE_SIZE) {
      setFile(null);
      setFileName(null);
      setFileError("File must be 10MB or smaller.");
      return;
    }
    setFileError(null);
    setFile(selected);
    setFileName(selected.name);
  }

  function updateField(index: number, field: "count" | "marks", next: number) {
    setQuestionTypes((prev) =>
      prev.map((q, i) => (i === index ? { ...q, [field]: next } : q))
    );
  }

  function setLabel(index: number, label: string) {
    setQuestionTypes((prev) =>
      prev.map((q, i) => (i === index ? { ...q, label } : q))
    );
    setOpenId(null);
  }

  function removeRow(index: number) {
    setQuestionTypes((prev) => prev.filter((_, i) => i !== index));
  }

  function addRow() {
    const label = QUESTION_TYPE_OPTIONS.find((opt) => !usedLabels.has(opt));
    if (!label) return; // every type already added
    setQuestionTypes((prev) => [
      ...prev,
      { id: nextId.current++, label, count: 1, marks: 1 },
    ]);
  }

  return (
    <div className="flex w-full max-w-[810px] flex-col items-start gap-[24px] rounded-[32px] bg-white/50 p-[16px] lg:gap-[32px] lg:p-[32px]">
      {/* ───────── HEADING ───────── */}
      <div className="flex flex-col items-start gap-[2px]">
        <h2 className="text-[20px] font-bold leading-[1.4] tracking-[-0.8px] text-[#303030]">
          Assignment Details
        </h2>
        <p className="w-[251px] text-[14px] font-normal leading-[1.4] tracking-[-0.56px] text-[#5e5e5e]/80">
          Basic information about your assignment
        </p>
      </div>

      {/* ───────── BODY ───────── */}
      <div className="flex w-full flex-col items-start gap-[16px]">
        {/* ── FILE UPLOAD ── */}
        <div className="flex w-full flex-col items-start gap-[12px]">
          <div
            role="button"
            tabIndex={0}
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                fileInputRef.current?.click();
              }
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              handleFile(e.dataTransfer.files?.[0]);
            }}
            className="flex w-full cursor-pointer flex-col items-center justify-center gap-[16px] rounded-[24px] border-[1.75px] border-dashed border-black/20 bg-white px-[32px] py-[24px] transition-colors hover:border-black/40"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />

            <div className="flex size-[40px] items-center justify-center rounded-[8px] bg-white">
              <UploadCloud size={24} className="text-[#1e1e1e]" strokeWidth={2} />
            </div>

            <div className="flex w-full flex-col items-center gap-[4px] text-center">
              <p className="w-full text-[16px] font-medium leading-[1.4] tracking-[-0.64px] text-[#303030]">
                {fileName ?? "Choose a file or drag & drop it here"}
              </p>
              <p
                className={`w-full text-[14px] font-normal leading-[1.4] tracking-[-0.56px] ${
                  fileError ? "text-red-500" : "text-[#a9a9a9]"
                }`}
              >
                {fileError ?? "JPEG, PNG, upto 10MB"}
              </p>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              className="flex items-center gap-[4px] rounded-[48px] bg-[#f6f6f6] px-[24px] py-[8px]"
            >
              <span className="text-[14px] font-medium leading-[1.4] tracking-[-0.56px] text-[#303030]">
                Browse Files
              </span>
            </button>
          </div>

          <p className="w-full text-center text-[16px] font-medium leading-[1.4] tracking-[-0.64px] text-[#303030]/60">
            Upload images of your preferred document/image
          </p>
        </div>

        {/* ── TITLE ── */}
        <div className="flex w-full flex-col items-start gap-[8px]">
          <label className="text-[16px] font-bold leading-[1.4] tracking-[-0.64px] text-[#303030]">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Quiz on Electricity"
            className="h-[44px] w-full rounded-[100px] border-[1.25px] border-solid border-[#dadada] bg-transparent px-[16px] py-[11px] text-[16px] font-medium leading-[1.4] tracking-[-0.64px] text-[#303030] placeholder:text-[#a9a9a9] focus:outline-none"
          />
        </div>

        {/* ── SUBJECT ── */}
        <div className="flex w-full flex-col items-start gap-[8px]">
          <label className="text-[16px] font-bold leading-[1.4] tracking-[-0.64px] text-[#303030]">
            Subject
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g. Physics"
            className="h-[44px] w-full rounded-[100px] border-[1.25px] border-solid border-[#dadada] bg-transparent px-[16px] py-[11px] text-[16px] font-medium leading-[1.4] tracking-[-0.64px] text-[#303030] placeholder:text-[#a9a9a9] focus:outline-none"
          />
        </div>

        {/* ── DUE DATE ── */}
        <div className="flex w-full flex-col items-start gap-[8px]">
          <label className="text-[16px] font-bold leading-[1.4] tracking-[-0.64px] text-[#303030]">
            Due Date
          </label>
          <div className="relative flex h-[44px] w-full items-center justify-between rounded-[100px] border-[1.25px] border-solid border-[#dadada] px-[16px] py-[11px]">
            <span
              className={`text-[16px] font-medium leading-[1.4] tracking-[-0.64px] ${
                dueDate ? "text-[#303030]" : "text-[#a9a9a9]"
              }`}
            >
              {dueDate ? formatDate(dueDate) : "DD-MM-YYYY"}
            </span>
            <CalendarPlus
              size={24}
              className="text-[#303030]"
              strokeWidth={2}
            />
            {/* transparent native date input covering the field */}
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              onClick={(e) => {
                // open the native picker wherever the user clicks the field
                try {
                  e.currentTarget.showPicker();
                } catch {
                  /* showPicker unsupported — falls back to the indicator */
                }
              }}
              aria-label="Due date"
              className="absolute inset-0 h-full w-full cursor-pointer rounded-[100px] opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
            />
          </div>
        </div>

        {/* ── QUESTION TYPE ── */}
        <div className="flex w-full flex-col items-end justify-center gap-[16px]">
          {/* DESKTOP: aligned select + stepper columns */}
          <div className="hidden w-full items-start justify-between lg:flex">
            {/* LEFT: question type selects + add */}
            <div className="flex flex-col items-start gap-[16px]">
              <span className="text-[16px] font-bold leading-[1.4] tracking-[-0.64px] text-[#303030]">
                Question Type
              </span>

              {questionTypes.map((q, i) => (
                <div key={q.id} className="flex items-center gap-[12px]">
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenId((cur) => (cur === q.id ? null : q.id))
                      }
                      className="flex h-[44px] w-[443px] items-center justify-between rounded-[100px] bg-white px-[16px] py-[11px]"
                    >
                      <span className="whitespace-nowrap text-[16px] font-medium leading-[1.4] tracking-[-0.64px] text-[#303030]">
                        {q.label}
                      </span>
                      <ChevronDown
                        size={16}
                        strokeWidth={2}
                        className={`text-[#303030] transition-transform ${
                          openId === q.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <TypeMenu
                      open={openId === q.id}
                      currentLabel={q.label}
                      usedLabels={usedLabels}
                      onSelect={(opt) => setLabel(i, opt)}
                      onClose={() => setOpenId(null)}
                      className="w-[443px]"
                    />
                  </div>

                  <button
                    type="button"
                    aria-label="Remove"
                    className="shrink-0"
                    onClick={() => removeRow(i)}
                  >
                    <X size={16} className="text-[#303030]" strokeWidth={2} />
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={addRow}
                disabled={allTypesUsed}
                className="flex items-center gap-[8px] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span className="flex items-center rounded-[48px] bg-[#2b2b2b] p-[8px]">
                  <Plus size={20} className="text-white" strokeWidth={2} />
                </span>
                <span className="text-[14px] font-bold leading-[1.4] tracking-[-0.56px] text-[#303030]">
                  Add Question Type
                </span>
              </button>
            </div>

            {/* RIGHT: counts + marks */}
            <div className="flex items-start justify-end gap-[16px]">
              <div className="flex flex-col items-center gap-[16px]">
                <span className="whitespace-nowrap text-center text-[16px] font-medium leading-[1.4] tracking-[-0.64px] text-[#303030]">
                  No. of Questions
                </span>
                {questionTypes.map((q, i) => (
                  <Stepper
                    key={q.id}
                    value={q.count}
                    onChange={(next) => updateField(i, "count", next)}
                  />
                ))}
              </div>

              <div className="flex w-[100px] flex-col items-center gap-[16px]">
                <span className="text-center text-[16px] font-medium leading-[1.4] tracking-[-0.64px] text-[#303030]">
                  Marks
                </span>
                {questionTypes.map((q, i) => (
                  <Stepper
                    key={q.id}
                    value={q.marks}
                    onChange={(next) => updateField(i, "marks", next)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* MOBILE: each question type is a self-contained card */}
          <div className="flex w-full flex-col items-start gap-[16px] lg:hidden">
            <span className="text-[16px] font-bold leading-[1.4] tracking-[-0.64px] text-[#303030]">
              Question Type
            </span>

            {questionTypes.map((q, i) => (
              <div
                key={q.id}
                className="flex w-full flex-col items-end gap-[12px] rounded-[24px] bg-white p-[12px]"
              >
                {/* top row: type select + remove */}
                <div className="flex w-full items-center justify-between">
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenId((cur) => (cur === q.id ? null : q.id))
                      }
                      className="flex items-center gap-[24px]"
                    >
                      <span className="text-left text-[14px] font-medium leading-[1.4] tracking-[-0.56px] text-[#303030]">
                        {q.label}
                      </span>
                      <ChevronDown
                        size={16}
                        strokeWidth={2}
                        className={`text-[#303030] transition-transform ${
                          openId === q.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <TypeMenu
                      open={openId === q.id}
                      currentLabel={q.label}
                      usedLabels={usedLabels}
                      onSelect={(opt) => setLabel(i, opt)}
                      onClose={() => setOpenId(null)}
                      className="w-[240px]"
                    />
                  </div>

                  <button
                    type="button"
                    aria-label="Remove"
                    className="shrink-0"
                    onClick={() => removeRow(i)}
                  >
                    <X size={16} className="text-[#303030]" strokeWidth={2} />
                  </button>
                </div>

                {/* bottom panel: both steppers */}
                <div className="flex w-full items-start gap-[12px] rounded-[24px] bg-[#f0f0f0] p-[8px]">
                  <div className="flex flex-1 flex-col items-center gap-[8px]">
                    <span className="text-center text-[14px] font-medium leading-[1.4] tracking-[-0.56px] text-[#303030]">
                      No. of Questions
                    </span>
                    <Stepper
                      full
                      value={q.count}
                      onChange={(next) => updateField(i, "count", next)}
                    />
                  </div>
                  <div className="flex flex-1 flex-col items-center gap-[8px]">
                    <span className="text-center text-[14px] font-medium leading-[1.4] tracking-[-0.56px] text-[#303030]">
                      Marks
                    </span>
                    <Stepper
                      full
                      value={q.marks}
                      onChange={(next) => updateField(i, "marks", next)}
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addRow}
              disabled={allTypesUsed}
              className="flex items-center gap-[8px] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span className="flex items-center rounded-[48px] bg-[#2b2b2b] p-[8px]">
                <Plus size={20} className="text-white" strokeWidth={2} />
              </span>
              <span className="text-[14px] font-bold leading-[1.4] tracking-[-0.56px] text-[#303030]">
                Add Question Type
              </span>
            </button>
          </div>

          {/* TOTALS (shared) */}
          <div className="flex flex-col items-start gap-[8px] text-right text-[16px] font-medium leading-[1.1] tracking-[-0.64px] text-[#303030]">
            <span className="w-[150px]">Total Questions :&nbsp; {totalQuestions}</span>
            <span className="w-[150px]">Total Marks :&nbsp; {totalMarks}</span>
          </div>
        </div>

        {/* ── ADDITIONAL INFORMATION ── */}
        <div className="flex w-full flex-col items-start gap-[8px]">
          <label className="text-[16px] font-bold leading-[1.4] tracking-[-0.64px] text-[#303030]">
            Additional Information (For better output)
          </label>
          <div className="relative flex h-[102px] w-full flex-col items-end justify-between overflow-hidden rounded-[16px] border-[1.25px] border-dashed border-[#dadada] bg-white/25 p-[16px]">
            <textarea
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              placeholder="e.g Generate a question paper for 3 hour exam duration..."
              className="w-full flex-1 resize-none bg-transparent text-[14px] font-medium leading-[1.4] tracking-[-0.56px] text-[#303030] placeholder:text-[#303030]/60 focus:outline-none"
            />
            <button
              type="button"
              aria-label="Voice input"
              className="flex size-[36px] items-center justify-center rounded-[18px] bg-[#f0f0f0] px-[0.818px]"
            >
              {/* icon_filled/Mic — node 1:9371 (shadow on the glyph) */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
                style={{
                  filter:
                    "drop-shadow(0px 11px 16px rgba(0,0,0,0.12)) drop-shadow(0px 22px 16px rgba(0,0,0,0.2))",
                }}
              >
                <rect x="8.5" y="2" width="7" height="12" rx="3.5" fill="#303030" />
                <path
                  d="M5 11a7 7 0 0 0 14 0"
                  stroke="#303030"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M12 18v3"
                  stroke="#303030"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M8.5 21h7"
                  stroke="#303030"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
