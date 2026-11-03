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
  [EventType.onUpdate]: "yellow",
  [EventType.onRequest]: "blue",
  [EventType.onMessage]: "blue"
};

export const addressToColor: Record<Address, string> = {
  [Address.address_unspecified]: "gray",
  [Address.IPv4]: "gray",
  [Address.IPv6]: "purple",
  [Address.Hostname]: "blue"
};

export const serverSchemeToColor: Record<ServerScheme, string> = {
  [ServerScheme.scheme_unspecified]: "gray",
  [ServerScheme.server]: "gray",
  [ServerScheme.server_tcp]: "gray",
  [ServerScheme.server_udp]: "gray",
  [ServerScheme.server_ssh]: "gray",
  [ServerScheme.server_telnet]: "gray",
  [ServerScheme.database]: "blue",
  [ServerScheme.database_mysql]: "blue",
  [ServerScheme.database_postgres]: "blue",
  [ServerScheme.database_redis]: "blue",
  [ServerScheme.database_mongodb]: "blue",
  [ServerScheme.database_elastic]: "blue",
  [ServerScheme.database_dynamodb]: "blue",
  [ServerScheme.database_cassandra]: "blue",
  [ServerScheme.database_sqlserver]: "blue",
  [ServerScheme.database_snowflake]: "blue",
  [ServerScheme.desktop]: "purple",
  [ServerScheme.desktop_rdp]: "purple",
  [ServerScheme.desktop_vnc]: "purple",
  [ServerScheme.container]: "yellow",
  [ServerScheme.container_docker]: "yellow",
  [ServerScheme.container_k8s]: "yellow",
  [ServerScheme.cloud]: "green",
  [ServerScheme.cloud_aws]: "green",
  [ServerScheme.cloud_gcp]: "green",
  [ServerScheme.cloud_azure]: "green",
  [ServerScheme.cloud_do]: "green",
  [ServerScheme.cloud_hetzner]: "green",
  [ServerScheme.application]: "indigo",
  [ServerScheme.application_site]: "indigo"
};
