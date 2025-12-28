// @generated from protobuf file "license.proto" (package "license", syntax proto3)
// tslint:disable
// @ts-nocheck
import { ServiceType } from "@protobuf-ts/runtime-rpc";
import { MessageType } from "@protobuf-ts/runtime";
import { Timestamp } from "./google/protobuf/timestamp";
/**
 * rpc License
 *
 * @generated from protobuf message license.License
 */
export interface License {
}
/**
 * @generated from protobuf message license.License.Request
 */
export interface License_Request {
    /**
     * string license = 1 [(buf.validate.field).string.pattern =
     * '^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$'];
     *
     * @generated from protobuf field: bytes license = 1
     */
    license: Uint8Array;
}
/**
 * @generated from protobuf message license.License.Response
 */
export interface License_Response {
    /**
     * @generated from protobuf field: int32 version = 1
     */
    version: number;
    /**
     * @generated from protobuf field: string issued = 2
     */
    issued: string;
    /**
     * @generated from protobuf field: string customer = 3
     */
    customer: string;
    /**
     * @generated from protobuf field: string subscriber = 4
     */
    subscriber: string;
    /**
     * @generated from protobuf field: string type = 5
     */
    type: string;
    /**
     * @generated from protobuf field: repeated string ip = 6
     */
    ip: string[];
    /**
     * @generated from protobuf field: google.protobuf.Timestamp issued_at = 7
     */
    issued_at?: Timestamp;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp expires_at = 8
     */
    expires_at?: Timestamp;
    /**
     * @generated from protobuf field: map<string, int32> limits = 9
     */
    limits: {
        [key: string]: number;
    };
    /**
     * @generated from protobuf field: repeated string modules = 10
     */
    modules: string[];
    /**
     * @generated from protobuf field: bool expired = 11
     */
    expired: boolean;
}
// @generated message type with reflection information, may provide speed optimized methods
class License$Type extends MessageType<License> {
    constructor() {
        super("license.License", []);
    }
}
/**
 * @generated MessageType for protobuf message license.License
 */
export const License = new License$Type();
// @generated message type with reflection information, may provide speed optimized methods
class License_Request$Type extends MessageType<License_Request> {
    constructor() {
        super("license.License.Request", [
            { no: 1, name: "license", kind: "scalar", T: 12 /*ScalarType.BYTES*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message license.License.Request
 */
export const License_Request = new License_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class License_Response$Type extends MessageType<License_Response> {
    constructor() {
        super("license.License.Response", [
            { no: 1, name: "version", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 2, name: "issued", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "customer", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "subscriber", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "type", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 6, name: "ip", kind: "scalar", repeat: 2 /*RepeatType.UNPACKED*/, T: 9 /*ScalarType.STRING*/ },
            { no: 7, name: "issued_at", kind: "message", localName: "issued_at", T: () => Timestamp },
            { no: 8, name: "expires_at", kind: "message", localName: "expires_at", T: () => Timestamp },
            { no: 9, name: "limits", kind: "map", K: 9 /*ScalarType.STRING*/, V: { kind: "scalar", T: 5 /*ScalarType.INT32*/ } },
            { no: 10, name: "modules", kind: "scalar", repeat: 2 /*RepeatType.UNPACKED*/, T: 9 /*ScalarType.STRING*/ },
            { no: 11, name: "expired", kind: "scalar", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message license.License.Response
 */
export const License_Response = new License_Response$Type();
/**
 * @generated ServiceType for protobuf service license.LicenseHandlers
 */
export const LicenseHandlers = new ServiceType("license.LicenseHandlers", [
    { name: "License", options: {}, I: License_Request, O: License_Response }
]);
