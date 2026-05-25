"use client";

import Sidebar from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

/* Simple shell-wrapped placeholder for routes that aren't built yet. */
export default function PlaceholderPage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <main className="min-h-screen w-full bg-transparent p-3">
      <div className="flex w-full gap-3">
        {/* SIDEBAR */}
        <Sidebar />

        {/* RIGHT SECTION */}
        <div className="flex flex-1 flex-col">
          {/* TOPBAR */}
          <Topbar />

          {/* CONTENT */}
          <main className="flex flex-1 items-center justify-center px-4 pb-[170px] pt-3 lg:px-6 lg:pb-6">
            <div className="flex flex-col items-center gap-[10px] text-center">
              <h1 className="text-[24px] font-bold leading-[1.2] tracking-[-0.96px] text-[#303030]">
                {title}
              </h1>
              <p className="max-w-[360px] text-[16px] font-medium leading-[1.4] tracking-[-0.64px] text-[#5e5e5e]/80">
                {description}
              </p>
              <span className="mt-[6px] rounded-full bg-[#f0f0f0] px-[16px] py-[6px] text-[14px] font-semibold tracking-[-0.56px] text-[#5e5e5e]">
                Coming soon
              </span>
            </div>
          </main>

          {/* MOBILE BOTTOM NAV */}
          <div className="lg:hidden">
            <MobileBottomNav />
          </div>
        </div>
      </div>
    </main>
  );
}
