// @generated from protobuf file "access.proto" (package "access", syntax proto3)
// tslint:disable
// @ts-nocheck
import { MessageType } from "@protobuf-ts/runtime";
import { Auth_API } from "./auth";
import { Auth_MTLS } from "./auth";
import { Auth_Agent } from "./auth";
import { Auth_Key } from "./auth";
import { Auth_Password } from "./auth";
/**
 * -----------------------------------
 *
 * @generated from protobuf message access.AccessScheme
 */
export interface AccessScheme {
    /**
     * @generated from protobuf oneof: access
     */
    access: {
        oneofKind: "server_tcp";
        /**
         * @generated from protobuf field: access.AccessScheme.Server.TCP server_tcp = 100
         */
        server_tcp: AccessScheme_Server_TCP;
    } | {
        oneofKind: "server_udp";
        /**
         * @generated from protobuf field: access.AccessScheme.Server.UDP server_udp = 101
         */
        server_udp: AccessScheme_Server_UDP;
    } | {
        oneofKind: "server_ssh";
        /**
         * @generated from protobuf field: access.AccessScheme.Server.SSH server_ssh = 102
         */
        server_ssh: AccessScheme_Server_SSH;
    } | {
        oneofKind: "server_telnet";
        /**
         * @generated from protobuf field: access.AccessScheme.Server.Telnet server_telnet = 103
         */
        server_telnet: AccessScheme_Server_Telnet;
    } | {
        oneofKind: "database_mysql";
        /**
         * @generated from protobuf field: access.AccessScheme.Database.MySQL database_mysql = 110
         */
        database_mysql: AccessScheme_Database_MySQL;
    } | {
        oneofKind: "database_postgres";
        /**
         * @generated from protobuf field: access.AccessScheme.Database.Postgres database_postgres = 111
         */
        database_postgres: AccessScheme_Database_Postgres;
    } | {
        oneofKind: "database_redis";
        /**
         * @generated from protobuf field: access.AccessScheme.Database.Redis database_redis = 112
         */
        database_redis: AccessScheme_Database_Redis;
    } | {
        oneofKind: "database_mongodb";
        /**
         * @generated from protobuf field: access.AccessScheme.Database.MongoDB database_mongodb = 113
         */
        database_mongodb: AccessScheme_Database_MongoDB;
    } | {
        oneofKind: "database_elastic";
        /**
         * @generated from protobuf field: access.AccessScheme.Database.Elastic database_elastic = 114
         */
        database_elastic: AccessScheme_Database_Elastic;
    } | {
        oneofKind: "database_dynamodb";
        /**
         * @generated from protobuf field: access.AccessScheme.Database.DynamoDB database_dynamodb = 115
         */
        database_dynamodb: AccessScheme_Database_DynamoDB;
    } | {
        oneofKind: "database_cassandra";
        /**
         * @generated from protobuf field: access.AccessScheme.Database.Cassandra database_cassandra = 116
         */
        database_cassandra: AccessScheme_Database_Cassandra;
    } | {
        oneofKind: "database_sqlserver";
        /**
         * @generated from protobuf field: access.AccessScheme.Database.SQLServer database_sqlserver = 117
         */
        database_sqlserver: AccessScheme_Database_SQLServer;
    } | {
        oneofKind: "database_snowflake";
        /**
         * @generated from protobuf field: access.AccessScheme.Database.Snowflake database_snowflake = 118
         */
        database_snowflake: AccessScheme_Database_Snowflake;
    } | {
        oneofKind: "desktop_rdp";
        /**
         * @generated from protobuf field: access.AccessScheme.Desktop.RDP desktop_rdp = 130
         */
        desktop_rdp: AccessScheme_Desktop_RDP;
    } | {
        oneofKind: "desktop_vnc";
        /**
         * @generated from protobuf field: access.AccessScheme.Desktop.VNC desktop_vnc = 131
         */
        desktop_vnc: AccessScheme_Desktop_VNC;
    } | {
        oneofKind: "container_docker";
        /**
         * @generated from protobuf field: access.AccessScheme.Container.Docker container_docker = 140
         */
        container_docker: AccessScheme_Container_Docker;
    } | {
        oneofKind: "container_k8s";
        /**
         * @generated from protobuf field: access.AccessScheme.Container.K8S container_k8s = 141
         */
        container_k8s: AccessScheme_Container_K8S;
    } | {
        oneofKind: "cloud_aws";
        /**
         * @generated from protobuf field: access.AccessScheme.Cloud.AWS cloud_aws = 150
         */
        cloud_aws: AccessScheme_Cloud_AWS;
    } | {
        oneofKind: "cloud_gcp";
        /**
         * @generated from protobuf field: access.AccessScheme.Cloud.GCP cloud_gcp = 151
         */
        cloud_gcp: AccessScheme_Cloud_GCP;
    } | {
        oneofKind: "cloud_azure";
        /**
         * @generated from protobuf field: access.AccessScheme.Cloud.Azure cloud_azure = 152
         */
        cloud_azure: AccessScheme_Cloud_Azure;
    } | {
        oneofKind: "cloud_do";
        /**
         * @generated from protobuf field: access.AccessScheme.Cloud.DO cloud_do = 153
         */
        cloud_do: AccessScheme_Cloud_DO;
    } | {
        oneofKind: "cloud_hetzner";
        /**
         * @generated from protobuf field: access.AccessScheme.Cloud.Hetzner cloud_hetzner = 154
         */
        cloud_hetzner: AccessScheme_Cloud_Hetzner;
    } | {
        oneofKind: "application_site";
        /**
         * @generated from protobuf field: access.AccessScheme.Application.Site application_site = 170
         */
        application_site: AccessScheme_Application_Site;
    } | {
        oneofKind: undefined;
    };
}
/**
 * @generated from protobuf message access.AccessScheme.Server
 */
export interface AccessScheme_Server {
}
/**
 * @generated from protobuf message access.AccessScheme.Server.TCP
 */
export interface AccessScheme_Server_TCP {
    /**
     * @generated from protobuf field: string alias = 1
     */
    alias: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string address = 2
     */
    address: string;
    /**
     * @generated from protobuf field: int32 port = 3
     */
    port: number;
}
/**
 * @generated from protobuf message access.AccessScheme.Server.UDP
 */
export interface AccessScheme_Server_UDP {
    /**
     * @generated from protobuf field: string alias = 1
     */
    alias: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string address = 2
     */
    address: string;
    /**
     * @generated from protobuf field: int32 port = 3
     */
    port: number;
}
/**
 * @generated from protobuf message access.AccessScheme.Server.SSH
 */
export interface AccessScheme_Server_SSH {
    /**
     * @generated from protobuf field: string alias = 1
     */
    alias: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string address = 2
     */
    address: string;
    /**
     * @generated from protobuf field: int32 port = 3
     */
    port: number;
    /**
     * @generated from protobuf oneof: access
     */
    access: {
        oneofKind: "password";
        /**
         * @generated from protobuf field: auth.Auth.Password password = 4
         */
        password: Auth_Password;
    } | {
        oneofKind: "key";
        /**
         * @generated from protobuf field: auth.Auth.Key key = 5
         */
        key: Auth_Key;
    } | {
        oneofKind: "agent";
        /**
         * @generated from protobuf field: auth.Auth.Agent agent = 6
         */
        agent: Auth_Agent;
    } | {
        oneofKind: undefined;
    };
}
/**
 * @generated from protobuf message access.AccessScheme.Server.Telnet
 */
export interface AccessScheme_Server_Telnet {
    /**
     * @generated from protobuf field: string alias = 1
     */
    alias: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string address = 2
     */
    address: string;
    /**
     * @generated from protobuf field: int32 port = 3
     */
    port: number;
    /**
     * @generated from protobuf field: auth.Auth.Password access = 4
     */
    access?: Auth_Password;
}
/**
 * @generated from protobuf message access.AccessScheme.Database
 */
export interface AccessScheme_Database {
}
/**
 * @generated from protobuf message access.AccessScheme.Database.MySQL
 */
export interface AccessScheme_Database_MySQL {
    /**
     * @generated from protobuf field: string alias = 1
     */
    alias: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string address = 2
     */
    address: string;
    /**
     * @generated from protobuf field: int32 port = 3
     */
    port: number;
    /**
     * @generated from protobuf field: string database_name = 4
     */
    database_name: string;
    /**
     * @generated from protobuf field: auth.Auth.Password access = 5
     */
    access?: Auth_Password;
    /**
     * @generated from protobuf field: auth.Auth.MTLS mtls = 6
     */
    mtls?: Auth_MTLS;
}
/**
 * @generated from protobuf message access.AccessScheme.Database.Postgres
 */
export interface AccessScheme_Database_Postgres {
    /**
     * @generated from protobuf field: string alias = 1
     */
    alias: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string address = 2
     */
    address: string;
    /**
     * @generated from protobuf field: int32 port = 3
     */
    port: number;
    /**
     * @generated from protobuf field: string database_name = 4
     */
    database_name: string;
    /**
     * @generated from protobuf field: auth.Auth.Password access = 5
     */
    access?: Auth_Password;
    /**
     * @generated from protobuf field: auth.Auth.MTLS mtls = 6
     */
    mtls?: Auth_MTLS;
    /**
     * @generated from protobuf field: string server_name_mtls = 7
     */
    server_name_mtls: string;
}
/**
 * @generated from protobuf message access.AccessScheme.Database.Redis
 */
export interface AccessScheme_Database_Redis {
    /**
     * @generated from protobuf field: string alias = 1
     */
    alias: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string address = 2
     */
    address: string;
    /**
     * @generated from protobuf field: int32 port = 3
     */
    port: number;
    /**
     * @generated from protobuf field: auth.Auth.Password access = 4
     */
    access?: Auth_Password;
    /**
     * @generated from protobuf field: bool tls_required = 5
     */
    tls_required: boolean;
}
/**
 * @generated from protobuf message access.AccessScheme.Database.MongoDB
 */
export interface AccessScheme_Database_MongoDB {
    /**
     * @generated from protobuf field: string alias = 1
     */
    alias: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string address = 2
     */
    address: string;
    /**
     * @generated from protobuf field: int32 port = 3
     */
    port: number;
    /**
     * @generated from protobuf field: string database_name = 4
     */
    database_name: string;
    /**
     * @generated from protobuf field: auth.Auth.Password access = 5
     */
    access?: Auth_Password;
    /**
     * @generated from protobuf field: bool tls_required = 6
     */
    tls_required: boolean;
    /**
     * @generated from protobuf field: bool replica_connect = 7
     */
    replica_connect: boolean;
}
/**
 * @generated from protobuf message access.AccessScheme.Database.Elastic
 */
export interface AccessScheme_Database_Elastic {
    /**
     * @generated from protobuf field: string alias = 1
     */
    alias: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string address = 2
     */
    address: string;
    /**
     * @generated from protobuf field: int32 port = 3
     */
    port: number;
    /**
     * @generated from protobuf field: auth.Auth.Password access = 4
     */
    access?: Auth_Password;
    /**
     * @generated from protobuf field: bool tls_required = 5
     */
    tls_required: boolean;
}
/**
 * @generated from protobuf message access.AccessScheme.Database.DynamoDB
 */
export interface AccessScheme_Database_DynamoDB {
    /**
     * @generated from protobuf field: string alias = 1
     */
    alias: string; // @gotags: json:"-"
    /**
     * string address = 2 [(buf.validate.field).string.address = true, (buf.validate.field).ignore = IGNORE_IF_ZERO_VALUE];
     * int32 port = 3 [(buf.validate.field).int32 = { gte: 1 lt: 65536 }, (buf.validate.field).ignore = IGNORE_IF_ZERO_VALUE];
     *
     * @generated from protobuf field: string region = 4
     */
    region: string;
    /**
     * @generated from protobuf field: auth.Auth.API api = 5
     */
    api?: Auth_API;
}
/**
 * @generated from protobuf message access.AccessScheme.Database.Cassandra
 */
export interface AccessScheme_Database_Cassandra {
    /**
     * @generated from protobuf field: string alias = 1
     */
    alias: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string address = 2
     */
    address: string;
    /**
     * @generated from protobuf field: int32 port = 3
     */
    port: number;
    /**
     * @generated from protobuf field: auth.Auth.Password access = 4
     */
    access?: Auth_Password;
    /**
     * @generated from protobuf field: bool tls_required = 5
     */
    tls_required: boolean;
}
/**
 * @generated from protobuf message access.AccessScheme.Database.SQLServer
 */
export interface AccessScheme_Database_SQLServer {
    /**
     * @generated from protobuf field: string alias = 1
     */
    alias: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string address = 2
     */
    address: string;
    /**
     * @generated from protobuf field: int32 port = 3
     */
    port: number;
    /**
     * @generated from protobuf field: auth.Auth.Password access = 4
     */
    access?: Auth_Password;
    /**
     * @generated from protobuf field: string schema = 5
     */
    schema: string;
    /**
     * @generated from protobuf field: bool default_database = 6
     */
    default_database: boolean;
}
/**
 * @generated from protobuf message access.AccessScheme.Database.Snowflake
 */
export interface AccessScheme_Database_Snowflake {
    /**
     * @generated from protobuf field: string alias = 1
     */
    alias: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string region = 2
     */
    region: string;
    /**
     * @generated from protobuf field: auth.Auth.Password access = 3
     */
    access?: Auth_Password;
    /**
     * @generated from protobuf field: string schema = 4
     */
    schema: string;
}
/**
 * @generated from protobuf message access.AccessScheme.Desktop
 */
export interface AccessScheme_Desktop {
}
/**
 * @generated from protobuf message access.AccessScheme.Desktop.RDP
 */
export interface AccessScheme_Desktop_RDP {
    /**
     * @generated from protobuf field: string alias = 1
     */
    alias: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string address = 2
     */
    address: string;
    /**
     * @generated from protobuf field: int32 port = 3
     */
    port: number;
    /**
     * @generated from protobuf field: auth.Auth.Password access = 4
     */
    access?: Auth_Password;
}
/**
 * @generated from protobuf message access.AccessScheme.Desktop.VNC
 */
export interface AccessScheme_Desktop_VNC {
    /**
     * @generated from protobuf field: string alias = 1
     */
    alias: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string address = 2
     */
    address: string;
    /**
     * @generated from protobuf field: int32 port = 3
     */
    port: number;
    /**
     * @generated from protobuf field: auth.Auth.Password access = 4
     */
    access?: Auth_Password;
}
/**
 * @generated from protobuf message access.AccessScheme.Container
 */
export interface AccessScheme_Container {
}
/**
 * @generated from protobuf message access.AccessScheme.Container.Docker
 */
export interface AccessScheme_Container_Docker {
    /**
     * @generated from protobuf field: string alias = 1
     */
    alias: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string address = 2
     */
    address: string;
    /**
     * @generated from protobuf field: int32 port = 3
     */
    port: number;
    /**
     * @generated from protobuf field: auth.Auth.MTLS mtls = 4
     */
    mtls?: Auth_MTLS;
}
/**
 * @generated from protobuf message access.AccessScheme.Container.K8S
 */
export interface AccessScheme_Container_K8S {
    /**
     * @generated from protobuf field: string alias = 1
     */
    alias: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string address = 2
     */
    address: string;
    /**
     * @generated from protobuf field: int32 port = 3
     */
    port: number;
    /**
     * @generated from protobuf field: auth.Auth.MTLS mtls = 4
     */
    mtls?: Auth_MTLS;
    /**
     * @generated from protobuf field: string healthcheck_namespace = 5
     */
    healthcheck_namespace: string;
}
/**
 * @generated from protobuf message access.AccessScheme.Cloud
 */
export interface AccessScheme_Cloud {
}
/**
 * @generated from protobuf message access.AccessScheme.Cloud.AWS
 */
export interface AccessScheme_Cloud_AWS {
    /**
     * @generated from protobuf field: string alias = 1
     */
    alias: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: auth.Auth.API access = 2
     */
    access?: Auth_API;
    /**
     * @generated from protobuf field: string healthcheck_region = 3
     */
    healthcheck_region: string;
}
/**
 * @generated from protobuf message access.AccessScheme.Cloud.GCP
 */
export interface AccessScheme_Cloud_GCP {
    /**
     * @generated from protobuf field: string alias = 1
     */
    alias: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string service_account_keyfile = 2
     */
    service_account_keyfile: string;
    /**
     * @generated from protobuf field: string scopes = 3
     */
    scopes: string;
}
/**
 * @generated from protobuf message access.AccessScheme.Cloud.Azure
 */
export interface AccessScheme_Cloud_Azure {
    /**
     * @generated from protobuf field: string alias = 1
     */
    alias: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string app_id = 2
     */
    app_id: string;
    /**
     * @generated from protobuf field: string tenant = 3
     */
    tenant: string;
    /**
     * @generated from protobuf field: string password = 4
     */
    password: string;
    /**
     * @generated from protobuf field: string certificate = 5
     */
    certificate: string;
}
/**
 * @generated from protobuf message access.AccessScheme.Cloud.DO
 */
export interface AccessScheme_Cloud_DO {
    /**
     * @generated from protobuf field: string alias = 1
     */
    alias: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: auth.Auth.API access = 2
     */
    access?: Auth_API;
}
/**
 * @generated from protobuf message access.AccessScheme.Cloud.Hetzner
 */
export interface AccessScheme_Cloud_Hetzner {
    /**
     * @generated from protobuf field: string alias = 1
     */
    alias: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: auth.Auth.API access = 2
     */
    access?: Auth_API;
}
/**
 * @generated from protobuf message access.AccessScheme.Application
 */
export interface AccessScheme_Application {
}
/**
 * @generated from protobuf message access.AccessScheme.Application.Site
 */
export interface AccessScheme_Application_Site {
    /**
     * @generated from protobuf field: string alias = 1
     */
    alias: string; // @gotags: json:"-"
}
/**
 * -----------------------------------
 * scheme description section
 *
 * @generated from protobuf enum access.SchemeType
 */
export enum SchemeType {
    /**
     * @generated from protobuf enum value: scheme_unspecified = 0;
     */
    scheme_unspecified = 0,
    /**
     * @generated from protobuf enum value: server = 100;
     */
    server = 100,
    /**
     * @generated from protobuf enum value: server_tcp = 101;
     */
    server_tcp = 101,
    /**
     * @generated from protobuf enum value: server_udp = 102;
     */
    server_udp = 102,
    /**
     * @generated from protobuf enum value: server_ssh = 103;
     */
    server_ssh = 103,
    /**
     * @generated from protobuf enum value: server_telnet = 104;
     */
    server_telnet = 104,
    /**
     * @generated from protobuf enum value: database = 200;
     */
    database = 200,
    /**
     * @generated from protobuf enum value: database_mysql = 201;
     */
    database_mysql = 201,
    /**
     * @generated from protobuf enum value: database_postgres = 202;
     */
    database_postgres = 202,
    /**
     * @generated from protobuf enum value: database_redis = 203;
     */
    database_redis = 203,
    /**
     * @generated from protobuf enum value: database_mongodb = 204;
     */
    database_mongodb = 204,
    /**
     * @generated from protobuf enum value: database_elastic = 205;
     */
    database_elastic = 205,
    /**
     * @generated from protobuf enum value: database_dynamodb = 206;
     */
    database_dynamodb = 206,
    /**
     * @generated from protobuf enum value: database_cassandra = 207;
     */
    database_cassandra = 207,
    /**
     * @generated from protobuf enum value: database_sqlserver = 208;
     */
    database_sqlserver = 208,
    /**
     * @generated from protobuf enum value: database_snowflake = 209;
     */
    database_snowflake = 209,
    /**
     * @generated from protobuf enum value: desktop = 300;
     */
    desktop = 300,
    /**
     * @generated from protobuf enum value: desktop_rdp = 301;
     */
    desktop_rdp = 301,
    /**
     * @generated from protobuf enum value: desktop_vnc = 302;
     */
    desktop_vnc = 302,
    /**
     * @generated from protobuf enum value: container = 400;
     */
    container = 400,
    /**
     * @generated from protobuf enum value: container_docker = 401;
     */
    container_docker = 401,
    /**
     * @generated from protobuf enum value: container_k8s = 402;
     */
    container_k8s = 402,
    /**
     * @generated from protobuf enum value: cloud = 500;
     */
    cloud = 500,
    /**
     * @generated from protobuf enum value: cloud_aws = 501;
     */
    cloud_aws = 501,
    /**
     * @generated from protobuf enum value: cloud_gcp = 502;
     */
    cloud_gcp = 502,
    /**
     * @generated from protobuf enum value: cloud_azure = 503;
     */
    cloud_azure = 503,
    /**
     * @generated from protobuf enum value: cloud_do = 504;
     */
    cloud_do = 504,
    /**
     * @generated from protobuf enum value: cloud_hetzner = 505;
     */
    cloud_hetzner = 505,
    /**
     * @generated from protobuf enum value: application = 600;
     */
    application = 600,
    /**
     * @generated from protobuf enum value: application_site = 601;
     */
    application_site = 601
}
// @generated message type with reflection information, may provide speed optimized methods
class AccessScheme$Type extends MessageType<AccessScheme> {
    constructor() {
        super("access.AccessScheme", [
            { no: 100, name: "server_tcp", kind: "message", localName: "server_tcp", oneof: "access", T: () => AccessScheme_Server_TCP },
            { no: 101, name: "server_udp", kind: "message", localName: "server_udp", oneof: "access", T: () => AccessScheme_Server_UDP },
            { no: 102, name: "server_ssh", kind: "message", localName: "server_ssh", oneof: "access", T: () => AccessScheme_Server_SSH },
            { no: 103, name: "server_telnet", kind: "message", localName: "server_telnet", oneof: "access", T: () => AccessScheme_Server_Telnet },
            { no: 110, name: "database_mysql", kind: "message", localName: "database_mysql", oneof: "access", T: () => AccessScheme_Database_MySQL },
            { no: 111, name: "database_postgres", kind: "message", localName: "database_postgres", oneof: "access", T: () => AccessScheme_Database_Postgres },
            { no: 112, name: "database_redis", kind: "message", localName: "database_redis", oneof: "access", T: () => AccessScheme_Database_Redis },
            { no: 113, name: "database_mongodb", kind: "message", localName: "database_mongodb", oneof: "access", T: () => AccessScheme_Database_MongoDB },
            { no: 114, name: "database_elastic", kind: "message", localName: "database_elastic", oneof: "access", T: () => AccessScheme_Database_Elastic },
            { no: 115, name: "database_dynamodb", kind: "message", localName: "database_dynamodb", oneof: "access", T: () => AccessScheme_Database_DynamoDB },
            { no: 116, name: "database_cassandra", kind: "message", localName: "database_cassandra", oneof: "access", T: () => AccessScheme_Database_Cassandra },
            { no: 117, name: "database_sqlserver", kind: "message", localName: "database_sqlserver", oneof: "access", T: () => AccessScheme_Database_SQLServer },
            { no: 118, name: "database_snowflake", kind: "message", localName: "database_snowflake", oneof: "access", T: () => AccessScheme_Database_Snowflake },
            { no: 130, name: "desktop_rdp", kind: "message", localName: "desktop_rdp", oneof: "access", T: () => AccessScheme_Desktop_RDP },
            { no: 131, name: "desktop_vnc", kind: "message", localName: "desktop_vnc", oneof: "access", T: () => AccessScheme_Desktop_VNC },
            { no: 140, name: "container_docker", kind: "message", localName: "container_docker", oneof: "access", T: () => AccessScheme_Container_Docker },
            { no: 141, name: "container_k8s", kind: "message", localName: "container_k8s", jsonName: "containerK8s", oneof: "access", T: () => AccessScheme_Container_K8S },
            { no: 150, name: "cloud_aws", kind: "message", localName: "cloud_aws", oneof: "access", T: () => AccessScheme_Cloud_AWS },
            { no: 151, name: "cloud_gcp", kind: "message", localName: "cloud_gcp", oneof: "access", T: () => AccessScheme_Cloud_GCP },
            { no: 152, name: "cloud_azure", kind: "message", localName: "cloud_azure", oneof: "access", T: () => AccessScheme_Cloud_Azure },
            { no: 153, name: "cloud_do", kind: "message", localName: "cloud_do", oneof: "access", T: () => AccessScheme_Cloud_DO },
            { no: 154, name: "cloud_hetzner", kind: "message", localName: "cloud_hetzner", oneof: "access", T: () => AccessScheme_Cloud_Hetzner },
            { no: 170, name: "application_site", kind: "message", localName: "application_site", oneof: "access", T: () => AccessScheme_Application_Site }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message access.AccessScheme
 */
export const AccessScheme = new AccessScheme$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AccessScheme_Server$Type extends MessageType<AccessScheme_Server> {
    constructor() {
        super("access.AccessScheme.Server", []);
    }
}
/**
 * @generated MessageType for protobuf message access.AccessScheme.Server
 */
export const AccessScheme_Server = new AccessScheme_Server$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AccessScheme_Server_TCP$Type extends MessageType<AccessScheme_Server_TCP> {
    constructor() {
        super("access.AccessScheme.Server.TCP", [
            { no: 1, name: "alias", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "address", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { ignore: "IGNORE_IF_ZERO_VALUE", string: { address: true } } } },
            { no: 3, name: "port", kind: "scalar", T: 5 /*ScalarType.INT32*/, options: { "buf.validate.field": { ignore: "IGNORE_IF_ZERO_VALUE", int32: { lt: 65536, gte: 1 } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message access.AccessScheme.Server.TCP
 */
export const AccessScheme_Server_TCP = new AccessScheme_Server_TCP$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AccessScheme_Server_UDP$Type extends MessageType<AccessScheme_Server_UDP> {
    constructor() {
        super("access.AccessScheme.Server.UDP", [
            { no: 1, name: "alias", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "address", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { ignore: "IGNORE_IF_ZERO_VALUE", string: { address: true } } } },
            { no: 3, name: "port", kind: "scalar", T: 5 /*ScalarType.INT32*/, options: { "buf.validate.field": { ignore: "IGNORE_IF_ZERO_VALUE", int32: { lt: 65536, gte: 1 } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message access.AccessScheme.Server.UDP
 */
export const AccessScheme_Server_UDP = new AccessScheme_Server_UDP$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AccessScheme_Server_SSH$Type extends MessageType<AccessScheme_Server_SSH> {
    constructor() {
        super("access.AccessScheme.Server.SSH", [
            { no: 1, name: "alias", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "address", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { ignore: "IGNORE_IF_ZERO_VALUE", string: { address: true } } } },
            { no: 3, name: "port", kind: "scalar", T: 5 /*ScalarType.INT32*/, options: { "buf.validate.field": { ignore: "IGNORE_IF_ZERO_VALUE", int32: { lt: 65536, gte: 1 } } } },
            { no: 4, name: "password", kind: "message", oneof: "access", T: () => Auth_Password },
            { no: 5, name: "key", kind: "message", oneof: "access", T: () => Auth_Key },
            { no: 6, name: "agent", kind: "message", oneof: "access", T: () => Auth_Agent }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message access.AccessScheme.Server.SSH
 */
export const AccessScheme_Server_SSH = new AccessScheme_Server_SSH$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AccessScheme_Server_Telnet$Type extends MessageType<AccessScheme_Server_Telnet> {
    constructor() {
        super("access.AccessScheme.Server.Telnet", [
            { no: 1, name: "alias", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "address", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { ignore: "IGNORE_IF_ZERO_VALUE", string: { address: true } } } },
            { no: 3, name: "port", kind: "scalar", T: 5 /*ScalarType.INT32*/, options: { "buf.validate.field": { ignore: "IGNORE_IF_ZERO_VALUE", int32: { lt: 65536, gte: 1 } } } },
            { no: 4, name: "access", kind: "message", T: () => Auth_Password }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message access.AccessScheme.Server.Telnet
 */
export const AccessScheme_Server_Telnet = new AccessScheme_Server_Telnet$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AccessScheme_Database$Type extends MessageType<AccessScheme_Database> {
    constructor() {
        super("access.AccessScheme.Database", []);
    }
}
/**
 * @generated MessageType for protobuf message access.AccessScheme.Database
 */
export const AccessScheme_Database = new AccessScheme_Database$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AccessScheme_Database_MySQL$Type extends MessageType<AccessScheme_Database_MySQL> {
    constructor() {
        super("access.AccessScheme.Database.MySQL", [
            { no: 1, name: "alias", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "address", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { ignore: "IGNORE_IF_ZERO_VALUE", string: { address: true } } } },
            { no: 3, name: "port", kind: "scalar", T: 5 /*ScalarType.INT32*/, options: { "buf.validate.field": { ignore: "IGNORE_IF_ZERO_VALUE", int32: { lt: 65536, gte: 1 } } } },
            { no: 4, name: "database_name", kind: "scalar", localName: "database_name", T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "access", kind: "message", T: () => Auth_Password },
            { no: 6, name: "mtls", kind: "message", T: () => Auth_MTLS }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message access.AccessScheme.Database.MySQL
 */
export const AccessScheme_Database_MySQL = new AccessScheme_Database_MySQL$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AccessScheme_Database_Postgres$Type extends MessageType<AccessScheme_Database_Postgres> {
    constructor() {
        super("access.AccessScheme.Database.Postgres", [
            { no: 1, name: "alias", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "address", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { ignore: "IGNORE_IF_ZERO_VALUE", string: { address: true } } } },
            { no: 3, name: "port", kind: "scalar", T: 5 /*ScalarType.INT32*/, options: { "buf.validate.field": { ignore: "IGNORE_IF_ZERO_VALUE", int32: { lt: 65536, gte: 1 } } } },
            { no: 4, name: "database_name", kind: "scalar", localName: "database_name", T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "access", kind: "message", T: () => Auth_Password },
            { no: 6, name: "mtls", kind: "message", T: () => Auth_MTLS },
            { no: 7, name: "server_name_mtls", kind: "scalar", localName: "server_name_mtls", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message access.AccessScheme.Database.Postgres
 */
export const AccessScheme_Database_Postgres = new AccessScheme_Database_Postgres$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AccessScheme_Database_Redis$Type extends MessageType<AccessScheme_Database_Redis> {
    constructor() {
        super("access.AccessScheme.Database.Redis", [
            { no: 1, name: "alias", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "address", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { ignore: "IGNORE_IF_ZERO_VALUE", string: { address: true } } } },
            { no: 3, name: "port", kind: "scalar", T: 5 /*ScalarType.INT32*/, options: { "buf.validate.field": { ignore: "IGNORE_IF_ZERO_VALUE", int32: { lt: 65536, gte: 1 } } } },
            { no: 4, name: "access", kind: "message", T: () => Auth_Password },
            { no: 5, name: "tls_required", kind: "scalar", localName: "tls_required", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message access.AccessScheme.Database.Redis
 */
export const AccessScheme_Database_Redis = new AccessScheme_Database_Redis$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AccessScheme_Database_MongoDB$Type extends MessageType<AccessScheme_Database_MongoDB> {
    constructor() {
        super("access.AccessScheme.Database.MongoDB", [
            { no: 1, name: "alias", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "address", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { ignore: "IGNORE_IF_ZERO_VALUE", string: { address: true } } } },
            { no: 3, name: "port", kind: "scalar", T: 5 /*ScalarType.INT32*/, options: { "buf.validate.field": { ignore: "IGNORE_IF_ZERO_VALUE", int32: { lt: 65536, gte: 1 } } } },
            { no: 4, name: "database_name", kind: "scalar", localName: "database_name", T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "access", kind: "message", T: () => Auth_Password },
            { no: 6, name: "tls_required", kind: "scalar", localName: "tls_required", T: 8 /*ScalarType.BOOL*/ },
            { no: 7, name: "replica_connect", kind: "scalar", localName: "replica_connect", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message access.AccessScheme.Database.MongoDB
 */
export const AccessScheme_Database_MongoDB = new AccessScheme_Database_MongoDB$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AccessScheme_Database_Elastic$Type extends MessageType<AccessScheme_Database_Elastic> {
    constructor() {
        super("access.AccessScheme.Database.Elastic", [
            { no: 1, name: "alias", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "address", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { ignore: "IGNORE_IF_ZERO_VALUE", string: { address: true } } } },
            { no: 3, name: "port", kind: "scalar", T: 5 /*ScalarType.INT32*/, options: { "buf.validate.field": { ignore: "IGNORE_IF_ZERO_VALUE", int32: { lt: 65536, gte: 1 } } } },
            { no: 4, name: "access", kind: "message", T: () => Auth_Password },
            { no: 5, name: "tls_required", kind: "scalar", localName: "tls_required", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message access.AccessScheme.Database.Elastic
 */
export const AccessScheme_Database_Elastic = new AccessScheme_Database_Elastic$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AccessScheme_Database_DynamoDB$Type extends MessageType<AccessScheme_Database_DynamoDB> {
    constructor() {
        super("access.AccessScheme.Database.DynamoDB", [
            { no: 1, name: "alias", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "region", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "api", kind: "message", T: () => Auth_API }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message access.AccessScheme.Database.DynamoDB
 */
export const AccessScheme_Database_DynamoDB = new AccessScheme_Database_DynamoDB$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AccessScheme_Database_Cassandra$Type extends MessageType<AccessScheme_Database_Cassandra> {
    constructor() {
        super("access.AccessScheme.Database.Cassandra", [
            { no: 1, name: "alias", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "address", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { ignore: "IGNORE_IF_ZERO_VALUE", string: { address: true } } } },
            { no: 3, name: "port", kind: "scalar", T: 5 /*ScalarType.INT32*/, options: { "buf.validate.field": { ignore: "IGNORE_IF_ZERO_VALUE", int32: { lt: 65536, gte: 1 } } } },
            { no: 4, name: "access", kind: "message", T: () => Auth_Password },
            { no: 5, name: "tls_required", kind: "scalar", localName: "tls_required", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message access.AccessScheme.Database.Cassandra
 */
export const AccessScheme_Database_Cassandra = new AccessScheme_Database_Cassandra$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AccessScheme_Database_SQLServer$Type extends MessageType<AccessScheme_Database_SQLServer> {
    constructor() {
        super("access.AccessScheme.Database.SQLServer", [
            { no: 1, name: "alias", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "address", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { ignore: "IGNORE_IF_ZERO_VALUE", string: { address: true } } } },
            { no: 3, name: "port", kind: "scalar", T: 5 /*ScalarType.INT32*/, options: { "buf.validate.field": { ignore: "IGNORE_IF_ZERO_VALUE", int32: { lt: 65536, gte: 1 } } } },
            { no: 4, name: "access", kind: "message", T: () => Auth_Password },
            { no: 5, name: "schema", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 6, name: "default_database", kind: "scalar", localName: "default_database", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message access.AccessScheme.Database.SQLServer
 */
export const AccessScheme_Database_SQLServer = new AccessScheme_Database_SQLServer$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AccessScheme_Database_Snowflake$Type extends MessageType<AccessScheme_Database_Snowflake> {
    constructor() {
        super("access.AccessScheme.Database.Snowflake", [
            { no: 1, name: "alias", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "region", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "access", kind: "message", T: () => Auth_Password },
            { no: 4, name: "schema", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message access.AccessScheme.Database.Snowflake
 */
export const AccessScheme_Database_Snowflake = new AccessScheme_Database_Snowflake$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AccessScheme_Desktop$Type extends MessageType<AccessScheme_Desktop> {
    constructor() {
        super("access.AccessScheme.Desktop", []);
    }
}
/**
 * @generated MessageType for protobuf message access.AccessScheme.Desktop
 */
export const AccessScheme_Desktop = new AccessScheme_Desktop$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AccessScheme_Desktop_RDP$Type extends MessageType<AccessScheme_Desktop_RDP> {
    constructor() {
        super("access.AccessScheme.Desktop.RDP", [
            { no: 1, name: "alias", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "address", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { ignore: "IGNORE_IF_ZERO_VALUE", string: { address: true } } } },
            { no: 3, name: "port", kind: "scalar", T: 5 /*ScalarType.INT32*/, options: { "buf.validate.field": { ignore: "IGNORE_IF_ZERO_VALUE", int32: { lt: 65536, gte: 1 } } } },
            { no: 4, name: "access", kind: "message", T: () => Auth_Password }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message access.AccessScheme.Desktop.RDP
 */
export const AccessScheme_Desktop_RDP = new AccessScheme_Desktop_RDP$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AccessScheme_Desktop_VNC$Type extends MessageType<AccessScheme_Desktop_VNC> {
    constructor() {
        super("access.AccessScheme.Desktop.VNC", [
            { no: 1, name: "alias", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "address", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { ignore: "IGNORE_IF_ZERO_VALUE", string: { address: true } } } },
            { no: 3, name: "port", kind: "scalar", T: 5 /*ScalarType.INT32*/, options: { "buf.validate.field": { ignore: "IGNORE_IF_ZERO_VALUE", int32: { lt: 65536, gte: 1 } } } },
            { no: 4, name: "access", kind: "message", T: () => Auth_Password }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message access.AccessScheme.Desktop.VNC
 */
export const AccessScheme_Desktop_VNC = new AccessScheme_Desktop_VNC$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AccessScheme_Container$Type extends MessageType<AccessScheme_Container> {
    constructor() {
        super("access.AccessScheme.Container", []);
    }
}
/**
 * @generated MessageType for protobuf message access.AccessScheme.Container
 */
export const AccessScheme_Container = new AccessScheme_Container$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AccessScheme_Container_Docker$Type extends MessageType<AccessScheme_Container_Docker> {
    constructor() {
        super("access.AccessScheme.Container.Docker", [
            { no: 1, name: "alias", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "address", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { ignore: "IGNORE_IF_ZERO_VALUE", string: { address: true } } } },
            { no: 3, name: "port", kind: "scalar", T: 5 /*ScalarType.INT32*/, options: { "buf.validate.field": { ignore: "IGNORE_IF_ZERO_VALUE", int32: { lt: 65536, gte: 1 } } } },
            { no: 4, name: "mtls", kind: "message", T: () => Auth_MTLS }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message access.AccessScheme.Container.Docker
 */
export const AccessScheme_Container_Docker = new AccessScheme_Container_Docker$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AccessScheme_Container_K8S$Type extends MessageType<AccessScheme_Container_K8S> {
    constructor() {
        super("access.AccessScheme.Container.K8S", [
            { no: 1, name: "alias", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "address", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { ignore: "IGNORE_IF_ZERO_VALUE", string: { address: true } } } },
            { no: 3, name: "port", kind: "scalar", T: 5 /*ScalarType.INT32*/, options: { "buf.validate.field": { ignore: "IGNORE_IF_ZERO_VALUE", int32: { lt: 65536, gte: 1 } } } },
            { no: 4, name: "mtls", kind: "message", T: () => Auth_MTLS },
            { no: 5, name: "healthcheck_namespace", kind: "scalar", localName: "healthcheck_namespace", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message access.AccessScheme.Container.K8S
 */
export const AccessScheme_Container_K8S = new AccessScheme_Container_K8S$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AccessScheme_Cloud$Type extends MessageType<AccessScheme_Cloud> {
    constructor() {
        super("access.AccessScheme.Cloud", []);
    }
}
/**
 * @generated MessageType for protobuf message access.AccessScheme.Cloud
 */
export const AccessScheme_Cloud = new AccessScheme_Cloud$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AccessScheme_Cloud_AWS$Type extends MessageType<AccessScheme_Cloud_AWS> {
    constructor() {
        super("access.AccessScheme.Cloud.AWS", [
            { no: 1, name: "alias", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "access", kind: "message", T: () => Auth_API },
            { no: 3, name: "healthcheck_region", kind: "scalar", localName: "healthcheck_region", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message access.AccessScheme.Cloud.AWS
 */
export const AccessScheme_Cloud_AWS = new AccessScheme_Cloud_AWS$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AccessScheme_Cloud_GCP$Type extends MessageType<AccessScheme_Cloud_GCP> {
    constructor() {
        super("access.AccessScheme.Cloud.GCP", [
            { no: 1, name: "alias", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "service_account_keyfile", kind: "scalar", localName: "service_account_keyfile", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "scopes", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message access.AccessScheme.Cloud.GCP
 */
export const AccessScheme_Cloud_GCP = new AccessScheme_Cloud_GCP$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AccessScheme_Cloud_Azure$Type extends MessageType<AccessScheme_Cloud_Azure> {
    constructor() {
        super("access.AccessScheme.Cloud.Azure", [
            { no: 1, name: "alias", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "app_id", kind: "scalar", localName: "app_id", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "tenant", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "password", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { minLen: "8", maxLen: "32" } } } },
            { no: 5, name: "certificate", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message access.AccessScheme.Cloud.Azure
 */
export const AccessScheme_Cloud_Azure = new AccessScheme_Cloud_Azure$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AccessScheme_Cloud_DO$Type extends MessageType<AccessScheme_Cloud_DO> {
    constructor() {
        super("access.AccessScheme.Cloud.DO", [
            { no: 1, name: "alias", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "access", kind: "message", T: () => Auth_API }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message access.AccessScheme.Cloud.DO
 */
export const AccessScheme_Cloud_DO = new AccessScheme_Cloud_DO$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AccessScheme_Cloud_Hetzner$Type extends MessageType<AccessScheme_Cloud_Hetzner> {
    constructor() {
        super("access.AccessScheme.Cloud.Hetzner", [
            { no: 1, name: "alias", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "access", kind: "message", T: () => Auth_API }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message access.AccessScheme.Cloud.Hetzner
 */
export const AccessScheme_Cloud_Hetzner = new AccessScheme_Cloud_Hetzner$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AccessScheme_Application$Type extends MessageType<AccessScheme_Application> {
    constructor() {
        super("access.AccessScheme.Application", []);
    }
}
/**
 * @generated MessageType for protobuf message access.AccessScheme.Application
 */
export const AccessScheme_Application = new AccessScheme_Application$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AccessScheme_Application_Site$Type extends MessageType<AccessScheme_Application_Site> {
    constructor() {
        super("access.AccessScheme.Application.Site", [
            { no: 1, name: "alias", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message access.AccessScheme.Application.Site
 */
export const AccessScheme_Application_Site = new AccessScheme_Application_Site$Type();
