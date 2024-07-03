export type Event = "connextSuccess" | "connextError" | "connextWarning" | "connextInfo";

export function showMessage(message: string, event: Event = "connextSuccess"): void {
  const eventMessage = new CustomEvent(event, {
    detail: message
  });
  dispatchEvent(eventMessage);
}
