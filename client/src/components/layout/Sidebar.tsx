"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Users,
  FileText,
  BookOpen,
  PieChart,
  Settings,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import clsx from "clsx";

const NAV = [
  { label: "Home", href: "/", icon: LayoutGrid },
  { label: "My Groups", href: "/groups", icon: Users },
  { label: "Assignments", href: "/assignments", icon: FileText },
  { label: "AI Teacher's Toolkit", href: "/toolkit", icon: BookOpen },
  { label: "My Library", href: "/library", icon: PieChart },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 w-[260px] bg-white border-r border-line flex flex-col">
      {/* Logo */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#ff7a3d] to-[#ea4a14] flex items-center justify-center relative overflow-hidden">
            <span className="text-white font-bold text-lg leading-none">V</span>
            {/* subtle grid pattern overlay */}
            <div
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.4) 1px, transparent 1px)",
                backgroundSize: "6px 6px",
              }}
            />
          </div>
          <span className="text-[22px] font-semibold tracking-tight">
            VedaAI
          </span>
        </div>
      </div>

      {/* Create Assignment CTA */}
      <div className="px-5 mt-2">
        <Link
          href="/create"
          className="group flex items-center justify-center gap-2 w-full h-11 rounded-full bg-[#1a1a1a] text-white text-sm font-medium ring-2 ring-[#ff5a1f]/80 ring-offset-2 ring-offset-white shadow-sm hover:bg-black transition"
        >
          <Sparkles size={16} className="text-white" />
          Create Assignment
        </Link>
      </div>

      {/* Nav */}
      <nav className="px-3 mt-6 flex-1 overflow-y-auto">
        <ul className="space-y-1">
          {NAV.map(({ label, href, icon: Icon }) => {
            const active =
              href === "/"
                ? pathname === "/"
                : pathname.startsWith(href) || (label === "Assignments" && pathname.startsWith("/assignment"));
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={clsx(
                    "flex items-center gap-3 px-3 h-10 rounded-lg text-[14px] transition",
                    active
                      ? "bg-[#f3f3f3] text-ink font-semibold"
                      : "text-muted hover:bg-[#f7f7f7] hover:text-ink"
                  )}
                >
                  <Icon size={18} strokeWidth={active ? 2.2 : 1.8} />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Settings + School card */}
      <div className="px-3 pb-5">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 h-10 rounded-lg text-[14px] text-muted hover:bg-[#f7f7f7] hover:text-ink transition"
        >
          <Settings size={18} strokeWidth={1.8} />
          Settings
        </Link>

        <div className="mt-3 mx-1 flex items-center gap-3 p-2 rounded-xl hover:bg-[#f7f7f7] cursor-pointer transition">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-200 to-amber-400 flex items-center justify-center text-base shrink-0">
            👩‍🏫
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-semibold text-ink truncate">
              Delhi Public School
            </p>
            <p className="text-[11px] text-muted truncate">Bokaro Steel City</p>
          </div>
        </div>
      </div>
    </aside>
  );
}