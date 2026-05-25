"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";

import { api } from "@/lib/api";
import type { Assignment } from "@/types";
import EmptyAssignmentsState from "@/components/layout/EmptyAssignmentsState";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import { AssignmentList } from "@/components/assignment/AssignmentList";

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
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

  function handleDelete(id: string) {
    // Optimistic removal; persists once the backend exposes a DELETE route.
    setAssignments((prev) => prev.filter((a) => a._id !== id));
    api
      .delete(`/assignments/${id}`)
      .catch((err) => console.error("Failed to delete assignment", err));
  }

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
        <Sidebar />

        {/* RIGHT SECTION */}
        <div className="flex flex-1 flex-col">
          {/* TOPBAR */}
          <Topbar />

          {/* MAIN CONTENT */}
          <main className="flex flex-1 flex-col">
            {loading ? (
              <div className="flex flex-1 items-center justify-center">
                Loading...
              </div>
            ) : assignments.length === 0 ? (
              <div className="flex flex-1 items-center justify-center">
                <EmptyAssignmentsState />
              </div>
            ) : (
              <div className="px-4 pb-[170px] pt-2 lg:px-6 lg:pb-6">
                <AssignmentList
                  assignments={assignments}
                  onDelete={handleDelete}
                />
              </div>
            )}
          </main>
          <div className="lg:hidden"> <MobileBottomNav /> </div>
        </div>
      </div>
    </main>
  );
}