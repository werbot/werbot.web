import { Type as EventType } from "@proto/event/enum";
import { Project_Section } from "@proto/event/message";

const sectionLabels: Record<number, string> = {
  [Project_Section.project]: "Project",
  [Project_Section.setting]: "Settings",
  [Project_Section.member]: "Members",
  [Project_Section.team]: "Teams",
  [Project_Section.server]: "Servers",
  [Project_Section.database]: "Databases",
  [Project_Section.application]: "Applications",
  [Project_Section.desktop]: "Desktops",
  [Project_Section.container]: "Containers",
  [Project_Section.cloud]: "Clouds"
};

const typeLabels: Record<number, string> = {
  [EventType.onOnline]: "Online",
  [EventType.onOffline]: "Offline",
  [EventType.onCreate]: "Created",
  [EventType.onEdit]: "Edited",
  [EventType.onRemove]: "Removed",
  [EventType.onActive]: "Activated",
  [EventType.onInactive]: "Deactivated",
  [EventType.onChange]: "Changed",
  [EventType.onLogin]: "Signed in",
  [EventType.onLogoff]: "Signed out",
  [EventType.onReset]: "Reset",
  [EventType.onUpdate]: "Updated",
  [EventType.onRequest]: "Requested",
  [EventType.onMessage]: "Message"
};

export function eventSectionLabel(value: number): string {
  return sectionLabels[value] ?? "Unknown";
}

export function eventTypeLabel(value: number): string {
  return typeLabels[value] ?? "Unknown";
}
