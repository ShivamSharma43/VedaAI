import { create } from "zustand";
import { Assignment } from "@/types";

interface State {
  current: Assignment | null;
  progress: number;
  status: "idle" | "started" | "progress" | "completed" | "failed";
  setCurrent: (a: Assignment | null) => void;
  setProgress: (n: number) => void;
  setStatus: (s: State["status"]) => void;
  reset: () => void;
}

export const useAssignmentStore = create<State>((set) => ({
  current: null,
  progress: 0,
  status: "idle",
  setCurrent: (current) => set({ current }),
  setProgress: (progress) => set({ progress }),
  setStatus: (status) => set({ status }),
  reset: () => set({ current: null, progress: 0, status: "idle" }),
}));