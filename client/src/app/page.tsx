"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";

import { api } from "@/lib/api";
import EmptyAssignmentsState from "@/components/layout/EmptyAssignmentsState";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAssignments() {
      try {
        const res = await api.get("/assignments");

        setAssignments(res.data ?? []);
      } catch (err) {
        console.error("Failed to fetch assignments", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAssignments();
  }, []);

  return (
    <main
      className="
        min-h-screen
        w-full
        bg-transparent
        p-3
      "
    >
      <div className="flex w-full gap-3">
        {/* SIDEBAR */}
       <div className="hidden lg:block">
   <Sidebar />
</div>

        {/* RIGHT SECTION */}
        <div className="flex flex-1 flex-col">
          {/* TOPBAR */}
          <Topbar />

          {/* MAIN CONTENT */}
          <main className="flex flex-1 items-center justify-center">
            {loading ? (
              <div>Loading...</div>
            ) : assignments.length === 0 ? (
              <EmptyAssignmentsState />
            ) : (
              <div>
                {/* Assignment Cards will come here */}
                Assignments Found
              </div>
            )}
          </main>
          <div className="lg:hidden"> <MobileBottomNav /> </div>
        </div>
      </div>
    </main>
  );
}