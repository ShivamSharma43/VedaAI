"use client";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import { useAssignmentStore } from "@/store/assignmentStore";
import { useAssignmentSocket } from "@/hooks/useAssignmentSocket";
import { PaperView } from "@/components/paper/PaperView";
import { Loader } from "@/components/common/Loader";
import { ProgressBar } from "@/components/common/ProgressBar";
import Sidebar from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { FileDown, RefreshCcw } from "lucide-react";
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
    try {
      const res = await api.get(`/assignments/${id}/pdf`, {
        responseType: "blob",
      });

      const contentType = res.headers["content-type"] ?? "";
      if (!contentType.includes("application/pdf")) {
        toast.error("Download failed or invalid format");
        return;
      }

      const url = URL.createObjectURL(res.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${current?.title ?? "paper"}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err: any) {
      console.error("Download failed", err);
      let message = "Couldn't download PDF. Please try again.";
      if (err.response?.data instanceof Blob) {
         try {
           const text = await err.response.data.text();
           const json = JSON.parse(text);
           if (json.error) message = json.error;
         } catch {
           // Ignore
         }
      }
      toast.error(message);
    }
  }

  async function regenerate() {
    try {
      const { data } = await api.post(`/assignments/${id}/regenerate`);
      setCurrent(data);
      setProgress(0);
      setStatus("started");
      toast("Regenerating…");
    } catch (err) {
      console.error("Failed to regenerate", err);
      toast.error("Couldn't regenerate. Please try again.");
    }
  }

  const generating = status !== "completed" && status !== "failed";

  return (
    <main className="min-h-screen w-full bg-transparent p-3">
      <div className="flex w-full gap-3">
        {/* SIDEBAR */}
        <Sidebar />

        {/* RIGHT SECTION */}
        <div className="flex flex-1 flex-col">
          {/* TOPBAR (back button → assignments list) */}
          <Topbar />

          {/* PAGE CONTENT */}
          <main className="flex-1 px-4 pb-6 pt-3 lg:px-6">
            {!current ? (
              <div className="flex flex-1 items-center justify-center py-20">
                <Loader />
              </div>
            ) : (
              <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-[16px]">
                {/* ── INTRO BANNER (node 1:9814) ── */}
                <div className="flex w-full flex-col items-start gap-[16px] rounded-[32px] bg-[#181818]/80 px-[24px] py-[24px] lg:px-[32px]">
                  <p className="w-full text-[20px] font-bold leading-[1.4] tracking-[-0.8px] text-white">
                    {generating
                      ? `Generating your customized ${current.subject} question paper…`
                      : `Here is your customized question paper for ${current.subject}:`}
                  </p>

                  <div className="flex flex-wrap items-center gap-[12px]">
                    {/* Download as PDF */}
                    <button
                      type="button"
                      onClick={download}
                      disabled={status !== "completed"}
                      className="flex h-[44px] items-center justify-center gap-[4px] rounded-[100px] bg-white px-[24px] transition disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <FileDown
                        size={24}
                        className="text-[#303030]"
                        strokeWidth={2}
                      />
                      <span className="whitespace-nowrap text-[16px] font-medium leading-[22px] tracking-[-0.64px] text-[#303030]">
                        Download as PDF
                      </span>
                    </button>

                    {/* Regenerate */}
                    <button
                      type="button"
                      onClick={regenerate}
                      disabled={generating}
                      className="flex h-[44px] items-center justify-center gap-[4px] rounded-[100px] border-[1.5px] border-solid border-white/50 px-[24px] transition disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <RefreshCcw
                        size={20}
                        className={`text-white ${
                          generating ? "animate-spin" : ""
                        }`}
                        strokeWidth={2}
                      />
                      <span className="whitespace-nowrap text-[16px] font-medium leading-[22px] tracking-[-0.64px] text-white">
                        Regenerate
                      </span>
                    </button>
                  </div>
                </div>

                {/* ── GENERATION PROGRESS ── */}
                {generating && (
                  <div className="w-full rounded-[24px] bg-white p-[24px]">
                    <div className="mb-2 flex justify-between text-[14px]">
                      <span className="font-medium text-[#303030]">
                        Generating your paper…
                      </span>
                      <span className="text-[#a9a9a9]">{progress}%</span>
                    </div>
                    <ProgressBar value={progress || 10} />
                    <p className="mt-3 text-[12px] text-[#a9a9a9]">
                      This usually takes 10–30 seconds.
                    </p>
                  </div>
                )}

                {/* ── FAILED ── */}
                {status === "failed" && (
                  <div className="w-full rounded-[24px] border border-red-200 bg-red-50 p-[24px] text-red-700">
                    Generation failed: {current.error ?? "Unknown error"}
                  </div>
                )}

                {/* ── PAPER ── */}
                {current.generatedPaper && <PaperView a={current} />}
              </div>
            )}
          </main>
        </div>
      </div>
    </main>
  );
}
