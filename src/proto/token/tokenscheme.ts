// @generated from protobuf file "tokenscheme.proto" (package "token.scheme", syntax proto3)
// tslint:disable
// @ts-nocheck
import { MessageType } from "@protobuf-ts/runtime";
import { Timestamp } from "../google/protobuf/timestamp";
import { SchemeType } from "../scheme/access";
import { Token_Response } from "./message/tokenmessage";
import { Status } from "./enum/tokenenum";
import { Action } from "./enum/tokenenum";
/**
 * rpc SchemeTokens
 *
 * @generated from protobuf message token.scheme.SchemeTokens
 */
export interface SchemeTokens {
}
/**
 * @generated from protobuf message token.scheme.SchemeTokens.Request
 */
export interface SchemeTokens_Request {
    /**
     * @generated from protobuf field: bool is_admin = 1
     */
    is_admin: boolean; // @gotags: json:"-"
    /**
     * @generated from protobuf field: token.enum.Action action = 2
     */
    action: Action;
    /**
     * @generated from protobuf field: token.enum.Status status = 3
     */
    status: Status;
    /**
     * @generated from protobuf field: string owner_id = 4
     */
    owner_id: string;
    /**
     * @generated from protobuf field: string scheme_id = 5
     */
    scheme_id: string;
    /**
     * @generated from protobuf field: int32 limit = 6
     */
    limit: number;
    /**
     * @generated from protobuf field: int32 offset = 7
     */
    offset: number;
    /**
     * @generated from protobuf field: string sort_by = 8
     */
    sort_by: string; // @gotags: json:"-"
}
/**
 * @generated from protobuf message token.scheme.SchemeTokens.Response
 */
export interface SchemeTokens_Response {
    /**
     * @generated from protobuf field: int32 total = 1
     */
    total: number;
    /**
     * @generated from protobuf field: repeated token.message.Token.Response tokens = 2
     */
    tokens: Token_Response[];
}
/**
 * rpc AddTokenSchemeAdd
 *
 * @generated from protobuf message token.scheme.AddTokenSchemeAdd
 */
export interface AddTokenSchemeAdd {
}
/**
 * @generated from protobuf message token.scheme.AddTokenSchemeAdd.Request
 */
export interface AddTokenSchemeAdd_Request {
    /**
     * @generated from protobuf field: string owner_id = 1
     */
    owner_id: string;
    /**
     * @generated from protobuf field: string project_id = 2
     */
    project_id: string;
    /**
     * @generated from protobuf field: access.SchemeType scheme_type = 3
     */
    scheme_type: SchemeType;
    /**
     * @generated from protobuf oneof: data
     */
    data: {
        oneofKind: "email";
        /**
         * @generated from protobuf field: string email = 4
         */
        email: string;
    } | {
        oneofKind: "profile_id";
        /**
         * @generated from protobuf field: string profile_id = 5
         */
        profile_id: string;
    } | {
        oneofKind: undefined;
    };
    /**
     * @generated from protobuf field: google.protobuf.Timestamp expired_at = 50
     */
    expired_at?: Timestamp;
}
/**
 * @generated from protobuf message token.scheme.AddTokenSchemeAdd.Response
 */
export interface AddTokenSchemeAdd_Response {
    /**
     * @generated from protobuf field: string token = 1
     */
    token: string;
}
/**
 * rpc AddTokenSchemeAccess
 *
 * @generated from protobuf message token.scheme.AddTokenSchemeAccess
 */
export interface AddTokenSchemeAccess {
}
/**
 * @generated from protobuf message token.scheme.AddTokenSchemeAccess.Request
 */
export interface AddTokenSchemeAccess_Request {
    /**
     * @generated from protobuf field: string owner_id = 1
     */
    owner_id: string;
    /**
     * @generated from protobuf field: string scheme_id = 2
     */
    scheme_id: string;
    /**
     * @generated from protobuf oneof: data
     */
    data: {
        oneofKind: "email";
        /**
         * @generated from protobuf field: string email = 3
         */
        email: string;
    } | {
        oneofKind: "profile_id";
        /**
         * @generated from protobuf field: string profile_id = 4
         */
        profile_id: string;
    } | {
        oneofKind: undefined;
    };
    /**
     * @generated from protobuf field: google.protobuf.Timestamp expired_at = 50
     */
    expired_at?: Timestamp;
}
/**
 * @generated from protobuf message token.scheme.AddTokenSchemeAccess.Response
 */
export interface AddTokenSchemeAccess_Response {
    /**
     * @generated from protobuf field: string token = 1
     */
    token: string;
}
/**
 * rpc UpdateSchemeToken
 *
 * @generated from protobuf message token.scheme.UpdateSchemeToken
 */
export interface UpdateSchemeToken {
}
/**
 * @generated from protobuf message token.scheme.UpdateSchemeToken.Request
 */
export interface UpdateSchemeToken_Request {
    /**
     * @generated from protobuf field: bool is_admin = 1
     */
    is_admin: boolean; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string token = 2
     */
    token: string;
    /**
     * @generated from protobuf field: token.enum.Status status = 3
     */
    status: Status;
    /**
     * @generated from protobuf field: string profile_id = 4
     */
    profile_id: string;
    /**
     * @generated from protobuf field: string scheme_id = 5
     */
    scheme_id: string;
}
/**
 * @generated from protobuf message token.scheme.UpdateSchemeToken.Response
 */
export interface UpdateSchemeToken_Response {
}
// @generated message type with reflection information, may provide speed optimized methods
class SchemeTokens$Type extends MessageType<SchemeTokens> {
    constructor() {
        super("token.scheme.SchemeTokens", []);
    }
}
/**
 * @generated MessageType for protobuf message token.scheme.SchemeTokens
 */
export const SchemeTokens = new SchemeTokens$Type();
// @generated message type with reflection information, may provide speed optimized methods
class SchemeTokens_Request$Type extends MessageType<SchemeTokens_Request> {
    constructor() {
        super("token.scheme.SchemeTokens.Request", [
            { no: 1, name: "is_admin", kind: "scalar", localName: "is_admin", T: 8 /*ScalarType.BOOL*/ },
            { no: 2, name: "action", kind: "enum", T: () => ["token.enum.Action", Action], options: { "buf.validate.field": { required: true, enum: { definedOnly: true, in: [3, 7, 8] } } } },
            { no: 3, name: "status", kind: "enum", T: () => ["token.enum.Status", Status], options: { "buf.validate.field": { ignore: "IGNORE_IF_ZERO_VALUE", enum: { definedOnly: true, notIn: [0] } } } },
            { no: 4, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 5, name: "scheme_id", kind: "scalar", localName: "scheme_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 6, name: "limit", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 7, name: "offset", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 8, name: "sort_by", kind: "scalar", localName: "sort_by", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message token.scheme.SchemeTokens.Request
 */
export const SchemeTokens_Request = new SchemeTokens_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class SchemeTokens_Response$Type extends MessageType<SchemeTokens_Response> {
    constructor() {
        super("token.scheme.SchemeTokens.Response", [
            { no: 1, name: "total", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 2, name: "tokens", kind: "message", repeat: 2 /*RepeatType.UNPACKED*/, T: () => Token_Response }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message token.scheme.SchemeTokens.Response
 */
export const SchemeTokens_Response = new SchemeTokens_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddTokenSchemeAdd$Type extends MessageType<AddTokenSchemeAdd> {
    constructor() {
        super("token.scheme.AddTokenSchemeAdd", []);
    }
}
/**
 * @generated MessageType for protobuf message token.scheme.AddTokenSchemeAdd
 */
export const AddTokenSchemeAdd = new AddTokenSchemeAdd$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddTokenSchemeAdd_Request$Type extends MessageType<AddTokenSchemeAdd_Request> {
    constructor() {
        super("token.scheme.AddTokenSchemeAdd.Request", [
            { no: 1, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 2, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 3, name: "scheme_type", kind: "enum", localName: "scheme_type", T: () => ["access.SchemeType", SchemeType] },
            { no: 4, name: "email", kind: "scalar", oneof: "data", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { cel: [{ id: "valid_email", message: "must be a valid email", expression: "this.isEmail()" }] } } },
            { no: 5, name: "profile_id", kind: "scalar", localName: "profile_id", oneof: "data", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 50, name: "expired_at", kind: "message", localName: "expired_at", T: () => Timestamp }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message token.scheme.AddTokenSchemeAdd.Request
 */
export const AddTokenSchemeAdd_Request = new AddTokenSchemeAdd_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddTokenSchemeAdd_Response$Type extends MessageType<AddTokenSchemeAdd_Response> {
    constructor() {
        super("token.scheme.AddTokenSchemeAdd.Response", [
            { no: 1, name: "token", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message token.scheme.AddTokenSchemeAdd.Response
 */
export const AddTokenSchemeAdd_Response = new AddTokenSchemeAdd_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddTokenSchemeAccess$Type extends MessageType<AddTokenSchemeAccess> {
    constructor() {
        super("token.scheme.AddTokenSchemeAccess", []);
    }
}
/**
 * @generated MessageType for protobuf message token.scheme.AddTokenSchemeAccess
 */
export const AddTokenSchemeAccess = new AddTokenSchemeAccess$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddTokenSchemeAccess_Request$Type extends MessageType<AddTokenSchemeAccess_Request> {
    constructor() {
        super("token.scheme.AddTokenSchemeAccess.Request", [
            { no: 1, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 2, name: "scheme_id", kind: "scalar", localName: "scheme_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 3, name: "email", kind: "scalar", oneof: "data", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { cel: [{ id: "valid_email", message: "must be a valid email", expression: "this.isEmail()" }] } } },
            { no: 4, name: "profile_id", kind: "scalar", localName: "profile_id", oneof: "data", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 50, name: "expired_at", kind: "message", localName: "expired_at", T: () => Timestamp }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message token.scheme.AddTokenSchemeAccess.Request
 */
export const AddTokenSchemeAccess_Request = new AddTokenSchemeAccess_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddTokenSchemeAccess_Response$Type extends MessageType<AddTokenSchemeAccess_Response> {
    constructor() {
        super("token.scheme.AddTokenSchemeAccess.Response", [
            { no: 1, name: "token", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message token.scheme.AddTokenSchemeAccess.Response
 */
export const AddTokenSchemeAccess_Response = new AddTokenSchemeAccess_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateSchemeToken$Type extends MessageType<UpdateSchemeToken> {
    constructor() {
        super("token.scheme.UpdateSchemeToken", []);
    }
}
/**
 * @generated MessageType for protobuf message token.scheme.UpdateSchemeToken
 */
export const UpdateSchemeToken = new UpdateSchemeToken$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateSchemeToken_Request$Type extends MessageType<UpdateSchemeToken_Request> {
    constructor() {
        super("token.scheme.UpdateSchemeToken.Request", [
            { no: 1, name: "is_admin", kind: "scalar", localName: "is_admin", T: 8 /*ScalarType.BOOL*/ },
            { no: 2, name: "token", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 3, name: "status", kind: "enum", T: () => ["token.enum.Status", Status], options: { "buf.validate.field": { required: true, enum: { definedOnly: true, notIn: [0] } } } },
            { no: 4, name: "profile_id", kind: "scalar", localName: "profile_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { ignore: "IGNORE_IF_ZERO_VALUE", string: { uuid: true } } } },
            { no: 5, name: "scheme_id", kind: "scalar", localName: "scheme_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { ignore: "IGNORE_IF_ZERO_VALUE", string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message token.scheme.UpdateSchemeToken.Request
 */
export const UpdateSchemeToken_Request = new UpdateSchemeToken_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateSchemeToken_Response$Type extends MessageType<UpdateSchemeToken_Response> {
    constructor() {
        super("token.scheme.UpdateSchemeToken.Response", []);
    }
}
/**
 * @generated MessageType for protobuf message token.scheme.UpdateSchemeToken.Response
 */
export const UpdateSchemeToken_Response = new UpdateSchemeToken_Response$Type();
