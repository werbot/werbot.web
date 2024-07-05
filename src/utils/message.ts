export type Event = "connextSuccess" | "connextError" | "connextWarning" | "connextInfo";

export function showMessage(message: string, event: Event = "connextSuccess"): void {
  const eventMessage = new CustomEvent(event, {
    detail: message
  });
  dispatchEvent(eventMessage);
}

export async function showApiError(error: any, exclude?: number[]): Promise<void> {
  const statusMessageMap: Record<number, string> = {
    404: "connextError",
    408: "connextError",
    409: "connextError",
    425: "connextError",
    429: "connextError",
    500: "connextWarning",
    502: "connextWarning",
    503: "connextWarning",
    504: "connextWarning"
  };

  if (typeof error === "string") {
    showMessage(error, "connextWarning");
    return;
  }

  if (!exclude || !exclude.includes(error.code)) {
    const messageType = statusMessageMap[error.code] as Event;
    if (messageType) {
      const message = error.result || error.message;
      showMessage(message, messageType);
    }
  }
}
