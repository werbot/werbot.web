// @generated from protobuf file "auth.proto" (package "auth", syntax proto3)
// tslint:disable
// @ts-nocheck
import { MessageType } from "@protobuf-ts/runtime";
import { SchemeKey } from "../key";
/**
 * -----------------------------------
 *
 * @generated from protobuf message auth.Auth
 */
export interface Auth {
}
/**
 * @generated from protobuf message auth.Auth.Password
 */
export interface Auth_Password {
    /**
     * @generated from protobuf field: string login = 1
     */
    login: string;
    /**
     * @generated from protobuf field: string password = 2
     */
    password: string;
}
/**
 * @generated from protobuf message auth.Auth.Key
 */
export interface Auth_Key {
    /**
     * @generated from protobuf field: string login = 1
     */
    login: string;
    /**
     * @generated from protobuf oneof: access
     */
    access: {
        oneofKind: "key_id";
        /**
         * @generated from protobuf field: string key_id = 2
         */
        key_id: string;
    } | {
        oneofKind: "key";
        /**
         * @generated from protobuf field: key.SchemeKey key = 3
         */
        key: SchemeKey;
    } | {
        oneofKind: undefined;
    };
}
/**
 * @generated from protobuf message auth.Auth.Agent
 */
export interface Auth_Agent {
    /**
     * @generated from protobuf field: string address = 1
     */
    address: string;
    /**
     * @generated from protobuf field: int32 port = 2
     */
    port: number;
    /**
     * @generated from protobuf field: auth.Auth.Key key = 3
     */
    key?: Auth_Key;
}
/**
 * @generated from protobuf message auth.Auth.MTLS
 */
export interface Auth_MTLS {
    /**
     * @generated from protobuf field: string server_ca = 1
     */
    server_ca: string;
    /**
     * @generated from protobuf field: string client_cert = 2
     */
    client_cert: string;
    /**
     * @generated from protobuf field: string client_key = 3
     */
    client_key: string;
}
/**
 * @generated from protobuf message auth.Auth.API
 */
export interface Auth_API {
    /**
     * @generated from protobuf field: string access_key_id = 1
     */
    access_key_id: string;
    /**
     * @generated from protobuf field: string secret_access_key = 2
     */
    secret_access_key: string;
    /**
     * @generated from protobuf field: string role_arn = 3
     */
    role_arn: string;
    /**
     * @generated from protobuf field: string role_external_id = 4
     */
    role_external_id: string;
}
/**
 * @generated from protobuf enum auth.AuthMethod
 */
export enum AuthMethod {
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
    agent = 3,
    /**
     * @generated from protobuf enum value: mtls = 4;
     */
    mtls = 4,
    /**
     * @generated from protobuf enum value: api = 5;
     */
    api = 5
}
// @generated message type with reflection information, may provide speed optimized methods
class Auth$Type extends MessageType<Auth> {
    constructor() {
        super("auth.Auth", []);
    }
}
/**
 * @generated MessageType for protobuf message auth.Auth
 */
export const Auth = new Auth$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Auth_Password$Type extends MessageType<Auth_Password> {
    constructor() {
        super("auth.Auth.Password", [
            { no: 1, name: "login", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { minLen: "3", maxLen: "20", pattern: "^[a-zA-Z0-9]+$" } } } },
            { no: 2, name: "password", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { minLen: "8", maxLen: "32" } }, "ghoster.secret": true } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message auth.Auth.Password
 */
export const Auth_Password = new Auth_Password$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Auth_Key$Type extends MessageType<Auth_Key> {
    constructor() {
        super("auth.Auth.Key", [
            { no: 1, name: "login", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { minLen: "3", maxLen: "20", pattern: "^[a-zA-Z0-9]+$" } } } },
            { no: 2, name: "key_id", kind: "scalar", localName: "key_id", oneof: "access", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "key", kind: "message", oneof: "access", T: () => SchemeKey }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message auth.Auth.Key
 */
export const Auth_Key = new Auth_Key$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Auth_Agent$Type extends MessageType<Auth_Agent> {
    constructor() {
        super("auth.Auth.Agent", [
            { no: 1, name: "address", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { address: true } } } },
            { no: 2, name: "port", kind: "scalar", T: 5 /*ScalarType.INT32*/, options: { "buf.validate.field": { int32: { lt: 65536, gte: 1 } } } },
            { no: 3, name: "key", kind: "message", T: () => Auth_Key }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message auth.Auth.Agent
 */
export const Auth_Agent = new Auth_Agent$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Auth_MTLS$Type extends MessageType<Auth_MTLS> {
    constructor() {
        super("auth.Auth.MTLS", [
            { no: 1, name: "server_ca", kind: "scalar", localName: "server_ca", T: 9 /*ScalarType.STRING*/, options: { "ghoster.secret": true } },
            { no: 2, name: "client_cert", kind: "scalar", localName: "client_cert", T: 9 /*ScalarType.STRING*/, options: { "ghoster.secret": true } },
            { no: 3, name: "client_key", kind: "scalar", localName: "client_key", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message auth.Auth.MTLS
 */
export const Auth_MTLS = new Auth_MTLS$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Auth_API$Type extends MessageType<Auth_API> {
    constructor() {
        super("auth.Auth.API", [
            { no: 1, name: "access_key_id", kind: "scalar", localName: "access_key_id", T: 9 /*ScalarType.STRING*/, options: { "ghoster.secret": true } },
            { no: 2, name: "secret_access_key", kind: "scalar", localName: "secret_access_key", T: 9 /*ScalarType.STRING*/, options: { "ghoster.secret": true } },
            { no: 3, name: "role_arn", kind: "scalar", localName: "role_arn", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "role_external_id", kind: "scalar", localName: "role_external_id", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message auth.Auth.API
 */
export const Auth_API = new Auth_API$Type();
