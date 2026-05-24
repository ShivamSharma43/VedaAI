"use client";

import Link from "next/link";
import { Plus } from "lucide-react";

export function EmptyAssignments() {
  return (
    <div className="flex flex-col items-center text-center max-w-[520px] mx-auto">
      <EmptyIllustration />

      <h2 className="mt-6 text-[20px] font-semibold text-ink">
        No assignments yet
      </h2>
      <p className="mt-2 text-[14px] leading-relaxed text-muted">
        Create your first assignment to start collecting and grading student
        submissions. You can set up rubrics, define marking criteria, and let AI
        assist with grading.
      </p>

      <Link
        href="/create"
        className="mt-7 inline-flex items-center gap-2 h-11 px-6 rounded-full bg-[#1a1a1a] text-white text-sm font-medium hover:bg-black transition shadow-sm"
      >
        <Plus size={16} />
        Create Your First Assignment
      </Link>
    </div>
  );
}

function EmptyIllustration() {
  return (
    <svg
      width="280"
      height="220"
      viewBox="0 0 280 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Big soft circle background */}
      <circle cx="150" cy="105" r="95" fill="#EFEFF5" />

      {/* Curly scribble (left) */}
      <path
        d="M55 80 C 70 60, 90 95, 70 105 C 55 113, 80 128, 95 118"
        stroke="#1f2937"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Document */}
      <g>
        <rect x="120" y="55" width="78" height="100" rx="6" fill="white" stroke="#1f2937" strokeWidth="1.5"/>
        <rect x="132" y="70" width="40" height="6" rx="2" fill="#1f2937"/>
        <rect x="132" y="84" width="54" height="3" rx="1.5" fill="#D1D5DB"/>
        <rect x="132" y="93" width="48" height="3" rx="1.5" fill="#D1D5DB"/>
        <rect x="132" y="102" width="52" height="3" rx="1.5" fill="#D1D5DB"/>
        <rect x="132" y="111" width="40" height="3" rx="1.5" fill="#D1D5DB"/>
      </g>

      {/* Small chip top-right */}
      <g>
        <rect x="200" y="60" width="50" height="22" rx="6" fill="white" stroke="#1f2937" strokeWidth="1.3"/>
        <rect x="208" y="68" width="30" height="6" rx="2" fill="#D1D5DB"/>
      </g>

      {/* Magnifying glass with red X */}
      <g>
        <circle cx="175" cy="135" r="34" fill="white" stroke="#8B8FB8" strokeWidth="2.5"/>
        <line x1="200" y1="160" x2="222" y2="182" stroke="#8B8FB8" strokeWidth="6" strokeLinecap="round"/>
        {/* Red X */}
        <line x1="162" y1="122" x2="188" y2="148" stroke="#EF4444" strokeWidth="6" strokeLinecap="round"/>
        <line x1="188" y1="122" x2="162" y2="148" stroke="#EF4444" strokeWidth="6" strokeLinecap="round"/>
      </g>

      {/* Sparkles */}
      <path d="M88 150 l3 -7 l3 7 l7 3 l-7 3 l-3 7 l-3 -7 l-7 -3 z" fill="#7C8CF8"/>
      <circle cx="235" cy="155" r="3" fill="#7C8CF8"/>
      <circle cx="60" cy="55" r="2.5" fill="#1f2937"/>
    </svg>
  );
}