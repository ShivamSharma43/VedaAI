"use client";

import { ArrowLeft, LayoutGrid, Bell, ChevronDown } from "lucide-react";

export function Topbar({ title = "Assignment" }: { title?: string }) {
  return (
    <header className="h-16 bg-page flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <button
          aria-label="Back"
          className="w-9 h-9 rounded-full bg-white border border-line flex items-center justify-center hover:bg-[#fafafa] transition"
        >
          <ArrowLeft size={16} />
        </button>
        <div className="flex items-center gap-2 text-[15px] text-ink">
          <LayoutGrid size={16} className="text-muted" />
          <span className="font-medium">{title}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          aria-label="Notifications"
          className="relative w-9 h-9 rounded-full flex items-center justify-center hover:bg-white transition"
        >
          <Bell size={18} className="text-ink" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#ff5a1f]" />
        </button>

        <button className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-white border border-line hover:bg-[#fafafa] transition">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-200 to-rose-400 flex items-center justify-center text-sm">
            🧑‍💼
          </div>
          <span className="text-[14px] font-medium">John Doe</span>
          <ChevronDown size={14} className="text-muted" />
        </button>
      </div>
    </header>
  );
}