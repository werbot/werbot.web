// @generated from protobuf file "tokenproject.proto" (package "token.project", syntax proto3)
// tslint:disable
// @ts-nocheck
import { MessageType } from "@protobuf-ts/runtime";
import { Timestamp } from "../google/protobuf/timestamp";
import { MetaDataProfile } from "./message/tokenmessage";
import { Token_Response } from "./message/tokenmessage";
import { Status } from "./enum/tokenenum";
import { Action } from "./enum/tokenenum";
/**
 * rpc ProjectTokens
 *
 * @generated from protobuf message token.project.ProjectTokens
 */
export interface ProjectTokens {
}
/**
 * @generated from protobuf message token.project.ProjectTokens.Request
 */
export interface ProjectTokens_Request {
    /**
     * @generated from protobuf field: bool is_admin = 1
     */
    is_admin: boolean; // @gotags: json:"-"
    /**
     * @generated from protobuf field: token.enum.Action action = 2
     */
    action: Action; // 4, 2
    /**
     * @generated from protobuf field: token.enum.Status status = 3
     */
    status: Status;
    /**
     * @generated from protobuf field: string owner_id = 4
     */
    owner_id: string;
    /**
     * @generated from protobuf field: string project_id = 5
     */
    project_id: string;
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
 * @generated from protobuf message token.project.ProjectTokens.Response
 */
export interface ProjectTokens_Response {
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
 * rpc AddTokenProjectMember
 * action 7
 *
 * @generated from protobuf message token.project.AddTokenProjectMember
 */
export interface AddTokenProjectMember {
}
/**
 * @generated from protobuf message token.project.AddTokenProjectMember.Request
 */
export interface AddTokenProjectMember_Request {
    /**
     * @generated from protobuf field: string owner_id = 1
     */
    owner_id: string;
    /**
     * @generated from protobuf field: string project_id = 2
     */
    project_id: string;
    /**
     * @generated from protobuf oneof: profile
     */
    profile: {
        oneofKind: "profile_id";
        /**
         * @generated from protobuf field: string profile_id = 3
         */
        profile_id: string;
    } | {
        oneofKind: "create_new_profile";
        /**
         * @generated from protobuf field: token.message.MetaDataProfile create_new_profile = 4
         */
        create_new_profile: MetaDataProfile;
    } | {
        oneofKind: undefined;
    };
    /**
     * @generated from protobuf field: google.protobuf.Timestamp expired_at = 50
     */
    expired_at?: Timestamp;
}
/**
 * @generated from protobuf message token.project.AddTokenProjectMember.Response
 */
export interface AddTokenProjectMember_Response {
    /**
     * @generated from protobuf field: string token = 1
     */
    token: string;
}
/**
 * rpc UpdateProjectToken
 *
 * @generated from protobuf message token.project.UpdateProjectToken
 */
export interface UpdateProjectToken {
}
/**
 * @generated from protobuf message token.project.UpdateProjectToken.Request
 */
export interface UpdateProjectToken_Request {
    /**
     * @generated from protobuf field: bool is_admin = 1
     */
    is_admin: boolean; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string token = 3
     */
    token: string;
    /**
     * @generated from protobuf field: token.enum.Status status = 4
     */
    status: Status;
    /**
     * @generated from protobuf field: string profile_id = 5
     */
    profile_id: string;
}
/**
 * @generated from protobuf message token.project.UpdateProjectToken.Response
 */
export interface UpdateProjectToken_Response {
}
// @generated message type with reflection information, may provide speed optimized methods
class ProjectTokens$Type extends MessageType<ProjectTokens> {
    constructor() {
        super("token.project.ProjectTokens", []);
    }
}
/**
 * @generated MessageType for protobuf message token.project.ProjectTokens
 */
export const ProjectTokens = new ProjectTokens$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ProjectTokens_Request$Type extends MessageType<ProjectTokens_Request> {
    constructor() {
        super("token.project.ProjectTokens.Request", [
            { no: 1, name: "is_admin", kind: "scalar", localName: "is_admin", T: 8 /*ScalarType.BOOL*/ },
            { no: 2, name: "action", kind: "enum", T: () => ["token.enum.Action", Action], options: { "buf.validate.field": { required: true, enum: { definedOnly: true, in: [7] } } } },
            { no: 3, name: "status", kind: "enum", T: () => ["token.enum.Status", Status], options: { "buf.validate.field": { ignore: "IGNORE_IF_ZERO_VALUE", enum: { definedOnly: true, notIn: [0, 3] } } } },
            { no: 4, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 5, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 6, name: "limit", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 7, name: "offset", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 8, name: "sort_by", kind: "scalar", localName: "sort_by", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message token.project.ProjectTokens.Request
 */
export const ProjectTokens_Request = new ProjectTokens_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ProjectTokens_Response$Type extends MessageType<ProjectTokens_Response> {
    constructor() {
        super("token.project.ProjectTokens.Response", [
            { no: 1, name: "total", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 2, name: "tokens", kind: "message", repeat: 2 /*RepeatType.UNPACKED*/, T: () => Token_Response }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message token.project.ProjectTokens.Response
 */
export const ProjectTokens_Response = new ProjectTokens_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddTokenProjectMember$Type extends MessageType<AddTokenProjectMember> {
    constructor() {
        super("token.project.AddTokenProjectMember", []);
    }
}
/**
 * @generated MessageType for protobuf message token.project.AddTokenProjectMember
 */
export const AddTokenProjectMember = new AddTokenProjectMember$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddTokenProjectMember_Request$Type extends MessageType<AddTokenProjectMember_Request> {
    constructor() {
        super("token.project.AddTokenProjectMember.Request", [
            { no: 1, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 2, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 3, name: "profile_id", kind: "scalar", localName: "profile_id", oneof: "profile", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 4, name: "create_new_profile", kind: "message", localName: "create_new_profile", oneof: "profile", T: () => MetaDataProfile },
            { no: 50, name: "expired_at", kind: "message", localName: "expired_at", T: () => Timestamp }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message token.project.AddTokenProjectMember.Request
 */
export const AddTokenProjectMember_Request = new AddTokenProjectMember_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddTokenProjectMember_Response$Type extends MessageType<AddTokenProjectMember_Response> {
    constructor() {
        super("token.project.AddTokenProjectMember.Response", [
            { no: 1, name: "token", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message token.project.AddTokenProjectMember.Response
 */
export const AddTokenProjectMember_Response = new AddTokenProjectMember_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateProjectToken$Type extends MessageType<UpdateProjectToken> {
    constructor() {
        super("token.project.UpdateProjectToken", []);
    }
}
/**
 * @generated MessageType for protobuf message token.project.UpdateProjectToken
 */
export const UpdateProjectToken = new UpdateProjectToken$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateProjectToken_Request$Type extends MessageType<UpdateProjectToken_Request> {
    constructor() {
        super("token.project.UpdateProjectToken.Request", [
            { no: 1, name: "is_admin", kind: "scalar", localName: "is_admin", T: 8 /*ScalarType.BOOL*/ },
            { no: 3, name: "token", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 4, name: "status", kind: "enum", T: () => ["token.enum.Status", Status], options: { "buf.validate.field": { required: true, enum: { definedOnly: true, notIn: [0, 3] } } } },
            { no: 5, name: "profile_id", kind: "scalar", localName: "profile_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { ignore: "IGNORE_IF_ZERO_VALUE", string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message token.project.UpdateProjectToken.Request
 */
export const UpdateProjectToken_Request = new UpdateProjectToken_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateProjectToken_Response$Type extends MessageType<UpdateProjectToken_Response> {
    constructor() {
        super("token.project.UpdateProjectToken.Response", []);
    }
}
/**
 * @generated MessageType for protobuf message token.project.UpdateProjectToken.Response
 */
export const UpdateProjectToken_Response = new UpdateProjectToken_Response$Type();
