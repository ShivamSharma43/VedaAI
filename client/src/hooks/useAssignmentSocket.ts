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

    const handleConnect = () => {
      socket.emit("subscribe", assignmentId);
    };

    if (socket.connected) {
      handleConnect();
    }
    socket.on("connect", handleConnect);

    const onStarted = () => setStatus("started");
    const onProgress = (p: { progress: number }) => {
      setStatus("progress");
      setProgress(p.progress);
    };
    const onCompleted = async () => {
      setStatus("completed");
      setProgress(100);
      try {
        const { data } = await api.get(`/assignments/${assignmentId}`);
        setCurrent(data);
        toast.success("Paper generated!");
      } catch (err) {
        console.error("Failed to fetch generated assignment", err);
      }
    };
    const onFailed = (p: { error: string }) => {
      setStatus("failed");
      toast.error(p.error ?? "Generation failed");
    };

    socket.on("generation-started", onStarted);
    socket.on("generation-progress", onProgress);
    socket.on("generation-completed", onCompleted);
    socket.on("generation-failed", onFailed);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("generation-started", onStarted);
      socket.off("generation-progress", onProgress);
      socket.off("generation-completed", onCompleted);
      socket.off("generation-failed", onFailed);
    };
  }, [assignmentId, setProgress, setStatus, setCurrent]);
}