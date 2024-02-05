import { EventType } from "@proto/event";
import { Address, ServerScheme } from "@proto/server";

export const eventTypeToColor: Record<EventType, string> = {
  [EventType.event_unspecified]: "gray",
  [EventType.onOnline]: "green",
  [EventType.onOffline]: "yellow",
  [EventType.onCreate]: "blue",
  [EventType.onEdit]: "yellow",
  [EventType.onRemove]: "red",
  [EventType.onActive]: "green",
  [EventType.onInactive]: "yellow",
  [EventType.onChange]: "blue",
  [EventType.onLogin]: "green",
  [EventType.onLogoff]: "yellow",
};

export const addressToColor: Record<Address, string> = {
  [Address.address_unspecified]: "gray",
  [Address.IPv4]: "gray",
  [Address.IPv6]: "purple",
  [Address.Hostname]: "blue"
};

export const serverSchemeToColor: Record<ServerScheme, string> = {
  [ServerScheme.server_unspecified]: "gray",
  [ServerScheme.tcp]: "gray",
  [ServerScheme.udp]: "gray",
  [ServerScheme.ssh]: "gray",
  [ServerScheme.telnet]: "gray"
};
