import { Request, Response, NextFunction } from "express";
import { assignmentInputSchema } from "../utils/validators";
import * as svc from "../services/assignmentService";
import { generationQueue } from "../queues";

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const data = assignmentInputSchema.parse(req.body);
    const doc = await svc.createAssignment(data);
    res.status(201).json(doc);
  } catch (e) {
    next(e);
  }
}

export async function getOne(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await svc.getAssignment(req.params.id));
  } catch (e) {
    next(e);
  }
}

export async function list(_req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await svc.listAssignments());
  } catch (e) {
    next(e);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await svc.deleteAssignment(req.params.id));
  } catch (e) {
    next(e);
  }
}

export async function regenerate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.json(await svc.regenerate(req.params.id));
  } catch (e) {
    next(e);
  }
}

export async function jobStatus(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const job = await generationQueue.getJob(req.params.id);
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.json({
      id: job.id,
      state: await job.getState(),
      progress: job.progress,
      failedReason: job.failedReason,
    });
  } catch (e) {
    next(e);
  }
}