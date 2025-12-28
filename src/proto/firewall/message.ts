// @generated from protobuf file "message.proto" (package "firewall", syntax proto3)
// tslint:disable
// @ts-nocheck
import { MessageType } from "@protobuf-ts/runtime";
/**
 * -----------------------------------------------------
 * global messages
 *
 * @generated from protobuf message firewall.AccessPolicy
 */
export interface AccessPolicy {
    /**
     * @generated from protobuf field: int32 country = 1
     */
    country: number;
    /**
     * @generated from protobuf field: int32 network = 2
     */
    network: number;
}
/**
 * @generated from protobuf message firewall.Country
 */
export interface Country {
    /**
     * @generated from protobuf field: string country_id = 1
     */
    country_id: string;
    /**
     * @generated from protobuf field: string scheme_id = 2
     */
    scheme_id: string;
    /**
     * @generated from protobuf field: string country_name = 3
     */
    country_name: string;
    /**
     * @generated from protobuf field: string country_code = 4
     */
    country_code: string;
}
/**
 * @generated from protobuf message firewall.Network
 */
export interface Network {
    /**
     * @generated from protobuf field: string network_id = 1
     */
    network_id: string;
    /**
     * @generated from protobuf field: string scheme_id = 2
     */
    scheme_id: string;
    /**
     * @generated from protobuf field: string network = 3
     */
    network: string;
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
     * @generated from protobuf field: string client_ip = 1
     */
    client_ip: string; // @gotags: json:"-"
}
/**
 * @generated from protobuf message firewall.IPAccess.Response
 */
export interface IPAccess_Response {
    /**
     * @generated from protobuf field: string country_name = 1
     */
    country_name: string;
    /**
     * @generated from protobuf field: string country_code = 2
     */
    country_code: string;
}
/**
 * rpc UpdateFirewallListData
 *
 * @generated from protobuf message firewall.UpdateFirewallListData
 */
export interface UpdateFirewallListData {
}
/**
 * @generated from protobuf message firewall.UpdateFirewallListData.Request
 */
export interface UpdateFirewallListData_Request {
}
/**
 * @generated from protobuf message firewall.UpdateFirewallListData.Response
 */
export interface UpdateFirewallListData_Response {
}
// @generated message type with reflection information, may provide speed optimized methods
class AccessPolicy$Type extends MessageType<AccessPolicy> {
    constructor() {
        super("firewall.AccessPolicy", [
            { no: 1, name: "country", kind: "scalar", T: 5 /*ScalarType.INT32*/, options: { "buf.validate.field": { required: true, int32: { in: [0, 1] } } } },
            { no: 2, name: "network", kind: "scalar", T: 5 /*ScalarType.INT32*/, options: { "buf.validate.field": { required: true, int32: { in: [0, 1] } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message firewall.AccessPolicy
 */
export const AccessPolicy = new AccessPolicy$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Country$Type extends MessageType<Country> {
    constructor() {
        super("firewall.Country", [
            { no: 1, name: "country_id", kind: "scalar", localName: "country_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 2, name: "scheme_id", kind: "scalar", localName: "scheme_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 3, name: "country_name", kind: "scalar", localName: "country_name", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "country_code", kind: "scalar", localName: "country_code", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { len: "2" } } } }
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
            { no: 1, name: "network_id", kind: "scalar", localName: "network_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 2, name: "scheme_id", kind: "scalar", localName: "scheme_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 3, name: "network", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { ip: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message firewall.Network
 */
export const Network = new Network$Type();
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
            { no: 1, name: "client_ip", kind: "scalar", localName: "client_ip", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { ip: true } } } }
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
        super("firewall.IPAccess.Response", [
            { no: 1, name: "country_name", kind: "scalar", localName: "country_name", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "country_code", kind: "scalar", localName: "country_code", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message firewall.IPAccess.Response
 */
export const IPAccess_Response = new IPAccess_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateFirewallListData$Type extends MessageType<UpdateFirewallListData> {
    constructor() {
        super("firewall.UpdateFirewallListData", []);
    }
}
/**
 * @generated MessageType for protobuf message firewall.UpdateFirewallListData
 */
export const UpdateFirewallListData = new UpdateFirewallListData$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateFirewallListData_Request$Type extends MessageType<UpdateFirewallListData_Request> {
    constructor() {
        super("firewall.UpdateFirewallListData.Request", []);
    }
}
/**
 * @generated MessageType for protobuf message firewall.UpdateFirewallListData.Request
 */
export const UpdateFirewallListData_Request = new UpdateFirewallListData_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateFirewallListData_Response$Type extends MessageType<UpdateFirewallListData_Response> {
    constructor() {
        super("firewall.UpdateFirewallListData.Response", []);
    }
}
/**
 * @generated MessageType for protobuf message firewall.UpdateFirewallListData.Response
 */
export const UpdateFirewallListData_Response = new UpdateFirewallListData_Response$Type();
