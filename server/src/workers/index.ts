import { connectDB } from "../config/db";
import { startGenerationWorker } from "./generationWorker";

(async () => {
  await connectDB();
  startGenerationWorker();
})();