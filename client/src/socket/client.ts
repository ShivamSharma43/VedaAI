import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

function resolveUrl(): string {
  // Prefer an explicit socket URL; otherwise derive it from the API origin
  // (strip a trailing /api) so production works even without a separate var.
  if (process.env.NEXT_PUBLIC_SOCKET_URL) {
    return process.env.NEXT_PUBLIC_SOCKET_URL;
  }
  const api = process.env.NEXT_PUBLIC_API_URL;
  if (api) return api.replace(/\/api\/?$/, "");
  return "http://localhost:4000";
}

export function getSocket(): Socket {
  if (!socket) {
    socket = io(resolveUrl(), {
      // Start with HTTP long-polling and upgrade to websocket. Forcing
      // websocket-only often fails behind hosted proxies (e.g. Render), which
      // leaves the client without realtime generation updates.
      transports: ["polling", "websocket"],
      withCredentials: true,
    });
  }
  return socket;
}
