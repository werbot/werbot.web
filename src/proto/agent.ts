// @generated from protobuf file "agent.proto" (package "agent", syntax proto3)
// tslint:disable
// @ts-nocheck
import { ServiceType } from "@protobuf-ts/runtime-rpc";
import { MessageType } from "@protobuf-ts/runtime";
import { SchemeType } from "../scheme/access";
/**
 * @generated from protobuf message agent.Auth
 */
export interface Auth {
}
/**
 * @generated from protobuf message agent.Auth.Request
 */
export interface Auth_Request {
    /**
     * @generated from protobuf field: string token = 1
     */
    token: string; // @gotags: json:"-"
}
/**
 * @generated from protobuf message agent.Auth.Response
 */
export interface Auth_Response {
    /**
     * @generated from protobuf field: access.SchemeType scheme_type = 1
     */
    scheme_type: SchemeType;
    /**
     * @generated from protobuf field: string api_key = 2
     */
    api_key: string;
    /**
     * @generated from protobuf field: string api_secret = 3
     */
    api_secret: string;
}
/**
 * rpc AddScheme
 *
 * @generated from protobuf message agent.AddScheme
 */
export interface AddScheme {
}
/**
 * @generated from protobuf message agent.AddScheme.Request
 */
export interface AddScheme_Request {
    /**
     * @generated from protobuf field: string token = 1
     */
    token: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string address = 2
     */
    address: string;
    /**
     * @generated from protobuf field: int32 port = 3
     */
    port: number;
    /**
     * @generated from protobuf field: string login = 4
     */
    login: string;
    /**
     * @generated from protobuf field: string title = 5
     */
    title: string;
}
/**
 * @generated from protobuf message agent.AddScheme.Response
 */
export interface AddScheme_Response {
    /**
     * @generated from protobuf field: string scheme_id = 1
     */
    scheme_id: string;
    /**
     * @generated from protobuf field: string public_key = 2
     */
    public_key: string;
}
// @generated message type with reflection information, may provide speed optimized methods
class Auth$Type extends MessageType<Auth> {
    constructor() {
        super("agent.Auth", []);
    }
}
/**
 * @generated MessageType for protobuf message agent.Auth
 */
export const Auth = new Auth$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Auth_Request$Type extends MessageType<Auth_Request> {
    constructor() {
        super("agent.Auth.Request", [
            { no: 1, name: "token", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message agent.Auth.Request
 */
export const Auth_Request = new Auth_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Auth_Response$Type extends MessageType<Auth_Response> {
    constructor() {
        super("agent.Auth.Response", [
            { no: 1, name: "scheme_type", kind: "enum", localName: "scheme_type", T: () => ["access.SchemeType", SchemeType] },
            { no: 2, name: "api_key", kind: "scalar", localName: "api_key", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "api_secret", kind: "scalar", localName: "api_secret", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message agent.Auth.Response
 */
export const Auth_Response = new Auth_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddScheme$Type extends MessageType<AddScheme> {
    constructor() {
        super("agent.AddScheme", []);
    }
}
/**
 * @generated MessageType for protobuf message agent.AddScheme
 */
export const AddScheme = new AddScheme$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddScheme_Request$Type extends MessageType<AddScheme_Request> {
    constructor() {
        super("agent.AddScheme.Request", [
            { no: 1, name: "token", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 2, name: "address", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { address: true } } } },
            { no: 3, name: "port", kind: "scalar", T: 5 /*ScalarType.INT32*/, options: { "buf.validate.field": { required: true, int32: { lt: 65536, gte: 1 } } } },
            { no: 4, name: "login", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { minLen: "3", maxLen: "20", pattern: "^[a-zA-Z0-9]+$" } } } },
            { no: 5, name: "title", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { ignore: "IGNORE_IF_ZERO_VALUE", string: { minLen: "5", maxLen: "128" } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message agent.AddScheme.Request
 */
export const AddScheme_Request = new AddScheme_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddScheme_Response$Type extends MessageType<AddScheme_Response> {
    constructor() {
        super("agent.AddScheme.Response", [
            { no: 1, name: "scheme_id", kind: "scalar", localName: "scheme_id", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "public_key", kind: "scalar", localName: "public_key", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message agent.AddScheme.Response
 */
export const AddScheme_Response = new AddScheme_Response$Type();
/**
 * @generated ServiceType for protobuf service agent.AgentHandlers
 */
export const AgentHandlers = new ServiceType("agent.AgentHandlers", [
    { name: "Auth", options: {}, I: Auth_Request, O: Auth_Response },
    { name: "AddScheme", options: {}, I: AddScheme_Request, O: AddScheme_Response }
]);
