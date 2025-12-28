import { Type as EventType } from "@proto/event/enum";
import { Address } from "@proto/scheme/scheme";
import { SchemeType as ServerScheme } from "@proto/scheme/access";

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
  [EventType.onReset]: "red",
  [EventType.onUpdate]: "yellow"
};

export const addressToColor: Record<Address, string> = {
  [Address.address_unspecified]: "gray",
  [Address.IPv4]: "gray",
  [Address.IPv6]: "purple",
  [Address.Hostname]: "blue"
};

export const serverSchemeToColor: Record<ServerScheme, string> = {
  [ServerScheme.scheme_unspecified]: "gray",
  [ServerScheme.server_tcp]: "gray",
  [ServerScheme.server_udp]: "gray",
  [ServerScheme.server_ssh]: "gray",
  [ServerScheme.server_telnet]: "gray"
};
