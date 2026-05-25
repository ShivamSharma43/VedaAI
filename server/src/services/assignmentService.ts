import { Assignment } from "../models/Assignment";
import { generationQueue } from "../queues";
import { AssignmentInput } from "../utils/validators";
import { AppError } from "../utils/AppError";

export async function createAssignment(input: AssignmentInput) {
  const doc = await Assignment.create({
    ...input,
    dueDate: new Date(input.dueDate),
    status: "pending",
  });

  const job = await generationQueue.add(
    "generate",
    { assignmentId: doc._id.toString() },
    { attempts: 3, backoff: { type: "exponential", delay: 3000 } }
  );

  doc.jobId = job.id?.toString();
  await doc.save();
  return doc;
}

export async function getAssignment(id: string) {
  const doc = await Assignment.findById(id);
  if (!doc) throw new AppError(404, "Assignment not found");
  return doc;
}

export async function listAssignments() {
  return Assignment.find().sort({ createdAt: -1 }).limit(50);
}

export async function deleteAssignment(id: string) {
  const doc = await Assignment.findById(id);
  if (!doc) throw new AppError(404, "Assignment not found");

  // Best-effort: drop the generation job from Redis so we don't leave
  // orphaned queue data. The job may already be completed/removed or actively
  // locked — none of which should block deleting the document.
  if (doc.jobId) {
    try {
      const job = await generationQueue.getJob(doc.jobId);
      if (job) await job.remove();
    } catch (err) {
      console.warn(
        `Could not remove job ${doc.jobId}:`,
        (err as Error).message
      );
    }
  }

  await doc.deleteOne();
  return { ok: true, id };
}

export async function regenerate(id: string) {
  const doc = await getAssignment(id);
  doc.status = "pending";
  doc.generatedPaper = null;
  doc.error = undefined;
  const job = await generationQueue.add(
    "generate",
    { assignmentId: doc._id.toString() },
    { attempts: 3 }
  );
  doc.jobId = job.id?.toString();
  await doc.save();
  return doc;
}