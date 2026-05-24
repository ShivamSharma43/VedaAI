import dotenv from "dotenv";
dotenv.config();

export const env = {
  port: Number(process.env.PORT ?? 4000),
  mongoUri: process.env.MONGO_URI ?? "mongodb://localhost:27017/assessments",
  redis: {
    host: process.env.REDIS_HOST ?? "localhost",
    port: Number(process.env.REDIS_PORT ?? 6379),
  },
  groq: {
  apiKey: process.env.GROQ_API_KEY ?? "",
  model:
    process.env.GROQ_MODEL ??
    "llama-3.3-70b-versatile",
},
  clientUrl: process.env.CLIENT_URL ?? "http://localhost:3000",
  nodeEnv: process.env.NODE_ENV ?? "development",
};