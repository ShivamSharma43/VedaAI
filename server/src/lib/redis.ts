import IORedis, { type RedisOptions } from "ioredis";
import { env } from "../config/env";

/**
 * Single shared ioredis connection for the entire server.
 *
 * Why a singleton:
 *  - Every `new Redis()` opens its own TCP socket *and* its own "connect"
 *    listener. Multiple instances therefore produce repeated "Redis connected"
 *    logs and N sockets all fighting Upstash's idle-timeout, which surfaces as
 *    intermittent ECONNRESET.
 *  - BullMQ (Queue + Worker), Socket.io and the Express APIs all reuse THIS one
 *    base client. BullMQ internally calls `.duplicate()` on it for its blocking
 *    commands — that is expected, and those duplicates don't re-run our
 *    listeners, so they never re-log "Redis connected".
 */
/**
 * Behavioural options shared by every connection mode.
 * IMPORTANT: no host/port/username/password/tls here — those come either from
 * REDIS_URL or the discrete fields, so we never accidentally override a URL's
 * host with the localhost default.
 */
const baseOptions: RedisOptions = {
  // REQUIRED by BullMQ workers (they issue blocking commands). Must be `null`,
  // never a number, or BullMQ throws.
  maxRetriesPerRequest: null,

  // Upstash reaps idle TLS sockets; reconnect with a capped backoff instead of
  // hammering it (the uncapped churn is what produced the reconnect spam).
  retryStrategy: (times) => Math.min(times * 200, 2000),

  // Reconnect automatically on a managed-instance failover (READONLY replica).
  reconnectOnError: (err) => err.message.includes("READONLY"),

  // Keep the socket warm so Upstash is less likely to drop it as idle.
  keepAlive: 30_000,
  enableReadyCheck: false,
};

/**
 * Cache the instance on globalThis so a dev hot-reload (tsx/ts-node-dev
 * re-evaluating modules) reuses the same connection instead of leaking a new
 * one on every reload.
 */
const globalForRedis = globalThis as unknown as { redis?: IORedis };

function buildClient(): IORedis {
  // Preferred for Upstash: a single rediss:// URL carries host, port,
  // username, password and TLS — the least error-prone way to authenticate.
  if (env.redis.url) {
    return new IORedis(env.redis.url, baseOptions);
  }

  // Otherwise assemble from discrete fields.
  const options: RedisOptions = {
    ...baseOptions,
    host: env.redis.host,
    port: env.redis.port,
    // Only send these when set, so a password-less / default-user local Redis
    // isn't rejected.
    username: env.redis.username || undefined,
    password: env.redis.password || undefined,
  };
  // Managed Redis (Upstash) requires TLS; local dev Redis must NOT use it.
  if (env.redis.tls) options.tls = {};

  return new IORedis(options);
}

function createClient(): IORedis {
  const client = buildClient();

  let connectedOnce = false;
  client.on("connect", () => {
    if (connectedOnce) return; // silence reconnect chatter
    connectedOnce = true;
    console.log("Redis connected");
  });
  client.on("error", (err) => console.error("Redis error:", err.message));

  return client;
}

export const redis: IORedis = globalForRedis.redis ?? createClient();

if (env.nodeEnv !== "production") globalForRedis.redis = redis;
