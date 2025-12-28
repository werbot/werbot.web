// @generated from protobuf file "tokenprofile.proto" (package "token.profile", syntax proto3)
// tslint:disable
// @ts-nocheck
import { MessageType } from "@protobuf-ts/runtime";
import { MetaDataProfile } from "./message/tokenmessage";
import { Timestamp } from "../google/protobuf/timestamp";
import { Token_Response } from "./message/tokenmessage";
import { Status } from "./enum/tokenenum";
import { Action } from "./enum/tokenenum";
/**
 * rpc ProfileTokens
 *
 * @generated from protobuf message token.profile.ProfileTokens
 */
export interface ProfileTokens {
}
/**
 * @generated from protobuf message token.profile.ProfileTokens.Request
 */
export interface ProfileTokens_Request {
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
 * @generated from protobuf message token.profile.ProfileTokens.Response
 */
export interface ProfileTokens_Response {
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
 * rpc AddTokenProfileReset
 * action 1
 *
 * @generated from protobuf message token.profile.AddTokenProfileReset
 */
export interface AddTokenProfileReset {
}
/**
 * @generated from protobuf message token.profile.AddTokenProfileReset.Request
 */
export interface AddTokenProfileReset_Request {
    /**
     * @generated from protobuf field: string profile_id = 1
     */
    profile_id: string;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp expired_at = 50
     */
    expired_at?: Timestamp;
}
/**
 * @generated from protobuf message token.profile.AddTokenProfileReset.Response
 */
export interface AddTokenProfileReset_Response {
    /**
     * @generated from protobuf field: string token = 1
     */
    token: string;
}
/**
 * rpc AddTokenProfileRegistration
 * action 2
 *
 * @generated from protobuf message token.profile.AddTokenProfileRegistration
 */
export interface AddTokenProfileRegistration {
}
/**
 * @generated from protobuf message token.profile.AddTokenProfileRegistration.Request
 */
export interface AddTokenProfileRegistration_Request {
    /**
     * @generated from protobuf field: token.message.MetaDataProfile data = 1
     */
    data?: MetaDataProfile;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp expired_at = 50
     */
    expired_at?: Timestamp;
}
/**
 * @generated from protobuf message token.profile.AddTokenProfileRegistration.Response
 */
export interface AddTokenProfileRegistration_Response {
    /**
     * @generated from protobuf field: string token = 1
     */
    token: string;
}
/**
 * rpc AddTokenProfileDelete
 * action 4
 *
 * @generated from protobuf message token.profile.AddTokenProfileDelete
 */
export interface AddTokenProfileDelete {
}
/**
 * @generated from protobuf message token.profile.AddTokenProfileDelete.Request
 */
export interface AddTokenProfileDelete_Request {
    /**
     * @generated from protobuf field: string profile_id = 1
     */
    profile_id: string;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp expired_at = 50
     */
    expired_at?: Timestamp;
}
/**
 * @generated from protobuf message token.profile.AddTokenProfileDelete.Response
 */
export interface AddTokenProfileDelete_Response {
    /**
     * @generated from protobuf field: string token = 1
     */
    token: string;
}
/**
 * rpc UpdateProfileToken
 *
 * @generated from protobuf message token.profile.UpdateProfileToken
 */
export interface UpdateProfileToken {
}
/**
 * @generated from protobuf message token.profile.UpdateProfileToken.Request
 */
export interface UpdateProfileToken_Request {
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
}
/**
 * @generated from protobuf message token.profile.UpdateProfileToken.Response
 */
export interface UpdateProfileToken_Response {
}
// @generated message type with reflection information, may provide speed optimized methods
class ProfileTokens$Type extends MessageType<ProfileTokens> {
    constructor() {
        super("token.profile.ProfileTokens", []);
    }
}
/**
 * @generated MessageType for protobuf message token.profile.ProfileTokens
 */
export const ProfileTokens = new ProfileTokens$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ProfileTokens_Request$Type extends MessageType<ProfileTokens_Request> {
    constructor() {
        super("token.profile.ProfileTokens.Request", [
            { no: 1, name: "is_admin", kind: "scalar", localName: "is_admin", T: 8 /*ScalarType.BOOL*/ },
            { no: 2, name: "action", kind: "enum", T: () => ["token.enum.Action", Action], options: { "buf.validate.field": { required: true, enum: { definedOnly: true, in: [1, 2, 4] } } } },
            { no: 3, name: "status", kind: "enum", T: () => ["token.enum.Status", Status], options: { "buf.validate.field": { ignore: "IGNORE_IF_ZERO_VALUE", enum: { definedOnly: true, notIn: [0, 3] } } } },
            { no: 4, name: "limit", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 5, name: "offset", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 6, name: "sort_by", kind: "scalar", localName: "sort_by", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message token.profile.ProfileTokens.Request
 */
export const ProfileTokens_Request = new ProfileTokens_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ProfileTokens_Response$Type extends MessageType<ProfileTokens_Response> {
    constructor() {
        super("token.profile.ProfileTokens.Response", [
            { no: 1, name: "total", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 2, name: "tokens", kind: "message", repeat: 2 /*RepeatType.UNPACKED*/, T: () => Token_Response }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message token.profile.ProfileTokens.Response
 */
export const ProfileTokens_Response = new ProfileTokens_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddTokenProfileReset$Type extends MessageType<AddTokenProfileReset> {
    constructor() {
        super("token.profile.AddTokenProfileReset", []);
    }
}
/**
 * @generated MessageType for protobuf message token.profile.AddTokenProfileReset
 */
export const AddTokenProfileReset = new AddTokenProfileReset$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddTokenProfileReset_Request$Type extends MessageType<AddTokenProfileReset_Request> {
    constructor() {
        super("token.profile.AddTokenProfileReset.Request", [
            { no: 1, name: "profile_id", kind: "scalar", localName: "profile_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 50, name: "expired_at", kind: "message", localName: "expired_at", T: () => Timestamp }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message token.profile.AddTokenProfileReset.Request
 */
export const AddTokenProfileReset_Request = new AddTokenProfileReset_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddTokenProfileReset_Response$Type extends MessageType<AddTokenProfileReset_Response> {
    constructor() {
        super("token.profile.AddTokenProfileReset.Response", [
            { no: 1, name: "token", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message token.profile.AddTokenProfileReset.Response
 */
export const AddTokenProfileReset_Response = new AddTokenProfileReset_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddTokenProfileRegistration$Type extends MessageType<AddTokenProfileRegistration> {
    constructor() {
        super("token.profile.AddTokenProfileRegistration", []);
    }
}
/**
 * @generated MessageType for protobuf message token.profile.AddTokenProfileRegistration
 */
export const AddTokenProfileRegistration = new AddTokenProfileRegistration$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddTokenProfileRegistration_Request$Type extends MessageType<AddTokenProfileRegistration_Request> {
    constructor() {
        super("token.profile.AddTokenProfileRegistration.Request", [
            { no: 1, name: "data", kind: "message", T: () => MetaDataProfile, options: { "buf.validate.field": { required: true } } },
            { no: 50, name: "expired_at", kind: "message", localName: "expired_at", T: () => Timestamp }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message token.profile.AddTokenProfileRegistration.Request
 */
export const AddTokenProfileRegistration_Request = new AddTokenProfileRegistration_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddTokenProfileRegistration_Response$Type extends MessageType<AddTokenProfileRegistration_Response> {
    constructor() {
        super("token.profile.AddTokenProfileRegistration.Response", [
            { no: 1, name: "token", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message token.profile.AddTokenProfileRegistration.Response
 */
export const AddTokenProfileRegistration_Response = new AddTokenProfileRegistration_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddTokenProfileDelete$Type extends MessageType<AddTokenProfileDelete> {
    constructor() {
        super("token.profile.AddTokenProfileDelete", []);
    }
}
/**
 * @generated MessageType for protobuf message token.profile.AddTokenProfileDelete
 */
export const AddTokenProfileDelete = new AddTokenProfileDelete$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddTokenProfileDelete_Request$Type extends MessageType<AddTokenProfileDelete_Request> {
    constructor() {
        super("token.profile.AddTokenProfileDelete.Request", [
            { no: 1, name: "profile_id", kind: "scalar", localName: "profile_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 50, name: "expired_at", kind: "message", localName: "expired_at", T: () => Timestamp }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message token.profile.AddTokenProfileDelete.Request
 */
export const AddTokenProfileDelete_Request = new AddTokenProfileDelete_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddTokenProfileDelete_Response$Type extends MessageType<AddTokenProfileDelete_Response> {
    constructor() {
        super("token.profile.AddTokenProfileDelete.Response", [
            { no: 1, name: "token", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message token.profile.AddTokenProfileDelete.Response
 */
export const AddTokenProfileDelete_Response = new AddTokenProfileDelete_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateProfileToken$Type extends MessageType<UpdateProfileToken> {
    constructor() {
        super("token.profile.UpdateProfileToken", []);
    }
}
/**
 * @generated MessageType for protobuf message token.profile.UpdateProfileToken
 */
export const UpdateProfileToken = new UpdateProfileToken$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateProfileToken_Request$Type extends MessageType<UpdateProfileToken_Request> {
    constructor() {
        super("token.profile.UpdateProfileToken.Request", [
            { no: 1, name: "is_admin", kind: "scalar", localName: "is_admin", T: 8 /*ScalarType.BOOL*/ },
            { no: 2, name: "token", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 3, name: "status", kind: "enum", T: () => ["token.enum.Status", Status], options: { "buf.validate.field": { required: true, enum: { definedOnly: true, notIn: [0, 3] } } } },
            { no: 4, name: "profile_id", kind: "scalar", localName: "profile_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { ignore: "IGNORE_IF_ZERO_VALUE", string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message token.profile.UpdateProfileToken.Request
 */
export const UpdateProfileToken_Request = new UpdateProfileToken_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateProfileToken_Response$Type extends MessageType<UpdateProfileToken_Response> {
    constructor() {
        super("token.profile.UpdateProfileToken.Response", []);
    }
}
/**
 * @generated MessageType for protobuf message token.profile.UpdateProfileToken.Response
 */
export const UpdateProfileToken_Response = new UpdateProfileToken_Response$Type();
