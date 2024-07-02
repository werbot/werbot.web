type Event = "connextSuccess" | "connextError" | "connextWarning" | "connextInfo";

export function showMessage(message: string, event: string = "connextSuccess"): any {
  const eventMessage = new CustomEvent(event, {
    detail: message,
  });
  dispatchEvent(eventMessage);
}
