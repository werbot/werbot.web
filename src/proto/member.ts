// @generated from protobuf file "member.proto" (package "member", syntax proto3)
// tslint:disable
// @ts-nocheck
import { ServiceType } from "@protobuf-ts/runtime-rpc";
import { MessageType } from "@protobuf-ts/runtime";
import { Timestamp } from "./google/protobuf/timestamp";
import { Role } from "./user";
/**
 * rpc ListProjectMembers
 *
 * @generated from protobuf message member.ListProjectMembers
 */
export interface ListProjectMembers {
}
/**
 * @generated from protobuf message member.ListProjectMembers.Request
 */
export interface ListProjectMembers_Request {
    /**
     * @generated from protobuf field: string owner_id = 1;
     */
    owner_id: string;
    /**
     * @generated from protobuf field: string project_id = 2;
     */
    project_id: string;
    /**
     * @generated from protobuf field: int32 limit = 3;
     */
    limit: number;
    /**
     * @generated from protobuf field: int32 offset = 4;
     */
    offset: number;
    /**
     * @generated from protobuf field: string sort_by = 5;
     */
    sort_by: string;
}
/**
 * @generated from protobuf message member.ListProjectMembers.Response
 */
export interface ListProjectMembers_Response {
    /**
     * @generated from protobuf field: int32 total = 1;
     */
    total: number;
    /**
     * @generated from protobuf field: repeated member.ProjectMember.Response members = 2;
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
     * @generated from protobuf field: string owner_id = 1;
     */
    owner_id: string; // @gotags: query:"owner_id"
    /**
     * @generated from protobuf field: string project_id = 2;
     */
    project_id: string; // @gotags: query:"project_id"
    /**
     * @generated from protobuf field: string member_id = 3;
     */
    member_id: string;
}
/**
 * @generated from protobuf message member.ProjectMember.Response
 */
export interface ProjectMember_Response {
    /**
     * @generated from protobuf field: string owner_id = 1;
     */
    owner_id: string;
    /**
     * @generated from protobuf field: string owner_name = 2;
     */
    owner_name: string;
    /**
     * @generated from protobuf field: string project_id = 3;
     */
    project_id: string;
    /**
     * @generated from protobuf field: string project_name = 4;
     */
    project_name: string;
    /**
     * @generated from protobuf field: string member_id = 5;
     */
    member_id: string;
    /**
     * @generated from protobuf field: string user_id = 6;
     */
    user_id: string;
    /**
     * @generated from protobuf field: string user_name = 7;
     */
    user_name: string;
    /**
     * @generated from protobuf field: user.Role role = 8;
     */
    role: Role;
    /**
     * @generated from protobuf field: bool active = 9;
     */
    active: boolean;
    /**
     * @generated from protobuf field: bool online = 10;
     */
    online: boolean;
    /**
     * @generated from protobuf field: int32 servers_count = 11;
     */
    servers_count: number;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp locked_at = 12;
     */
    locked_at?: Timestamp;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp archived_at = 13;
     */
    archived_at?: Timestamp;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp updated_at = 14;
     */
    updated_at?: Timestamp;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp created_at = 15;
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
     * @generated from protobuf field: string owner_id = 1;
     */
    owner_id: string; // @gotags: query:"owner_id"
    /**
     * @generated from protobuf field: string project_id = 2;
     */
    project_id: string; // @gotags: query:"project_id"
    /**
     * @generated from protobuf field: string user_id = 3;
     */
    user_id: string; // @gotags: query:"user_id"
    /**
     * @generated from protobuf field: user.Role role = 4;
     */
    role: Role;
    /**
     * @generated from protobuf field: bool active = 5;
     */
    active: boolean;
}
/**
 * @generated from protobuf message member.AddProjectMember.Response
 */
export interface AddProjectMember_Response {
    /**
     * @generated from protobuf field: string member_id = 1;
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
     * @generated from protobuf field: string owner_id = 1;
     */
    owner_id: string; // @gotags: query:"owner_id"
    /**
     * @generated from protobuf field: string project_id = 2;
     */
    project_id: string; // @gotags: query:"project_id"
    /**
     * @generated from protobuf field: string member_id = 3;
     */
    member_id: string; // @gotags: query:"member_id"
    /**
     * @generated from protobuf oneof: setting
     */
    setting: {
        oneofKind: "role";
        /**
         * @generated from protobuf field: user.Role role = 4;
         */
        role: Role;
    } | {
        oneofKind: "active";
        /**
         * @generated from protobuf field: bool active = 5;
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
     * @generated from protobuf field: string owner_id = 1;
     */
    owner_id: string; // @gotags: query:"owner_id"
    /**
     * @generated from protobuf field: string project_id = 2;
     */
    project_id: string; // @gotags: query:"project_id"
    /**
     * @generated from protobuf field: string member_id = 3;
     */
    member_id: string; // @gotags: query:"member_id"
}
/**
 * @generated from protobuf message member.DeleteProjectMember.Response
 */
export interface DeleteProjectMember_Response {
}
/**
 * rpc UsersWithoutProject
 *
 * @generated from protobuf message member.UsersWithoutProject
 */
export interface UsersWithoutProject {
}
/**
 * @generated from protobuf message member.UsersWithoutProject.Request
 */
export interface UsersWithoutProject_Request {
    /**
     * @generated from protobuf field: string owner_id = 1;
     */
    owner_id: string; // @gotags: query:"owner_id"
    /**
     * @generated from protobuf field: string project_id = 2;
     */
    project_id: string; // @gotags: query:"project_id"
    /**
     * @generated from protobuf field: string login = 3;
     */
    login: string;
}
/**
 * @generated from protobuf message member.UsersWithoutProject.Response
 */
export interface UsersWithoutProject_Response {
    /**
     * @generated from protobuf field: repeated member.UsersWithoutProject.User users = 1;
     */
    users: UsersWithoutProject_User[];
}
/**
 * @generated from protobuf message member.UsersWithoutProject.User
 */
export interface UsersWithoutProject_User {
    /**
     * @generated from protobuf field: int32 user_id = 1;
     */
    user_id: number;
    /**
     * @generated from protobuf field: string login = 2;
     */
    login: string;
    /**
     * @generated from protobuf field: string email = 3;
     */
    email: string;
}
/**
 * rpc ListMembersInvite
 *
 * @generated from protobuf message member.ListMembersInvite
 */
export interface ListMembersInvite {
}
/**
 * @generated from protobuf message member.ListMembersInvite.Request
 */
export interface ListMembersInvite_Request {
    /**
     * @generated from protobuf field: int32 limit = 1;
     */
    limit: number;
    /**
     * @generated from protobuf field: int32 offset = 2;
     */
    offset: number;
    /**
     * @generated from protobuf field: string sort_by = 3;
     */
    sort_by: string;
    /**
     * @generated from protobuf field: string owner_id = 4;
     */
    owner_id: string; // @gotags: query:"owner_id"
    /**
     * @generated from protobuf field: string project_id = 5;
     */
    project_id: string; // @gotags: query:"project_id"
}
/**
 * @generated from protobuf message member.ListMembersInvite.Response
 */
export interface ListMembersInvite_Response {
    /**
     * @generated from protobuf field: int32 total = 1;
     */
    total: number;
    /**
     * @generated from protobuf field: repeated member.ListMembersInvite.Invites invites = 2;
     */
    invites: ListMembersInvite_Invites[];
}
/**
 * @generated from protobuf message member.ListMembersInvite.Invites
 */
export interface ListMembersInvite_Invites {
    /**
     * @generated from protobuf field: string id = 1;
     */
    id: string;
    /**
     * @generated from protobuf field: string name = 2;
     */
    name: string;
    /**
     * @generated from protobuf field: string surname = 3;
     */
    surname: string;
    /**
     * @generated from protobuf field: string email = 4;
     */
    email: string;
    /**
     * @generated from protobuf field: string status = 6;
     */
    status: string;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp updated_at = 7;
     */
    updated_at?: Timestamp;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp created_at = 8;
     */
    created_at?: Timestamp;
}
/**
 * rpc AddMemberInvite
 *
 * @generated from protobuf message member.AddMemberInvite
 */
export interface AddMemberInvite {
}
/**
 * @generated from protobuf message member.AddMemberInvite.Request
 */
export interface AddMemberInvite_Request {
    /**
     * @generated from protobuf field: string owner_id = 1;
     */
    owner_id: string; // @gotags: query:"owner_id"
    /**
     * @generated from protobuf field: string project_id = 2;
     */
    project_id: string; // @gotags: query:"project_id"
    /**
     * @generated from protobuf field: string user_name = 3;
     */
    user_name: string; // @gotags: query:"user_name"
    /**
     * @generated from protobuf field: string user_surname = 4;
     */
    user_surname: string; // @gotags: query:"user_surname"
    /**
     * @generated from protobuf field: string email = 5;
     */
    email: string; // @gotags: query:"email"
}
/**
 * @generated from protobuf message member.AddMemberInvite.Response
 */
export interface AddMemberInvite_Response {
    /**
     * @generated from protobuf field: string invite = 1;
     */
    invite: string;
    /**
     * @generated from protobuf field: string status = 2;
     */
    status: string;
}
/**
 * rpc DeleteMemberInvite
 *
 * @generated from protobuf message member.DeleteMemberInvite
 */
export interface DeleteMemberInvite {
}
/**
 * @generated from protobuf message member.DeleteMemberInvite.Request
 */
export interface DeleteMemberInvite_Request {
    /**
     * @generated from protobuf field: string owner_id = 1;
     */
    owner_id: string; // @gotags: query:"owner_id"
    /**
     * @generated from protobuf field: string project_id = 2;
     */
    project_id: string; // @gotags: query:"project_id"
    /**
     * @generated from protobuf field: string invite_id = 3;
     */
    invite_id: string; // @gotags: query:"invite_id"
}
/**
 * @generated from protobuf message member.DeleteMemberInvite.Response
 */
export interface DeleteMemberInvite_Response {
}
/**
 * rpc MemberInviteActivate
 *
 * @generated from protobuf message member.MemberInviteActivate
 */
export interface MemberInviteActivate {
}
/**
 * @generated from protobuf message member.MemberInviteActivate.Request
 */
export interface MemberInviteActivate_Request {
    /**
     * @generated from protobuf field: string invite = 1;
     */
    invite: string; // @gotags: query:"invite"
    /**
     * @generated from protobuf field: string user_id = 2;
     */
    user_id: string; // @gotags: query:"user_id"
}
/**
 * @generated from protobuf message member.MemberInviteActivate.Response
 */
export interface MemberInviteActivate_Response {
    /**
     * @generated from protobuf field: string project_id = 1;
     */
    project_id: string;
    /**
     * @generated from protobuf field: string email = 2;
     */
    email: string;
}
/**
 * ListServerMembers
 *
 * @generated from protobuf message member.ListServerMembers
 */
export interface ListServerMembers {
}
/**
 * @generated from protobuf message member.ListServerMembers.Request
 */
export interface ListServerMembers_Request {
    /**
     * @generated from protobuf field: int32 limit = 1;
     */
    limit: number;
    /**
     * @generated from protobuf field: int32 offset = 2;
     */
    offset: number;
    /**
     * @generated from protobuf field: string sort_by = 3;
     */
    sort_by: string;
    /**
     * @generated from protobuf field: string owner_id = 4;
     */
    owner_id: string; // @gotags: query:"owner_id"
    /**
     * @generated from protobuf field: string project_id = 5;
     */
    project_id: string; // @gotags: query:"project_id"
    /**
     * @generated from protobuf field: string server_id = 6;
     */
    server_id: string; // @gotags: query:"server_id"
}
/**
 * @generated from protobuf message member.ListServerMembers.Response
 */
export interface ListServerMembers_Response {
    /**
     * @generated from protobuf field: int32 total = 1;
     */
    total: number;
    /**
     * @generated from protobuf field: repeated member.ServerMember.Response members = 2;
     */
    members: ServerMember_Response[];
}
/**
 * ServerMember
 *
 * @generated from protobuf message member.ServerMember
 */
export interface ServerMember {
}
/**
 * @generated from protobuf message member.ServerMember.Request
 */
export interface ServerMember_Request {
    /**
     * @generated from protobuf field: string owner_id = 1;
     */
    owner_id: string; // @gotags: query:"owner_id"
    /**
     * @generated from protobuf field: string project_id = 2;
     */
    project_id: string; // @gotags: query:"project_id"
    /**
     * @generated from protobuf field: string server_id = 3;
     */
    server_id: string; // @gotags: query:"server_id"
    /**
     * @generated from protobuf field: string member_id = 4;
     */
    member_id: string;
}
/**
 * @generated from protobuf message member.ServerMember.Response
 */
export interface ServerMember_Response {
    /**
     * @generated from protobuf field: string member_id = 1;
     */
    member_id: string;
    /**
     * @generated from protobuf field: string user_id = 2;
     */
    user_id: string;
    /**
     * @generated from protobuf field: string user_login = 3;
     */
    user_login: string;
    /**
     * @generated from protobuf field: string user_name = 4;
     */
    user_name: string;
    /**
     * @generated from protobuf field: string user_surname = 5;
     */
    user_surname: string;
    /**
     * @generated from protobuf field: string email = 6;
     */
    email: string;
    /**
     * @generated from protobuf field: user.Role role = 7;
     */
    role: Role;
    /**
     * @generated from protobuf field: bool active = 8;
     */
    active: boolean;
    /**
     * @generated from protobuf field: bool online = 9;
     */
    online: boolean;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp locked_at = 10;
     */
    locked_at?: Timestamp;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp archived_at = 11;
     */
    archived_at?: Timestamp;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp updated_at = 12;
     */
    updated_at?: Timestamp;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp created_at = 13;
     */
    created_at?: Timestamp;
}
/**
 * AddServerMember
 *
 * @generated from protobuf message member.AddServerMember
 */
export interface AddServerMember {
}
/**
 * @generated from protobuf message member.AddServerMember.Request
 */
export interface AddServerMember_Request {
    /**
     * @generated from protobuf field: string owner_id = 1;
     */
    owner_id: string;
    /**
     * @generated from protobuf field: string project_id = 2;
     */
    project_id: string;
    /**
     * @generated from protobuf field: string server_id = 3;
     */
    server_id: string;
    /**
     * @generated from protobuf field: string member_id = 4;
     */
    member_id: string;
    /**
     * @generated from protobuf field: bool active = 5;
     */
    active: boolean;
}
/**
 * @generated from protobuf message member.AddServerMember.Response
 */
export interface AddServerMember_Response {
    /**
     * @generated from protobuf field: string member_id = 1;
     */
    member_id: string;
}
/**
 * UpdateServerMember
 *
 * @generated from protobuf message member.UpdateServerMember
 */
export interface UpdateServerMember {
}
/**
 * @generated from protobuf message member.UpdateServerMember.Request
 */
export interface UpdateServerMember_Request {
    /**
     * @generated from protobuf field: string owner_id = 1;
     */
    owner_id: string;
    /**
     * @generated from protobuf field: string project_id = 2;
     */
    project_id: string;
    /**
     * @generated from protobuf field: string server_id = 3;
     */
    server_id: string;
    /**
     * @generated from protobuf field: string member_id = 4;
     */
    member_id: string;
    /**
     * @generated from protobuf oneof: setting
     */
    setting: {
        oneofKind: "active";
        /**
         * @generated from protobuf field: bool active = 5;
         */
        active: boolean;
    } | {
        oneofKind: "online";
        /**
         * @generated from protobuf field: bool online = 6;
         */
        online: boolean;
    } | {
        oneofKind: undefined;
    };
}
/**
 * @generated from protobuf message member.UpdateServerMember.Response
 */
export interface UpdateServerMember_Response {
}
/**
 * DeleteServerMember
 *
 * @generated from protobuf message member.DeleteServerMember
 */
export interface DeleteServerMember {
}
/**
 * @generated from protobuf message member.DeleteServerMember.Request
 */
export interface DeleteServerMember_Request {
    /**
     * @generated from protobuf field: string owner_id = 1;
     */
    owner_id: string; // @gotags: query:"owner_id"
    /**
     * @generated from protobuf field: string project_id = 2;
     */
    project_id: string; // @gotags: query:"project_id"
    /**
     * @generated from protobuf field: string server_id = 3;
     */
    server_id: string; // @gotags: query:"server_id"
    /**
     * @generated from protobuf field: string member_id = 4;
     */
    member_id: string; // @gotags: query:"member_id"
}
/**
 * @generated from protobuf message member.DeleteServerMember.Response
 */
export interface DeleteServerMember_Response {
}
/**
 * rpc MembersWithoutServer
 *
 * @generated from protobuf message member.MembersWithoutServer
 */
export interface MembersWithoutServer {
}
/**
 * @generated from protobuf message member.MembersWithoutServer.Request
 */
export interface MembersWithoutServer_Request {
    /**
     * @generated from protobuf field: int32 limit = 1;
     */
    limit: number;
    /**
     * @generated from protobuf field: int32 offset = 2;
     */
    offset: number;
    /**
     * @generated from protobuf field: string sort_by = 3;
     */
    sort_by: string;
    /**
     * @generated from protobuf field: string owner_id = 4;
     */
    owner_id: string; // @gotags: query:"owner_id"
    /**
     * @generated from protobuf field: string project_id = 5;
     */
    project_id: string; // @gotags: query:"project_id"
    /**
     * @generated from protobuf field: string server_id = 6;
     */
    server_id: string; // @gotags: query:"server_id"
    /**
     * @generated from protobuf field: string login = 7;
     */
    login: string;
}
/**
 * @generated from protobuf message member.MembersWithoutServer.Response
 */
export interface MembersWithoutServer_Response {
    /**
     * @generated from protobuf field: int32 total = 1;
     */
    total: number;
    /**
     * @generated from protobuf field: repeated member.ServerMember.Response members = 2;
     */
    members: ServerMember_Response[];
}
// @generated message type with reflection information, may provide speed optimized methods
class ListProjectMembers$Type extends MessageType<ListProjectMembers> {
    constructor() {
        super("member.ListProjectMembers", []);
    }
}
/**
 * @generated MessageType for protobuf message member.ListProjectMembers
 */
export const ListProjectMembers = new ListProjectMembers$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ListProjectMembers_Request$Type extends MessageType<ListProjectMembers_Request> {
    constructor() {
        super("member.ListProjectMembers.Request", [
            { no: 1, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "limit", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 4, name: "offset", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 5, name: "sort_by", kind: "scalar", localName: "sort_by", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message member.ListProjectMembers.Request
 */
export const ListProjectMembers_Request = new ListProjectMembers_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ListProjectMembers_Response$Type extends MessageType<ListProjectMembers_Response> {
    constructor() {
        super("member.ListProjectMembers.Response", [
            { no: 1, name: "total", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 2, name: "members", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => ProjectMember_Response }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message member.ListProjectMembers.Response
 */
export const ListProjectMembers_Response = new ListProjectMembers_Response$Type();
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
            { no: 1, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 2, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 3, name: "member_id", kind: "scalar", localName: "member_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true }, ignoreEmpty: true } } }
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
            { no: 1, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "owner_name", kind: "scalar", localName: "owner_name", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "project_name", kind: "scalar", localName: "project_name", T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "member_id", kind: "scalar", localName: "member_id", T: 9 /*ScalarType.STRING*/ },
            { no: 6, name: "user_id", kind: "scalar", localName: "user_id", T: 9 /*ScalarType.STRING*/ },
            { no: 7, name: "user_name", kind: "scalar", localName: "user_name", T: 9 /*ScalarType.STRING*/ },
            { no: 8, name: "role", kind: "enum", T: () => ["user.Role", Role] },
            { no: 9, name: "active", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 10, name: "online", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 11, name: "servers_count", kind: "scalar", localName: "servers_count", T: 5 /*ScalarType.INT32*/ },
            { no: 12, name: "locked_at", kind: "message", localName: "locked_at", T: () => Timestamp },
            { no: 13, name: "archived_at", kind: "message", localName: "archived_at", T: () => Timestamp },
            { no: 14, name: "updated_at", kind: "message", localName: "updated_at", T: () => Timestamp },
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
            { no: 1, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 2, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 3, name: "user_id", kind: "scalar", localName: "user_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 4, name: "role", kind: "enum", T: () => ["user.Role", Role] },
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
            { no: 1, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 2, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 3, name: "member_id", kind: "scalar", localName: "member_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 4, name: "role", kind: "enum", oneof: "setting", T: () => ["user.Role", Role] },
            { no: 5, name: "active", kind: "scalar", oneof: "setting", T: 8 /*ScalarType.BOOL*/ }
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
            { no: 1, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 2, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 3, name: "member_id", kind: "scalar", localName: "member_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } }
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
class UsersWithoutProject$Type extends MessageType<UsersWithoutProject> {
    constructor() {
        super("member.UsersWithoutProject", []);
    }
}
/**
 * @generated MessageType for protobuf message member.UsersWithoutProject
 */
export const UsersWithoutProject = new UsersWithoutProject$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UsersWithoutProject_Request$Type extends MessageType<UsersWithoutProject_Request> {
    constructor() {
        super("member.UsersWithoutProject.Request", [
            { no: 1, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 2, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 3, name: "login", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message member.UsersWithoutProject.Request
 */
export const UsersWithoutProject_Request = new UsersWithoutProject_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UsersWithoutProject_Response$Type extends MessageType<UsersWithoutProject_Response> {
    constructor() {
        super("member.UsersWithoutProject.Response", [
            { no: 1, name: "users", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => UsersWithoutProject_User }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message member.UsersWithoutProject.Response
 */
export const UsersWithoutProject_Response = new UsersWithoutProject_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UsersWithoutProject_User$Type extends MessageType<UsersWithoutProject_User> {
    constructor() {
        super("member.UsersWithoutProject.User", [
            { no: 1, name: "user_id", kind: "scalar", localName: "user_id", T: 5 /*ScalarType.INT32*/ },
            { no: 2, name: "login", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "email", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message member.UsersWithoutProject.User
 */
export const UsersWithoutProject_User = new UsersWithoutProject_User$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ListMembersInvite$Type extends MessageType<ListMembersInvite> {
    constructor() {
        super("member.ListMembersInvite", []);
    }
}
/**
 * @generated MessageType for protobuf message member.ListMembersInvite
 */
export const ListMembersInvite = new ListMembersInvite$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ListMembersInvite_Request$Type extends MessageType<ListMembersInvite_Request> {
    constructor() {
        super("member.ListMembersInvite.Request", [
            { no: 1, name: "limit", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 2, name: "offset", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 3, name: "sort_by", kind: "scalar", localName: "sort_by", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 5, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message member.ListMembersInvite.Request
 */
export const ListMembersInvite_Request = new ListMembersInvite_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ListMembersInvite_Response$Type extends MessageType<ListMembersInvite_Response> {
    constructor() {
        super("member.ListMembersInvite.Response", [
            { no: 1, name: "total", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 2, name: "invites", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => ListMembersInvite_Invites }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message member.ListMembersInvite.Response
 */
export const ListMembersInvite_Response = new ListMembersInvite_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ListMembersInvite_Invites$Type extends MessageType<ListMembersInvite_Invites> {
    constructor() {
        super("member.ListMembersInvite.Invites", [
            { no: 1, name: "id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "surname", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "email", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 6, name: "status", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 7, name: "updated_at", kind: "message", localName: "updated_at", T: () => Timestamp },
            { no: 8, name: "created_at", kind: "message", localName: "created_at", T: () => Timestamp }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message member.ListMembersInvite.Invites
 */
export const ListMembersInvite_Invites = new ListMembersInvite_Invites$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddMemberInvite$Type extends MessageType<AddMemberInvite> {
    constructor() {
        super("member.AddMemberInvite", []);
    }
}
/**
 * @generated MessageType for protobuf message member.AddMemberInvite
 */
export const AddMemberInvite = new AddMemberInvite$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddMemberInvite_Request$Type extends MessageType<AddMemberInvite_Request> {
    constructor() {
        super("member.AddMemberInvite.Request", [
            { no: 1, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 2, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 3, name: "user_name", kind: "scalar", localName: "user_name", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { cel: [{ id: "valid_user_name", message: "required field (3 to 30 characters)", expression: "this.matches('^[A-Za-z0-9]{3,20}$')" }] } } },
            { no: 4, name: "user_surname", kind: "scalar", localName: "user_surname", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { cel: [{ id: "valid_user_surname", message: "required field (3 to 30 characters)", expression: "this.matches('^[A-Za-z0-9]{3,20}$')" }] } } },
            { no: 5, name: "email", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { cel: [{ id: "valid_email", message: "must be a valid email", expression: "this.isEmail()" }] } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message member.AddMemberInvite.Request
 */
export const AddMemberInvite_Request = new AddMemberInvite_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddMemberInvite_Response$Type extends MessageType<AddMemberInvite_Response> {
    constructor() {
        super("member.AddMemberInvite.Response", [
            { no: 1, name: "invite", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "status", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message member.AddMemberInvite.Response
 */
export const AddMemberInvite_Response = new AddMemberInvite_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DeleteMemberInvite$Type extends MessageType<DeleteMemberInvite> {
    constructor() {
        super("member.DeleteMemberInvite", []);
    }
}
/**
 * @generated MessageType for protobuf message member.DeleteMemberInvite
 */
export const DeleteMemberInvite = new DeleteMemberInvite$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DeleteMemberInvite_Request$Type extends MessageType<DeleteMemberInvite_Request> {
    constructor() {
        super("member.DeleteMemberInvite.Request", [
            { no: 1, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 2, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 3, name: "invite_id", kind: "scalar", localName: "invite_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message member.DeleteMemberInvite.Request
 */
export const DeleteMemberInvite_Request = new DeleteMemberInvite_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DeleteMemberInvite_Response$Type extends MessageType<DeleteMemberInvite_Response> {
    constructor() {
        super("member.DeleteMemberInvite.Response", []);
    }
}
/**
 * @generated MessageType for protobuf message member.DeleteMemberInvite.Response
 */
export const DeleteMemberInvite_Response = new DeleteMemberInvite_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class MemberInviteActivate$Type extends MessageType<MemberInviteActivate> {
    constructor() {
        super("member.MemberInviteActivate", []);
    }
}
/**
 * @generated MessageType for protobuf message member.MemberInviteActivate
 */
export const MemberInviteActivate = new MemberInviteActivate$Type();
// @generated message type with reflection information, may provide speed optimized methods
class MemberInviteActivate_Request$Type extends MessageType<MemberInviteActivate_Request> {
    constructor() {
        super("member.MemberInviteActivate.Request", [
            { no: 1, name: "invite", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 2, name: "user_id", kind: "scalar", localName: "user_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true }, ignoreEmpty: true } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message member.MemberInviteActivate.Request
 */
export const MemberInviteActivate_Request = new MemberInviteActivate_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class MemberInviteActivate_Response$Type extends MessageType<MemberInviteActivate_Response> {
    constructor() {
        super("member.MemberInviteActivate.Response", [
            { no: 1, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "email", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message member.MemberInviteActivate.Response
 */
export const MemberInviteActivate_Response = new MemberInviteActivate_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ListServerMembers$Type extends MessageType<ListServerMembers> {
    constructor() {
        super("member.ListServerMembers", []);
    }
}
/**
 * @generated MessageType for protobuf message member.ListServerMembers
 */
export const ListServerMembers = new ListServerMembers$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ListServerMembers_Request$Type extends MessageType<ListServerMembers_Request> {
    constructor() {
        super("member.ListServerMembers.Request", [
            { no: 1, name: "limit", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 2, name: "offset", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 3, name: "sort_by", kind: "scalar", localName: "sort_by", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 5, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 6, name: "server_id", kind: "scalar", localName: "server_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message member.ListServerMembers.Request
 */
export const ListServerMembers_Request = new ListServerMembers_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ListServerMembers_Response$Type extends MessageType<ListServerMembers_Response> {
    constructor() {
        super("member.ListServerMembers.Response", [
            { no: 1, name: "total", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 2, name: "members", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => ServerMember_Response }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message member.ListServerMembers.Response
 */
export const ListServerMembers_Response = new ListServerMembers_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ServerMember$Type extends MessageType<ServerMember> {
    constructor() {
        super("member.ServerMember", []);
    }
}
/**
 * @generated MessageType for protobuf message member.ServerMember
 */
export const ServerMember = new ServerMember$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ServerMember_Request$Type extends MessageType<ServerMember_Request> {
    constructor() {
        super("member.ServerMember.Request", [
            { no: 1, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 2, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 3, name: "server_id", kind: "scalar", localName: "server_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 4, name: "member_id", kind: "scalar", localName: "member_id", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message member.ServerMember.Request
 */
export const ServerMember_Request = new ServerMember_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ServerMember_Response$Type extends MessageType<ServerMember_Response> {
    constructor() {
        super("member.ServerMember.Response", [
            { no: 1, name: "member_id", kind: "scalar", localName: "member_id", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "user_id", kind: "scalar", localName: "user_id", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "user_login", kind: "scalar", localName: "user_login", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "user_name", kind: "scalar", localName: "user_name", T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "user_surname", kind: "scalar", localName: "user_surname", T: 9 /*ScalarType.STRING*/ },
            { no: 6, name: "email", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 7, name: "role", kind: "enum", T: () => ["user.Role", Role] },
            { no: 8, name: "active", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 9, name: "online", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 10, name: "locked_at", kind: "message", localName: "locked_at", T: () => Timestamp },
            { no: 11, name: "archived_at", kind: "message", localName: "archived_at", T: () => Timestamp },
            { no: 12, name: "updated_at", kind: "message", localName: "updated_at", T: () => Timestamp },
            { no: 13, name: "created_at", kind: "message", localName: "created_at", T: () => Timestamp }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message member.ServerMember.Response
 */
export const ServerMember_Response = new ServerMember_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddServerMember$Type extends MessageType<AddServerMember> {
    constructor() {
        super("member.AddServerMember", []);
    }
}
/**
 * @generated MessageType for protobuf message member.AddServerMember
 */
export const AddServerMember = new AddServerMember$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddServerMember_Request$Type extends MessageType<AddServerMember_Request> {
    constructor() {
        super("member.AddServerMember.Request", [
            { no: 1, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 2, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 3, name: "server_id", kind: "scalar", localName: "server_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 4, name: "member_id", kind: "scalar", localName: "member_id", T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "active", kind: "scalar", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message member.AddServerMember.Request
 */
export const AddServerMember_Request = new AddServerMember_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddServerMember_Response$Type extends MessageType<AddServerMember_Response> {
    constructor() {
        super("member.AddServerMember.Response", [
            { no: 1, name: "member_id", kind: "scalar", localName: "member_id", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message member.AddServerMember.Response
 */
export const AddServerMember_Response = new AddServerMember_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateServerMember$Type extends MessageType<UpdateServerMember> {
    constructor() {
        super("member.UpdateServerMember", []);
    }
}
/**
 * @generated MessageType for protobuf message member.UpdateServerMember
 */
export const UpdateServerMember = new UpdateServerMember$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateServerMember_Request$Type extends MessageType<UpdateServerMember_Request> {
    constructor() {
        super("member.UpdateServerMember.Request", [
            { no: 1, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 2, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 3, name: "server_id", kind: "scalar", localName: "server_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 4, name: "member_id", kind: "scalar", localName: "member_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 5, name: "active", kind: "scalar", oneof: "setting", T: 8 /*ScalarType.BOOL*/ },
            { no: 6, name: "online", kind: "scalar", oneof: "setting", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message member.UpdateServerMember.Request
 */
export const UpdateServerMember_Request = new UpdateServerMember_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateServerMember_Response$Type extends MessageType<UpdateServerMember_Response> {
    constructor() {
        super("member.UpdateServerMember.Response", []);
    }
}
/**
 * @generated MessageType for protobuf message member.UpdateServerMember.Response
 */
export const UpdateServerMember_Response = new UpdateServerMember_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DeleteServerMember$Type extends MessageType<DeleteServerMember> {
    constructor() {
        super("member.DeleteServerMember", []);
    }
}
/**
 * @generated MessageType for protobuf message member.DeleteServerMember
 */
export const DeleteServerMember = new DeleteServerMember$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DeleteServerMember_Request$Type extends MessageType<DeleteServerMember_Request> {
    constructor() {
        super("member.DeleteServerMember.Request", [
            { no: 1, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 2, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 3, name: "server_id", kind: "scalar", localName: "server_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 4, name: "member_id", kind: "scalar", localName: "member_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message member.DeleteServerMember.Request
 */
export const DeleteServerMember_Request = new DeleteServerMember_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DeleteServerMember_Response$Type extends MessageType<DeleteServerMember_Response> {
    constructor() {
        super("member.DeleteServerMember.Response", []);
    }
}
/**
 * @generated MessageType for protobuf message member.DeleteServerMember.Response
 */
export const DeleteServerMember_Response = new DeleteServerMember_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class MembersWithoutServer$Type extends MessageType<MembersWithoutServer> {
    constructor() {
        super("member.MembersWithoutServer", []);
    }
}
/**
 * @generated MessageType for protobuf message member.MembersWithoutServer
 */
export const MembersWithoutServer = new MembersWithoutServer$Type();
// @generated message type with reflection information, may provide speed optimized methods
class MembersWithoutServer_Request$Type extends MessageType<MembersWithoutServer_Request> {
    constructor() {
        super("member.MembersWithoutServer.Request", [
            { no: 1, name: "limit", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 2, name: "offset", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 3, name: "sort_by", kind: "scalar", localName: "sort_by", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 5, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 6, name: "server_id", kind: "scalar", localName: "server_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 7, name: "login", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message member.MembersWithoutServer.Request
 */
export const MembersWithoutServer_Request = new MembersWithoutServer_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class MembersWithoutServer_Response$Type extends MessageType<MembersWithoutServer_Response> {
    constructor() {
        super("member.MembersWithoutServer.Response", [
            { no: 1, name: "total", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 2, name: "members", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => ServerMember_Response }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message member.MembersWithoutServer.Response
 */
export const MembersWithoutServer_Response = new MembersWithoutServer_Response$Type();
/**
 * @generated ServiceType for protobuf service member.MemberHandlers
 */
export const MemberHandlers = new ServiceType("member.MemberHandlers", [
    { name: "ListProjectMembers", options: {}, I: ListProjectMembers_Request, O: ListProjectMembers_Response },
    { name: "ProjectMember", options: {}, I: ProjectMember_Request, O: ProjectMember_Response },
    { name: "AddProjectMember", options: {}, I: AddProjectMember_Request, O: AddProjectMember_Response },
    { name: "UpdateProjectMember", options: {}, I: UpdateProjectMember_Request, O: UpdateProjectMember_Response },
    { name: "DeleteProjectMember", options: {}, I: DeleteProjectMember_Request, O: DeleteProjectMember_Response },
    { name: "UsersWithoutProject", options: {}, I: UsersWithoutProject_Request, O: UsersWithoutProject_Response },
    { name: "ListMembersInvite", options: {}, I: ListMembersInvite_Request, O: ListMembersInvite_Response },
    { name: "AddMemberInvite", options: {}, I: AddMemberInvite_Request, O: AddMemberInvite_Response },
    { name: "DeleteMemberInvite", options: {}, I: DeleteMemberInvite_Request, O: DeleteMemberInvite_Response },
    { name: "MemberInviteActivate", options: {}, I: MemberInviteActivate_Request, O: MemberInviteActivate_Response },
    { name: "ListServerMembers", options: {}, I: ListServerMembers_Request, O: ListServerMembers_Response },
    { name: "ServerMember", options: {}, I: ServerMember_Request, O: ServerMember_Response },
    { name: "AddServerMember", options: {}, I: AddServerMember_Request, O: AddServerMember_Response },
    { name: "UpdateServerMember", options: {}, I: UpdateServerMember_Request, O: UpdateServerMember_Response },
    { name: "DeleteServerMember", options: {}, I: DeleteServerMember_Request, O: DeleteServerMember_Response },
    { name: "MembersWithoutServer", options: {}, I: MembersWithoutServer_Request, O: MembersWithoutServer_Response }
]);
