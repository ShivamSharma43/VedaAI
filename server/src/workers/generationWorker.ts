import { Worker } from "bullmq";
import { redis } from "../lib/redis";
import { Assignment } from "../models/Assignment";
import { buildPrompt } from "../services/promptService";
import { generatePaper } from "../services/aiService";
import { generatePdfBuffer } from "../services/pdfService";
import { emitToAssignment } from "../sockets";

export function startGenerationWorker() {
  const worker = new Worker(
    "paper-generation",
    async (job) => {
      const { assignmentId } = job.data as { assignmentId: string };
      const doc = await Assignment.findById(assignmentId);
      if (!doc) throw new Error("Assignment missing");

      doc.status = "processing";
      await doc.save();
      emitToAssignment(assignmentId, "generation-started", { assignmentId });
      await job.updateProgress(20);
      emitToAssignment(assignmentId, "generation-progress", { progress: 20 });

      const prompt = buildPrompt({
        title: doc.title,
        subject: doc.subject,
        dueDate: doc.dueDate.toISOString(),
        sourceText: doc.sourceText ?? "",
        config: doc.config as any,
      });

      await job.updateProgress(50);
      emitToAssignment(assignmentId, "generation-progress", { progress: 50 });

      const paper = await generatePaper(prompt);

      await job.updateProgress(90);
      emitToAssignment(assignmentId, "generation-progress", { progress: 90 });

      doc.generatedPaper = paper as any;
      
      // Generate and cache PDF while we're here (avoids 10-20s delay on download)
      try {
        const pdfBuffer = await generatePdfBuffer(doc.toObject());
        doc.pdfBuffer = pdfBuffer;
      } catch (pdfErr) {
        console.error("PDF generation failed (non-blocking)", pdfErr);
        // Don't fail the entire job; PDF can be generated on-demand if cached version fails
      }

      doc.status = "completed";
      await doc.save();

      emitToAssignment(assignmentId, "generation-completed", {
        assignmentId,
        paper,
      });

      return { ok: true };
    },
    // Reuse the shared client; BullMQ duplicates it internally for the
    // worker's blocking connection.
    { connection: redis, concurrency: 2 }
  );

  worker.on("failed", async (job, err) => {
    if (!job) return;
    const { assignmentId } = job.data as { assignmentId: string };
    await Assignment.findByIdAndUpdate(assignmentId, {
      status: "failed",
      error: err.message,
    });
    emitToAssignment(assignmentId, "generation-failed", {
      assignmentId,
      error: err.message,
    });
  });

  console.log("Generation worker started");
}