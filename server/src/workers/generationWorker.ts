import { Worker } from "bullmq";
import { redisConnection } from "../config/redis";
import { Assignment } from "../models/Assignment";
import { buildPrompt } from "../services/promptService";
import { generatePaper } from "../services/aiService";
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
      doc.status = "completed";
      await doc.save();

      emitToAssignment(assignmentId, "generation-completed", {
        assignmentId,
        paper,
      });

      return { ok: true };
    },
    { connection: redisConnection, concurrency: 2 }
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