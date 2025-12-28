// @generated from protobuf file "member.proto" (package "member", syntax proto3)
// tslint:disable
// @ts-nocheck
import { ServiceType } from "@protobuf-ts/runtime-rpc";
import { MessageType } from "@protobuf-ts/runtime";
import { Timestamp } from "./google/protobuf/timestamp";
import { Role } from "../profile";
/**
 * rpc ProjectMembers
 *
 * @generated from protobuf message member.ProjectMembers
 */
export interface ProjectMembers {
}
/**
 * @generated from protobuf message member.ProjectMembers.Request
 */
export interface ProjectMembers_Request {
    /**
     * @generated from protobuf field: bool is_admin = 1
     */
    is_admin: boolean; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string owner_id = 2
     */
    owner_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string project_id = 3
     */
    project_id: string; // @gotags: json:"-"
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
 * @generated from protobuf message member.ProjectMembers.Response
 */
export interface ProjectMembers_Response {
    /**
     * @generated from protobuf field: int32 total = 1
     */
    total: number;
    /**
     * @generated from protobuf field: repeated member.ProjectMember.Response members = 2
     */
    members: ProjectMember_Response[];
}
/**
 * rpc ProjectMember
 *
 * @generated from protobuf message member.ProjectMember
 */
export interface ProjectMember {
}
/**
 * @generated from protobuf message member.ProjectMember.Request
 */
export interface ProjectMember_Request {
    /**
     * @generated from protobuf field: bool is_admin = 1
     */
    is_admin: boolean; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string owner_id = 2
     */
    owner_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string project_id = 3
     */
    project_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string member_id = 4
     */
    member_id: string; // @gotags: json:"-"
}
/**
 * @generated from protobuf message member.ProjectMember.Response
 */
export interface ProjectMember_Response {
    /**
     * @generated from protobuf field: string owner_id = 1
     */
    owner_id: string;
    /**
     * @generated from protobuf field: string owner_name = 2
     */
    owner_name: string;
    /**
     * @generated from protobuf field: string project_id = 3
     */
    project_id: string;
    /**
     * @generated from protobuf field: string project_name = 4
     */
    project_name: string;
    /**
     * @generated from protobuf field: string member_id = 5
     */
    member_id: string;
    /**
     * @generated from protobuf field: string profile_id = 6
     */
    profile_id: string;
    /**
     * @generated from protobuf field: string name = 7
     */
    name: string;
    /**
     * @generated from protobuf field: profile.Role role = 8
     */
    role: Role;
    /**
     * @generated from protobuf field: bool active = 9
     */
    active: boolean;
    /**
     * @generated from protobuf field: bool online = 10
     */
    online: boolean;
    /**
     * @generated from protobuf field: int32 schemes_count = 11
     */
    schemes_count: number;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp locked_at = 12
     */
    locked_at?: Timestamp;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp archived_at = 13
     */
    archived_at?: Timestamp;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp updated_at = 14
     */
    updated_at?: Timestamp;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp created_at = 15
     */
    created_at?: Timestamp;
}
/**
 * rpc AddProjectMember
 *
 * @generated from protobuf message member.AddProjectMember
 */
export interface AddProjectMember {
}
/**
 * @generated from protobuf message member.AddProjectMember.Request
 */
export interface AddProjectMember_Request {
    /**
     * @generated from protobuf field: string owner_id = 1
     */
    owner_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string project_id = 2
     */
    project_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string profile_id = 3
     */
    profile_id: string;
    /**
     * @generated from protobuf field: profile.Role role = 4
     */
    role: Role; // @gotags: json:"-"
    /**
     * @generated from protobuf field: bool active = 5
     */
    active: boolean;
}
/**
 * @generated from protobuf message member.AddProjectMember.Response
 */
export interface AddProjectMember_Response {
    /**
     * @generated from protobuf field: string member_id = 1
     */
    member_id: string;
}
/**
 * rpc UpdateProjectMember
 *
 * @generated from protobuf message member.UpdateProjectMember
 */
export interface UpdateProjectMember {
}
/**
 * @generated from protobuf message member.UpdateProjectMember.Request
 */
export interface UpdateProjectMember_Request {
    /**
     * @generated from protobuf field: bool is_admin = 1
     */
    is_admin: boolean; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string owner_id = 2
     */
    owner_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string project_id = 3
     */
    project_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string member_id = 4
     */
    member_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf oneof: setting
     */
    setting: {
        oneofKind: "role";
        /**
         * @generated from protobuf field: profile.Role role = 5
         */
        role: Role;
    } | {
        oneofKind: "active";
        /**
         * @generated from protobuf field: bool active = 6
         */
        active: boolean;
    } | {
        oneofKind: undefined;
    };
}
/**
 * @generated from protobuf message member.UpdateProjectMember.Response
 */
export interface UpdateProjectMember_Response {
}
/**
 * rpc DeleteProjectMember
 *
 * @generated from protobuf message member.DeleteProjectMember
 */
export interface DeleteProjectMember {
}
/**
 * @generated from protobuf message member.DeleteProjectMember.Request
 */
export interface DeleteProjectMember_Request {
    /**
     * @generated from protobuf field: string owner_id = 1
     */
    owner_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string project_id = 2
     */
    project_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string member_id = 3
     */
    member_id: string; // @gotags: json:"-"
}
/**
 * @generated from protobuf message member.DeleteProjectMember.Response
 */
export interface DeleteProjectMember_Response {
}
/**
 * rpc ProfilesWithoutProject
 *
 * @generated from protobuf message member.ProfilesWithoutProject
 */
export interface ProfilesWithoutProject {
}
/**
 * @generated from protobuf message member.ProfilesWithoutProject.Request
 */
export interface ProfilesWithoutProject_Request {
    /**
     * @generated from protobuf field: bool is_admin = 1
     */
    is_admin: boolean; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string project_id = 2
     */
    project_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string alias = 3
     */
    alias: string;
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
 * @generated from protobuf message member.ProfilesWithoutProject.Response
 */
export interface ProfilesWithoutProject_Response {
    /**
     * @generated from protobuf field: int32 total = 1
     */
    total: number;
    /**
     * @generated from protobuf field: repeated member.ProfilesWithoutProject.Profile profiles = 2
     */
    profiles: ProfilesWithoutProject_Profile[];
}
/**
 * @generated from protobuf message member.ProfilesWithoutProject.Profile
 */
export interface ProfilesWithoutProject_Profile {
    /**
     * @generated from protobuf field: string profile_id = 1
     */
    profile_id: string;
    /**
     * @generated from protobuf field: string alias = 2
     */
    alias: string;
    /**
     * @generated from protobuf field: bool active = 3
     */
    active: boolean;
    /**
     * @generated from protobuf field: string email = 4
     */
    email: string;
}
/**
 * SchemeMembers
 *
 * @generated from protobuf message member.SchemeMembers
 */
export interface SchemeMembers {
}
/**
 * @generated from protobuf message member.SchemeMembers.Request
 */
export interface SchemeMembers_Request {
    /**
     * @generated from protobuf field: bool is_admin = 1
     */
    is_admin: boolean; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string owner_id = 2
     */
    owner_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string scheme_id = 3
     */
    scheme_id: string; // @gotags: json:"-"
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
 * @generated from protobuf message member.SchemeMembers.Response
 */
export interface SchemeMembers_Response {
    /**
     * @generated from protobuf field: int32 total = 1
     */
    total: number;
    /**
     * @generated from protobuf field: repeated member.SchemeMember.Response members = 2
     */
    members: SchemeMember_Response[];
}
/**
 * SchemeMember
 *
 * @generated from protobuf message member.SchemeMember
 */
export interface SchemeMember {
}
/**
 * @generated from protobuf message member.SchemeMember.Request
 */
export interface SchemeMember_Request {
    /**
     * @generated from protobuf field: bool is_admin = 1
     */
    is_admin: boolean; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string owner_id = 2
     */
    owner_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string scheme_id = 3
     */
    scheme_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string scheme_member_id = 4
     */
    scheme_member_id: string; // @gotags: json:"-"
}
/**
 * @generated from protobuf message member.SchemeMember.Response
 */
export interface SchemeMember_Response {
    /**
     * @generated from protobuf field: string scheme_member_id = 1
     */
    scheme_member_id: string;
    /**
     * @generated from protobuf field: string profile_id = 2
     */
    profile_id: string;
    /**
     * @generated from protobuf field: string alias = 3
     */
    alias: string;
    /**
     * @generated from protobuf field: string name = 4
     */
    name: string;
    /**
     * @generated from protobuf field: string surname = 5
     */
    surname: string;
    /**
     * @generated from protobuf field: string email = 6
     */
    email: string;
    /**
     * @generated from protobuf field: profile.Role role = 7
     */
    role: Role;
    /**
     * @generated from protobuf field: bool active = 8
     */
    active: boolean;
    /**
     * @generated from protobuf field: bool online = 9
     */
    online: boolean;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp locked_at = 10
     */
    locked_at?: Timestamp;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp archived_at = 11
     */
    archived_at?: Timestamp;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp updated_at = 12
     */
    updated_at?: Timestamp;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp created_at = 13
     */
    created_at?: Timestamp;
}
/**
 * AddSchemeMember
 *
 * @generated from protobuf message member.AddSchemeMember
 */
export interface AddSchemeMember {
}
/**
 * @generated from protobuf message member.AddSchemeMember.Request
 */
export interface AddSchemeMember_Request {
    /**
     * @generated from protobuf field: string owner_id = 1
     */
    owner_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string scheme_id = 2
     */
    scheme_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string member_id = 3
     */
    member_id: string;
    /**
     * @generated from protobuf field: bool active = 4
     */
    active: boolean;
}
/**
 * @generated from protobuf message member.AddSchemeMember.Response
 */
export interface AddSchemeMember_Response {
    /**
     * @generated from protobuf field: string scheme_member_id = 1
     */
    scheme_member_id: string;
}
/**
 * UpdateSchemeMember
 *
 * @generated from protobuf message member.UpdateSchemeMember
 */
export interface UpdateSchemeMember {
}
/**
 * @generated from protobuf message member.UpdateSchemeMember.Request
 */
export interface UpdateSchemeMember_Request {
    /**
     * @generated from protobuf field: string owner_id = 1
     */
    owner_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string scheme_id = 2
     */
    scheme_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string scheme_member_id = 3
     */
    scheme_member_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf oneof: setting
     */
    setting: {
        oneofKind: "active";
        /**
         * @generated from protobuf field: bool active = 4
         */
        active: boolean;
    } | {
        oneofKind: "online";
        /**
         * @generated from protobuf field: bool online = 5
         */
        online: boolean;
    } | {
        oneofKind: undefined;
    };
}
/**
 * @generated from protobuf message member.UpdateSchemeMember.Response
 */
export interface UpdateSchemeMember_Response {
}
/**
 * DeleteSchemeMember
 *
 * @generated from protobuf message member.DeleteSchemeMember
 */
export interface DeleteSchemeMember {
}
/**
 * @generated from protobuf message member.DeleteSchemeMember.Request
 */
export interface DeleteSchemeMember_Request {
    /**
     * @generated from protobuf field: string owner_id = 1
     */
    owner_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string scheme_id = 2
     */
    scheme_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string scheme_member_id = 3
     */
    scheme_member_id: string;
}
/**
 * @generated from protobuf message member.DeleteSchemeMember.Response
 */
export interface DeleteSchemeMember_Response {
}
/**
 * rpc MembersWithoutScheme
 *
 * @generated from protobuf message member.MembersWithoutScheme
 */
export interface MembersWithoutScheme {
}
/**
 * @generated from protobuf message member.MembersWithoutScheme.Request
 */
export interface MembersWithoutScheme_Request {
    /**
     * @generated from protobuf field: string owner_id = 1
     */
    owner_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string scheme_id = 2
     */
    scheme_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string alias = 3
     */
    alias: string;
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
 * @generated from protobuf message member.MembersWithoutScheme.Response
 */
export interface MembersWithoutScheme_Response {
    /**
     * @generated from protobuf field: int32 total = 1
     */
    total: number;
    /**
     * @generated from protobuf field: repeated member.MembersWithoutScheme.Member members = 2
     */
    members: MembersWithoutScheme_Member[];
}
/**
 * @generated from protobuf message member.MembersWithoutScheme.Member
 */
export interface MembersWithoutScheme_Member {
    /**
     * @generated from protobuf field: string member_id = 1
     */
    member_id: string;
    /**
     * @generated from protobuf field: string profile_id = 2
     */
    profile_id: string;
    /**
     * @generated from protobuf field: string alias = 3
     */
    alias: string;
    /**
     * @generated from protobuf field: string name = 4
     */
    name: string;
    /**
     * @generated from protobuf field: string surname = 5
     */
    surname: string;
    /**
     * @generated from protobuf field: string email = 6
     */
    email: string;
    /**
     * @generated from protobuf field: profile.Role role = 7
     */
    role: Role;
    /**
     * @generated from protobuf field: bool active = 8
     */
    active: boolean;
    /**
     * @generated from protobuf field: bool online = 9
     */
    online: boolean;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp locked_at = 10
     */
    locked_at?: Timestamp;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp archived_at = 11
     */
    archived_at?: Timestamp;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp updated_at = 12
     */
    updated_at?: Timestamp;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp created_at = 13
     */
    created_at?: Timestamp;
}
/**
 * @generated from protobuf enum member.InviteStatus
 */
export enum InviteStatus {
    /**
     * @generated from protobuf enum value: unspecified = 0;
     */
    unspecified = 0,
    /**
     * @generated from protobuf enum value: send = 1;
     */
    send = 1,
    /**
     * @generated from protobuf enum value: activated = 2;
     */
    activated = 2
}
// @generated message type with reflection information, may provide speed optimized methods
class ProjectMembers$Type extends MessageType<ProjectMembers> {
    constructor() {
        super("member.ProjectMembers", []);
    }
}
/**
 * @generated MessageType for protobuf message member.ProjectMembers
 */
export const ProjectMembers = new ProjectMembers$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ProjectMembers_Request$Type extends MessageType<ProjectMembers_Request> {
    constructor() {
        super("member.ProjectMembers.Request", [
            { no: 1, name: "is_admin", kind: "scalar", localName: "is_admin", T: 8 /*ScalarType.BOOL*/ },
            { no: 2, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 3, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 4, name: "limit", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 5, name: "offset", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 6, name: "sort_by", kind: "scalar", localName: "sort_by", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message member.ProjectMembers.Request
 */
export const ProjectMembers_Request = new ProjectMembers_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ProjectMembers_Response$Type extends MessageType<ProjectMembers_Response> {
    constructor() {
        super("member.ProjectMembers.Response", [
            { no: 1, name: "total", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 2, name: "members", kind: "message", repeat: 2 /*RepeatType.UNPACKED*/, T: () => ProjectMember_Response }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message member.ProjectMembers.Response
 */
export const ProjectMembers_Response = new ProjectMembers_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ProjectMember$Type extends MessageType<ProjectMember> {
    constructor() {
        super("member.ProjectMember", []);
    }
}
/**
 * @generated MessageType for protobuf message member.ProjectMember
 */
export const ProjectMember = new ProjectMember$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ProjectMember_Request$Type extends MessageType<ProjectMember_Request> {
    constructor() {
        super("member.ProjectMember.Request", [
            { no: 1, name: "is_admin", kind: "scalar", localName: "is_admin", T: 8 /*ScalarType.BOOL*/ },
            { no: 2, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 3, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 4, name: "member_id", kind: "scalar", localName: "member_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message member.ProjectMember.Request
 */
export const ProjectMember_Request = new ProjectMember_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ProjectMember_Response$Type extends MessageType<ProjectMember_Response> {
    constructor() {
        super("member.ProjectMember.Response", [
            { no: 1, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "ghoster.secret": true } },
            { no: 2, name: "owner_name", kind: "scalar", localName: "owner_name", T: 9 /*ScalarType.STRING*/, options: { "ghoster.secret": true } },
            { no: 3, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "ghoster.secret": true } },
            { no: 4, name: "project_name", kind: "scalar", localName: "project_name", T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "member_id", kind: "scalar", localName: "member_id", T: 9 /*ScalarType.STRING*/ },
            { no: 6, name: "profile_id", kind: "scalar", localName: "profile_id", T: 9 /*ScalarType.STRING*/, options: { "ghoster.secret": true } },
            { no: 7, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 8, name: "role", kind: "enum", T: () => ["profile.Role", Role], options: { "ghoster.secret": true } },
            { no: 9, name: "active", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 10, name: "online", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 11, name: "schemes_count", kind: "scalar", localName: "schemes_count", T: 5 /*ScalarType.INT32*/ },
            { no: 12, name: "locked_at", kind: "message", localName: "locked_at", T: () => Timestamp, options: { "ghoster.secret": true } },
            { no: 13, name: "archived_at", kind: "message", localName: "archived_at", T: () => Timestamp, options: { "ghoster.secret": true } },
            { no: 14, name: "updated_at", kind: "message", localName: "updated_at", T: () => Timestamp, options: { "ghoster.secret": true } },
            { no: 15, name: "created_at", kind: "message", localName: "created_at", T: () => Timestamp }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message member.ProjectMember.Response
 */
export const ProjectMember_Response = new ProjectMember_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddProjectMember$Type extends MessageType<AddProjectMember> {
    constructor() {
        super("member.AddProjectMember", []);
    }
}
/**
 * @generated MessageType for protobuf message member.AddProjectMember
 */
export const AddProjectMember = new AddProjectMember$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddProjectMember_Request$Type extends MessageType<AddProjectMember_Request> {
    constructor() {
        super("member.AddProjectMember.Request", [
            { no: 1, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 2, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 3, name: "profile_id", kind: "scalar", localName: "profile_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 4, name: "role", kind: "enum", T: () => ["profile.Role", Role], options: { "buf.validate.field": { enum: { in: [1, 2] } } } },
            { no: 5, name: "active", kind: "scalar", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message member.AddProjectMember.Request
 */
export const AddProjectMember_Request = new AddProjectMember_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddProjectMember_Response$Type extends MessageType<AddProjectMember_Response> {
    constructor() {
        super("member.AddProjectMember.Response", [
            { no: 1, name: "member_id", kind: "scalar", localName: "member_id", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message member.AddProjectMember.Response
 */
export const AddProjectMember_Response = new AddProjectMember_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateProjectMember$Type extends MessageType<UpdateProjectMember> {
    constructor() {
        super("member.UpdateProjectMember", []);
    }
}
/**
 * @generated MessageType for protobuf message member.UpdateProjectMember
 */
export const UpdateProjectMember = new UpdateProjectMember$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateProjectMember_Request$Type extends MessageType<UpdateProjectMember_Request> {
    constructor() {
        super("member.UpdateProjectMember.Request", [
            { no: 1, name: "is_admin", kind: "scalar", localName: "is_admin", T: 8 /*ScalarType.BOOL*/ },
            { no: 2, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 3, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 4, name: "member_id", kind: "scalar", localName: "member_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 5, name: "role", kind: "enum", oneof: "setting", T: () => ["profile.Role", Role], options: { "buf.validate.field": { enum: { in: [1, 2] } } } },
            { no: 6, name: "active", kind: "scalar", oneof: "setting", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message member.UpdateProjectMember.Request
 */
export const UpdateProjectMember_Request = new UpdateProjectMember_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateProjectMember_Response$Type extends MessageType<UpdateProjectMember_Response> {
    constructor() {
        super("member.UpdateProjectMember.Response", []);
    }
}
/**
 * @generated MessageType for protobuf message member.UpdateProjectMember.Response
 */
export const UpdateProjectMember_Response = new UpdateProjectMember_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DeleteProjectMember$Type extends MessageType<DeleteProjectMember> {
    constructor() {
        super("member.DeleteProjectMember", []);
    }
}
/**
 * @generated MessageType for protobuf message member.DeleteProjectMember
 */
export const DeleteProjectMember = new DeleteProjectMember$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DeleteProjectMember_Request$Type extends MessageType<DeleteProjectMember_Request> {
    constructor() {
        super("member.DeleteProjectMember.Request", [
            { no: 1, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 2, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 3, name: "member_id", kind: "scalar", localName: "member_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message member.DeleteProjectMember.Request
 */
export const DeleteProjectMember_Request = new DeleteProjectMember_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DeleteProjectMember_Response$Type extends MessageType<DeleteProjectMember_Response> {
    constructor() {
        super("member.DeleteProjectMember.Response", []);
    }
}
/**
 * @generated MessageType for protobuf message member.DeleteProjectMember.Response
 */
export const DeleteProjectMember_Response = new DeleteProjectMember_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ProfilesWithoutProject$Type extends MessageType<ProfilesWithoutProject> {
    constructor() {
        super("member.ProfilesWithoutProject", []);
    }
}
/**
 * @generated MessageType for protobuf message member.ProfilesWithoutProject
 */
export const ProfilesWithoutProject = new ProfilesWithoutProject$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ProfilesWithoutProject_Request$Type extends MessageType<ProfilesWithoutProject_Request> {
    constructor() {
        super("member.ProfilesWithoutProject.Request", [
            { no: 1, name: "is_admin", kind: "scalar", localName: "is_admin", T: 8 /*ScalarType.BOOL*/ },
            { no: 2, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 3, name: "alias", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "limit", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 5, name: "offset", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 6, name: "sort_by", kind: "scalar", localName: "sort_by", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message member.ProfilesWithoutProject.Request
 */
export const ProfilesWithoutProject_Request = new ProfilesWithoutProject_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ProfilesWithoutProject_Response$Type extends MessageType<ProfilesWithoutProject_Response> {
    constructor() {
        super("member.ProfilesWithoutProject.Response", [
            { no: 1, name: "total", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 2, name: "profiles", kind: "message", repeat: 2 /*RepeatType.UNPACKED*/, T: () => ProfilesWithoutProject_Profile }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message member.ProfilesWithoutProject.Response
 */
export const ProfilesWithoutProject_Response = new ProfilesWithoutProject_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ProfilesWithoutProject_Profile$Type extends MessageType<ProfilesWithoutProject_Profile> {
    constructor() {
        super("member.ProfilesWithoutProject.Profile", [
            { no: 1, name: "profile_id", kind: "scalar", localName: "profile_id", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "alias", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "active", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 4, name: "email", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "ghoster.secret": true } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message member.ProfilesWithoutProject.Profile
 */
export const ProfilesWithoutProject_Profile = new ProfilesWithoutProject_Profile$Type();
// @generated message type with reflection information, may provide speed optimized methods
class SchemeMembers$Type extends MessageType<SchemeMembers> {
    constructor() {
        super("member.SchemeMembers", []);
    }
}
/**
 * @generated MessageType for protobuf message member.SchemeMembers
 */
export const SchemeMembers = new SchemeMembers$Type();
// @generated message type with reflection information, may provide speed optimized methods
class SchemeMembers_Request$Type extends MessageType<SchemeMembers_Request> {
    constructor() {
        super("member.SchemeMembers.Request", [
            { no: 1, name: "is_admin", kind: "scalar", localName: "is_admin", T: 8 /*ScalarType.BOOL*/ },
            { no: 2, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 3, name: "scheme_id", kind: "scalar", localName: "scheme_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 4, name: "limit", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 5, name: "offset", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 6, name: "sort_by", kind: "scalar", localName: "sort_by", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message member.SchemeMembers.Request
 */
export const SchemeMembers_Request = new SchemeMembers_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class SchemeMembers_Response$Type extends MessageType<SchemeMembers_Response> {
    constructor() {
        super("member.SchemeMembers.Response", [
            { no: 1, name: "total", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 2, name: "members", kind: "message", repeat: 2 /*RepeatType.UNPACKED*/, T: () => SchemeMember_Response }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message member.SchemeMembers.Response
 */
export const SchemeMembers_Response = new SchemeMembers_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class SchemeMember$Type extends MessageType<SchemeMember> {
    constructor() {
        super("member.SchemeMember", []);
    }
}
/**
 * @generated MessageType for protobuf message member.SchemeMember
 */
export const SchemeMember = new SchemeMember$Type();
// @generated message type with reflection information, may provide speed optimized methods
class SchemeMember_Request$Type extends MessageType<SchemeMember_Request> {
    constructor() {
        super("member.SchemeMember.Request", [
            { no: 1, name: "is_admin", kind: "scalar", localName: "is_admin", T: 8 /*ScalarType.BOOL*/ },
            { no: 2, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 3, name: "scheme_id", kind: "scalar", localName: "scheme_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 4, name: "scheme_member_id", kind: "scalar", localName: "scheme_member_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message member.SchemeMember.Request
 */
export const SchemeMember_Request = new SchemeMember_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class SchemeMember_Response$Type extends MessageType<SchemeMember_Response> {
    constructor() {
        super("member.SchemeMember.Response", [
            { no: 1, name: "scheme_member_id", kind: "scalar", localName: "scheme_member_id", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "profile_id", kind: "scalar", localName: "profile_id", T: 9 /*ScalarType.STRING*/, options: { "ghoster.secret": true } },
            { no: 3, name: "alias", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "surname", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 6, name: "email", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "ghoster.secret": true } },
            { no: 7, name: "role", kind: "enum", T: () => ["profile.Role", Role], options: { "ghoster.secret": true } },
            { no: 8, name: "active", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 9, name: "online", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 10, name: "locked_at", kind: "message", localName: "locked_at", T: () => Timestamp, options: { "ghoster.secret": true } },
            { no: 11, name: "archived_at", kind: "message", localName: "archived_at", T: () => Timestamp, options: { "ghoster.secret": true } },
            { no: 12, name: "updated_at", kind: "message", localName: "updated_at", T: () => Timestamp, options: { "ghoster.secret": true } },
            { no: 13, name: "created_at", kind: "message", localName: "created_at", T: () => Timestamp }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message member.SchemeMember.Response
 */
export const SchemeMember_Response = new SchemeMember_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddSchemeMember$Type extends MessageType<AddSchemeMember> {
    constructor() {
        super("member.AddSchemeMember", []);
    }
}
/**
 * @generated MessageType for protobuf message member.AddSchemeMember
 */
export const AddSchemeMember = new AddSchemeMember$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddSchemeMember_Request$Type extends MessageType<AddSchemeMember_Request> {
    constructor() {
        super("member.AddSchemeMember.Request", [
            { no: 1, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 2, name: "scheme_id", kind: "scalar", localName: "scheme_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 3, name: "member_id", kind: "scalar", localName: "member_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 4, name: "active", kind: "scalar", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message member.AddSchemeMember.Request
 */
export const AddSchemeMember_Request = new AddSchemeMember_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddSchemeMember_Response$Type extends MessageType<AddSchemeMember_Response> {
    constructor() {
        super("member.AddSchemeMember.Response", [
            { no: 1, name: "scheme_member_id", kind: "scalar", localName: "scheme_member_id", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message member.AddSchemeMember.Response
 */
export const AddSchemeMember_Response = new AddSchemeMember_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateSchemeMember$Type extends MessageType<UpdateSchemeMember> {
    constructor() {
        super("member.UpdateSchemeMember", []);
    }
}
/**
 * @generated MessageType for protobuf message member.UpdateSchemeMember
 */
export const UpdateSchemeMember = new UpdateSchemeMember$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateSchemeMember_Request$Type extends MessageType<UpdateSchemeMember_Request> {
    constructor() {
        super("member.UpdateSchemeMember.Request", [
            { no: 1, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 2, name: "scheme_id", kind: "scalar", localName: "scheme_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 3, name: "scheme_member_id", kind: "scalar", localName: "scheme_member_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 4, name: "active", kind: "scalar", oneof: "setting", T: 8 /*ScalarType.BOOL*/ },
            { no: 5, name: "online", kind: "scalar", oneof: "setting", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message member.UpdateSchemeMember.Request
 */
export const UpdateSchemeMember_Request = new UpdateSchemeMember_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateSchemeMember_Response$Type extends MessageType<UpdateSchemeMember_Response> {
    constructor() {
        super("member.UpdateSchemeMember.Response", []);
    }
}
/**
 * @generated MessageType for protobuf message member.UpdateSchemeMember.Response
 */
export const UpdateSchemeMember_Response = new UpdateSchemeMember_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DeleteSchemeMember$Type extends MessageType<DeleteSchemeMember> {
    constructor() {
        super("member.DeleteSchemeMember", []);
    }
}
/**
 * @generated MessageType for protobuf message member.DeleteSchemeMember
 */
export const DeleteSchemeMember = new DeleteSchemeMember$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DeleteSchemeMember_Request$Type extends MessageType<DeleteSchemeMember_Request> {
    constructor() {
        super("member.DeleteSchemeMember.Request", [
            { no: 1, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 2, name: "scheme_id", kind: "scalar", localName: "scheme_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 3, name: "scheme_member_id", kind: "scalar", localName: "scheme_member_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message member.DeleteSchemeMember.Request
 */
export const DeleteSchemeMember_Request = new DeleteSchemeMember_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DeleteSchemeMember_Response$Type extends MessageType<DeleteSchemeMember_Response> {
    constructor() {
        super("member.DeleteSchemeMember.Response", []);
    }
}
/**
 * @generated MessageType for protobuf message member.DeleteSchemeMember.Response
 */
export const DeleteSchemeMember_Response = new DeleteSchemeMember_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class MembersWithoutScheme$Type extends MessageType<MembersWithoutScheme> {
    constructor() {
        super("member.MembersWithoutScheme", []);
    }
}
/**
 * @generated MessageType for protobuf message member.MembersWithoutScheme
 */
export const MembersWithoutScheme = new MembersWithoutScheme$Type();
// @generated message type with reflection information, may provide speed optimized methods
class MembersWithoutScheme_Request$Type extends MessageType<MembersWithoutScheme_Request> {
    constructor() {
        super("member.MembersWithoutScheme.Request", [
            { no: 1, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 2, name: "scheme_id", kind: "scalar", localName: "scheme_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 3, name: "alias", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "limit", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 5, name: "offset", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 6, name: "sort_by", kind: "scalar", localName: "sort_by", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message member.MembersWithoutScheme.Request
 */
export const MembersWithoutScheme_Request = new MembersWithoutScheme_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class MembersWithoutScheme_Response$Type extends MessageType<MembersWithoutScheme_Response> {
    constructor() {
        super("member.MembersWithoutScheme.Response", [
            { no: 1, name: "total", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 2, name: "members", kind: "message", repeat: 2 /*RepeatType.UNPACKED*/, T: () => MembersWithoutScheme_Member }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message member.MembersWithoutScheme.Response
 */
export const MembersWithoutScheme_Response = new MembersWithoutScheme_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class MembersWithoutScheme_Member$Type extends MessageType<MembersWithoutScheme_Member> {
    constructor() {
        super("member.MembersWithoutScheme.Member", [
            { no: 1, name: "member_id", kind: "scalar", localName: "member_id", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "profile_id", kind: "scalar", localName: "profile_id", T: 9 /*ScalarType.STRING*/, options: { "ghoster.secret": true } },
            { no: 3, name: "alias", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "surname", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 6, name: "email", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "ghoster.secret": true } },
            { no: 7, name: "role", kind: "enum", T: () => ["profile.Role", Role], options: { "ghoster.secret": true } },
            { no: 8, name: "active", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 9, name: "online", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 10, name: "locked_at", kind: "message", localName: "locked_at", T: () => Timestamp, options: { "ghoster.secret": true } },
            { no: 11, name: "archived_at", kind: "message", localName: "archived_at", T: () => Timestamp, options: { "ghoster.secret": true } },
            { no: 12, name: "updated_at", kind: "message", localName: "updated_at", T: () => Timestamp, options: { "ghoster.secret": true } },
            { no: 13, name: "created_at", kind: "message", localName: "created_at", T: () => Timestamp }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message member.MembersWithoutScheme.Member
 */
export const MembersWithoutScheme_Member = new MembersWithoutScheme_Member$Type();
/**
 * @generated ServiceType for protobuf service member.MemberHandlers
 */
export const MemberHandlers = new ServiceType("member.MemberHandlers", [
    { name: "ProjectMembers", options: {}, I: ProjectMembers_Request, O: ProjectMembers_Response },
    { name: "ProjectMember", options: {}, I: ProjectMember_Request, O: ProjectMember_Response },
    { name: "AddProjectMember", options: {}, I: AddProjectMember_Request, O: AddProjectMember_Response },
    { name: "UpdateProjectMember", options: {}, I: UpdateProjectMember_Request, O: UpdateProjectMember_Response },
    { name: "DeleteProjectMember", options: {}, I: DeleteProjectMember_Request, O: DeleteProjectMember_Response },
    { name: "ProfilesWithoutProject", options: {}, I: ProfilesWithoutProject_Request, O: ProfilesWithoutProject_Response },
    { name: "SchemeMembers", options: {}, I: SchemeMembers_Request, O: SchemeMembers_Response },
    { name: "SchemeMember", options: {}, I: SchemeMember_Request, O: SchemeMember_Response },
    { name: "AddSchemeMember", options: {}, I: AddSchemeMember_Request, O: AddSchemeMember_Response },
    { name: "UpdateSchemeMember", options: {}, I: UpdateSchemeMember_Request, O: UpdateSchemeMember_Response },
    { name: "DeleteSchemeMember", options: {}, I: DeleteSchemeMember_Request, O: DeleteSchemeMember_Response },
    { name: "MembersWithoutScheme", options: {}, I: MembersWithoutScheme_Request, O: MembersWithoutScheme_Response }
]);
