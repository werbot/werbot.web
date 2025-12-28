// @generated from protobuf file "system.proto" (package "system", syntax proto3)
// tslint:disable
// @ts-nocheck
import { ServiceType } from "@protobuf-ts/runtime-rpc";
import { MessageType } from "@protobuf-ts/runtime";
/**
 * rpc ProfileMetrics
 *
 * @generated from protobuf message system.ProfileMetrics
 */
export interface ProfileMetrics {
}
/**
 * @generated from protobuf message system.ProfileMetrics.Request
 */
export interface ProfileMetrics_Request {
    /**
     * @generated from protobuf field: bool is_admin = 1
     */
    is_admin: boolean; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string profile_id = 2
     */
    profile_id: string; // @gotags: json:"-"
}
/**
 * @generated from protobuf message system.ProfileMetrics.Response
 */
export interface ProfileMetrics_Response {
    /**
     * @generated from protobuf field: int32 profiles = 1
     */
    profiles: number;
    /**
     * @generated from protobuf field: int32 projects = 2
     */
    projects: number;
    /**
     * @generated from protobuf field: int32 schemes = 3
     */
    schemes: number;
}
/**
 * rpc GetInfo
 *
 * @generated from protobuf message system.Countries
 */
export interface Countries {
}
/**
 * @generated from protobuf message system.Countries.Request
 */
export interface Countries_Request {
    /**
     * @generated from protobuf field: string name = 1
     */
    name: string;
}
/**
 * @generated from protobuf message system.Countries.Response
 */
export interface Countries_Response {
    /**
     * @generated from protobuf field: repeated system.Countries.Country countries = 1
     */
    countries: Countries_Country[];
}
/**
 * @generated from protobuf message system.Countries.Country
 */
export interface Countries_Country {
    /**
     * @generated from protobuf field: string code = 1
     */
    code: string;
    /**
     * @generated from protobuf field: string name = 2
     */
    name: string;
}
/**
 * rpc CountryByIP
 *
 * @generated from protobuf message system.CountryByIP
 */
export interface CountryByIP {
}
/**
 * @generated from protobuf message system.CountryByIP.Request
 */
export interface CountryByIP_Request {
    /**
     * @generated from protobuf field: string ip = 1
     */
    ip: string;
}
/**
 * @generated from protobuf message system.CountryByIP.Response
 */
export interface CountryByIP_Response {
    /**
     * @generated from protobuf field: string name = 1
     */
    name: string;
    /**
     * @generated from protobuf field: string code = 2
     */
    code: string;
}
// @generated message type with reflection information, may provide speed optimized methods
class ProfileMetrics$Type extends MessageType<ProfileMetrics> {
    constructor() {
        super("system.ProfileMetrics", []);
    }
}
/**
 * @generated MessageType for protobuf message system.ProfileMetrics
 */
export const ProfileMetrics = new ProfileMetrics$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ProfileMetrics_Request$Type extends MessageType<ProfileMetrics_Request> {
    constructor() {
        super("system.ProfileMetrics.Request", [
            { no: 1, name: "is_admin", kind: "scalar", localName: "is_admin", T: 8 /*ScalarType.BOOL*/ },
            { no: 2, name: "profile_id", kind: "scalar", localName: "profile_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message system.ProfileMetrics.Request
 */
export const ProfileMetrics_Request = new ProfileMetrics_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ProfileMetrics_Response$Type extends MessageType<ProfileMetrics_Response> {
    constructor() {
        super("system.ProfileMetrics.Response", [
            { no: 1, name: "profiles", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 2, name: "projects", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 3, name: "schemes", kind: "scalar", T: 5 /*ScalarType.INT32*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message system.ProfileMetrics.Response
 */
export const ProfileMetrics_Response = new ProfileMetrics_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Countries$Type extends MessageType<Countries> {
    constructor() {
        super("system.Countries", []);
    }
}
/**
 * @generated MessageType for protobuf message system.Countries
 */
export const Countries = new Countries$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Countries_Request$Type extends MessageType<Countries_Request> {
    constructor() {
        super("system.Countries.Request", [
            { no: 1, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { minLen: "3" } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message system.Countries.Request
 */
export const Countries_Request = new Countries_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Countries_Response$Type extends MessageType<Countries_Response> {
    constructor() {
        super("system.Countries.Response", [
            { no: 1, name: "countries", kind: "message", repeat: 2 /*RepeatType.UNPACKED*/, T: () => Countries_Country }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message system.Countries.Response
 */
export const Countries_Response = new Countries_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Countries_Country$Type extends MessageType<Countries_Country> {
    constructor() {
        super("system.Countries.Country", [
            { no: 1, name: "code", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message system.Countries.Country
 */
export const Countries_Country = new Countries_Country$Type();
// @generated message type with reflection information, may provide speed optimized methods
class CountryByIP$Type extends MessageType<CountryByIP> {
    constructor() {
        super("system.CountryByIP", []);
    }
}
/**
 * @generated MessageType for protobuf message system.CountryByIP
 */
export const CountryByIP = new CountryByIP$Type();
// @generated message type with reflection information, may provide speed optimized methods
class CountryByIP_Request$Type extends MessageType<CountryByIP_Request> {
    constructor() {
        super("system.CountryByIP.Request", [
            { no: 1, name: "ip", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { ip: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message system.CountryByIP.Request
 */
export const CountryByIP_Request = new CountryByIP_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class CountryByIP_Response$Type extends MessageType<CountryByIP_Response> {
    constructor() {
        super("system.CountryByIP.Response", [
            { no: 1, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "code", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message system.CountryByIP.Response
 */
export const CountryByIP_Response = new CountryByIP_Response$Type();
/**
 * @generated ServiceType for protobuf service system.SystemHandlers
 */
export const SystemHandlers = new ServiceType("system.SystemHandlers", [
    { name: "ProfileMetrics", options: {}, I: ProfileMetrics_Request, O: ProfileMetrics_Response },
    { name: "Countries", options: {}, I: Countries_Request, O: Countries_Response },
    { name: "CountryByIP", options: {}, I: CountryByIP_Request, O: CountryByIP_Response }
]);
