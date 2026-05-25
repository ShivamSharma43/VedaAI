import Sidebar from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";

import MobileBottomNav from "@/components/layout/MobileBottomNav";

import { AssignmentForm } from "@/components/assignment/AssignmentForm";

export default function CreatePage() {
  return (
    <main
      className="
        min-h-screen
        w-full
        bg-transparent
        p-3
      "
    >
      {/* MAIN LAYOUT */}
      <div className="flex w-full gap-3">
        {/* SIDEBAR */}
        <Sidebar />

        {/* RIGHT SECTION */}
        <div className="flex flex-1 flex-col">
          {/* TOPBAR */}
          <Topbar />

          {/* PAGE CONTENT */}
          <main className="flex-1 px-4 pb-[170px] lg:px-6 lg:pb-0">
            <AssignmentForm />
          </main>
        </div>
      </div>

      {/* MOBILE BOTTOM NAV */}
      <div className="lg:hidden">
        <MobileBottomNav />
      </div>
    </main>
  );
}