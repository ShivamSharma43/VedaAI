import express from "express";
import http from "http";
import cors from "cors";
import { env } from "./config/env";
import { connectDB } from "./config/db";
import { initSocket } from "./sockets";
import assignmentRoutes from "./routes/assignmentRoutes";
import jobRoutes from "./routes/jobRoutes";
import pdfRoutes from "./routes/pdfRoutes";
import { errorHandler } from "./middleware/errorHandler";
import { startGenerationWorker } from "./workers/generationWorker";

async function bootstrap() {
  await connectDB();

  const app = express();
  app.use(cors({ origin: env.clientUrl, credentials: true }));
  app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

  app.get("/health", (_, res) => res.json({ ok: true }));
  app.use("/api/assignments", assignmentRoutes);
  app.use("/api/jobs", jobRoutes);
  app.use("/api/assignments", pdfRoutes);
  app.use(errorHandler);

  const server = http.createServer(app);
  initSocket(server);

  // Run worker in-process for dev (in prod run separately)
  if (env.nodeEnv !== "production") startGenerationWorker();

  server.listen(env.port, () =>
    console.log(`API on http://localhost:${env.port}`)
  );
}

bootstrap().catch((e) => {
  console.error(e);
  process.exit(1);
});