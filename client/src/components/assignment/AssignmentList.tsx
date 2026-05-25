"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MoreVertical, Filter, Search, Plus } from "lucide-react";
import type { Assignment } from "@/types";

/* ISO date -> DD-MM-YYYY */
function formatDate(iso?: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}-${mm}-${d.getFullYear()}`;
}

function AssignmentCard({
  a,
  onView,
  onDelete,
}: {
  a: Assignment;
  onView: () => void;
  onDelete: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex min-h-[162px] flex-col justify-center rounded-[24px] bg-white p-[24px]">
      <div className="flex flex-1 flex-col justify-between gap-[24px]">
        {/* title + menu */}
        <div className="flex items-start justify-between gap-[12px]">
          <h3 className="text-[24px] font-extrabold leading-[1.2] tracking-[-0.96px] text-[#303030]">
            {a.title}
          </h3>
          <button
            type="button"
            aria-label="More options"
            onClick={() => setOpen((o) => !o)}
            className="shrink-0"
          >
            <MoreVertical size={24} className="text-[#303030]" strokeWidth={2} />
          </button>
        </div>

        {/* assigned / due */}
        <div className="flex items-center justify-between gap-[12px]">
          <p className="whitespace-nowrap text-[16px] tracking-[-0.64px] text-black/50">
            <span className="font-extrabold text-[#303030]">Assigned on</span>
            {` : ${formatDate(a.createdAt)}`}
          </p>
          <p className="whitespace-nowrap text-[16px] tracking-[-0.64px] text-black/50">
            <span className="font-extrabold text-[#303030]">Due</span>
            {` : ${formatDate(a.dueDate)}`}
          </p>
        </div>
      </div>

      {/* options dropdown */}
      {open && (
        <>
          <button
            type="button"
            aria-hidden
            tabIndex={-1}
            className="fixed inset-0 z-10 cursor-default"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-[24px] top-[56px] z-20 flex w-[140px] flex-col gap-[4px] rounded-[16px] bg-white p-[8px] shadow-[0px_16px_24px_rgba(0,0,0,0.2),0px_32px_24px_rgba(0,0,0,0.05)]">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onView();
              }}
              className="flex h-[32px] items-center rounded-[8px] px-[8px] text-left text-[14px] font-medium tracking-[-0.56px] text-[#303030] hover:bg-[#f6f6f6]"
            >
              View Assignment
            </button>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onDelete();
              }}
              className="flex h-[32px] items-center rounded-[8px] px-[8px] text-left text-[14px] font-medium tracking-[-0.56px] text-[#c53535] hover:bg-[#f6f6f6]"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export function AssignmentList({
  assignments,
  onDelete,
}: {
  assignments: Assignment[];
  onDelete: (id: string) => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? assignments.filter((a) =>
        a.title.toLowerCase().includes(query.trim().toLowerCase())
      )
    : assignments;

  return (
    <div className="w-full">
      {/* HEADING */}
      <div className="mb-[12px] flex items-start gap-[16px]">
        <span className="mt-[8px] size-[12px] shrink-0 rounded-full bg-[#22c55e]" />
        <div className="flex flex-col">
          <h2 className="text-[20px] font-bold leading-[1.4] tracking-[-0.8px] text-[#303030]">
            Assignments
          </h2>
          <p className="text-[14px] font-normal leading-[1.4] tracking-[-0.56px] text-[#5e5e5e]/80">
            Manage and create assignments for your classes.
          </p>
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="mb-[16px] flex h-[64px] items-center justify-between gap-[12px] rounded-[20px] bg-white px-[16px]">
        <button type="button" className="flex shrink-0 items-center gap-[4px]">
          <Filter size={20} className="text-[#a9a9a9]" strokeWidth={2} />
          <span className="text-[14px] font-bold tracking-[-0.56px] text-[#a9a9a9]">
            Filter By
          </span>
        </button>

        <div className="flex h-[44px] w-full max-w-[380px] items-center gap-[12px] rounded-[100px] border border-black/20 px-[16px] py-[11px]">
          <Search size={20} className="shrink-0 text-[#a9a9a9]" strokeWidth={2} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Assignment"
            className="w-full bg-transparent text-[14px] font-bold tracking-[-0.56px] text-[#303030] placeholder:font-bold placeholder:text-[#a9a9a9] focus:outline-none"
          />
        </div>
      </div>

      {/* GRID */}
      {filtered.length === 0 ? (
        <p className="py-10 text-center text-[16px] font-medium text-[#a9a9a9]">
          No assignments match “{query}”.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-[12px] lg:grid-cols-2">
          {filtered.map((a) => (
            <AssignmentCard
              key={a._id}
              a={a}
              onView={() => router.push(`/assignment/${a._id}`)}
              onDelete={() => onDelete(a._id)}
            />
          ))}
        </div>
      )}

      {/* Floating "Create Assignment" — node 1:9703 (desktop; mobile uses the FAB).
         Gradient fades cards into the page's bottom background (#dadada). */}
      <div className="pointer-events-none sticky bottom-0 mt-[16px] hidden h-[120px] items-end justify-center bg-gradient-to-t from-[#dadada] via-[#dadada]/80 to-transparent pb-[24px] lg:flex">
        <Link
          href="/create"
          className="pointer-events-auto flex items-center gap-[4px] rounded-[48px] border-[1.5px] border-solid border-white/50 bg-[#181818] px-[24px] py-[12px] shadow-[0px_16px_24px_rgba(0,0,0,0.12),0px_32px_24px_rgba(0,0,0,0.2)]"
        >
          <Plus size={20} className="text-white" strokeWidth={2} />
          <span className="text-[16px] font-medium leading-[1.4] tracking-[-0.64px] text-white">
            Create Assignment
          </span>
        </Link>
      </div>
    </div>
  );
}
