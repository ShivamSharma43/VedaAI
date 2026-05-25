"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

import { api } from "@/lib/api";
import { useAssignmentStore } from "@/store/assignmentStore";
import { AssignmentDetails, type AssignmentFormData } from "./AssignmentDetails";
import { FormNav } from "./FormNav";

export function AssignmentForm() {
  const router = useRouter();
  const { setCurrent, setStatus } = useAssignmentStore();

  const formRef = useRef<AssignmentFormData | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleFormChange = useCallback((data: AssignmentFormData) => {
    formRef.current = data;
  }, []);

  function goPrevious() {
    router.push("/");
  }

  async function submit() {
    const data = formRef.current;

    if (!data) return;

    const title = data.title.trim();
    const subject = data.subject.trim();

    if (title.length < 3) {
      toast.error("Title must be at least 3 characters.");
      return;
    }
    if (subject.length < 2) {
      toast.error("Subject must be at least 2 characters.");
      return;
    }
    if (data.questionTypes.length === 0) {
      toast.error("Add at least one question type.");
      return;
    }
    if (!data.dueDate) {
      toast.error("Please select a due date.");
      return;
    }
    if (data.totalQuestions <= 0 || data.totalMarks <= 0) {
      toast.error("Set the number of questions and marks.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.post("/assignments", {
        title,
        subject,
        dueDate: data.dueDate,
        sourceText: "",
        config: {
          questionTypes: data.questionTypes.map((q) => q.label),
          numberOfQuestions: data.totalQuestions,
          totalMarks: data.totalMarks,
          difficulty: { easy: 40, medium: 40, hard: 20 },
          instructions: data.additionalInfo || "",
        },
      });

      const id = res.data?._id ?? res.data?.id;
      if (!id) throw new Error("No assignment id returned");

      setCurrent(res.data);
      setStatus("started");
      router.push(`/assignment/${id}`);
    } catch (err) {
      console.error("Failed to create assignment", err);
      toast.error("Failed to generate question paper. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <>
      {/* ───────────────── MOBILE HEADER (back + centered title) ───────────────── */}
      <div className="relative mt-[6px] flex h-[48px] w-full items-center lg:hidden">
        <button
          type="button"
          aria-label="Back"
          onClick={goPrevious}
          className="flex size-[48px] shrink-0 items-center justify-center rounded-full bg-white"
        >
          <ArrowLeft size={24} className="text-[#303030]" strokeWidth={2} />
        </button>
        <span className="absolute left-1/2 -translate-x-1/2 text-[16px] font-bold leading-[1.4] tracking-[-0.64px] text-[#303030]">
          Create Assignment
        </span>
      </div>

      {/* ───────────────── PAGE HEADING ───────────────── */}
      <div
        className="
          hidden
          w-full
          h-[66px]
          lg:flex
          items-start
          mt-1
        "
      >
        {/* INNER CONTENT */}
        <div
          className="
            flex
            items-start
            pl-2
            pt-2
            pb-2
          "
        >
          {/* GREEN DOT */}
          <div
            className="
              relative
              w-[12px]
              h-[12px]
              shrink-0
              mt-[8px]
            "
          >
            <Image
              src="/green-dot.png"
              alt="Active Step"
              fill
              className="object-contain"
            />
          </div>

          {/* GAP */}
          <div className="w-3 shrink-0" />

          {/* TEXT BLOCK */}
          <div className="flex flex-col">
            {/* TITLE */}
            <div
              className="
                w-[174px]
                h-[28px]
                text-[#303030]
                text-[20px]
                font-bold
                leading-[140%]
                tracking-[-0.8px]
              "
              
            >
              Create Assignment
            </div>

            {/* GAP */}
            <div className="h-[2px]" />

            {/* SUBTITLE */}
            <div
              className="
                w-[261px]
                h-[20px]
                text-[14px]
                font-normal
                leading-[140%]
                tracking-[-0.56px]
                text-[rgba(94,94,94,0.55)]
              "
              
            >
              Set up a new assignment for your students
            </div>
          </div>
        </div>
      </div>
      {/* GAP */}
<div className="h-[24px] lg:h-[32px]" />

{/* PROGRESS LINES */}
<div className="flex items-center w-full">
  {/* ACTIVE LINE */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="407"
    height="5"
    viewBox="0 0 407 5"
    fill="none"
    className="w-full max-w-[402px] flex-1"
  >
    <path
      d="M2.5 2.5H404"
      stroke="#5E5E5E"
      strokeWidth="5"
      strokeLinecap="round"
    />
  </svg>

  {/* GAP */}
  <div className="w-[12px] shrink-0" />

  {/* INACTIVE LINE */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="407"
    height="5"
    viewBox="0 0 407 5"
    fill="none"
    className="w-full max-w-[402px] flex-1"
  >
    <path
      d="M2.5 2.5H404"
      stroke="#DADADA"
      strokeWidth="5"
      strokeLinecap="round"
    />
  </svg>
</div>

{/* GAP */}
<div className="h-[24px] lg:h-[32px]" />



{/* ───────────────── ASSIGNMENT DETAILS CARD ───────────────── */}
<AssignmentDetails onChange={handleFormChange} />

{/* GAP = 24px */}
<div className="h-[24px]" />

{/* ───────────────── STEP NAVIGATION ───────────────── */}
<FormNav onPrevious={goPrevious} onNext={submit} loading={submitting} />
    </>
  );
}