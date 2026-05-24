"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Assignment } from "@/types";
import { EmptyAssignments } from "@/components/common/EmptyAssignments";
import { Loader } from "@/components/common/Loader";
import Link from "next/link";

export default function HomePage() {
  const [items, setItems] = useState<Assignment[] | null>(null);

  useEffect(() => {
    api
      .get("/assignments")
      .then((r) => setItems(r.data))
      .catch(() => setItems([]));
  }, []);

  if (items === null) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <Loader />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem-2.5rem)] pt-6">
        <EmptyAssignments />
      </div>
    );
  }

  return (
    <div className="pt-2">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Assignments</h1>
        <p className="text-sm text-muted mt-1">
          All your AI-generated papers in one place.
        </p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((a) => (
          <Link
            key={a._id}
            href={`/assignment/${a._id}`}
            className="bg-white rounded-2xl border border-line p-5 hover:shadow-sm transition"
          >
            <h3 className="font-semibold text-ink">{a.title}</h3>
            <p className="text-sm text-muted mt-0.5">{a.subject}</p>
            <div className="mt-3 flex items-center gap-2 text-xs">
              <span
                className={`px-2 py-0.5 rounded-full ${
                  a.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : a.status === "failed"
                    ? "bg-red-100 text-red-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {a.status}
              </span>
              <span className="text-muted">
                {new Date(a.createdAt).toLocaleDateString()}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}