"use client";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import { useAssignmentStore } from "@/store/assignmentStore";
import { useAssignmentSocket } from "@/hooks/useAssignmentSocket";
import { PaperView } from "@/components/paper/PaperView";
import { Loader } from "@/components/common/Loader";
import { ProgressBar } from "@/components/common/ProgressBar";
import { Button } from "@/components/common/Button";
import { Download, RefreshCcw } from "lucide-react";
import toast from "react-hot-toast";

export default function AssignmentPage() {
  const { id } = useParams<{ id: string }>();
  const { current, progress, status, setCurrent, setStatus } =
    useAssignmentStore();
  useAssignmentSocket(id);

  useEffect(() => {
    api.get(`/assignments/${id}`).then((r) => {
      setCurrent(r.data);
      setStatus(
        r.data.status === "completed"
          ? "completed"
          : r.data.status === "failed"
          ? "failed"
          : "progress"
      );
    });
  }, [id, setCurrent, setStatus]);

  async function download() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/assignments/${id}/pdf`
    );
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${current?.title ?? "paper"}.pdf`;
    a.click();
  }

  async function regenerate() {
    await api.post(`/assignments/${id}/regenerate`);
    setStatus("started");
    toast("Regenerating...");
  }

  if (!current) return <Loader />;

  const generating = status !== "completed" && status !== "failed";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">{current.title}</h1>
          <p className="text-sm text-slate-500">{current.subject}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={regenerate}>
            <RefreshCcw size={16} /> Regenerate
          </Button>
          <Button onClick={download} disabled={status !== "completed"}>
            <Download size={16} /> Download PDF
          </Button>
        </div>
      </div>

      {generating && (
        <div className="card p-6 mb-6">
          <div className="flex justify-between mb-2 text-sm">
            <span className="font-medium">Generating your paper...</span>
            <span className="text-slate-500">{progress}%</span>
          </div>
          <ProgressBar value={progress || 10} />
          <p className="text-xs text-slate-500 mt-3">
            This usually takes 10–30 seconds.
          </p>
        </div>
      )}

      {status === "failed" && (
        <div className="card p-6 bg-red-50 border-red-200 text-red-700">
          Generation failed: {current.error ?? "Unknown error"}
        </div>
      )}

      {current.generatedPaper && <PaperView a={current} />}
    </div>
  );
}