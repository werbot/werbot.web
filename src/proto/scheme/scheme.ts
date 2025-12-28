// @generated from protobuf file "scheme.proto" (package "scheme", syntax proto3)
// tslint:disable
// @ts-nocheck
import { ServiceType } from "@protobuf-ts/runtime-rpc";
import { MessageType } from "@protobuf-ts/runtime";
import { Network } from "../firewall";
import { Country } from "../firewall";
import { AccessScheme } from "./access";
import { Timestamp } from "../google/protobuf/timestamp";
import { AuthMethod } from "./auth";
import { SchemeType } from "./access";
/**
 * rpc Schemes
 *
 * @generated from protobuf message scheme.Schemes
 */
export interface Schemes {
}
/**
 * @generated from protobuf message scheme.Schemes.Request
 */
export interface Schemes_Request {
    /**
     * @generated from protobuf field: bool is_admin = 1
     */
    is_admin: boolean; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string owner_id = 2
     */
    owner_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string project_id = 3
     */
    project_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: access.SchemeType scheme_type = 4
     */
    scheme_type: SchemeType;
    /**
     * @generated from protobuf field: int32 limit = 5
     */
    limit: number;
    /**
     * @generated from protobuf field: int32 offset = 6
     */
    offset: number;
    /**
     * @generated from protobuf field: string sort_by = 7
     */
    sort_by: string; // @gotags: json:"-"
}
/**
 * @generated from protobuf message scheme.Schemes.Response
 */
export interface Schemes_Response {
    /**
     * @generated from protobuf field: int32 total = 1
     */
    total: number;
    /**
     * @generated from protobuf field: repeated scheme.Scheme.Response schemes = 2
     */
    schemes: Scheme_Response[];
}
/**
 * rpc Scheme
 *
 * @generated from protobuf message scheme.Scheme
 */
export interface Scheme {
}
/**
 * @generated from protobuf message scheme.Scheme.Request
 */
export interface Scheme_Request {
    /**
     * @generated from protobuf field: bool is_admin = 1
     */
    is_admin: boolean; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string owner_id = 2
     */
    owner_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string project_id = 3
     */
    project_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string scheme_id = 4
     */
    scheme_id: string; // @gotags: json:"-"
}
/**
 * @generated from protobuf message scheme.Scheme.Response
 */
export interface Scheme_Response {
    /**
     * @generated from protobuf field: string scheme_id = 1
     */
    scheme_id: string;
    /**
     * @generated from protobuf field: string project_id = 2
     */
    project_id: string;
    /**
     * @generated from protobuf field: string owner_id = 3
     */
    owner_id: string;
    /**
     * @generated from protobuf field: string address = 4
     */
    address: string;
    /**
     * @generated from protobuf field: string alias = 5
     */
    alias: string;
    /**
     * @generated from protobuf field: string title = 6
     */
    title: string;
    /**
     * @generated from protobuf field: string description = 7
     */
    description: string;
    /**
     * @generated from protobuf field: bool audit = 8
     */
    audit: boolean;
    /**
     * @generated from protobuf field: bool active = 9
     */
    active: boolean;
    /**
     * @generated from protobuf field: bool online = 10
     */
    online: boolean;
    /**
     * @generated from protobuf field: auth.AuthMethod auth_method = 11
     */
    auth_method: AuthMethod;
    /**
     * @generated from protobuf field: access.SchemeType scheme_type = 12
     */
    scheme_type: SchemeType;
    /**
     * @generated from protobuf field: int32 count_members = 13
     */
    count_members: number;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp locked_at = 14
     */
    locked_at?: Timestamp;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp archived_at = 15
     */
    archived_at?: Timestamp;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp updated_at = 16
     */
    updated_at?: Timestamp;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp created_at = 17
     */
    created_at?: Timestamp;
}
/**
 * rpc AddScheme
 *
 * @generated from protobuf message scheme.AddScheme
 */
export interface AddScheme {
}
/**
 * @generated from protobuf message scheme.AddScheme.Request
 */
export interface AddScheme_Request {
    /**
     * @generated from protobuf field: string owner_id = 1
     */
    owner_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string project_id = 2
     */
    project_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string title = 3
     */
    title: string;
    /**
     * @generated from protobuf field: bool audit = 4
     */
    audit: boolean;
    /**
     * @generated from protobuf field: bool active = 5
     */
    active: boolean;
    /**
     * @generated from protobuf field: string description = 6
     */
    description: string;
    /**
     * @generated from protobuf field: access.AccessScheme scheme = 7
     */
    scheme?: AccessScheme;
}
/**
 * @generated from protobuf message scheme.AddScheme.Response
 */
export interface AddScheme_Response {
    /**
     * @generated from protobuf field: string scheme_id = 1
     */
    scheme_id: string;
}
/**
 * rpc UpdateScheme
 *
 * @generated from protobuf message scheme.UpdateScheme
 */
export interface UpdateScheme {
}
/**
 * @generated from protobuf message scheme.UpdateScheme.Request
 */
export interface UpdateScheme_Request {
    /**
     * @generated from protobuf field: string owner_id = 1
     */
    owner_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string project_id = 2
     */
    project_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string scheme_id = 3
     */
    scheme_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf oneof: setting
     */
    setting: {
        oneofKind: "title";
        /**
         * @generated from protobuf field: string title = 4
         */
        title: string;
    } | {
        oneofKind: "audit";
        /**
         * @generated from protobuf field: bool audit = 5
         */
        audit: boolean;
    } | {
        oneofKind: "active";
        /**
         * @generated from protobuf field: bool active = 6
         */
        active: boolean;
    } | {
        oneofKind: "online";
        /**
         * @generated from protobuf field: bool online = 7
         */
        online: boolean;
    } | {
        oneofKind: "description";
        /**
         * @generated from protobuf field: string description = 8
         */
        description: string;
    } | {
        oneofKind: "scheme";
        /**
         * @generated from protobuf field: access.AccessScheme scheme = 9
         */
        scheme: AccessScheme;
    } | {
        oneofKind: undefined;
    };
}
/**
 * @generated from protobuf message scheme.UpdateScheme.Response
 */
export interface UpdateScheme_Response {
}
/**
 * rpc DeleteScheme
 *
 * @generated from protobuf message scheme.DeleteScheme
 */
export interface DeleteScheme {
}
/**
 * @generated from protobuf message scheme.DeleteScheme.Request
 */
export interface DeleteScheme_Request {
    /**
     * @generated from protobuf field: string owner_id = 1
     */
    owner_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string project_id = 2
     */
    project_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string scheme_id = 3
     */
    scheme_id: string; // @gotags: json:"-"
}
/**
 * @generated from protobuf message scheme.DeleteScheme.Response
 */
export interface DeleteScheme_Response {
}
/**
 * rpc SchemeAccess
 *
 * @generated from protobuf message scheme.SchemeAccess
 */
export interface SchemeAccess {
}
/**
 * @generated from protobuf message scheme.SchemeAccess.Request
 */
export interface SchemeAccess_Request {
    /**
     * @generated from protobuf field: string owner_id = 1
     */
    owner_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string project_id = 2
     */
    project_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string scheme_id = 3
     */
    scheme_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: bool no_ghost = 99
     */
    no_ghost: boolean; // @gotags: json:"-"
}
/**
 * @generated from protobuf message scheme.SchemeAccess.Response
 */
export interface SchemeAccess_Response {
    /**
     * @generated from protobuf field: access.AccessScheme scheme = 1
     */
    scheme?: AccessScheme;
}
/**
 * rpc SchemeActivity
 *
 * @generated from protobuf message scheme.SchemeActivity
 */
export interface SchemeActivity {
}
/**
 * @generated from protobuf message scheme.SchemeActivity.Request
 */
export interface SchemeActivity_Request {
    /**
     * @generated from protobuf field: string owner_id = 1
     */
    owner_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string project_id = 2
     */
    project_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string scheme_id = 3
     */
    scheme_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: google.protobuf.Timestamp timestamp = 4
     */
    timestamp?: Timestamp;
}
/**
 * @generated from protobuf message scheme.SchemeActivity.Response
 */
export interface SchemeActivity_Response {
    /**
     * @generated from protobuf oneof: period
     */
    period: {
        oneofKind: "hour";
        /**
         * @generated from protobuf field: bool hour = 1
         */
        hour: boolean;
    } | {
        oneofKind: "week";
        /**
         * @generated from protobuf field: scheme.SchemeActivity.Week week = 2
         */
        week: SchemeActivity_Week;
    } | {
        oneofKind: undefined;
    };
}
/**
 * @generated from protobuf message scheme.SchemeActivity.Week
 */
export interface SchemeActivity_Week {
    /**
     * @generated from protobuf field: repeated int32 mon = 1
     */
    mon: number[];
    /**
     * @generated from protobuf field: repeated int32 tue = 2
     */
    tue: number[];
    /**
     * @generated from protobuf field: repeated int32 wed = 3
     */
    wed: number[];
    /**
     * @generated from protobuf field: repeated int32 thu = 4
     */
    thu: number[];
    /**
     * @generated from protobuf field: repeated int32 fri = 5
     */
    fri: number[];
    /**
     * @generated from protobuf field: repeated int32 sat = 6
     */
    sat: number[];
    /**
     * @generated from protobuf field: repeated int32 sun = 7
     */
    sun: number[];
}
/**
 * rpc UpdateSchemeActivity
 *
 * @generated from protobuf message scheme.UpdateSchemeActivity
 */
export interface UpdateSchemeActivity {
}
/**
 * @generated from protobuf message scheme.UpdateSchemeActivity.Request
 */
export interface UpdateSchemeActivity_Request {
    /**
     * @generated from protobuf field: string owner_id = 1
     */
    owner_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string project_id = 2
     */
    project_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string scheme_id = 3
     */
    scheme_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: scheme.SchemeActivity.Week activity = 4
     */
    activity?: SchemeActivity_Week;
}
/**
 * @generated from protobuf message scheme.UpdateSchemeActivity.Response
 */
export interface UpdateSchemeActivity_Response {
}
/**
 * rpc SchemeFirewall
 *
 * @generated from protobuf message scheme.SchemeFirewall
 */
export interface SchemeFirewall {
}
/**
 * @generated from protobuf message scheme.SchemeFirewall.Request
 */
export interface SchemeFirewall_Request {
    /**
     * @generated from protobuf field: string owner_id = 1
     */
    owner_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string project_id = 2
     */
    project_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string scheme_id = 3
     */
    scheme_id: string; // @gotags: json:"-"
}
/**
 * @generated from protobuf message scheme.SchemeFirewall.Response
 */
export interface SchemeFirewall_Response {
    /**
     * @generated from protobuf field: scheme.SchemeFirewall.Countries country = 1
     */
    country?: SchemeFirewall_Countries;
    /**
     * @generated from protobuf field: scheme.SchemeFirewall.Networks network = 2
     */
    network?: SchemeFirewall_Networks;
}
/**
 * @generated from protobuf message scheme.SchemeFirewall.Countries
 */
export interface SchemeFirewall_Countries {
    /**
     * @generated from protobuf field: bool wite_list = 1
     */
    wite_list: boolean;
    /**
     * @generated from protobuf field: int32 total = 2
     */
    total: number;
    /**
     * @generated from protobuf field: repeated firewall.Country list = 3
     */
    list: Country[];
}
/**
 * @generated from protobuf message scheme.SchemeFirewall.Networks
 */
export interface SchemeFirewall_Networks {
    /**
     * @generated from protobuf field: bool wite_list = 1
     */
    wite_list: boolean;
    /**
     * @generated from protobuf field: int32 total = 2
     */
    total: number;
    /**
     * @generated from protobuf field: repeated firewall.Network list = 3
     */
    list: Network[];
}
/**
 * rpc AddSchemeFirewall
 *
 * @generated from protobuf message scheme.AddSchemeFirewall
 */
export interface AddSchemeFirewall {
}
/**
 * @generated from protobuf message scheme.AddSchemeFirewall.Request
 */
export interface AddSchemeFirewall_Request {
    /**
     * @generated from protobuf field: string owner_id = 1
     */
    owner_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string project_id = 2
     */
    project_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string scheme_id = 3
     */
    scheme_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf oneof: record
     */
    record: {
        oneofKind: "network";
        /**
         * @generated from protobuf field: string network = 4
         */
        network: string;
    } | {
        oneofKind: "country_code";
        /**
         * @generated from protobuf field: string country_code = 5
         */
        country_code: string;
    } | {
        oneofKind: undefined;
    };
}
/**
 * @generated from protobuf message scheme.AddSchemeFirewall.Response
 */
export interface AddSchemeFirewall_Response {
    /**
     * @generated from protobuf oneof: record
     */
    record: {
        oneofKind: "country_id";
        /**
         * @generated from protobuf field: string country_id = 1
         */
        country_id: string;
    } | {
        oneofKind: "network_id";
        /**
         * @generated from protobuf field: string network_id = 2
         */
        network_id: string;
    } | {
        oneofKind: undefined;
    };
}
/**
 * rpc UpdateSchemeFirewall
 *
 * @generated from protobuf message scheme.UpdateSchemeFirewall
 */
export interface UpdateSchemeFirewall {
}
/**
 * @generated from protobuf message scheme.UpdateSchemeFirewall.Request
 */
export interface UpdateSchemeFirewall_Request {
    /**
     * @generated from protobuf field: string owner_id = 1
     */
    owner_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string project_id = 2
     */
    project_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string scheme_id = 3
     */
    scheme_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf oneof: status
     */
    status: {
        oneofKind: "country";
        /**
         * @generated from protobuf field: bool country = 4
         */
        country: boolean;
    } | {
        oneofKind: "network";
        /**
         * @generated from protobuf field: bool network = 5
         */
        network: boolean;
    } | {
        oneofKind: undefined;
    };
}
/**
 * @generated from protobuf message scheme.UpdateSchemeFirewall.Response
 */
export interface UpdateSchemeFirewall_Response {
}
/**
 * rpc DeleteSchemeFirewall
 *
 * @generated from protobuf message scheme.DeleteSchemeFirewall
 */
export interface DeleteSchemeFirewall {
}
/**
 * @generated from protobuf message scheme.DeleteSchemeFirewall.Request
 */
export interface DeleteSchemeFirewall_Request {
    /**
     * @generated from protobuf field: string owner_id = 1
     */
    owner_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string project_id = 2
     */
    project_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string scheme_id = 3
     */
    scheme_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf oneof: record
     */
    record: {
        oneofKind: "country_id";
        /**
         * @generated from protobuf field: string country_id = 4
         */
        country_id: string;
    } | {
        oneofKind: "network_id";
        /**
         * @generated from protobuf field: string network_id = 5
         */
        network_id: string;
    } | {
        oneofKind: undefined;
    };
}
/**
 * @generated from protobuf message scheme.DeleteSchemeFirewall.Response
 */
export interface DeleteSchemeFirewall_Response {
}
/**
 * rpc ProfileSchemes
 *
 * @generated from protobuf message scheme.ProfileSchemes
 */
export interface ProfileSchemes {
}
/**
 * @generated from protobuf message scheme.ProfileSchemes.Request
 */
export interface ProfileSchemes_Request {
    /**
     * @generated from protobuf field: bool is_admin = 1
     */
    is_admin: boolean; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string profile_id = 2
     */
    profile_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: access.SchemeType scheme_type = 3
     */
    scheme_type: SchemeType;
    /**
     * @generated from protobuf field: int32 limit = 4
     */
    limit: number;
    /**
     * @generated from protobuf field: int32 offset = 5
     */
    offset: number;
    /**
     * @generated from protobuf field: string sort_by = 6
     */
    sort_by: string; // @gotags: json:"-"
}
/**
 * @generated from protobuf message scheme.ProfileSchemes.Response
 */
export interface ProfileSchemes_Response {
    /**
     * @generated from protobuf field: map<int32, int32> total = 1
     */
    total: {
        [key: number]: number;
    };
    /**
     * @generated from protobuf field: repeated scheme.Scheme.Response schemes = 2
     */
    schemes: Scheme_Response[];
}
/**
 * rpc SystemSchemesByAlias
 *
 * @generated from protobuf message scheme.SystemSchemesByAlias
 */
export interface SystemSchemesByAlias {
}
/**
 * @generated from protobuf message scheme.SystemSchemesByAlias.Request
 */
export interface SystemSchemesByAlias_Request {
    /**
     * @generated from protobuf field: string alias = 1
     */
    alias: string;
}
/**
 * @generated from protobuf message scheme.SystemSchemesByAlias.Response
 */
export interface SystemSchemesByAlias_Response {
    /**
     * @generated from protobuf field: int32 total = 1
     */
    total: number;
    /**
     * @generated from protobuf field: repeated scheme.Scheme.Response schemes = 2
     */
    schemes: Scheme_Response[];
}
/**
 * SystemSchemeAccess
 *
 * @generated from protobuf message scheme.SystemSchemeAccess
 */
export interface SystemSchemeAccess {
}
/**
 * @generated from protobuf message scheme.SystemSchemeAccess.Request
 */
export interface SystemSchemeAccess_Request {
    /**
     * @generated from protobuf field: string scheme_id = 1
     */
    scheme_id: string;
    /**
     * @generated from protobuf field: string client_ip = 2
     */
    client_ip: string;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp timestamp = 3
     */
    timestamp?: Timestamp;
}
/**
 * @generated from protobuf message scheme.SystemSchemeAccess.Response
 */
export interface SystemSchemeAccess_Response {
    /**
     * @generated from protobuf field: string project_id = 1
     */
    project_id: string;
    /**
     * @generated from protobuf field: access.SchemeType scheme_type = 2
     */
    scheme_type: SchemeType;
    /**
     * @generated from protobuf field: access.AccessScheme access = 3
     */
    access?: AccessScheme;
}
/**
 * rpc SystemHostKey
 *
 * @generated from protobuf message scheme.SystemHostKey
 */
export interface SystemHostKey {
}
/**
 * @generated from protobuf message scheme.SystemHostKey.Request
 */
export interface SystemHostKey_Request {
    /**
     * @generated from protobuf field: string scheme_id = 1
     */
    scheme_id: string;
}
/**
 * @generated from protobuf message scheme.SystemHostKey.Response
 */
export interface SystemHostKey_Response {
    /**
     * @generated from protobuf field: bytes hostkey = 1
     */
    hostkey: Uint8Array;
}
/**
 * rpc SystemUpdateHostKey
 *
 * @generated from protobuf message scheme.SystemUpdateHostKey
 */
export interface SystemUpdateHostKey {
}
/**
 * @generated from protobuf message scheme.SystemUpdateHostKey.Request
 */
export interface SystemUpdateHostKey_Request {
    /**
     * @generated from protobuf field: string scheme_id = 1
     */
    scheme_id: string;
    /**
     * @generated from protobuf field: bytes hostkey = 2
     */
    hostkey: Uint8Array;
}
/**
 * @generated from protobuf message scheme.SystemUpdateHostKey.Response
 */
export interface SystemUpdateHostKey_Response {
}
/**
 * @generated from protobuf enum scheme.Address
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
 * @generated from protobuf enum scheme.Type
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
class Schemes$Type extends MessageType<Schemes> {
    constructor() {
        super("scheme.Schemes", []);
    }
}
/**
 * @generated MessageType for protobuf message scheme.Schemes
 */
export const Schemes = new Schemes$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Schemes_Request$Type extends MessageType<Schemes_Request> {
    constructor() {
        super("scheme.Schemes.Request", [
            { no: 1, name: "is_admin", kind: "scalar", localName: "is_admin", T: 8 /*ScalarType.BOOL*/ },
            { no: 2, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 3, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 4, name: "scheme_type", kind: "enum", localName: "scheme_type", T: () => ["access.SchemeType", SchemeType] },
            { no: 5, name: "limit", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 6, name: "offset", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 7, name: "sort_by", kind: "scalar", localName: "sort_by", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message scheme.Schemes.Request
 */
export const Schemes_Request = new Schemes_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Schemes_Response$Type extends MessageType<Schemes_Response> {
    constructor() {
        super("scheme.Schemes.Response", [
            { no: 1, name: "total", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 2, name: "schemes", kind: "message", repeat: 2 /*RepeatType.UNPACKED*/, T: () => Scheme_Response }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message scheme.Schemes.Response
 */
export const Schemes_Response = new Schemes_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Scheme$Type extends MessageType<Scheme> {
    constructor() {
        super("scheme.Scheme", []);
    }
}
/**
 * @generated MessageType for protobuf message scheme.Scheme
 */
export const Scheme = new Scheme$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Scheme_Request$Type extends MessageType<Scheme_Request> {
    constructor() {
        super("scheme.Scheme.Request", [
            { no: 1, name: "is_admin", kind: "scalar", localName: "is_admin", T: 8 /*ScalarType.BOOL*/ },
            { no: 2, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 3, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 4, name: "scheme_id", kind: "scalar", localName: "scheme_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message scheme.Scheme.Request
 */
export const Scheme_Request = new Scheme_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Scheme_Response$Type extends MessageType<Scheme_Response> {
    constructor() {
        super("scheme.Scheme.Response", [
            { no: 1, name: "scheme_id", kind: "scalar", localName: "scheme_id", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "ghoster.secret": true } },
            { no: 3, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "address", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "alias", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 6, name: "title", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 7, name: "description", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 8, name: "audit", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 9, name: "active", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 10, name: "online", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 11, name: "auth_method", kind: "enum", localName: "auth_method", T: () => ["auth.AuthMethod", AuthMethod] },
            { no: 12, name: "scheme_type", kind: "enum", localName: "scheme_type", T: () => ["access.SchemeType", SchemeType] },
            { no: 13, name: "count_members", kind: "scalar", localName: "count_members", T: 5 /*ScalarType.INT32*/ },
            { no: 14, name: "locked_at", kind: "message", localName: "locked_at", T: () => Timestamp, options: { "ghoster.secret": true } },
            { no: 15, name: "archived_at", kind: "message", localName: "archived_at", T: () => Timestamp, options: { "ghoster.secret": true } },
            { no: 16, name: "updated_at", kind: "message", localName: "updated_at", T: () => Timestamp, options: { "ghoster.secret": true } },
            { no: 17, name: "created_at", kind: "message", localName: "created_at", T: () => Timestamp }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message scheme.Scheme.Response
 */
export const Scheme_Response = new Scheme_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddScheme$Type extends MessageType<AddScheme> {
    constructor() {
        super("scheme.AddScheme", []);
    }
}
/**
 * @generated MessageType for protobuf message scheme.AddScheme
 */
export const AddScheme = new AddScheme$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddScheme_Request$Type extends MessageType<AddScheme_Request> {
    constructor() {
        super("scheme.AddScheme.Request", [
            { no: 1, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 2, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 3, name: "title", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "audit", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 5, name: "active", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 6, name: "description", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 7, name: "scheme", kind: "message", T: () => AccessScheme }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message scheme.AddScheme.Request
 */
export const AddScheme_Request = new AddScheme_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddScheme_Response$Type extends MessageType<AddScheme_Response> {
    constructor() {
        super("scheme.AddScheme.Response", [
            { no: 1, name: "scheme_id", kind: "scalar", localName: "scheme_id", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message scheme.AddScheme.Response
 */
export const AddScheme_Response = new AddScheme_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateScheme$Type extends MessageType<UpdateScheme> {
    constructor() {
        super("scheme.UpdateScheme", []);
    }
}
/**
 * @generated MessageType for protobuf message scheme.UpdateScheme
 */
export const UpdateScheme = new UpdateScheme$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateScheme_Request$Type extends MessageType<UpdateScheme_Request> {
    constructor() {
        super("scheme.UpdateScheme.Request", [
            { no: 1, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 2, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 3, name: "scheme_id", kind: "scalar", localName: "scheme_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 4, name: "title", kind: "scalar", oneof: "setting", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { minLen: "5", maxLen: "128" } } } },
            { no: 5, name: "audit", kind: "scalar", oneof: "setting", T: 8 /*ScalarType.BOOL*/ },
            { no: 6, name: "active", kind: "scalar", oneof: "setting", T: 8 /*ScalarType.BOOL*/ },
            { no: 7, name: "online", kind: "scalar", oneof: "setting", T: 8 /*ScalarType.BOOL*/ },
            { no: 8, name: "description", kind: "scalar", oneof: "setting", T: 9 /*ScalarType.STRING*/ },
            { no: 9, name: "scheme", kind: "message", oneof: "setting", T: () => AccessScheme }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message scheme.UpdateScheme.Request
 */
export const UpdateScheme_Request = new UpdateScheme_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateScheme_Response$Type extends MessageType<UpdateScheme_Response> {
    constructor() {
        super("scheme.UpdateScheme.Response", []);
    }
}
/**
 * @generated MessageType for protobuf message scheme.UpdateScheme.Response
 */
export const UpdateScheme_Response = new UpdateScheme_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DeleteScheme$Type extends MessageType<DeleteScheme> {
    constructor() {
        super("scheme.DeleteScheme", []);
    }
}
/**
 * @generated MessageType for protobuf message scheme.DeleteScheme
 */
export const DeleteScheme = new DeleteScheme$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DeleteScheme_Request$Type extends MessageType<DeleteScheme_Request> {
    constructor() {
        super("scheme.DeleteScheme.Request", [
            { no: 1, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 2, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 3, name: "scheme_id", kind: "scalar", localName: "scheme_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message scheme.DeleteScheme.Request
 */
export const DeleteScheme_Request = new DeleteScheme_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DeleteScheme_Response$Type extends MessageType<DeleteScheme_Response> {
    constructor() {
        super("scheme.DeleteScheme.Response", []);
    }
}
/**
 * @generated MessageType for protobuf message scheme.DeleteScheme.Response
 */
export const DeleteScheme_Response = new DeleteScheme_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class SchemeAccess$Type extends MessageType<SchemeAccess> {
    constructor() {
        super("scheme.SchemeAccess", []);
    }
}
/**
 * @generated MessageType for protobuf message scheme.SchemeAccess
 */
export const SchemeAccess = new SchemeAccess$Type();
// @generated message type with reflection information, may provide speed optimized methods
class SchemeAccess_Request$Type extends MessageType<SchemeAccess_Request> {
    constructor() {
        super("scheme.SchemeAccess.Request", [
            { no: 1, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 2, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 3, name: "scheme_id", kind: "scalar", localName: "scheme_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 99, name: "no_ghost", kind: "scalar", localName: "no_ghost", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message scheme.SchemeAccess.Request
 */
export const SchemeAccess_Request = new SchemeAccess_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class SchemeAccess_Response$Type extends MessageType<SchemeAccess_Response> {
    constructor() {
        super("scheme.SchemeAccess.Response", [
            { no: 1, name: "scheme", kind: "message", T: () => AccessScheme }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message scheme.SchemeAccess.Response
 */
export const SchemeAccess_Response = new SchemeAccess_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class SchemeActivity$Type extends MessageType<SchemeActivity> {
    constructor() {
        super("scheme.SchemeActivity", []);
    }
}
/**
 * @generated MessageType for protobuf message scheme.SchemeActivity
 */
export const SchemeActivity = new SchemeActivity$Type();
// @generated message type with reflection information, may provide speed optimized methods
class SchemeActivity_Request$Type extends MessageType<SchemeActivity_Request> {
    constructor() {
        super("scheme.SchemeActivity.Request", [
            { no: 1, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 2, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 3, name: "scheme_id", kind: "scalar", localName: "scheme_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 4, name: "timestamp", kind: "message", T: () => Timestamp }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message scheme.SchemeActivity.Request
 */
export const SchemeActivity_Request = new SchemeActivity_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class SchemeActivity_Response$Type extends MessageType<SchemeActivity_Response> {
    constructor() {
        super("scheme.SchemeActivity.Response", [
            { no: 1, name: "hour", kind: "scalar", oneof: "period", T: 8 /*ScalarType.BOOL*/ },
            { no: 2, name: "week", kind: "message", oneof: "period", T: () => SchemeActivity_Week }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message scheme.SchemeActivity.Response
 */
export const SchemeActivity_Response = new SchemeActivity_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class SchemeActivity_Week$Type extends MessageType<SchemeActivity_Week> {
    constructor() {
        super("scheme.SchemeActivity.Week", [
            { no: 1, name: "mon", kind: "scalar", repeat: 1 /*RepeatType.PACKED*/, T: 5 /*ScalarType.INT32*/, options: { "buf.validate.field": { repeated: { minItems: "23", maxItems: "23", items: { int32: { in: [0, 1] } } } } } },
            { no: 2, name: "tue", kind: "scalar", repeat: 1 /*RepeatType.PACKED*/, T: 5 /*ScalarType.INT32*/, options: { "buf.validate.field": { repeated: { minItems: "23", maxItems: "23", items: { int32: { in: [0, 1] } } } } } },
            { no: 3, name: "wed", kind: "scalar", repeat: 1 /*RepeatType.PACKED*/, T: 5 /*ScalarType.INT32*/, options: { "buf.validate.field": { repeated: { minItems: "23", maxItems: "23", items: { int32: { in: [0, 1] } } } } } },
            { no: 4, name: "thu", kind: "scalar", repeat: 1 /*RepeatType.PACKED*/, T: 5 /*ScalarType.INT32*/, options: { "buf.validate.field": { repeated: { minItems: "23", maxItems: "23", items: { int32: { in: [0, 1] } } } } } },
            { no: 5, name: "fri", kind: "scalar", repeat: 1 /*RepeatType.PACKED*/, T: 5 /*ScalarType.INT32*/, options: { "buf.validate.field": { repeated: { minItems: "23", maxItems: "23", items: { int32: { in: [0, 1] } } } } } },
            { no: 6, name: "sat", kind: "scalar", repeat: 1 /*RepeatType.PACKED*/, T: 5 /*ScalarType.INT32*/, options: { "buf.validate.field": { repeated: { minItems: "23", maxItems: "23", items: { int32: { in: [0, 1] } } } } } },
            { no: 7, name: "sun", kind: "scalar", repeat: 1 /*RepeatType.PACKED*/, T: 5 /*ScalarType.INT32*/, options: { "buf.validate.field": { repeated: { minItems: "23", maxItems: "23", items: { int32: { in: [0, 1] } } } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message scheme.SchemeActivity.Week
 */
export const SchemeActivity_Week = new SchemeActivity_Week$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateSchemeActivity$Type extends MessageType<UpdateSchemeActivity> {
    constructor() {
        super("scheme.UpdateSchemeActivity", []);
    }
}
/**
 * @generated MessageType for protobuf message scheme.UpdateSchemeActivity
 */
export const UpdateSchemeActivity = new UpdateSchemeActivity$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateSchemeActivity_Request$Type extends MessageType<UpdateSchemeActivity_Request> {
    constructor() {
        super("scheme.UpdateSchemeActivity.Request", [
            { no: 1, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 2, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 3, name: "scheme_id", kind: "scalar", localName: "scheme_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 4, name: "activity", kind: "message", T: () => SchemeActivity_Week, options: { "buf.validate.field": { required: true } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message scheme.UpdateSchemeActivity.Request
 */
export const UpdateSchemeActivity_Request = new UpdateSchemeActivity_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateSchemeActivity_Response$Type extends MessageType<UpdateSchemeActivity_Response> {
    constructor() {
        super("scheme.UpdateSchemeActivity.Response", []);
    }
}
/**
 * @generated MessageType for protobuf message scheme.UpdateSchemeActivity.Response
 */
export const UpdateSchemeActivity_Response = new UpdateSchemeActivity_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class SchemeFirewall$Type extends MessageType<SchemeFirewall> {
    constructor() {
        super("scheme.SchemeFirewall", []);
    }
}
/**
 * @generated MessageType for protobuf message scheme.SchemeFirewall
 */
export const SchemeFirewall = new SchemeFirewall$Type();
// @generated message type with reflection information, may provide speed optimized methods
class SchemeFirewall_Request$Type extends MessageType<SchemeFirewall_Request> {
    constructor() {
        super("scheme.SchemeFirewall.Request", [
            { no: 1, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 2, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 3, name: "scheme_id", kind: "scalar", localName: "scheme_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message scheme.SchemeFirewall.Request
 */
export const SchemeFirewall_Request = new SchemeFirewall_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class SchemeFirewall_Response$Type extends MessageType<SchemeFirewall_Response> {
    constructor() {
        super("scheme.SchemeFirewall.Response", [
            { no: 1, name: "country", kind: "message", T: () => SchemeFirewall_Countries },
            { no: 2, name: "network", kind: "message", T: () => SchemeFirewall_Networks }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message scheme.SchemeFirewall.Response
 */
export const SchemeFirewall_Response = new SchemeFirewall_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class SchemeFirewall_Countries$Type extends MessageType<SchemeFirewall_Countries> {
    constructor() {
        super("scheme.SchemeFirewall.Countries", [
            { no: 1, name: "wite_list", kind: "scalar", localName: "wite_list", T: 8 /*ScalarType.BOOL*/ },
            { no: 2, name: "total", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 3, name: "list", kind: "message", repeat: 2 /*RepeatType.UNPACKED*/, T: () => Country }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message scheme.SchemeFirewall.Countries
 */
export const SchemeFirewall_Countries = new SchemeFirewall_Countries$Type();
// @generated message type with reflection information, may provide speed optimized methods
class SchemeFirewall_Networks$Type extends MessageType<SchemeFirewall_Networks> {
    constructor() {
        super("scheme.SchemeFirewall.Networks", [
            { no: 1, name: "wite_list", kind: "scalar", localName: "wite_list", T: 8 /*ScalarType.BOOL*/ },
            { no: 2, name: "total", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 3, name: "list", kind: "message", repeat: 2 /*RepeatType.UNPACKED*/, T: () => Network }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message scheme.SchemeFirewall.Networks
 */
export const SchemeFirewall_Networks = new SchemeFirewall_Networks$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddSchemeFirewall$Type extends MessageType<AddSchemeFirewall> {
    constructor() {
        super("scheme.AddSchemeFirewall", []);
    }
}
/**
 * @generated MessageType for protobuf message scheme.AddSchemeFirewall
 */
export const AddSchemeFirewall = new AddSchemeFirewall$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddSchemeFirewall_Request$Type extends MessageType<AddSchemeFirewall_Request> {
    constructor() {
        super("scheme.AddSchemeFirewall.Request", [
            { no: 1, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 2, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 3, name: "scheme_id", kind: "scalar", localName: "scheme_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 4, name: "network", kind: "scalar", oneof: "record", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { ip: true } } } },
            { no: 5, name: "country_code", kind: "scalar", localName: "country_code", oneof: "record", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { len: "2" } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message scheme.AddSchemeFirewall.Request
 */
export const AddSchemeFirewall_Request = new AddSchemeFirewall_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddSchemeFirewall_Response$Type extends MessageType<AddSchemeFirewall_Response> {
    constructor() {
        super("scheme.AddSchemeFirewall.Response", [
            { no: 1, name: "country_id", kind: "scalar", localName: "country_id", oneof: "record", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "network_id", kind: "scalar", localName: "network_id", oneof: "record", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message scheme.AddSchemeFirewall.Response
 */
export const AddSchemeFirewall_Response = new AddSchemeFirewall_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateSchemeFirewall$Type extends MessageType<UpdateSchemeFirewall> {
    constructor() {
        super("scheme.UpdateSchemeFirewall", []);
    }
}
/**
 * @generated MessageType for protobuf message scheme.UpdateSchemeFirewall
 */
export const UpdateSchemeFirewall = new UpdateSchemeFirewall$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateSchemeFirewall_Request$Type extends MessageType<UpdateSchemeFirewall_Request> {
    constructor() {
        super("scheme.UpdateSchemeFirewall.Request", [
            { no: 1, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 2, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 3, name: "scheme_id", kind: "scalar", localName: "scheme_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 4, name: "country", kind: "scalar", oneof: "status", T: 8 /*ScalarType.BOOL*/ },
            { no: 5, name: "network", kind: "scalar", oneof: "status", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message scheme.UpdateSchemeFirewall.Request
 */
export const UpdateSchemeFirewall_Request = new UpdateSchemeFirewall_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateSchemeFirewall_Response$Type extends MessageType<UpdateSchemeFirewall_Response> {
    constructor() {
        super("scheme.UpdateSchemeFirewall.Response", []);
    }
}
/**
 * @generated MessageType for protobuf message scheme.UpdateSchemeFirewall.Response
 */
export const UpdateSchemeFirewall_Response = new UpdateSchemeFirewall_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DeleteSchemeFirewall$Type extends MessageType<DeleteSchemeFirewall> {
    constructor() {
        super("scheme.DeleteSchemeFirewall", []);
    }
}
/**
 * @generated MessageType for protobuf message scheme.DeleteSchemeFirewall
 */
export const DeleteSchemeFirewall = new DeleteSchemeFirewall$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DeleteSchemeFirewall_Request$Type extends MessageType<DeleteSchemeFirewall_Request> {
    constructor() {
        super("scheme.DeleteSchemeFirewall.Request", [
            { no: 1, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 2, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 3, name: "scheme_id", kind: "scalar", localName: "scheme_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 4, name: "country_id", kind: "scalar", localName: "country_id", oneof: "record", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 5, name: "network_id", kind: "scalar", localName: "network_id", oneof: "record", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message scheme.DeleteSchemeFirewall.Request
 */
export const DeleteSchemeFirewall_Request = new DeleteSchemeFirewall_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DeleteSchemeFirewall_Response$Type extends MessageType<DeleteSchemeFirewall_Response> {
    constructor() {
        super("scheme.DeleteSchemeFirewall.Response", []);
    }
}
/**
 * @generated MessageType for protobuf message scheme.DeleteSchemeFirewall.Response
 */
export const DeleteSchemeFirewall_Response = new DeleteSchemeFirewall_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ProfileSchemes$Type extends MessageType<ProfileSchemes> {
    constructor() {
        super("scheme.ProfileSchemes", []);
    }
}
/**
 * @generated MessageType for protobuf message scheme.ProfileSchemes
 */
export const ProfileSchemes = new ProfileSchemes$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ProfileSchemes_Request$Type extends MessageType<ProfileSchemes_Request> {
    constructor() {
        super("scheme.ProfileSchemes.Request", [
            { no: 1, name: "is_admin", kind: "scalar", localName: "is_admin", T: 8 /*ScalarType.BOOL*/ },
            { no: 2, name: "profile_id", kind: "scalar", localName: "profile_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 3, name: "scheme_type", kind: "enum", localName: "scheme_type", T: () => ["access.SchemeType", SchemeType] },
            { no: 4, name: "limit", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 5, name: "offset", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 6, name: "sort_by", kind: "scalar", localName: "sort_by", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message scheme.ProfileSchemes.Request
 */
export const ProfileSchemes_Request = new ProfileSchemes_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ProfileSchemes_Response$Type extends MessageType<ProfileSchemes_Response> {
    constructor() {
        super("scheme.ProfileSchemes.Response", [
            { no: 1, name: "total", kind: "map", K: 5 /*ScalarType.INT32*/, V: { kind: "scalar", T: 5 /*ScalarType.INT32*/ } },
            { no: 2, name: "schemes", kind: "message", repeat: 2 /*RepeatType.UNPACKED*/, T: () => Scheme_Response }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message scheme.ProfileSchemes.Response
 */
export const ProfileSchemes_Response = new ProfileSchemes_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class SystemSchemesByAlias$Type extends MessageType<SystemSchemesByAlias> {
    constructor() {
        super("scheme.SystemSchemesByAlias", []);
    }
}
/**
 * @generated MessageType for protobuf message scheme.SystemSchemesByAlias
 */
export const SystemSchemesByAlias = new SystemSchemesByAlias$Type();
// @generated message type with reflection information, may provide speed optimized methods
class SystemSchemesByAlias_Request$Type extends MessageType<SystemSchemesByAlias_Request> {
    constructor() {
        super("scheme.SystemSchemesByAlias.Request", [
            { no: 1, name: "alias", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { minLen: "3", maxLen: "46", pattern: "^[a-zA-Z0-9_]+$" } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message scheme.SystemSchemesByAlias.Request
 */
export const SystemSchemesByAlias_Request = new SystemSchemesByAlias_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class SystemSchemesByAlias_Response$Type extends MessageType<SystemSchemesByAlias_Response> {
    constructor() {
        super("scheme.SystemSchemesByAlias.Response", [
            { no: 1, name: "total", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 2, name: "schemes", kind: "message", repeat: 2 /*RepeatType.UNPACKED*/, T: () => Scheme_Response }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message scheme.SystemSchemesByAlias.Response
 */
export const SystemSchemesByAlias_Response = new SystemSchemesByAlias_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class SystemSchemeAccess$Type extends MessageType<SystemSchemeAccess> {
    constructor() {
        super("scheme.SystemSchemeAccess", []);
    }
}
/**
 * @generated MessageType for protobuf message scheme.SystemSchemeAccess
 */
export const SystemSchemeAccess = new SystemSchemeAccess$Type();
// @generated message type with reflection information, may provide speed optimized methods
class SystemSchemeAccess_Request$Type extends MessageType<SystemSchemeAccess_Request> {
    constructor() {
        super("scheme.SystemSchemeAccess.Request", [
            { no: 1, name: "scheme_id", kind: "scalar", localName: "scheme_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 2, name: "client_ip", kind: "scalar", localName: "client_ip", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { ip: true } } } },
            { no: 3, name: "timestamp", kind: "message", T: () => Timestamp }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message scheme.SystemSchemeAccess.Request
 */
export const SystemSchemeAccess_Request = new SystemSchemeAccess_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class SystemSchemeAccess_Response$Type extends MessageType<SystemSchemeAccess_Response> {
    constructor() {
        super("scheme.SystemSchemeAccess.Response", [
            { no: 1, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "scheme_type", kind: "enum", localName: "scheme_type", T: () => ["access.SchemeType", SchemeType] },
            { no: 3, name: "access", kind: "message", T: () => AccessScheme }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message scheme.SystemSchemeAccess.Response
 */
export const SystemSchemeAccess_Response = new SystemSchemeAccess_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class SystemHostKey$Type extends MessageType<SystemHostKey> {
    constructor() {
        super("scheme.SystemHostKey", []);
    }
}
/**
 * @generated MessageType for protobuf message scheme.SystemHostKey
 */
export const SystemHostKey = new SystemHostKey$Type();
// @generated message type with reflection information, may provide speed optimized methods
class SystemHostKey_Request$Type extends MessageType<SystemHostKey_Request> {
    constructor() {
        super("scheme.SystemHostKey.Request", [
            { no: 1, name: "scheme_id", kind: "scalar", localName: "scheme_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message scheme.SystemHostKey.Request
 */
export const SystemHostKey_Request = new SystemHostKey_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class SystemHostKey_Response$Type extends MessageType<SystemHostKey_Response> {
    constructor() {
        super("scheme.SystemHostKey.Response", [
            { no: 1, name: "hostkey", kind: "scalar", T: 12 /*ScalarType.BYTES*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message scheme.SystemHostKey.Response
 */
export const SystemHostKey_Response = new SystemHostKey_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class SystemUpdateHostKey$Type extends MessageType<SystemUpdateHostKey> {
    constructor() {
        super("scheme.SystemUpdateHostKey", []);
    }
}
/**
 * @generated MessageType for protobuf message scheme.SystemUpdateHostKey
 */
export const SystemUpdateHostKey = new SystemUpdateHostKey$Type();
// @generated message type with reflection information, may provide speed optimized methods
class SystemUpdateHostKey_Request$Type extends MessageType<SystemUpdateHostKey_Request> {
    constructor() {
        super("scheme.SystemUpdateHostKey.Request", [
            { no: 1, name: "scheme_id", kind: "scalar", localName: "scheme_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 2, name: "hostkey", kind: "scalar", T: 12 /*ScalarType.BYTES*/, options: { "buf.validate.field": { required: true } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message scheme.SystemUpdateHostKey.Request
 */
export const SystemUpdateHostKey_Request = new SystemUpdateHostKey_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class SystemUpdateHostKey_Response$Type extends MessageType<SystemUpdateHostKey_Response> {
    constructor() {
        super("scheme.SystemUpdateHostKey.Response", []);
    }
}
/**
 * @generated MessageType for protobuf message scheme.SystemUpdateHostKey.Response
 */
export const SystemUpdateHostKey_Response = new SystemUpdateHostKey_Response$Type();
/**
 * @generated ServiceType for protobuf service scheme.SchemeHandlers
 */
export const SchemeHandlers = new ServiceType("scheme.SchemeHandlers", [
    { name: "Schemes", options: {}, I: Schemes_Request, O: Schemes_Response },
    { name: "Scheme", options: {}, I: Scheme_Request, O: Scheme_Response },
    { name: "AddScheme", options: {}, I: AddScheme_Request, O: AddScheme_Response },
    { name: "UpdateScheme", options: {}, I: UpdateScheme_Request, O: UpdateScheme_Response },
    { name: "DeleteScheme", options: {}, I: DeleteScheme_Request, O: DeleteScheme_Response },
    { name: "SchemeAccess", options: {}, I: SchemeAccess_Request, O: SchemeAccess_Response },
    { name: "SchemeActivity", options: {}, I: SchemeActivity_Request, O: SchemeActivity_Response },
    { name: "UpdateSchemeActivity", options: {}, I: UpdateSchemeActivity_Request, O: UpdateSchemeActivity_Response },
    { name: "SchemeFirewall", options: {}, I: SchemeFirewall_Request, O: SchemeFirewall_Response },
    { name: "AddSchemeFirewall", options: {}, I: AddSchemeFirewall_Request, O: AddSchemeFirewall_Response },
    { name: "UpdateSchemeFirewall", options: {}, I: UpdateSchemeFirewall_Request, O: UpdateSchemeFirewall_Response },
    { name: "DeleteSchemeFirewall", options: {}, I: DeleteSchemeFirewall_Request, O: DeleteSchemeFirewall_Response },
    { name: "ProfileSchemes", options: {}, I: ProfileSchemes_Request, O: ProfileSchemes_Response },
    { name: "SystemSchemesByAlias", options: {}, I: SystemSchemesByAlias_Request, O: SystemSchemesByAlias_Response },
    { name: "SystemSchemeAccess", options: {}, I: SystemSchemeAccess_Request, O: SystemSchemeAccess_Response },
    { name: "SystemHostKey", options: {}, I: SystemHostKey_Request, O: SystemHostKey_Response },
    { name: "SystemUpdateHostKey", options: {}, I: SystemUpdateHostKey_Request, O: SystemUpdateHostKey_Response }
]);
