import { Queue } from "bullmq";
import { redisConnection } from "../config/redis";

export const generationQueue = new Queue("paper-generation", {
  connection: redisConnection,
});

export const pdfQueue = new Queue("pdf-generation", {
  connection: redisConnection,
});