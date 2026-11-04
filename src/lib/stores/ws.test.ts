import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const session = vi.hoisted(() => ({ id: null as string | null }));

vi.mock("$lib/stores/auth.svelte", () => ({
  authStore: {
    get hasSessionID(): string | null {
      return session.id;
    }
  }
}));

import { wsStore } from "$lib/stores/ws.svelte";

type CloseHandler = ((event: CloseEvent) => void) | null;

class FakeWebSocket {
  static CONNECTING = 0;
  static OPEN = 1;
  static CLOSING = 2;
  static CLOSED = 3;
  static instances: FakeWebSocket[] = [];

  url: string;
  readyState = FakeWebSocket.CONNECTING;
  sent: string[] = [];
  onopen: ((event: Event) => void) | null = null;
  onmessage: ((event: MessageEvent) => void) | null = null;
  onclose: CloseHandler = null;
  onerror: ((event: Event) => void) | null = null;

  constructor(url: string) {
    this.url = url;
    FakeWebSocket.instances.push(this);
  }

  send(msg: string): void {
    this.sent.push(msg);
  }

  close(): void {
    this.readyState = FakeWebSocket.CLOSED;
    this.onclose?.({} as CloseEvent);
  }

  triggerOpen(): void {
    this.readyState = FakeWebSocket.OPEN;
    this.onopen?.({} as Event);
  }

  triggerMessage(data: string): void {
    this.onmessage?.({ data } as MessageEvent);
  }

  serverClose(): void {
    this.readyState = FakeWebSocket.CLOSED;
    this.onclose?.({} as CloseEvent);
  }
}

describe("wsStore", () => {
  beforeEach(() => {
    vi.stubEnv("VITE_API_URL", "http://localhost:8088");
    vi.stubGlobal("WebSocket", FakeWebSocket);
    session.id = null;
    wsStore.close();
    FakeWebSocket.instances = [];
  });

  afterEach(() => {
    wsStore.close();
    FakeWebSocket.instances = [];
    vi.useRealTimers();
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("connects to the session websocket and exposes status, data and send", () => {
    session.id = "session-1";

    wsStore.open();

    expect(FakeWebSocket.instances).toHaveLength(1);
    expect(FakeWebSocket.instances[0].url).toBe("ws://localhost:8088/ws/session-1");
    expect(wsStore.status).toBe("CONNECTING");

    FakeWebSocket.instances[0].triggerOpen();
    expect(wsStore.status).toBe("OPEN");

    FakeWebSocket.instances[0].triggerMessage('{"code":200,"action":"subscribe"}');
    expect(wsStore.data).toBe('{"code":200,"action":"subscribe"}');

    wsStore.send('{"action":"info"}');
    expect(FakeWebSocket.instances[0].sent).toEqual(['{"action":"info"}']);
  });

  it("does not connect without a session id", () => {
    wsStore.open();

    expect(FakeWebSocket.instances).toHaveLength(0);
    expect(wsStore.status).toBe("CLOSED");
  });

  it("reconnects automatically after the server closes the socket", () => {
    vi.useFakeTimers();
    session.id = "session-1";

    wsStore.open();
    FakeWebSocket.instances[0].serverClose();

    expect(wsStore.status).toBe("CLOSED");
    expect(FakeWebSocket.instances).toHaveLength(1);

    vi.advanceTimersByTime(1000);

    expect(FakeWebSocket.instances).toHaveLength(2);
  });

  it("does not reconnect after an explicit close", () => {
    vi.useFakeTimers();
    session.id = "session-1";

    wsStore.open();
    wsStore.close();
    vi.advanceTimersByTime(5000);

    expect(FakeWebSocket.instances).toHaveLength(1);
    expect(wsStore.status).toBe("CLOSED");
  });
});
