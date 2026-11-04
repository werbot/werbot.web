import { authStore } from "$lib/stores/auth.svelte";

export type WsStatus = "OPEN" | "CLOSED" | "CONNECTING";

export interface WsStore {
  status: WsStatus;
  data: string | null;
  send(msg: string): void;
  open(): void;
  close(): void;
}

const reconnectDelay = 1000;

const state = $state<{ status: WsStatus; data: string | null }>({
  status: "CLOSED",
  data: null
});

let socket: WebSocket | null = null;
let reconnectTimer: ReturnType<typeof setTimeout> | null = null;

function wsUrl(): string | null {
  const sessionId = authStore.hasSessionID;
  if (!sessionId) {
    return null;
  }

  const base = import.meta.env.VITE_API_URL ?? "";
  return `${base.replace("http", "ws")}/ws/${sessionId}`;
}

function clearReconnect(): void {
  if (reconnectTimer !== null) {
    clearTimeout(reconnectTimer);
    reconnectTimer = null;
  }
}

function scheduleReconnect(): void {
  if (reconnectTimer !== null) {
    return;
  }

  reconnectTimer = setTimeout(() => {
    reconnectTimer = null;
    open();
  }, reconnectDelay);
}

function open(): void {
  const url = wsUrl();
  if (!url) {
    return;
  }

  if (socket && (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING)) {
    return;
  }

  clearReconnect();
  state.status = "CONNECTING";

  const ws = new WebSocket(url);
  socket = ws;

  ws.onopen = (): void => {
    if (socket !== ws) {
      return;
    }
    state.status = "OPEN";
  };

  ws.onmessage = (event: MessageEvent): void => {
    if (socket !== ws) {
      return;
    }
    state.data = typeof event.data === "string" ? event.data : String(event.data);
  };

  ws.onclose = (): void => {
    if (socket !== ws) {
      return;
    }
    socket = null;
    state.status = "CLOSED";
    scheduleReconnect();
  };

  ws.onerror = (): void => {
    ws.close();
  };
}

function close(): void {
  clearReconnect();

  const ws = socket;
  socket = null;
  state.status = "CLOSED";

  if (ws) {
    ws.close();
  }
}

function send(msg: string): void {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(msg);
  }
}

export const wsStore: WsStore = {
  get status(): WsStatus {
    return state.status;
  },

  get data(): string | null {
    return state.data;
  },

  send,
  open,
  close
};
