// @generated from protobuf file "utility.proto" (package "utility", syntax proto3)
// tslint:disable
// @ts-nocheck
import { ServiceType } from "@protobuf-ts/runtime-rpc";
import { MessageType } from "@protobuf-ts/runtime";
/**
 * rpc GetInfo
 *
 * @generated from protobuf message utility.Countries
 */
export interface Countries {
}
/**
 * @generated from protobuf message utility.Countries.Request
 */
export interface Countries_Request {
    /**
     * @generated from protobuf field: string name = 1;
     */
    name: string;
}
/**
 * @generated from protobuf message utility.Countries.Response
 */
export interface Countries_Response {
    /**
     * @generated from protobuf field: repeated utility.Countries.Country countries = 1;
     */
    countries: Countries_Country[];
}
/**
 * @generated from protobuf message utility.Countries.Country
 */
export interface Countries_Country {
    /**
     * @generated from protobuf field: string code = 1;
     */
    code: string;
    /**
     * @generated from protobuf field: string name = 2;
     */
    name: string;
}
/**
 * rpc CountryByIP
 *
 * @generated from protobuf message utility.CountryByIP
 */
export interface CountryByIP {
}
/**
 * @generated from protobuf message utility.CountryByIP.Request
 */
export interface CountryByIP_Request {
    /**
     * @generated from protobuf field: string ip = 1;
     */
    ip: string;
}
/**
 * @generated from protobuf message utility.CountryByIP.Response
 */
export interface CountryByIP_Response {
    /**
     * @generated from protobuf field: string name = 1;
     */
    name: string;
    /**
     * @generated from protobuf field: string code = 2;
     */
    code: string;
}
// @generated message type with reflection information, may provide speed optimized methods
class Countries$Type extends MessageType<Countries> {
    constructor() {
        super("utility.Countries", []);
    }
}
/**
 * @generated MessageType for protobuf message utility.Countries
 */
export const Countries = new Countries$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Countries_Request$Type extends MessageType<Countries_Request> {
    constructor() {
        super("utility.Countries.Request", [
            { no: 1, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { minLen: "2" } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message utility.Countries.Request
 */
export const Countries_Request = new Countries_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Countries_Response$Type extends MessageType<Countries_Response> {
    constructor() {
        super("utility.Countries.Response", [
            { no: 1, name: "countries", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Countries_Country }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message utility.Countries.Response
 */
export const Countries_Response = new Countries_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Countries_Country$Type extends MessageType<Countries_Country> {
    constructor() {
        super("utility.Countries.Country", [
            { no: 1, name: "code", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message utility.Countries.Country
 */
export const Countries_Country = new Countries_Country$Type();
// @generated message type with reflection information, may provide speed optimized methods
class CountryByIP$Type extends MessageType<CountryByIP> {
    constructor() {
        super("utility.CountryByIP", []);
    }
}
/**
 * @generated MessageType for protobuf message utility.CountryByIP
 */
export const CountryByIP = new CountryByIP$Type();
// @generated message type with reflection information, may provide speed optimized methods
class CountryByIP_Request$Type extends MessageType<CountryByIP_Request> {
    constructor() {
        super("utility.CountryByIP.Request", [
            { no: 1, name: "ip", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { ip: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message utility.CountryByIP.Request
 */
export const CountryByIP_Request = new CountryByIP_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class CountryByIP_Response$Type extends MessageType<CountryByIP_Response> {
    constructor() {
        super("utility.CountryByIP.Response", [
            { no: 1, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "code", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message utility.CountryByIP.Response
 */
export const CountryByIP_Response = new CountryByIP_Response$Type();
/**
 * @generated ServiceType for protobuf service utility.UtilityHandlers
 */
export const UtilityHandlers = new ServiceType("utility.UtilityHandlers", [
    { name: "Countries", options: {}, I: Countries_Request, O: Countries_Response },
    { name: "CountryByIP", options: {}, I: CountryByIP_Request, O: CountryByIP_Response }
]);
