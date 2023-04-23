type Event = "connextSuccess" | "connextError" | "connextWarning" | "connextInfo";

/**
 * Dispatches a custom event with the specified message and event type.
 * @param message The message to include in the event detail.
 * @param event Optional. The type of event to dispatch. Defaults to "connextSuccess".
 */
export function showMessage(message: string, event: Event = "connextSuccess"): any {
  const eventMessage = new CustomEvent(event, {
    detail: message,
  });
  dispatchEvent(eventMessage);
}
