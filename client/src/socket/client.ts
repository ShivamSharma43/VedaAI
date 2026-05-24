import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;
const URL = process.env.NEXT_PUBLIC_SOCKET_URL ?? "http://localhost:4000";

export function getSocket(): Socket {
  if (!socket) socket = io(URL, { transports: ["websocket"] });
  return socket;
}