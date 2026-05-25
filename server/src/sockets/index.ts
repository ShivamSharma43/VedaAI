import { Server as HTTPServer } from "http";
import { Server } from "socket.io";
import { env } from "../config/env";

let io: Server | null = null;

export function initSocket(server: HTTPServer): Server {
  io = new Server(server, {
    cors: { origin: env.clientUrls, credentials: true },
  });

  io.on("connection", (socket) => {
    socket.on("subscribe", (assignmentId: string) => {
      socket.join(`assignment:${assignmentId}`);
    });
  });

  return io;
}

export function emitToAssignment(
  assignmentId: string,
  event: string,
  payload: unknown
) {
  if (!io) return;
  io.to(`assignment:${assignmentId}`).emit(event, payload);
}