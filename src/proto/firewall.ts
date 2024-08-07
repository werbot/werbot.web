// @generated from protobuf file "firewall.proto" (package "firewall", syntax proto3)
// tslint:disable
// @ts-nocheck
import { ServiceType } from "@protobuf-ts/runtime-rpc";
import { MessageType } from "@protobuf-ts/runtime";
/**
 * -----------------------------------------------------
 * global messages
 *
 * @generated from protobuf message firewall.Country
 */
export interface Country {
    /**
     * @generated from protobuf field: string id = 1;
     */
    id: string;
    /**
     * @generated from protobuf field: string server_id = 2;
     */
    server_id: string;
    /**
     * @generated from protobuf field: string country_name = 3;
     */
    country_name: string;
    /**
     * @generated from protobuf field: string country_code = 4;
     */
    country_code: string;
}
/**
 * @generated from protobuf message firewall.Network
 */
export interface Network {
    /**
     * @generated from protobuf field: string id = 1;
     */
    id: string;
    /**
     * @generated from protobuf field: string server_id = 2;
     */
    server_id: string;
    /**
     * @generated from protobuf field: string start_ip = 3;
     */
    start_ip: string;
    /**
     * @generated from protobuf field: string end_ip = 4;
     */
    end_ip: string;
}
/**
 * @generated from protobuf message firewall.AccessList
 */
export interface AccessList {
    /**
     * @generated from protobuf field: string server_id = 1;
     */
    server_id: string;
    /**
     * @generated from protobuf field: bool country = 2;
     */
    country: boolean;
    /**
     * @generated from protobuf field: bool network = 3;
     */
    network: boolean;
}
/**
 * @generated from protobuf message firewall.IpMask
 */
export interface IpMask {
    /**
     * @generated from protobuf field: string start_ip = 1;
     */
    start_ip: string;
    /**
     * @generated from protobuf field: string end_ip = 2;
     */
    end_ip: string;
}
// end global messages
// -----------------------------------------------------

/**
 * rpc ServerFirewall
 *
 * @generated from protobuf message firewall.ServerFirewall
 */
export interface ServerFirewall {
}
/**
 * @generated from protobuf message firewall.ServerFirewall.Request
 */
export interface ServerFirewall_Request {
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
 * @generated from protobuf message firewall.ServerFirewall.Response
 */
export interface ServerFirewall_Response {
    /**
     * @generated from protobuf field: firewall.ServerFirewall.Countries country = 1;
     */
    country?: ServerFirewall_Countries;
    /**
     * @generated from protobuf field: firewall.ServerFirewall.Networks network = 2;
     */
    network?: ServerFirewall_Networks;
}
/**
 * @generated from protobuf message firewall.ServerFirewall.Countries
 */
export interface ServerFirewall_Countries {
    /**
     * @generated from protobuf field: bool wite_list = 1;
     */
    wite_list: boolean;
    /**
     * @generated from protobuf field: repeated firewall.Country list = 2;
     */
    list: Country[];
}
/**
 * @generated from protobuf message firewall.ServerFirewall.Networks
 */
export interface ServerFirewall_Networks {
    /**
     * @generated from protobuf field: bool wite_list = 1;
     */
    wite_list: boolean;
    /**
     * @generated from protobuf field: repeated firewall.Network list = 2;
     */
    list: Network[];
}
/**
 * rpc AddServerFirewall
 *
 * @generated from protobuf message firewall.AddServerFirewall
 */
export interface AddServerFirewall {
}
/**
 * @generated from protobuf message firewall.AddServerFirewall.Request
 */
export interface AddServerFirewall_Request {
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
     * @generated from protobuf oneof: record
     */
    record: {
        oneofKind: "ip";
        /**
         * @generated from protobuf field: firewall.IpMask ip = 4;
         */
        ip: IpMask;
    } | {
        oneofKind: "country_code";
        /**
         * @generated from protobuf field: string country_code = 5;
         */
        country_code: string;
    } | {
        oneofKind: undefined;
    };
}
/**
 * @generated from protobuf message firewall.AddServerFirewall.Response
 */
export interface AddServerFirewall_Response {
    /**
     * @generated from protobuf field: string id = 1;
     */
    id: string;
}
/**
 * rpc UpdateServerFirewall
 *
 * @generated from protobuf message firewall.UpdateServerFirewall
 */
export interface UpdateServerFirewall {
}
/**
 * @generated from protobuf message firewall.UpdateServerFirewall.Request
 */
export interface UpdateServerFirewall_Request {
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
     * @generated from protobuf field: firewall.Rules rule = 4;
     */
    rule: Rules;
    /**
     * @generated from protobuf field: bool status = 5;
     */
    status: boolean;
}
/**
 * @generated from protobuf message firewall.UpdateServerFirewall.Response
 */
export interface UpdateServerFirewall_Response {
}
/**
 * rpc DeleteServerFirewall
 *
 * @generated from protobuf message firewall.DeleteServerFirewall
 */
export interface DeleteServerFirewall {
}
/**
 * @generated from protobuf message firewall.DeleteServerFirewall.Request
 */
export interface DeleteServerFirewall_Request {
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
     * @generated from protobuf field: firewall.Rules rule = 4;
     */
    rule: Rules;
    /**
     * @generated from protobuf field: string record_id = 5;
     */
    record_id: string; // @gotags: query:"record_id"
}
/**
 * @generated from protobuf message firewall.DeleteServerFirewall.Response
 */
export interface DeleteServerFirewall_Response {
}
/**
 * rpc IPAccess
 *
 * @generated from protobuf message firewall.IPAccess
 */
export interface IPAccess {
}
/**
 * @generated from protobuf message firewall.IPAccess.Request
 */
export interface IPAccess_Request {
    /**
     * @generated from protobuf field: string client_ip = 1;
     */
    client_ip: string;
}
/**
 * @generated from protobuf message firewall.IPAccess.Response
 */
export interface IPAccess_Response {
}
/**
 * rpc ServerAccess
 *
 * @generated from protobuf message firewall.ServerAccess
 */
export interface ServerAccess {
}
/**
 * @generated from protobuf message firewall.ServerAccess.Request
 */
export interface ServerAccess_Request {
    /**
     * @generated from protobuf field: string user_id = 1;
     */
    user_id: string; // @gotags: query:"user_id"
    /**
     * @generated from protobuf field: string server_id = 2;
     */
    server_id: string; // @gotags: query:"server_id"
    /**
     * @generated from protobuf field: string member_ip = 3;
     */
    member_ip: string; // @gotags: query:"member_ip"
}
/**
 * @generated from protobuf message firewall.ServerAccess.Response
 */
export interface ServerAccess_Response {
}
/**
 * rpc ServerAccessUser
 *
 * @generated from protobuf message firewall.ServerAccessUser
 */
export interface ServerAccessUser {
}
/**
 * @generated from protobuf message firewall.ServerAccessUser.Request
 */
export interface ServerAccessUser_Request {
    /**
     * @generated from protobuf field: string user_id = 1;
     */
    user_id: string;
    /**
     * @generated from protobuf field: string server_id = 2;
     */
    server_id: string;
}
/**
 * @generated from protobuf message firewall.ServerAccessUser.Response
 */
export interface ServerAccessUser_Response {
}
/**
 * rpc ServerAccessTime
 *
 * @generated from protobuf message firewall.ServerAccessTime
 */
export interface ServerAccessTime {
}
/**
 * @generated from protobuf message firewall.ServerAccessTime.Request
 */
export interface ServerAccessTime_Request {
    /**
     * @generated from protobuf field: string server_id = 1;
     */
    server_id: string;
}
/**
 * @generated from protobuf message firewall.ServerAccessTime.Response
 */
export interface ServerAccessTime_Response {
}
/**
 * rpc ServerAccessIP
 *
 * @generated from protobuf message firewall.ServerAccessIP
 */
export interface ServerAccessIP {
}
/**
 * @generated from protobuf message firewall.ServerAccessIP.Request
 */
export interface ServerAccessIP_Request {
    /**
     * @generated from protobuf field: string server_id = 1;
     */
    server_id: string;
    /**
     * @generated from protobuf field: string member_ip = 2;
     */
    member_ip: string;
}
/**
 * @generated from protobuf message firewall.ServerAccessIP.Response
 */
export interface ServerAccessIP_Response {
}
/**
 * rpc ServerAccessCountry
 *
 * @generated from protobuf message firewall.ServerAccessCountry
 */
export interface ServerAccessCountry {
}
/**
 * @generated from protobuf message firewall.ServerAccessCountry.Request
 */
export interface ServerAccessCountry_Request {
    /**
     * @generated from protobuf field: string server_id = 1;
     */
    server_id: string;
    /**
     * @generated from protobuf field: string member_ip = 2;
     */
    member_ip: string;
}
/**
 * @generated from protobuf message firewall.ServerAccessCountry.Response
 */
export interface ServerAccessCountry_Response {
}
/**
 * @generated from protobuf enum firewall.Rules
 */
export enum Rules {
    /**
     * @generated from protobuf enum value: unspecified = 0;
     */
    unspecified = 0,
    /**
     * @generated from protobuf enum value: country = 1;
     */
    country = 1,
    /**
     * @generated from protobuf enum value: ip = 2;
     */
    ip = 2
}
// @generated message type with reflection information, may provide speed optimized methods
class Country$Type extends MessageType<Country> {
    constructor() {
        super("firewall.Country", [
            { no: 1, name: "id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "server_id", kind: "scalar", localName: "server_id", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "country_name", kind: "scalar", localName: "country_name", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "country_code", kind: "scalar", localName: "country_code", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message firewall.Country
 */
export const Country = new Country$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Network$Type extends MessageType<Network> {
    constructor() {
        super("firewall.Network", [
            { no: 1, name: "id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "server_id", kind: "scalar", localName: "server_id", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "start_ip", kind: "scalar", localName: "start_ip", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "end_ip", kind: "scalar", localName: "end_ip", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message firewall.Network
 */
export const Network = new Network$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AccessList$Type extends MessageType<AccessList> {
    constructor() {
        super("firewall.AccessList", [
            { no: 1, name: "server_id", kind: "scalar", localName: "server_id", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "country", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 3, name: "network", kind: "scalar", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message firewall.AccessList
 */
export const AccessList = new AccessList$Type();
// @generated message type with reflection information, may provide speed optimized methods
class IpMask$Type extends MessageType<IpMask> {
    constructor() {
        super("firewall.IpMask", [
            { no: 1, name: "start_ip", kind: "scalar", localName: "start_ip", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "end_ip", kind: "scalar", localName: "end_ip", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message firewall.IpMask
 */
export const IpMask = new IpMask$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ServerFirewall$Type extends MessageType<ServerFirewall> {
    constructor() {
        super("firewall.ServerFirewall", []);
    }
}
/**
 * @generated MessageType for protobuf message firewall.ServerFirewall
 */
export const ServerFirewall = new ServerFirewall$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ServerFirewall_Request$Type extends MessageType<ServerFirewall_Request> {
    constructor() {
        super("firewall.ServerFirewall.Request", [
            { no: 1, name: "user_id", kind: "scalar", localName: "user_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true }, ignoreEmpty: true } } },
            { no: 2, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 3, name: "server_id", kind: "scalar", localName: "server_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message firewall.ServerFirewall.Request
 */
export const ServerFirewall_Request = new ServerFirewall_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ServerFirewall_Response$Type extends MessageType<ServerFirewall_Response> {
    constructor() {
        super("firewall.ServerFirewall.Response", [
            { no: 1, name: "country", kind: "message", T: () => ServerFirewall_Countries },
            { no: 2, name: "network", kind: "message", T: () => ServerFirewall_Networks }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message firewall.ServerFirewall.Response
 */
export const ServerFirewall_Response = new ServerFirewall_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ServerFirewall_Countries$Type extends MessageType<ServerFirewall_Countries> {
    constructor() {
        super("firewall.ServerFirewall.Countries", [
            { no: 1, name: "wite_list", kind: "scalar", localName: "wite_list", T: 8 /*ScalarType.BOOL*/ },
            { no: 2, name: "list", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Country }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message firewall.ServerFirewall.Countries
 */
export const ServerFirewall_Countries = new ServerFirewall_Countries$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ServerFirewall_Networks$Type extends MessageType<ServerFirewall_Networks> {
    constructor() {
        super("firewall.ServerFirewall.Networks", [
            { no: 1, name: "wite_list", kind: "scalar", localName: "wite_list", T: 8 /*ScalarType.BOOL*/ },
            { no: 2, name: "list", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Network }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message firewall.ServerFirewall.Networks
 */
export const ServerFirewall_Networks = new ServerFirewall_Networks$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddServerFirewall$Type extends MessageType<AddServerFirewall> {
    constructor() {
        super("firewall.AddServerFirewall", []);
    }
}
/**
 * @generated MessageType for protobuf message firewall.AddServerFirewall
 */
export const AddServerFirewall = new AddServerFirewall$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddServerFirewall_Request$Type extends MessageType<AddServerFirewall_Request> {
    constructor() {
        super("firewall.AddServerFirewall.Request", [
            { no: 1, name: "user_id", kind: "scalar", localName: "user_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true }, ignoreEmpty: true } } },
            { no: 2, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 3, name: "server_id", kind: "scalar", localName: "server_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 4, name: "ip", kind: "message", oneof: "record", T: () => IpMask },
            { no: 5, name: "country_code", kind: "scalar", localName: "country_code", oneof: "record", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { len: "2" } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message firewall.AddServerFirewall.Request
 */
export const AddServerFirewall_Request = new AddServerFirewall_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddServerFirewall_Response$Type extends MessageType<AddServerFirewall_Response> {
    constructor() {
        super("firewall.AddServerFirewall.Response", [
            { no: 1, name: "id", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message firewall.AddServerFirewall.Response
 */
export const AddServerFirewall_Response = new AddServerFirewall_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateServerFirewall$Type extends MessageType<UpdateServerFirewall> {
    constructor() {
        super("firewall.UpdateServerFirewall", []);
    }
}
/**
 * @generated MessageType for protobuf message firewall.UpdateServerFirewall
 */
export const UpdateServerFirewall = new UpdateServerFirewall$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateServerFirewall_Request$Type extends MessageType<UpdateServerFirewall_Request> {
    constructor() {
        super("firewall.UpdateServerFirewall.Request", [
            { no: 1, name: "user_id", kind: "scalar", localName: "user_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true }, ignoreEmpty: true } } },
            { no: 2, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 3, name: "server_id", kind: "scalar", localName: "server_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 4, name: "rule", kind: "enum", T: () => ["firewall.Rules", Rules] },
            { no: 5, name: "status", kind: "scalar", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message firewall.UpdateServerFirewall.Request
 */
export const UpdateServerFirewall_Request = new UpdateServerFirewall_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateServerFirewall_Response$Type extends MessageType<UpdateServerFirewall_Response> {
    constructor() {
        super("firewall.UpdateServerFirewall.Response", []);
    }
}
/**
 * @generated MessageType for protobuf message firewall.UpdateServerFirewall.Response
 */
export const UpdateServerFirewall_Response = new UpdateServerFirewall_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DeleteServerFirewall$Type extends MessageType<DeleteServerFirewall> {
    constructor() {
        super("firewall.DeleteServerFirewall", []);
    }
}
/**
 * @generated MessageType for protobuf message firewall.DeleteServerFirewall
 */
export const DeleteServerFirewall = new DeleteServerFirewall$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DeleteServerFirewall_Request$Type extends MessageType<DeleteServerFirewall_Request> {
    constructor() {
        super("firewall.DeleteServerFirewall.Request", [
            { no: 1, name: "user_id", kind: "scalar", localName: "user_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true }, ignoreEmpty: true } } },
            { no: 2, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 3, name: "server_id", kind: "scalar", localName: "server_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 4, name: "rule", kind: "enum", T: () => ["firewall.Rules", Rules] },
            { no: 5, name: "record_id", kind: "scalar", localName: "record_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message firewall.DeleteServerFirewall.Request
 */
export const DeleteServerFirewall_Request = new DeleteServerFirewall_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DeleteServerFirewall_Response$Type extends MessageType<DeleteServerFirewall_Response> {
    constructor() {
        super("firewall.DeleteServerFirewall.Response", []);
    }
}
/**
 * @generated MessageType for protobuf message firewall.DeleteServerFirewall.Response
 */
export const DeleteServerFirewall_Response = new DeleteServerFirewall_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class IPAccess$Type extends MessageType<IPAccess> {
    constructor() {
        super("firewall.IPAccess", []);
    }
}
/**
 * @generated MessageType for protobuf message firewall.IPAccess
 */
export const IPAccess = new IPAccess$Type();
// @generated message type with reflection information, may provide speed optimized methods
class IPAccess_Request$Type extends MessageType<IPAccess_Request> {
    constructor() {
        super("firewall.IPAccess.Request", [
            { no: 1, name: "client_ip", kind: "scalar", localName: "client_ip", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { ip: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message firewall.IPAccess.Request
 */
export const IPAccess_Request = new IPAccess_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class IPAccess_Response$Type extends MessageType<IPAccess_Response> {
    constructor() {
        super("firewall.IPAccess.Response", []);
    }
}
/**
 * @generated MessageType for protobuf message firewall.IPAccess.Response
 */
export const IPAccess_Response = new IPAccess_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ServerAccess$Type extends MessageType<ServerAccess> {
    constructor() {
        super("firewall.ServerAccess", []);
    }
}
/**
 * @generated MessageType for protobuf message firewall.ServerAccess
 */
export const ServerAccess = new ServerAccess$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ServerAccess_Request$Type extends MessageType<ServerAccess_Request> {
    constructor() {
        super("firewall.ServerAccess.Request", [
            { no: 1, name: "user_id", kind: "scalar", localName: "user_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true }, ignoreEmpty: true } } },
            { no: 2, name: "server_id", kind: "scalar", localName: "server_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 3, name: "member_ip", kind: "scalar", localName: "member_ip", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { ip: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message firewall.ServerAccess.Request
 */
export const ServerAccess_Request = new ServerAccess_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ServerAccess_Response$Type extends MessageType<ServerAccess_Response> {
    constructor() {
        super("firewall.ServerAccess.Response", []);
    }
}
/**
 * @generated MessageType for protobuf message firewall.ServerAccess.Response
 */
export const ServerAccess_Response = new ServerAccess_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ServerAccessUser$Type extends MessageType<ServerAccessUser> {
    constructor() {
        super("firewall.ServerAccessUser", []);
    }
}
/**
 * @generated MessageType for protobuf message firewall.ServerAccessUser
 */
export const ServerAccessUser = new ServerAccessUser$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ServerAccessUser_Request$Type extends MessageType<ServerAccessUser_Request> {
    constructor() {
        super("firewall.ServerAccessUser.Request", [
            { no: 1, name: "user_id", kind: "scalar", localName: "user_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true }, ignoreEmpty: true } } },
            { no: 2, name: "server_id", kind: "scalar", localName: "server_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message firewall.ServerAccessUser.Request
 */
export const ServerAccessUser_Request = new ServerAccessUser_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ServerAccessUser_Response$Type extends MessageType<ServerAccessUser_Response> {
    constructor() {
        super("firewall.ServerAccessUser.Response", []);
    }
}
/**
 * @generated MessageType for protobuf message firewall.ServerAccessUser.Response
 */
export const ServerAccessUser_Response = new ServerAccessUser_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ServerAccessTime$Type extends MessageType<ServerAccessTime> {
    constructor() {
        super("firewall.ServerAccessTime", []);
    }
}
/**
 * @generated MessageType for protobuf message firewall.ServerAccessTime
 */
export const ServerAccessTime = new ServerAccessTime$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ServerAccessTime_Request$Type extends MessageType<ServerAccessTime_Request> {
    constructor() {
        super("firewall.ServerAccessTime.Request", [
            { no: 1, name: "server_id", kind: "scalar", localName: "server_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message firewall.ServerAccessTime.Request
 */
export const ServerAccessTime_Request = new ServerAccessTime_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ServerAccessTime_Response$Type extends MessageType<ServerAccessTime_Response> {
    constructor() {
        super("firewall.ServerAccessTime.Response", []);
    }
}
/**
 * @generated MessageType for protobuf message firewall.ServerAccessTime.Response
 */
export const ServerAccessTime_Response = new ServerAccessTime_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ServerAccessIP$Type extends MessageType<ServerAccessIP> {
    constructor() {
        super("firewall.ServerAccessIP", []);
    }
}
/**
 * @generated MessageType for protobuf message firewall.ServerAccessIP
 */
export const ServerAccessIP = new ServerAccessIP$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ServerAccessIP_Request$Type extends MessageType<ServerAccessIP_Request> {
    constructor() {
        super("firewall.ServerAccessIP.Request", [
            { no: 1, name: "server_id", kind: "scalar", localName: "server_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 2, name: "member_ip", kind: "scalar", localName: "member_ip", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { ip: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message firewall.ServerAccessIP.Request
 */
export const ServerAccessIP_Request = new ServerAccessIP_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ServerAccessIP_Response$Type extends MessageType<ServerAccessIP_Response> {
    constructor() {
        super("firewall.ServerAccessIP.Response", []);
    }
}
/**
 * @generated MessageType for protobuf message firewall.ServerAccessIP.Response
 */
export const ServerAccessIP_Response = new ServerAccessIP_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ServerAccessCountry$Type extends MessageType<ServerAccessCountry> {
    constructor() {
        super("firewall.ServerAccessCountry", []);
    }
}
/**
 * @generated MessageType for protobuf message firewall.ServerAccessCountry
 */
export const ServerAccessCountry = new ServerAccessCountry$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ServerAccessCountry_Request$Type extends MessageType<ServerAccessCountry_Request> {
    constructor() {
        super("firewall.ServerAccessCountry.Request", [
            { no: 1, name: "server_id", kind: "scalar", localName: "server_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 2, name: "member_ip", kind: "scalar", localName: "member_ip", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { ip: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message firewall.ServerAccessCountry.Request
 */
export const ServerAccessCountry_Request = new ServerAccessCountry_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ServerAccessCountry_Response$Type extends MessageType<ServerAccessCountry_Response> {
    constructor() {
        super("firewall.ServerAccessCountry.Response", []);
    }
}
/**
 * @generated MessageType for protobuf message firewall.ServerAccessCountry.Response
 */
export const ServerAccessCountry_Response = new ServerAccessCountry_Response$Type();
/**
 * @generated ServiceType for protobuf service firewall.FirewallHandlers
 */
export const FirewallHandlers = new ServiceType("firewall.FirewallHandlers", [
    { name: "IPAccess", options: {}, I: IPAccess_Request, O: IPAccess_Response },
    { name: "ServerFirewall", options: {}, I: ServerFirewall_Request, O: ServerFirewall_Response },
    { name: "AddServerFirewall", options: {}, I: AddServerFirewall_Request, O: AddServerFirewall_Response },
    { name: "UpdateServerFirewall", options: {}, I: UpdateServerFirewall_Request, O: UpdateServerFirewall_Response },
    { name: "DeleteServerFirewall", options: {}, I: DeleteServerFirewall_Request, O: DeleteServerFirewall_Response },
    { name: "ServerAccess", options: {}, I: ServerAccess_Request, O: ServerAccess_Response },
    { name: "ServerAccessUser", options: {}, I: ServerAccessUser_Request, O: ServerAccessUser_Response },
    { name: "ServerAccessTime", options: {}, I: ServerAccessTime_Request, O: ServerAccessTime_Response },
    { name: "ServerAccessIP", options: {}, I: ServerAccessIP_Request, O: ServerAccessIP_Response },
    { name: "ServerAccessCountry", options: {}, I: ServerAccessCountry_Request, O: ServerAccessCountry_Response }
]);
