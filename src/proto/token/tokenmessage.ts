// @generated from protobuf file "tokenmessage.proto" (package "token.message", syntax proto3)
// tslint:disable
// @ts-nocheck
import { MessageType } from "@protobuf-ts/runtime";
import { Timestamp } from "../google/protobuf/timestamp";
import { Status } from "./enum/tokenenum";
import { Action } from "./enum/tokenenum";
import { Section } from "./enum/tokenenum";
import { SchemeType } from "../scheme/access";
/**
 * MetaDataProfile
 *
 * @generated from protobuf message token.message.MetaDataProfile
 */
export interface MetaDataProfile {
    /**
     * @generated from protobuf field: string name = 1
     */
    name: string;
    /**
     * @generated from protobuf field: string surname = 2
     */
    surname: string;
    /**
     * @generated from protobuf field: string email = 3
     */
    email: string;
}
/**
 * MetaDataScheme
 *
 * @generated from protobuf message token.message.MetaDataScheme
 */
export interface MetaDataScheme {
    /**
     * @generated from protobuf field: access.SchemeType scheme_type = 1
     */
    scheme_type: SchemeType;
    /**
     * @generated from protobuf field: string email = 2
     */
    email: string;
}
/**
 * MetaDataAgent
 *
 * @generated from protobuf message token.message.MetaDataAgent
 */
export interface MetaDataAgent {
    /**
     * @generated from protobuf field: access.SchemeType scheme_type = 1
     */
    scheme_type: SchemeType;
}
/**
 * Token
 *
 * @generated from protobuf message token.message.Token
 */
export interface Token {
}
/**
 * @generated from protobuf message token.message.Token.Request
 */
export interface Token_Request {
    /**
     * @generated from protobuf field: bool is_admin = 1
     */
    is_admin: boolean; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string token = 2
     */
    token: string;
}
/**
 * @generated from protobuf message token.message.Token.Response
 */
export interface Token_Response {
    /**
     * @generated from protobuf field: string token = 1
     */
    token: string;
    /**
     * @generated from protobuf field: string owner_id = 2
     */
    owner_id: string;
    /**
     * @generated from protobuf field: token.enum.Section section = 3
     */
    section: Section;
    /**
     * @generated from protobuf field: token.enum.Action action = 4
     */
    action: Action;
    /**
     * @generated from protobuf field: token.enum.Status status = 5
     */
    status: Status;
    /**
     * @generated from protobuf field: string profile_id = 6
     */
    profile_id: string;
    /**
     * @generated from protobuf field: string project_id = 7
     */
    project_id: string;
    /**
     * @generated from protobuf field: string scheme_id = 8
     */
    scheme_id: string;
    /**
     * @generated from protobuf oneof: data
     */
    data: {
        oneofKind: "profile";
        /**
         * @generated from protobuf field: token.message.MetaDataProfile profile = 20
         */
        profile: MetaDataProfile;
    } | {
        oneofKind: "scheme";
        /**
         * @generated from protobuf field: token.message.MetaDataScheme scheme = 21
         */
        scheme: MetaDataScheme;
    } | {
        oneofKind: "agent";
        /**
         * @generated from protobuf field: token.message.MetaDataAgent agent = 22
         */
        agent: MetaDataAgent;
    } | {
        oneofKind: undefined;
    };
    /**
     * @generated from protobuf field: google.protobuf.Timestamp expired_at = 50
     */
    expired_at?: Timestamp;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp updated_at = 51
     */
    updated_at?: Timestamp;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp created_at = 52
     */
    created_at?: Timestamp;
}
/**
 * ArchivedToken
 *
 * @generated from protobuf message token.message.ArchivedToken
 */
export interface ArchivedToken {
}
/**
 * @generated from protobuf message token.message.ArchivedToken.Request
 */
export interface ArchivedToken_Request {
    /**
     * @generated from protobuf field: bool is_admin = 1
     */
    is_admin: boolean; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string owner_id = 2
     */
    owner_id: string;
    /**
     * @generated from protobuf field: string token = 3
     */
    token: string;
}
/**
 * @generated from protobuf message token.message.ArchivedToken.Response
 */
export interface ArchivedToken_Response {
}
/**
 * DeleteToken
 *
 * @generated from protobuf message token.message.DeleteToken
 */
export interface DeleteToken {
}
/**
 * @generated from protobuf message token.message.DeleteToken.Request
 */
export interface DeleteToken_Request {
    /**
     * @generated from protobuf field: bool is_admin = 1
     */
    is_admin: boolean; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string owner_id = 2
     */
    owner_id: string;
    /**
     * @generated from protobuf field: string token = 3
     */
    token: string;
}
/**
 * @generated from protobuf message token.message.DeleteToken.Response
 */
export interface DeleteToken_Response {
}
// @generated message type with reflection information, may provide speed optimized methods
class MetaDataProfile$Type extends MessageType<MetaDataProfile> {
    constructor() {
        super("token.message.MetaDataProfile", [
            { no: 1, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { cel: [{ id: "valid_name", message: "required field (3 to 30 characters)", expression: "this.matches('^[A-Za-z0-9]{3,20}$')" }], required: true } } },
            { no: 2, name: "surname", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { cel: [{ id: "valid_surname", message: "required field (3 to 30 characters)", expression: "this.matches('^[A-Za-z0-9]{3,20}$')" }], required: true } } },
            { no: 3, name: "email", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { cel: [{ id: "valid_email", message: "must be a valid email", expression: "this.isEmail()" }], required: true } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message token.message.MetaDataProfile
 */
export const MetaDataProfile = new MetaDataProfile$Type();
// @generated message type with reflection information, may provide speed optimized methods
class MetaDataScheme$Type extends MessageType<MetaDataScheme> {
    constructor() {
        super("token.message.MetaDataScheme", [
            { no: 1, name: "scheme_type", kind: "enum", localName: "scheme_type", T: () => ["access.SchemeType", SchemeType], options: { "buf.validate.field": { required: true } } },
            { no: 2, name: "email", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { cel: [{ id: "valid_email", message: "must be a valid email", expression: "this.isEmail()" }], required: true } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message token.message.MetaDataScheme
 */
export const MetaDataScheme = new MetaDataScheme$Type();
// @generated message type with reflection information, may provide speed optimized methods
class MetaDataAgent$Type extends MessageType<MetaDataAgent> {
    constructor() {
        super("token.message.MetaDataAgent", [
            { no: 1, name: "scheme_type", kind: "enum", localName: "scheme_type", T: () => ["access.SchemeType", SchemeType], options: { "buf.validate.field": { required: true } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message token.message.MetaDataAgent
 */
export const MetaDataAgent = new MetaDataAgent$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Token$Type extends MessageType<Token> {
    constructor() {
        super("token.message.Token", []);
    }
}
/**
 * @generated MessageType for protobuf message token.message.Token
 */
export const Token = new Token$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Token_Request$Type extends MessageType<Token_Request> {
    constructor() {
        super("token.message.Token.Request", [
            { no: 1, name: "is_admin", kind: "scalar", localName: "is_admin", T: 8 /*ScalarType.BOOL*/ },
            { no: 2, name: "token", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message token.message.Token.Request
 */
export const Token_Request = new Token_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Token_Response$Type extends MessageType<Token_Response> {
    constructor() {
        super("token.message.Token.Response", [
            { no: 1, name: "token", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "ghoster.secret": true } },
            { no: 2, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "ghoster.secret": true } },
            { no: 3, name: "section", kind: "enum", T: () => ["token.enum.Section", Section] },
            { no: 4, name: "action", kind: "enum", T: () => ["token.enum.Action", Action] },
            { no: 5, name: "status", kind: "enum", T: () => ["token.enum.Status", Status] },
            { no: 6, name: "profile_id", kind: "scalar", localName: "profile_id", T: 9 /*ScalarType.STRING*/, options: { "ghoster.secret": true } },
            { no: 7, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "ghoster.secret": true } },
            { no: 8, name: "scheme_id", kind: "scalar", localName: "scheme_id", T: 9 /*ScalarType.STRING*/, options: { "ghoster.secret": true } },
            { no: 20, name: "profile", kind: "message", oneof: "data", T: () => MetaDataProfile },
            { no: 21, name: "scheme", kind: "message", oneof: "data", T: () => MetaDataScheme },
            { no: 22, name: "agent", kind: "message", oneof: "data", T: () => MetaDataAgent },
            { no: 50, name: "expired_at", kind: "message", localName: "expired_at", T: () => Timestamp },
            { no: 51, name: "updated_at", kind: "message", localName: "updated_at", T: () => Timestamp },
            { no: 52, name: "created_at", kind: "message", localName: "created_at", T: () => Timestamp }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message token.message.Token.Response
 */
export const Token_Response = new Token_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ArchivedToken$Type extends MessageType<ArchivedToken> {
    constructor() {
        super("token.message.ArchivedToken", []);
    }
}
/**
 * @generated MessageType for protobuf message token.message.ArchivedToken
 */
export const ArchivedToken = new ArchivedToken$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ArchivedToken_Request$Type extends MessageType<ArchivedToken_Request> {
    constructor() {
        super("token.message.ArchivedToken.Request", [
            { no: 1, name: "is_admin", kind: "scalar", localName: "is_admin", T: 8 /*ScalarType.BOOL*/ },
            { no: 2, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { ignore: "IGNORE_IF_ZERO_VALUE", string: { uuid: true } } } },
            { no: 3, name: "token", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message token.message.ArchivedToken.Request
 */
export const ArchivedToken_Request = new ArchivedToken_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ArchivedToken_Response$Type extends MessageType<ArchivedToken_Response> {
    constructor() {
        super("token.message.ArchivedToken.Response", []);
    }
}
/**
 * @generated MessageType for protobuf message token.message.ArchivedToken.Response
 */
export const ArchivedToken_Response = new ArchivedToken_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DeleteToken$Type extends MessageType<DeleteToken> {
    constructor() {
        super("token.message.DeleteToken", []);
    }
}
/**
 * @generated MessageType for protobuf message token.message.DeleteToken
 */
export const DeleteToken = new DeleteToken$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DeleteToken_Request$Type extends MessageType<DeleteToken_Request> {
    constructor() {
        super("token.message.DeleteToken.Request", [
            { no: 1, name: "is_admin", kind: "scalar", localName: "is_admin", T: 8 /*ScalarType.BOOL*/ },
            { no: 2, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { ignore: "IGNORE_IF_ZERO_VALUE", string: { uuid: true } } } },
            { no: 3, name: "token", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message token.message.DeleteToken.Request
 */
export const DeleteToken_Request = new DeleteToken_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DeleteToken_Response$Type extends MessageType<DeleteToken_Response> {
    constructor() {
        super("token.message.DeleteToken.Response", []);
    }
}
/**
 * @generated MessageType for protobuf message token.message.DeleteToken.Response
 */
export const DeleteToken_Response = new DeleteToken_Response$Type();
