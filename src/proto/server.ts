// @generated from protobuf file "server.proto" (package "server", syntax proto3)
// tslint:disable
// @ts-nocheck
import { ServiceType } from "@protobuf-ts/runtime-rpc";
import { MessageType } from "@protobuf-ts/runtime";
import { Timestamp } from "./google/protobuf/timestamp";
/**
 * rpc ListServers
 *
 * @generated from protobuf message server.ListServers
 */
export interface ListServers {
}
/**
 * @generated from protobuf message server.ListServers.Request
 */
export interface ListServers_Request {
    /**
     * @generated from protobuf field: string project_id = 1;
     */
    project_id: string;
    /**
     * @generated from protobuf field: string user_id = 2;
     */
    user_id: string;
    /**
     * @generated from protobuf field: string login = 3;
     */
    login: string;
    /**
     * @generated from protobuf field: int32 limit = 4;
     */
    limit: number;
    /**
     * @generated from protobuf field: int32 offset = 5;
     */
    offset: number;
    /**
     * @generated from protobuf field: string sort_by = 6;
     */
    sort_by: string;
}
/**
 * @generated from protobuf message server.ListServers.Response
 */
export interface ListServers_Response {
    /**
     * @generated from protobuf field: int32 total = 1;
     */
    total: number;
    /**
     * @generated from protobuf field: repeated server.Server.Response servers = 2;
     */
    servers: Server_Response[];
}
/**
 * rpc Server
 *
 * @generated from protobuf message server.Server
 */
export interface Server {
}
/**
 * @generated from protobuf message server.Server.Request
 */
export interface Server_Request {
    /**
     * @generated from protobuf field: string user_id = 1;
     */
    user_id: string; // @gotags: query:"user_id"
    /**
     * @generated from protobuf field: string server_id = 2;
     */
    server_id: string; // @gotags: query:"server_id"
    /**
     * @generated from protobuf field: string project_id = 3;
     */
    project_id: string; // @gotags: query:"project_id"
}
/**
 * @generated from protobuf message server.Server.Response
 */
export interface Server_Response {
    /**
     * @generated from protobuf field: string server_id = 1;
     */
    server_id: string;
    /**
     * @generated from protobuf field: string project_id = 2;
     */
    project_id: string;
    /**
     * @generated from protobuf field: string access_id = 3;
     */
    access_id: string;
    /**
     * @generated from protobuf field: string project_login = 4;
     */
    project_login: string;
    /**
     * @generated from protobuf field: string address = 5;
     */
    address: string;
    /**
     * @generated from protobuf field: int32 port = 6;
     */
    port: number;
    /**
     * @generated from protobuf field: string token = 7;
     */
    token: string;
    /**
     * @generated from protobuf field: string login = 8;
     */
    login: string;
    /**
     * @generated from protobuf field: string title = 9;
     */
    title: string;
    /**
     * @generated from protobuf field: bool audit = 10;
     */
    audit: boolean;
    /**
     * @generated from protobuf field: bool online = 11;
     */
    online: boolean;
    /**
     * @generated from protobuf field: string account_id = 12;
     */
    account_id: string;
    /**
     * @generated from protobuf field: server.Auth auth = 13;
     */
    auth: Auth;
    /**
     * @generated from protobuf field: server.ServerScheme scheme = 14;
     */
    scheme: ServerScheme;
    /**
     * @generated from protobuf field: bytes host_key = 15;
     */
    host_key: Uint8Array;
    /**
     * @generated from protobuf field: string description = 16;
     */
    description: string;
    /**
     * @generated from protobuf field: bool active = 17;
     */
    active: boolean;
    /**
     * @generated from protobuf field: int32 count_members = 18;
     */
    count_members: number;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp locked_at = 19;
     */
    locked_at?: Timestamp;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp archived_at = 20;
     */
    archived_at?: Timestamp;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp updated_at = 21;
     */
    updated_at?: Timestamp;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp created_at = 22;
     */
    created_at?: Timestamp;
}
/**
 * rpc AddServer
 *
 * @generated from protobuf message server.AddServer
 */
export interface AddServer {
}
/**
 * @generated from protobuf message server.AddServer.Request
 */
export interface AddServer_Request {
    /**
     * @generated from protobuf field: string user_id = 1;
     */
    user_id: string;
    /**
     * @generated from protobuf field: string project_id = 2;
     */
    project_id: string;
    /**
     * @generated from protobuf field: string address = 3;
     */
    address: string;
    /**
     * @generated from protobuf field: int32 port = 4;
     */
    port: number;
    /**
     * @generated from protobuf field: string title = 5;
     */
    title: string;
    /**
     * @generated from protobuf field: server.ServerScheme scheme = 6;
     */
    scheme: ServerScheme;
    /**
     * @generated from protobuf field: bool audit = 7;
     */
    audit: boolean;
    /**
     * @generated from protobuf field: bool active = 8;
     */
    active: boolean;
    /**
     * @generated from protobuf field: string description = 9;
     */
    description: string;
    /**
     * @generated from protobuf field: string login = 10;
     */
    login: string;
    /**
     * @generated from protobuf oneof: access
     */
    access: {
        oneofKind: "password";
        /**
         * @generated from protobuf field: string password = 11;
         */
        password: string;
    } | {
        oneofKind: "key";
        /**
         * @generated from protobuf field: string key = 12;
         */
        key: string; // key UUID from redis
    } | {
        oneofKind: undefined;
    };
}
/**
 * @generated from protobuf message server.AddServer.Response
 */
export interface AddServer_Response {
    /**
     * @generated from protobuf field: string server_id = 1;
     */
    server_id: string; // string fingeprint = 2;
    // string key_public = 3;
}
/**
 * rpc UpdateServer
 *
 * @generated from protobuf message server.UpdateServer
 */
export interface UpdateServer {
}
/**
 * @generated from protobuf message server.UpdateServer.Request
 */
export interface UpdateServer_Request {
    /**
     * @generated from protobuf field: string user_id = 1;
     */
    user_id: string;
    /**
     * @generated from protobuf field: string project_id = 2;
     */
    project_id: string;
    /**
     * @generated from protobuf field: string server_id = 3;
     */
    server_id: string;
    /**
     * @generated from protobuf oneof: setting
     */
    setting: {
        oneofKind: "info";
        /**
         * @generated from protobuf field: server.UpdateServer.Info info = 4;
         */
        info: UpdateServer_Info;
    } | {
        oneofKind: "audit";
        /**
         * @generated from protobuf field: bool audit = 5;
         */
        audit: boolean;
    } | {
        oneofKind: "active";
        /**
         * @generated from protobuf field: bool active = 6;
         */
        active: boolean;
    } | {
        oneofKind: "online";
        /**
         * @generated from protobuf field: bool online = 7;
         */
        online: boolean;
    } | {
        oneofKind: undefined;
    };
}
/**
 * @generated from protobuf message server.UpdateServer.Response
 */
export interface UpdateServer_Response {
    /**
     * @generated from protobuf field: google.protobuf.Timestamp updated_at = 1;
     */
    updated_at?: Timestamp;
}
/**
 * @generated from protobuf message server.UpdateServer.Info
 */
export interface UpdateServer_Info {
    /**
     * @generated from protobuf field: string address = 1;
     */
    address: string; // @gotags: query:"address"
    /**
     * @generated from protobuf field: int32 port = 2;
     */
    port: number; // @gotags: query:"port"
    /**
     * @generated from protobuf field: string login = 3;
     */
    login: string; // @gotags: query:"login"
    /**
     * @generated from protobuf field: string title = 4;
     */
    title: string; // @gotags: query:"title"
    /**
     * @generated from protobuf field: string description = 5;
     */
    description: string;
}
/**
 * rpc DeleteServer
 *
 * @generated from protobuf message server.DeleteServer
 */
export interface DeleteServer {
}
/**
 * @generated from protobuf message server.DeleteServer.Request
 */
export interface DeleteServer_Request {
    /**
     * @generated from protobuf field: string user_id = 1;
     */
    user_id: string; // @gotags: query:"user_id"
    /**
     * @generated from protobuf field: string project_id = 2;
     */
    project_id: string; // @gotags: query:"project_id"
    /**
     * @generated from protobuf field: string server_id = 3;
     */
    server_id: string; // @gotags: query:"server_id"
}
/**
 * @generated from protobuf message server.DeleteServer.Response
 */
export interface DeleteServer_Response {
}
/**
 * rpc ServerAccess
 *
 * @generated from protobuf message server.ServerAccess
 */
export interface ServerAccess {
}
/**
 * @generated from protobuf message server.ServerAccess.Request
 */
export interface ServerAccess_Request {
    /**
     * @generated from protobuf field: string user_id = 1;
     */
    user_id: string; // @gotags: query:"user_id"
    /**
     * @generated from protobuf field: string project_id = 2;
     */
    project_id: string; // @gotags: query:"project_id"
    /**
     * @generated from protobuf field: string server_id = 3;
     */
    server_id: string; // @gotags: query:"server_id"
}
/**
 * @generated from protobuf message server.ServerAccess.Response
 */
export interface ServerAccess_Response {
    /**
     * @generated from protobuf field: server.Auth auth = 1;
     */
    auth: Auth;
    /**
     * @generated from protobuf field: string login = 2;
     */
    login: string;
    /**
     * @generated from protobuf oneof: access
     */
    access: {
        oneofKind: "password";
        /**
         * @generated from protobuf field: string password = 3;
         */
        password: string;
    } | {
        oneofKind: "key";
        /**
         * @generated from protobuf field: server.ServerAccess.Key key = 4;
         */
        key: ServerAccess_Key;
    } | {
        oneofKind: undefined;
    };
}
/**
 * @generated from protobuf message server.ServerAccess.Key
 */
export interface ServerAccess_Key {
    /**
     * @generated from protobuf field: string public = 1;
     */
    public: string;
    /**
     * @generated from protobuf field: string private = 2;
     */
    private: string;
    /**
     * @generated from protobuf field: string password = 3;
     */
    password: string;
    /**
     * @generated from protobuf field: string fingeprint = 4;
     */
    fingeprint: string;
}
/**
 * rpc UpdateServerAccess
 *
 * @generated from protobuf message server.UpdateServerAccess
 */
export interface UpdateServerAccess {
}
/**
 * @generated from protobuf message server.UpdateServerAccess.Request
 */
export interface UpdateServerAccess_Request {
    /**
     * @generated from protobuf field: string user_id = 1;
     */
    user_id: string;
    /**
     * @generated from protobuf field: string project_id = 2;
     */
    project_id: string;
    /**
     * @generated from protobuf field: string server_id = 3;
     */
    server_id: string;
    /**
     * @generated from protobuf oneof: access
     */
    access: {
        oneofKind: "password";
        /**
         * @generated from protobuf field: string password = 5;
         */
        password: string;
    } | {
        oneofKind: "key";
        /**
         * @generated from protobuf field: string key = 6;
         */
        key: string;
    } | {
        oneofKind: undefined;
    };
}
/**
 * @generated from protobuf message server.UpdateServerAccess.Response
 */
export interface UpdateServerAccess_Response {
}
/**
 * rpc ServerActivity
 *
 * @generated from protobuf message server.ServerActivity
 */
export interface ServerActivity {
}
/**
 * @generated from protobuf message server.ServerActivity.Request
 */
export interface ServerActivity_Request {
    /**
     * @generated from protobuf field: string user_id = 1;
     */
    user_id: string; // @gotags: query:"user_id"
    /**
     * @generated from protobuf field: string project_id = 2;
     */
    project_id: string; // @gotags: query:"project_id"
    /**
     * @generated from protobuf field: string server_id = 3;
     */
    server_id: string; // @gotags: query:"server_id"
}
/**
 * @generated from protobuf message server.ServerActivity.Response
 */
export interface ServerActivity_Response {
    /**
     * @generated from protobuf field: repeated int32 monday = 1;
     */
    monday: number[];
    /**
     * @generated from protobuf field: repeated int32 tuesday = 2;
     */
    tuesday: number[];
    /**
     * @generated from protobuf field: repeated int32 wednesday = 3;
     */
    wednesday: number[];
    /**
     * @generated from protobuf field: repeated int32 thursday = 4;
     */
    thursday: number[];
    /**
     * @generated from protobuf field: repeated int32 friday = 5;
     */
    friday: number[];
    /**
     * @generated from protobuf field: repeated int32 saturday = 6;
     */
    saturday: number[];
    /**
     * @generated from protobuf field: repeated int32 sunday = 7;
     */
    sunday: number[];
}
/**
 * rpc UpdateServerActivity
 *
 * @generated from protobuf message server.UpdateServerActivity
 */
export interface UpdateServerActivity {
}
/**
 * @generated from protobuf message server.UpdateServerActivity.Request
 */
export interface UpdateServerActivity_Request {
    /**
     * @generated from protobuf field: string user_id = 1;
     */
    user_id: string; // @gotags: query:"user_id"
    /**
     * @generated from protobuf field: string project_id = 2;
     */
    project_id: string; // @gotags: query:"project_id"
    /**
     * @generated from protobuf field: string server_id = 3;
     */
    server_id: string; // @gotags: query:"server_id"
    /**
     * @generated from protobuf field: server.ServerActivity.Response activity = 4;
     */
    activity?: ServerActivity_Response;
}
/**
 * @generated from protobuf message server.UpdateServerActivity.Response
 */
export interface UpdateServerActivity_Response {
}
/**
 * rpc UpdateHostKey
 *
 * @generated from protobuf message server.UpdateHostKey
 */
export interface UpdateHostKey {
}
/**
 * @generated from protobuf message server.UpdateHostKey.Request
 */
export interface UpdateHostKey_Request {
    /**
     * @generated from protobuf field: string server_id = 1;
     */
    server_id: string; // @gotags: query:"server_id"
    /**
     * @generated from protobuf field: bytes hostkey = 2;
     */
    hostkey: Uint8Array;
}
/**
 * @generated from protobuf message server.UpdateHostKey.Response
 */
export interface UpdateHostKey_Response {
}
/**
 * rpc AddSession
 *
 * @generated from protobuf message server.AddSession
 */
export interface AddSession {
}
/**
 * @generated from protobuf message server.AddSession.Request
 */
export interface AddSession_Request {
    /**
     * @generated from protobuf field: string account_id = 1;
     */
    account_id: string; // @gotags: query:"account_id"
    /**
     * @generated from protobuf field: server.SessionStatus status = 2;
     */
    status: SessionStatus;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp created_at = 3;
     */
    created_at?: Timestamp;
    /**
     * @generated from protobuf field: string message = 4;
     */
    message: string;
}
/**
 * @generated from protobuf message server.AddSession.Response
 */
export interface AddSession_Response {
    /**
     * @generated from protobuf field: string session_id = 1;
     */
    session_id: string;
}
/**
 * rpc ServerNameByID
 *
 * @generated from protobuf message server.ServerNameByID
 */
export interface ServerNameByID {
}
/**
 * @generated from protobuf message server.ServerNameByID.Request
 */
export interface ServerNameByID_Request {
    /**
     * @generated from protobuf field: string user_id = 1;
     */
    user_id: string; // @gotags: query:"user_id"
    /**
     * @generated from protobuf field: string project_id = 2;
     */
    project_id: string; // @gotags: query:"project_id"
    /**
     * @generated from protobuf field: string server_id = 3;
     */
    server_id: string; // @gotags: query:"server_id"
}
/**
 * @generated from protobuf message server.ServerNameByID.Response
 */
export interface ServerNameByID_Response {
    /**
     * @generated from protobuf field: string server_name = 1;
     */
    server_name: string;
}
/**
 * rpc ListShareServers
 *
 * @generated from protobuf message server.ListShareServers
 */
export interface ListShareServers {
}
/**
 * @generated from protobuf message server.ListShareServers.Request
 */
export interface ListShareServers_Request {
    /**
     * @generated from protobuf field: int32 limit = 1;
     */
    limit: number;
    /**
     * @generated from protobuf field: int32 offset = 2;
     */
    offset: number;
    /**
     * @generated from protobuf field: string sort_by = 3;
     */
    sort_by: string;
    /**
     * @generated from protobuf field: string user_id = 4;
     */
    user_id: string; // @gotags: query:"user_id"
}
/**
 * @generated from protobuf message server.ListShareServers.Response
 */
export interface ListShareServers_Response {
    /**
     * @generated from protobuf field: int32 total = 1;
     */
    total: number;
    /**
     * @generated from protobuf field: repeated server.ListShareServers.Response.SharedServer servers = 2;
     */
    servers: ListShareServers_Response_SharedServer[];
}
/**
 * @generated from protobuf message server.ListShareServers.Response.SharedServer
 */
export interface ListShareServers_Response_SharedServer {
    /**
     * @generated from protobuf field: string user_login = 1;
     */
    user_login: string;
    /**
     * @generated from protobuf field: string project_login = 2;
     */
    project_login: string;
    /**
     * @generated from protobuf field: string server_id = 3;
     */
    server_id: string;
    /**
     * @generated from protobuf field: string server_token = 4;
     */
    server_token: string;
    /**
     * @generated from protobuf field: bool server_online = 5;
     */
    server_online: boolean;
    /**
     * @generated from protobuf field: string server_title = 6;
     */
    server_title: string;
    /**
     * @generated from protobuf field: string server_description = 7;
     */
    server_description: string;
}
/**
 * rpc AddShareServer
 *
 * @generated from protobuf message server.AddShareServer
 */
export interface AddShareServer {
}
/**
 * @generated from protobuf message server.AddShareServer.Request
 */
export interface AddShareServer_Request {
    /**
     * @generated from protobuf field: string user_id = 1;
     */
    user_id: string; // @gotags: query:"user_id"
    /**
     * @generated from protobuf field: string project_id = 2;
     */
    project_id: string; // @gotags: query:"project_id"
    /**
     * @generated from protobuf field: string server_id = 3;
     */
    server_id: string; // @gotags: query:"server_id"
}
/**
 * @generated from protobuf message server.AddShareServer.Response
 */
export interface AddShareServer_Response {
}
/**
 * rpc UpdateShareServer
 *
 * @generated from protobuf message server.UpdateShareServer
 */
export interface UpdateShareServer {
}
/**
 * @generated from protobuf message server.UpdateShareServer.Request
 */
export interface UpdateShareServer_Request {
    /**
     * @generated from protobuf field: string user_id = 1;
     */
    user_id: string; // @gotags: query:"user_id"
    /**
     * @generated from protobuf field: string project_id = 2;
     */
    project_id: string; // @gotags: query:"project_id"
    /**
     * @generated from protobuf field: string share_id = 3;
     */
    share_id: string; // @gotags: query:"share_id" 
}
/**
 * @generated from protobuf message server.UpdateShareServer.Response
 */
export interface UpdateShareServer_Response {
}
/**
 * rpc DeleteShareServer
 *
 * @generated from protobuf message server.DeleteShareServer
 */
export interface DeleteShareServer {
}
/**
 * @generated from protobuf message server.DeleteShareServer.Request
 */
export interface DeleteShareServer_Request {
    /**
     * @generated from protobuf field: string user_id = 1;
     */
    user_id: string;
    /**
     * @generated from protobuf field: string project_id = 2;
     */
    project_id: string;
    /**
     * @generated from protobuf field: string share_id = 3;
     */
    share_id: string;
}
/**
 * @generated from protobuf message server.DeleteShareServer.Response
 */
export interface DeleteShareServer_Response {
}
/**
 * @generated from protobuf enum server.Auth
 */
export enum Auth {
    /**
     * @generated from protobuf enum value: auth_unspecified = 0;
     */
    auth_unspecified = 0,
    /**
     * @generated from protobuf enum value: password = 1;
     */
    password = 1,
    /**
     * @generated from protobuf enum value: key = 2;
     */
    key = 2,
    /**
     * @generated from protobuf enum value: agent = 3;
     */
    agent = 3
}
/**
 * @generated from protobuf enum server.Address
 */
export enum Address {
    /**
     * @generated from protobuf enum value: address_unspecified = 0;
     */
    address_unspecified = 0,
    /**
     * @generated from protobuf enum value: IPv4 = 1;
     */
    IPv4 = 1,
    /**
     * @generated from protobuf enum value: IPv6 = 2;
     */
    IPv6 = 2,
    /**
     * @generated from protobuf enum value: Hostname = 3;
     */
    Hostname = 3
}
/**
 * @generated from protobuf enum server.ServerScheme
 */
export enum ServerScheme {
    /**
     * @generated from protobuf enum value: server_unspecified = 0;
     */
    server_unspecified = 0,
    /**
     * @generated from protobuf enum value: tcp = 1;
     */
    tcp = 1,
    /**
     * @generated from protobuf enum value: udp = 2;
     */
    udp = 2,
    /**
     * @generated from protobuf enum value: ssh = 3;
     */
    ssh = 3,
    /**
     * @generated from protobuf enum value: telnet = 4;
     */
    telnet = 4
}
/**
 * @generated from protobuf enum server.DatabaseScheme
 */
export enum DatabaseScheme {
    /**
     * @generated from protobuf enum value: database_unspecified = 0;
     */
    database_unspecified = 0,
    /**
     * @generated from protobuf enum value: mysql = 1;
     */
    mysql = 1,
    /**
     * @generated from protobuf enum value: postgres = 2;
     */
    postgres = 2,
    /**
     * @generated from protobuf enum value: redis = 3;
     */
    redis = 3,
    /**
     * @generated from protobuf enum value: mongodb = 4;
     */
    mongodb = 4,
    /**
     * @generated from protobuf enum value: elastic = 5;
     */
    elastic = 5,
    /**
     * @generated from protobuf enum value: dynamodb = 6;
     */
    dynamodb = 6,
    /**
     * @generated from protobuf enum value: cassandra = 7;
     */
    cassandra = 7,
    /**
     * @generated from protobuf enum value: sqlserver = 8;
     */
    sqlserver = 8,
    /**
     * @generated from protobuf enum value: snowflake = 9;
     */
    snowflake = 9
}
/**
 * @generated from protobuf enum server.DesktopScheme
 */
export enum DesktopScheme {
    /**
     * @generated from protobuf enum value: desktop_unspecified = 0;
     */
    desktop_unspecified = 0,
    /**
     * @generated from protobuf enum value: rdp = 1;
     */
    rdp = 1,
    /**
     * @generated from protobuf enum value: vnc = 2;
     */
    vnc = 2
}
/**
 * @generated from protobuf enum server.ContainersScheme
 */
export enum ContainersScheme {
    /**
     * @generated from protobuf enum value: containers_unspecified = 0;
     */
    containers_unspecified = 0,
    /**
     * @generated from protobuf enum value: docker = 1;
     */
    docker = 1,
    /**
     * @generated from protobuf enum value: k8s = 2;
     */
    k8s = 2
}
/**
 * @generated from protobuf enum server.CloudsScheme
 */
export enum CloudsScheme {
    /**
     * @generated from protobuf enum value: clouds_unspecified = 0;
     */
    clouds_unspecified = 0,
    /**
     * @generated from protobuf enum value: aws = 1;
     */
    aws = 1,
    /**
     * @generated from protobuf enum value: google = 2;
     */
    google = 2,
    /**
     * @generated from protobuf enum value: azure = 3;
     */
    azure = 3,
    /**
     * @generated from protobuf enum value: do = 4;
     */
    do = 4,
    /**
     * @generated from protobuf enum value: hetzner = 5;
     */
    hetzner = 5
}
/**
 * @generated from protobuf enum server.SessionStatus
 */
export enum SessionStatus {
    /**
     * @generated from protobuf enum value: session_unspecified = 0;
     */
    session_unspecified = 0,
    /**
     * @generated from protobuf enum value: opened = 1;
     */
    opened = 1,
    /**
     * @generated from protobuf enum value: closed = 2;
     */
    closed = 2
}
/**
 * @generated from protobuf enum server.Type
 */
export enum Type {
    /**
     * @generated from protobuf enum value: type_unspecified = 0;
     */
    type_unspecified = 0,
    /**
     * @generated from protobuf enum value: healthcheck = 1;
     */
    healthcheck = 1,
    /**
     * @generated from protobuf enum value: shell = 2;
     */
    shell = 2,
    /**
     * @generated from protobuf enum value: bastion = 3;
     */
    bastion = 3,
    /**
     * @generated from protobuf enum value: invite = 4;
     */
    invite = 4
}
// @generated message type with reflection information, may provide speed optimized methods
class ListServers$Type extends MessageType<ListServers> {
    constructor() {
        super("server.ListServers", []);
    }
}
/**
 * @generated MessageType for protobuf message server.ListServers
 */
export const ListServers = new ListServers$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ListServers_Request$Type extends MessageType<ListServers_Request> {
    constructor() {
        super("server.ListServers.Request", [
            { no: 1, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "user_id", kind: "scalar", localName: "user_id", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "login", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "limit", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 5, name: "offset", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 6, name: "sort_by", kind: "scalar", localName: "sort_by", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message server.ListServers.Request
 */
export const ListServers_Request = new ListServers_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ListServers_Response$Type extends MessageType<ListServers_Response> {
    constructor() {
        super("server.ListServers.Response", [
            { no: 1, name: "total", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 2, name: "servers", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Server_Response }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message server.ListServers.Response
 */
export const ListServers_Response = new ListServers_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Server$Type extends MessageType<Server> {
    constructor() {
        super("server.Server", []);
    }
}
/**
 * @generated MessageType for protobuf message server.Server
 */
export const Server = new Server$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Server_Request$Type extends MessageType<Server_Request> {
    constructor() {
        super("server.Server.Request", [
            { no: 1, name: "user_id", kind: "scalar", localName: "user_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true }, ignoreEmpty: true } } },
            { no: 2, name: "server_id", kind: "scalar", localName: "server_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true }, ignoreEmpty: true } } },
            { no: 3, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message server.Server.Request
 */
export const Server_Request = new Server_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Server_Response$Type extends MessageType<Server_Response> {
    constructor() {
        super("server.Server.Response", [
            { no: 1, name: "server_id", kind: "scalar", localName: "server_id", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "access_id", kind: "scalar", localName: "access_id", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "project_login", kind: "scalar", localName: "project_login", T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "address", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 6, name: "port", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 7, name: "token", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 8, name: "login", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 9, name: "title", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 10, name: "audit", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 11, name: "online", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 12, name: "account_id", kind: "scalar", localName: "account_id", T: 9 /*ScalarType.STRING*/ },
            { no: 13, name: "auth", kind: "enum", T: () => ["server.Auth", Auth] },
            { no: 14, name: "scheme", kind: "enum", T: () => ["server.ServerScheme", ServerScheme] },
            { no: 15, name: "host_key", kind: "scalar", localName: "host_key", T: 12 /*ScalarType.BYTES*/ },
            { no: 16, name: "description", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 17, name: "active", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 18, name: "count_members", kind: "scalar", localName: "count_members", T: 5 /*ScalarType.INT32*/ },
            { no: 19, name: "locked_at", kind: "message", localName: "locked_at", T: () => Timestamp },
            { no: 20, name: "archived_at", kind: "message", localName: "archived_at", T: () => Timestamp },
            { no: 21, name: "updated_at", kind: "message", localName: "updated_at", T: () => Timestamp },
            { no: 22, name: "created_at", kind: "message", localName: "created_at", T: () => Timestamp }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message server.Server.Response
 */
export const Server_Response = new Server_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddServer$Type extends MessageType<AddServer> {
    constructor() {
        super("server.AddServer", []);
    }
}
/**
 * @generated MessageType for protobuf message server.AddServer
 */
export const AddServer = new AddServer$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddServer_Request$Type extends MessageType<AddServer_Request> {
    constructor() {
        super("server.AddServer.Request", [
            { no: 1, name: "user_id", kind: "scalar", localName: "user_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true }, ignoreEmpty: true } } },
            { no: 2, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 3, name: "address", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { address: true } } } },
            { no: 4, name: "port", kind: "scalar", T: 5 /*ScalarType.INT32*/, options: { "buf.validate.field": { int32: { lt: 65536, gte: 1 } } } },
            { no: 5, name: "title", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { minLen: "3", maxLen: "128" } } } },
            { no: 6, name: "scheme", kind: "enum", T: () => ["server.ServerScheme", ServerScheme], options: { "buf.validate.field": { enum: { definedOnly: true } } } },
            { no: 7, name: "audit", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 8, name: "active", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 9, name: "description", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 10, name: "login", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { minLen: "3", maxLen: "20", pattern: "^[a-z0-9]+$" } } } },
            { no: 11, name: "password", kind: "scalar", oneof: "access", T: 9 /*ScalarType.STRING*/ },
            { no: 12, name: "key", kind: "scalar", oneof: "access", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message server.AddServer.Request
 */
export const AddServer_Request = new AddServer_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddServer_Response$Type extends MessageType<AddServer_Response> {
    constructor() {
        super("server.AddServer.Response", [
            { no: 1, name: "server_id", kind: "scalar", localName: "server_id", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message server.AddServer.Response
 */
export const AddServer_Response = new AddServer_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateServer$Type extends MessageType<UpdateServer> {
    constructor() {
        super("server.UpdateServer", []);
    }
}
/**
 * @generated MessageType for protobuf message server.UpdateServer
 */
export const UpdateServer = new UpdateServer$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateServer_Request$Type extends MessageType<UpdateServer_Request> {
    constructor() {
        super("server.UpdateServer.Request", [
            { no: 1, name: "user_id", kind: "scalar", localName: "user_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true }, ignoreEmpty: true } } },
            { no: 2, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true }, ignoreEmpty: true } } },
            { no: 3, name: "server_id", kind: "scalar", localName: "server_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true }, ignoreEmpty: true } } },
            { no: 4, name: "info", kind: "message", oneof: "setting", T: () => UpdateServer_Info },
            { no: 5, name: "audit", kind: "scalar", oneof: "setting", T: 8 /*ScalarType.BOOL*/ },
            { no: 6, name: "active", kind: "scalar", oneof: "setting", T: 8 /*ScalarType.BOOL*/ },
            { no: 7, name: "online", kind: "scalar", oneof: "setting", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message server.UpdateServer.Request
 */
export const UpdateServer_Request = new UpdateServer_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateServer_Response$Type extends MessageType<UpdateServer_Response> {
    constructor() {
        super("server.UpdateServer.Response", [
            { no: 1, name: "updated_at", kind: "message", localName: "updated_at", T: () => Timestamp }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message server.UpdateServer.Response
 */
export const UpdateServer_Response = new UpdateServer_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateServer_Info$Type extends MessageType<UpdateServer_Info> {
    constructor() {
        super("server.UpdateServer.Info", [
            { no: 1, name: "address", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { address: true } } } },
            { no: 2, name: "port", kind: "scalar", T: 5 /*ScalarType.INT32*/, options: { "buf.validate.field": { int32: { lt: 65536, gte: 1 } } } },
            { no: 3, name: "login", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { minLen: "3", maxLen: "20", pattern: "^[a-z0-9]+$" } } } },
            { no: 4, name: "title", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { minLen: "3", maxLen: "128" } } } },
            { no: 5, name: "description", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message server.UpdateServer.Info
 */
export const UpdateServer_Info = new UpdateServer_Info$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DeleteServer$Type extends MessageType<DeleteServer> {
    constructor() {
        super("server.DeleteServer", []);
    }
}
/**
 * @generated MessageType for protobuf message server.DeleteServer
 */
export const DeleteServer = new DeleteServer$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DeleteServer_Request$Type extends MessageType<DeleteServer_Request> {
    constructor() {
        super("server.DeleteServer.Request", [
            { no: 1, name: "user_id", kind: "scalar", localName: "user_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true }, ignoreEmpty: true } } },
            { no: 2, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 3, name: "server_id", kind: "scalar", localName: "server_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message server.DeleteServer.Request
 */
export const DeleteServer_Request = new DeleteServer_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DeleteServer_Response$Type extends MessageType<DeleteServer_Response> {
    constructor() {
        super("server.DeleteServer.Response", []);
    }
}
/**
 * @generated MessageType for protobuf message server.DeleteServer.Response
 */
export const DeleteServer_Response = new DeleteServer_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ServerAccess$Type extends MessageType<ServerAccess> {
    constructor() {
        super("server.ServerAccess", []);
    }
}
/**
 * @generated MessageType for protobuf message server.ServerAccess
 */
export const ServerAccess = new ServerAccess$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ServerAccess_Request$Type extends MessageType<ServerAccess_Request> {
    constructor() {
        super("server.ServerAccess.Request", [
            { no: 1, name: "user_id", kind: "scalar", localName: "user_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true }, ignoreEmpty: true } } },
            { no: 2, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 3, name: "server_id", kind: "scalar", localName: "server_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message server.ServerAccess.Request
 */
export const ServerAccess_Request = new ServerAccess_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ServerAccess_Response$Type extends MessageType<ServerAccess_Response> {
    constructor() {
        super("server.ServerAccess.Response", [
            { no: 1, name: "auth", kind: "enum", T: () => ["server.Auth", Auth] },
            { no: 2, name: "login", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "password", kind: "scalar", oneof: "access", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "key", kind: "message", oneof: "access", T: () => ServerAccess_Key }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message server.ServerAccess.Response
 */
export const ServerAccess_Response = new ServerAccess_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ServerAccess_Key$Type extends MessageType<ServerAccess_Key> {
    constructor() {
        super("server.ServerAccess.Key", [
            { no: 1, name: "public", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "private", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "password", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "fingeprint", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message server.ServerAccess.Key
 */
export const ServerAccess_Key = new ServerAccess_Key$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateServerAccess$Type extends MessageType<UpdateServerAccess> {
    constructor() {
        super("server.UpdateServerAccess", []);
    }
}
/**
 * @generated MessageType for protobuf message server.UpdateServerAccess
 */
export const UpdateServerAccess = new UpdateServerAccess$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateServerAccess_Request$Type extends MessageType<UpdateServerAccess_Request> {
    constructor() {
        super("server.UpdateServerAccess.Request", [
            { no: 1, name: "user_id", kind: "scalar", localName: "user_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true }, ignoreEmpty: true } } },
            { no: 2, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 3, name: "server_id", kind: "scalar", localName: "server_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 5, name: "password", kind: "scalar", oneof: "access", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { minLen: "8", maxLen: "32" } } } },
            { no: 6, name: "key", kind: "scalar", oneof: "access", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true }, ignoreEmpty: true } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message server.UpdateServerAccess.Request
 */
export const UpdateServerAccess_Request = new UpdateServerAccess_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateServerAccess_Response$Type extends MessageType<UpdateServerAccess_Response> {
    constructor() {
        super("server.UpdateServerAccess.Response", []);
    }
}
/**
 * @generated MessageType for protobuf message server.UpdateServerAccess.Response
 */
export const UpdateServerAccess_Response = new UpdateServerAccess_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ServerActivity$Type extends MessageType<ServerActivity> {
    constructor() {
        super("server.ServerActivity", []);
    }
}
/**
 * @generated MessageType for protobuf message server.ServerActivity
 */
export const ServerActivity = new ServerActivity$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ServerActivity_Request$Type extends MessageType<ServerActivity_Request> {
    constructor() {
        super("server.ServerActivity.Request", [
            { no: 1, name: "user_id", kind: "scalar", localName: "user_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true }, ignoreEmpty: true } } },
            { no: 2, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 3, name: "server_id", kind: "scalar", localName: "server_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message server.ServerActivity.Request
 */
export const ServerActivity_Request = new ServerActivity_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ServerActivity_Response$Type extends MessageType<ServerActivity_Response> {
    constructor() {
        super("server.ServerActivity.Response", [
            { no: 1, name: "monday", kind: "scalar", repeat: 1 /*RepeatType.PACKED*/, T: 5 /*ScalarType.INT32*/ },
            { no: 2, name: "tuesday", kind: "scalar", repeat: 1 /*RepeatType.PACKED*/, T: 5 /*ScalarType.INT32*/ },
            { no: 3, name: "wednesday", kind: "scalar", repeat: 1 /*RepeatType.PACKED*/, T: 5 /*ScalarType.INT32*/ },
            { no: 4, name: "thursday", kind: "scalar", repeat: 1 /*RepeatType.PACKED*/, T: 5 /*ScalarType.INT32*/ },
            { no: 5, name: "friday", kind: "scalar", repeat: 1 /*RepeatType.PACKED*/, T: 5 /*ScalarType.INT32*/ },
            { no: 6, name: "saturday", kind: "scalar", repeat: 1 /*RepeatType.PACKED*/, T: 5 /*ScalarType.INT32*/ },
            { no: 7, name: "sunday", kind: "scalar", repeat: 1 /*RepeatType.PACKED*/, T: 5 /*ScalarType.INT32*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message server.ServerActivity.Response
 */
export const ServerActivity_Response = new ServerActivity_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateServerActivity$Type extends MessageType<UpdateServerActivity> {
    constructor() {
        super("server.UpdateServerActivity", []);
    }
}
/**
 * @generated MessageType for protobuf message server.UpdateServerActivity
 */
export const UpdateServerActivity = new UpdateServerActivity$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateServerActivity_Request$Type extends MessageType<UpdateServerActivity_Request> {
    constructor() {
        super("server.UpdateServerActivity.Request", [
            { no: 1, name: "user_id", kind: "scalar", localName: "user_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true }, ignoreEmpty: true } } },
            { no: 2, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 3, name: "server_id", kind: "scalar", localName: "server_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 4, name: "activity", kind: "message", T: () => ServerActivity_Response }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message server.UpdateServerActivity.Request
 */
export const UpdateServerActivity_Request = new UpdateServerActivity_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateServerActivity_Response$Type extends MessageType<UpdateServerActivity_Response> {
    constructor() {
        super("server.UpdateServerActivity.Response", []);
    }
}
/**
 * @generated MessageType for protobuf message server.UpdateServerActivity.Response
 */
export const UpdateServerActivity_Response = new UpdateServerActivity_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateHostKey$Type extends MessageType<UpdateHostKey> {
    constructor() {
        super("server.UpdateHostKey", []);
    }
}
/**
 * @generated MessageType for protobuf message server.UpdateHostKey
 */
export const UpdateHostKey = new UpdateHostKey$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateHostKey_Request$Type extends MessageType<UpdateHostKey_Request> {
    constructor() {
        super("server.UpdateHostKey.Request", [
            { no: 1, name: "server_id", kind: "scalar", localName: "server_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 2, name: "hostkey", kind: "scalar", T: 12 /*ScalarType.BYTES*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message server.UpdateHostKey.Request
 */
export const UpdateHostKey_Request = new UpdateHostKey_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateHostKey_Response$Type extends MessageType<UpdateHostKey_Response> {
    constructor() {
        super("server.UpdateHostKey.Response", []);
    }
}
/**
 * @generated MessageType for protobuf message server.UpdateHostKey.Response
 */
export const UpdateHostKey_Response = new UpdateHostKey_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddSession$Type extends MessageType<AddSession> {
    constructor() {
        super("server.AddSession", []);
    }
}
/**
 * @generated MessageType for protobuf message server.AddSession
 */
export const AddSession = new AddSession$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddSession_Request$Type extends MessageType<AddSession_Request> {
    constructor() {
        super("server.AddSession.Request", [
            { no: 1, name: "account_id", kind: "scalar", localName: "account_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 2, name: "status", kind: "enum", T: () => ["server.SessionStatus", SessionStatus] },
            { no: 3, name: "created_at", kind: "message", localName: "created_at", T: () => Timestamp },
            { no: 4, name: "message", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message server.AddSession.Request
 */
export const AddSession_Request = new AddSession_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddSession_Response$Type extends MessageType<AddSession_Response> {
    constructor() {
        super("server.AddSession.Response", [
            { no: 1, name: "session_id", kind: "scalar", localName: "session_id", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message server.AddSession.Response
 */
export const AddSession_Response = new AddSession_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ServerNameByID$Type extends MessageType<ServerNameByID> {
    constructor() {
        super("server.ServerNameByID", []);
    }
}
/**
 * @generated MessageType for protobuf message server.ServerNameByID
 */
export const ServerNameByID = new ServerNameByID$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ServerNameByID_Request$Type extends MessageType<ServerNameByID_Request> {
    constructor() {
        super("server.ServerNameByID.Request", [
            { no: 1, name: "user_id", kind: "scalar", localName: "user_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true }, ignoreEmpty: true } } },
            { no: 2, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 3, name: "server_id", kind: "scalar", localName: "server_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message server.ServerNameByID.Request
 */
export const ServerNameByID_Request = new ServerNameByID_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ServerNameByID_Response$Type extends MessageType<ServerNameByID_Response> {
    constructor() {
        super("server.ServerNameByID.Response", [
            { no: 1, name: "server_name", kind: "scalar", localName: "server_name", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message server.ServerNameByID.Response
 */
export const ServerNameByID_Response = new ServerNameByID_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ListShareServers$Type extends MessageType<ListShareServers> {
    constructor() {
        super("server.ListShareServers", []);
    }
}
/**
 * @generated MessageType for protobuf message server.ListShareServers
 */
export const ListShareServers = new ListShareServers$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ListShareServers_Request$Type extends MessageType<ListShareServers_Request> {
    constructor() {
        super("server.ListShareServers.Request", [
            { no: 1, name: "limit", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 2, name: "offset", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 3, name: "sort_by", kind: "scalar", localName: "sort_by", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "user_id", kind: "scalar", localName: "user_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true }, ignoreEmpty: true } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message server.ListShareServers.Request
 */
export const ListShareServers_Request = new ListShareServers_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ListShareServers_Response$Type extends MessageType<ListShareServers_Response> {
    constructor() {
        super("server.ListShareServers.Response", [
            { no: 1, name: "total", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 2, name: "servers", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => ListShareServers_Response_SharedServer }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message server.ListShareServers.Response
 */
export const ListShareServers_Response = new ListShareServers_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ListShareServers_Response_SharedServer$Type extends MessageType<ListShareServers_Response_SharedServer> {
    constructor() {
        super("server.ListShareServers.Response.SharedServer", [
            { no: 1, name: "user_login", kind: "scalar", localName: "user_login", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "project_login", kind: "scalar", localName: "project_login", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "server_id", kind: "scalar", localName: "server_id", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "server_token", kind: "scalar", localName: "server_token", T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "server_online", kind: "scalar", localName: "server_online", T: 8 /*ScalarType.BOOL*/ },
            { no: 6, name: "server_title", kind: "scalar", localName: "server_title", T: 9 /*ScalarType.STRING*/ },
            { no: 7, name: "server_description", kind: "scalar", localName: "server_description", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message server.ListShareServers.Response.SharedServer
 */
export const ListShareServers_Response_SharedServer = new ListShareServers_Response_SharedServer$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddShareServer$Type extends MessageType<AddShareServer> {
    constructor() {
        super("server.AddShareServer", []);
    }
}
/**
 * @generated MessageType for protobuf message server.AddShareServer
 */
export const AddShareServer = new AddShareServer$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddShareServer_Request$Type extends MessageType<AddShareServer_Request> {
    constructor() {
        super("server.AddShareServer.Request", [
            { no: 1, name: "user_id", kind: "scalar", localName: "user_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true }, ignoreEmpty: true } } },
            { no: 2, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 3, name: "server_id", kind: "scalar", localName: "server_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message server.AddShareServer.Request
 */
export const AddShareServer_Request = new AddShareServer_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddShareServer_Response$Type extends MessageType<AddShareServer_Response> {
    constructor() {
        super("server.AddShareServer.Response", []);
    }
}
/**
 * @generated MessageType for protobuf message server.AddShareServer.Response
 */
export const AddShareServer_Response = new AddShareServer_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateShareServer$Type extends MessageType<UpdateShareServer> {
    constructor() {
        super("server.UpdateShareServer", []);
    }
}
/**
 * @generated MessageType for protobuf message server.UpdateShareServer
 */
export const UpdateShareServer = new UpdateShareServer$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateShareServer_Request$Type extends MessageType<UpdateShareServer_Request> {
    constructor() {
        super("server.UpdateShareServer.Request", [
            { no: 1, name: "user_id", kind: "scalar", localName: "user_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true }, ignoreEmpty: true } } },
            { no: 2, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 3, name: "share_id", kind: "scalar", localName: "share_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message server.UpdateShareServer.Request
 */
export const UpdateShareServer_Request = new UpdateShareServer_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateShareServer_Response$Type extends MessageType<UpdateShareServer_Response> {
    constructor() {
        super("server.UpdateShareServer.Response", []);
    }
}
/**
 * @generated MessageType for protobuf message server.UpdateShareServer.Response
 */
export const UpdateShareServer_Response = new UpdateShareServer_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DeleteShareServer$Type extends MessageType<DeleteShareServer> {
    constructor() {
        super("server.DeleteShareServer", []);
    }
}
/**
 * @generated MessageType for protobuf message server.DeleteShareServer
 */
export const DeleteShareServer = new DeleteShareServer$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DeleteShareServer_Request$Type extends MessageType<DeleteShareServer_Request> {
    constructor() {
        super("server.DeleteShareServer.Request", [
            { no: 1, name: "user_id", kind: "scalar", localName: "user_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true }, ignoreEmpty: true } } },
            { no: 2, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 3, name: "share_id", kind: "scalar", localName: "share_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message server.DeleteShareServer.Request
 */
export const DeleteShareServer_Request = new DeleteShareServer_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DeleteShareServer_Response$Type extends MessageType<DeleteShareServer_Response> {
    constructor() {
        super("server.DeleteShareServer.Response", []);
    }
}
/**
 * @generated MessageType for protobuf message server.DeleteShareServer.Response
 */
export const DeleteShareServer_Response = new DeleteShareServer_Response$Type();
/**
 * @generated ServiceType for protobuf service server.ServerHandlers
 */
export const ServerHandlers = new ServiceType("server.ServerHandlers", [
    { name: "ListServers", options: {}, I: ListServers_Request, O: ListServers_Response },
    { name: "Server", options: {}, I: Server_Request, O: Server_Response },
    { name: "AddServer", options: {}, I: AddServer_Request, O: AddServer_Response },
    { name: "UpdateServer", options: {}, I: UpdateServer_Request, O: UpdateServer_Response },
    { name: "DeleteServer", options: {}, I: DeleteServer_Request, O: DeleteServer_Response },
    { name: "ServerAccess", options: {}, I: ServerAccess_Request, O: ServerAccess_Response },
    { name: "UpdateServerAccess", options: {}, I: UpdateServerAccess_Request, O: UpdateServerAccess_Response },
    { name: "ServerActivity", options: {}, I: ServerActivity_Request, O: ServerActivity_Response },
    { name: "UpdateServerActivity", options: {}, I: UpdateServerActivity_Request, O: UpdateServerActivity_Response },
    { name: "ListShareServers", options: {}, I: ListShareServers_Request, O: ListShareServers_Response },
    { name: "AddShareServer", options: {}, I: AddShareServer_Request, O: AddShareServer_Response },
    { name: "UpdateShareServer", options: {}, I: UpdateShareServer_Request, O: UpdateShareServer_Response },
    { name: "DeleteShareServer", options: {}, I: DeleteShareServer_Request, O: DeleteShareServer_Response },
    { name: "UpdateHostKey", options: {}, I: UpdateHostKey_Request, O: UpdateHostKey_Response },
    { name: "AddSession", options: {}, I: AddSession_Request, O: AddSession_Response },
    { name: "ServerNameByID", options: {}, I: ServerNameByID_Request, O: ServerNameByID_Response }
]);
