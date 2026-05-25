import dotenv from "dotenv";
dotenv.config();

export const env = {
  port: Number(process.env.PORT ?? 4000),
  mongoUri: process.env.MONGO_URI ?? "mongodb://localhost:27017/assessments",
  redis: {
  // Preferred for Upstash: a single connection string, e.g.
  // rediss://default:<token>@<host>.upstash.io:6379  (TLS + creds baked in).
  url: process.env.REDIS_URL ?? "",
  host: process.env.REDIS_HOST ?? "localhost",
  port: Number(process.env.REDIS_PORT ?? 6379),
  // Redis 6+ ACL username. Upstash uses "default"; leave empty to let ioredis
  // send a password-only AUTH (also the default user).
  username: process.env.REDIS_USERNAME ?? "",
  password: process.env.REDIS_PASSWORD ?? "",
  // Upstash (and any managed Redis) is TLS-only; local dev Redis is not.
  // Enable explicitly via REDIS_TLS=true, or auto-detect Upstash hosts.
  tls:
    process.env.REDIS_TLS === "true" ||
    (process.env.REDIS_HOST ?? "").includes("upstash.io"),
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
