import { Queue } from "bullmq";
import { redis } from "../lib/redis";

// Both queues reuse the single shared connection (BullMQ accepts an existing
// ioredis instance and reuses it — no new socket is opened here).
export const generationQueue = new Queue("paper-generation", {
  connection: redis,
});

export const pdfQueue = new Queue("pdf-generation", {
  connection: redis,
});
