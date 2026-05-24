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