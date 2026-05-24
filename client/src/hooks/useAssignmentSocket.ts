"use client";
import { useEffect } from "react";
import { getSocket } from "@/socket/client";
import { useAssignmentStore } from "@/store/assignmentStore";
import { api } from "@/lib/api";
import toast from "react-hot-toast";

export function useAssignmentSocket(assignmentId: string | null) {
  const { setProgress, setStatus, setCurrent } = useAssignmentStore();

  useEffect(() => {
    if (!assignmentId) return;
    const socket = getSocket();
    socket.emit("subscribe", assignmentId);

    socket.on("generation-started", () => setStatus("started"));
    socket.on("generation-progress", (p: { progress: number }) => {
      setStatus("progress");
      setProgress(p.progress);
    });
    socket.on("generation-completed", async () => {
      setStatus("completed");
      setProgress(100);
      const { data } = await api.get(`/assignments/${assignmentId}`);
      setCurrent(data);
      toast.success("Paper generated!");
    });
    socket.on("generation-failed", (p: { error: string }) => {
      setStatus("failed");
      toast.error(p.error ?? "Generation failed");
    });

    return () => {
      socket.off("generation-started");
      socket.off("generation-progress");
      socket.off("generation-completed");
      socket.off("generation-failed");
    };
  }, [assignmentId, setProgress, setStatus, setCurrent]);
}