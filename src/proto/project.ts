// @generated from protobuf file "project.proto" (package "project", syntax proto3)
// tslint:disable
// @ts-nocheck
import { ServiceType } from "@protobuf-ts/runtime-rpc";
import { MessageType } from "@protobuf-ts/runtime";
import { Timestamp } from "./google/protobuf/timestamp";
/**
 * rpc Projects
 *
 * @generated from protobuf message project.Projects
 */
export interface Projects {
}
/**
 * @generated from protobuf message project.Projects.Request
 */
export interface Projects_Request {
    /**
     * @generated from protobuf field: bool is_admin = 1
     */
    is_admin: boolean; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string owner_id = 2
     */
    owner_id: string; // @gotags: json:"-"
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
 * @generated from protobuf message project.Projects.Response
 */
export interface Projects_Response {
    /**
     * @generated from protobuf field: int32 total = 1
     */
    total: number;
    /**
     * @generated from protobuf field: repeated project.Project.Response projects = 2
     */
    projects: Project_Response[];
}
/**
 * rpc Project
 *
 * @generated from protobuf message project.Project
 */
export interface Project {
}
/**
 * @generated from protobuf message project.Project.Request
 */
export interface Project_Request {
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
}
/**
 * @generated from protobuf message project.Project.Response
 */
export interface Project_Response {
    /**
     * @generated from protobuf field: string project_id = 1
     */
    project_id: string;
    /**
     * @generated from protobuf field: string owner_id = 2
     */
    owner_id: string;
    /**
     * @generated from protobuf field: string title = 3
     */
    title: string;
    /**
     * @generated from protobuf field: string alias = 4
     */
    alias: string;
    /**
     * @generated from protobuf field: int32 servers_count = 6
     */
    servers_count: number;
    /**
     * @generated from protobuf field: int32 databases_count = 7
     */
    databases_count: number;
    /**
     * @generated from protobuf field: int32 applications_count = 8
     */
    applications_count: number;
    /**
     * @generated from protobuf field: int32 desktops_count = 9
     */
    desktops_count: number;
    /**
     * @generated from protobuf field: int32 containers_count = 10
     */
    containers_count: number;
    /**
     * @generated from protobuf field: int32 clouds_count = 11
     */
    clouds_count: number;
    /**
     * @generated from protobuf field: int32 members_count = 12
     */
    members_count: number;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp locked_at = 13
     */
    locked_at?: Timestamp;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp archived_at = 14
     */
    archived_at?: Timestamp;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp updated_at = 15
     */
    updated_at?: Timestamp;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp created_at = 16
     */
    created_at?: Timestamp;
}
/**
 * rpc AddProject
 *
 * @generated from protobuf message project.AddProject
 */
export interface AddProject {
}
/**
 * @generated from protobuf message project.AddProject.Request
 */
export interface AddProject_Request {
    /**
     * @generated from protobuf field: string owner_id = 1
     */
    owner_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string alias = 2
     */
    alias: string;
    /**
     * @generated from protobuf field: string title = 3
     */
    title: string;
}
/**
 * @generated from protobuf message project.AddProject.Response
 */
export interface AddProject_Response {
    /**
     * @generated from protobuf field: string project_id = 1
     */
    project_id: string;
}
/**
 * rpc UpdateProject
 *
 * @generated from protobuf message project.UpdateProject
 */
export interface UpdateProject {
}
/**
 * @generated from protobuf message project.UpdateProject.Request
 */
export interface UpdateProject_Request {
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
     * @generated from protobuf oneof: setting
     */
    setting: {
        oneofKind: "alias";
        /**
         * @generated from protobuf field: string alias = 4
         */
        alias: string;
    } | {
        oneofKind: "title";
        /**
         * @generated from protobuf field: string title = 5
         */
        title: string;
    } | {
        oneofKind: undefined;
    };
}
/**
 * @generated from protobuf message project.UpdateProject.Response
 */
export interface UpdateProject_Response {
}
/**
 * rpc DeleteProject
 *
 * @generated from protobuf message project.DeleteProject
 */
export interface DeleteProject {
}
/**
 * @generated from protobuf message project.DeleteProject.Request
 */
export interface DeleteProject_Request {
    /**
     * @generated from protobuf field: string owner_id = 1
     */
    owner_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string project_id = 2
     */
    project_id: string; // @gotags: json:"-"
}
/**
 * @generated from protobuf message project.DeleteProject.Response
 */
export interface DeleteProject_Response {
}
/**
 * rpc ProjectKeys
 *
 * @generated from protobuf message project.ProjectKeys
 */
export interface ProjectKeys {
}
/**
 * @generated from protobuf message project.ProjectKeys.Request
 */
export interface ProjectKeys_Request {
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
 * @generated from protobuf message project.ProjectKeys.Response
 */
export interface ProjectKeys_Response {
    /**
     * @generated from protobuf field: int32 total = 1
     */
    total: number;
    /**
     * @generated from protobuf field: repeated project.ProjectKey.Response keys = 2
     */
    keys: ProjectKey_Response[];
}
/**
 * rpc ProjectKey
 *
 * @generated from protobuf message project.ProjectKey
 */
export interface ProjectKey {
}
/**
 * @generated from protobuf message project.ProjectKey.Request
 */
export interface ProjectKey_Request {
    /**
     * @generated from protobuf oneof: type
     */
    type: {
        oneofKind: "public";
        /**
         * @generated from protobuf field: project.ProjectKey.Public public = 3
         */
        public: ProjectKey_Public;
    } | {
        oneofKind: "private";
        /**
         * @generated from protobuf field: project.ProjectKey.Private private = 4
         */
        private: ProjectKey_Private;
    } | {
        oneofKind: undefined;
    };
}
/**
 * @generated from protobuf message project.ProjectKey.Public
 */
export interface ProjectKey_Public {
    /**
     * @generated from protobuf field: string key = 1
     */
    key: string;
}
/**
 * @generated from protobuf message project.ProjectKey.Private
 */
export interface ProjectKey_Private {
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
     * @generated from protobuf field: string key_id = 4
     */
    key_id: string; // @gotags: json:"-"
}
/**
 * @generated from protobuf message project.ProjectKey.Response
 */
export interface ProjectKey_Response {
    /**
     * @generated from protobuf field: string project_id = 1
     */
    project_id: string;
    /**
     * @generated from protobuf field: string key_id = 2
     */
    key_id: string;
    /**
     * @generated from protobuf field: string key = 3
     */
    key: string;
    /**
     * @generated from protobuf field: string secret = 4
     */
    secret: string;
    /**
     * @generated from protobuf field: bool online = 5
     */
    online: boolean;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp locked_at = 6
     */
    locked_at?: Timestamp;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp archived_at = 7
     */
    archived_at?: Timestamp;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp updated_at = 8
     */
    updated_at?: Timestamp;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp created_at = 9
     */
    created_at?: Timestamp;
}
/**
 * rpc AddProjectKey
 *
 * @generated from protobuf message project.AddProjectKey
 */
export interface AddProjectKey {
}
/**
 * @generated from protobuf message project.AddProjectKey.Request
 */
export interface AddProjectKey_Request {
    /**
     * @generated from protobuf field: string owner_id = 1
     */
    owner_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string project_id = 2
     */
    project_id: string; // @gotags: json:"-"
}
/**
 * @generated from protobuf message project.AddProjectKey.Response
 */
export interface AddProjectKey_Response {
    /**
     * @generated from protobuf field: string key_id = 1
     */
    key_id: string;
    /**
     * @generated from protobuf field: string key = 2
     */
    key: string;
}
/**
 * rpc DeleteProjectKey
 *
 * @generated from protobuf message project.DeleteProjectKey
 */
export interface DeleteProjectKey {
}
/**
 * @generated from protobuf message project.DeleteProjectKey.Request
 */
export interface DeleteProjectKey_Request {
    /**
     * @generated from protobuf field: string owner_id = 1
     */
    owner_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string project_id = 2
     */
    project_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string key_id = 3
     */
    key_id: string; // @gotags: json:"-"
}
/**
 * @generated from protobuf message project.DeleteProjectKey.Response
 */
export interface DeleteProjectKey_Response {
}
// @generated message type with reflection information, may provide speed optimized methods
class Projects$Type extends MessageType<Projects> {
    constructor() {
        super("project.Projects", []);
    }
}
/**
 * @generated MessageType for protobuf message project.Projects
 */
export const Projects = new Projects$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Projects_Request$Type extends MessageType<Projects_Request> {
    constructor() {
        super("project.Projects.Request", [
            { no: 1, name: "is_admin", kind: "scalar", localName: "is_admin", T: 8 /*ScalarType.BOOL*/ },
            { no: 2, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 4, name: "limit", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 5, name: "offset", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 6, name: "sort_by", kind: "scalar", localName: "sort_by", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message project.Projects.Request
 */
export const Projects_Request = new Projects_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Projects_Response$Type extends MessageType<Projects_Response> {
    constructor() {
        super("project.Projects.Response", [
            { no: 1, name: "total", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 2, name: "projects", kind: "message", repeat: 2 /*RepeatType.UNPACKED*/, T: () => Project_Response }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message project.Projects.Response
 */
export const Projects_Response = new Projects_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Project$Type extends MessageType<Project> {
    constructor() {
        super("project.Project", []);
    }
}
/**
 * @generated MessageType for protobuf message project.Project
 */
export const Project = new Project$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Project_Request$Type extends MessageType<Project_Request> {
    constructor() {
        super("project.Project.Request", [
            { no: 1, name: "is_admin", kind: "scalar", localName: "is_admin", T: 8 /*ScalarType.BOOL*/ },
            { no: 2, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 3, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message project.Project.Request
 */
export const Project_Request = new Project_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Project_Response$Type extends MessageType<Project_Response> {
    constructor() {
        super("project.Project.Response", [
            { no: 1, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "ghoster.secret": true } },
            { no: 3, name: "title", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "alias", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 6, name: "servers_count", kind: "scalar", localName: "servers_count", T: 5 /*ScalarType.INT32*/ },
            { no: 7, name: "databases_count", kind: "scalar", localName: "databases_count", T: 5 /*ScalarType.INT32*/ },
            { no: 8, name: "applications_count", kind: "scalar", localName: "applications_count", T: 5 /*ScalarType.INT32*/ },
            { no: 9, name: "desktops_count", kind: "scalar", localName: "desktops_count", T: 5 /*ScalarType.INT32*/ },
            { no: 10, name: "containers_count", kind: "scalar", localName: "containers_count", T: 5 /*ScalarType.INT32*/ },
            { no: 11, name: "clouds_count", kind: "scalar", localName: "clouds_count", T: 5 /*ScalarType.INT32*/ },
            { no: 12, name: "members_count", kind: "scalar", localName: "members_count", T: 5 /*ScalarType.INT32*/ },
            { no: 13, name: "locked_at", kind: "message", localName: "locked_at", T: () => Timestamp, options: { "ghoster.secret": true } },
            { no: 14, name: "archived_at", kind: "message", localName: "archived_at", T: () => Timestamp, options: { "ghoster.secret": true } },
            { no: 15, name: "updated_at", kind: "message", localName: "updated_at", T: () => Timestamp, options: { "ghoster.secret": true } },
            { no: 16, name: "created_at", kind: "message", localName: "created_at", T: () => Timestamp }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message project.Project.Response
 */
export const Project_Response = new Project_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddProject$Type extends MessageType<AddProject> {
    constructor() {
        super("project.AddProject", []);
    }
}
/**
 * @generated MessageType for protobuf message project.AddProject
 */
export const AddProject = new AddProject$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddProject_Request$Type extends MessageType<AddProject_Request> {
    constructor() {
        super("project.AddProject.Request", [
            { no: 1, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 2, name: "alias", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { minLen: "3", maxLen: "32", pattern: "^[a-z0-9]+$" } } } },
            { no: 3, name: "title", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { minLen: "3", maxLen: "128" } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message project.AddProject.Request
 */
export const AddProject_Request = new AddProject_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddProject_Response$Type extends MessageType<AddProject_Response> {
    constructor() {
        super("project.AddProject.Response", [
            { no: 1, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message project.AddProject.Response
 */
export const AddProject_Response = new AddProject_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateProject$Type extends MessageType<UpdateProject> {
    constructor() {
        super("project.UpdateProject", []);
    }
}
/**
 * @generated MessageType for protobuf message project.UpdateProject
 */
export const UpdateProject = new UpdateProject$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateProject_Request$Type extends MessageType<UpdateProject_Request> {
    constructor() {
        super("project.UpdateProject.Request", [
            { no: 1, name: "is_admin", kind: "scalar", localName: "is_admin", T: 8 /*ScalarType.BOOL*/ },
            { no: 2, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 3, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 4, name: "alias", kind: "scalar", oneof: "setting", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { minLen: "3", maxLen: "32", pattern: "^[a-z0-9]+$" } } } },
            { no: 5, name: "title", kind: "scalar", oneof: "setting", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { minLen: "3", maxLen: "128" } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message project.UpdateProject.Request
 */
export const UpdateProject_Request = new UpdateProject_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateProject_Response$Type extends MessageType<UpdateProject_Response> {
    constructor() {
        super("project.UpdateProject.Response", []);
    }
}
/**
 * @generated MessageType for protobuf message project.UpdateProject.Response
 */
export const UpdateProject_Response = new UpdateProject_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DeleteProject$Type extends MessageType<DeleteProject> {
    constructor() {
        super("project.DeleteProject", []);
    }
}
/**
 * @generated MessageType for protobuf message project.DeleteProject
 */
export const DeleteProject = new DeleteProject$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DeleteProject_Request$Type extends MessageType<DeleteProject_Request> {
    constructor() {
        super("project.DeleteProject.Request", [
            { no: 1, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 2, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message project.DeleteProject.Request
 */
export const DeleteProject_Request = new DeleteProject_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DeleteProject_Response$Type extends MessageType<DeleteProject_Response> {
    constructor() {
        super("project.DeleteProject.Response", []);
    }
}
/**
 * @generated MessageType for protobuf message project.DeleteProject.Response
 */
export const DeleteProject_Response = new DeleteProject_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ProjectKeys$Type extends MessageType<ProjectKeys> {
    constructor() {
        super("project.ProjectKeys", []);
    }
}
/**
 * @generated MessageType for protobuf message project.ProjectKeys
 */
export const ProjectKeys = new ProjectKeys$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ProjectKeys_Request$Type extends MessageType<ProjectKeys_Request> {
    constructor() {
        super("project.ProjectKeys.Request", [
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
 * @generated MessageType for protobuf message project.ProjectKeys.Request
 */
export const ProjectKeys_Request = new ProjectKeys_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ProjectKeys_Response$Type extends MessageType<ProjectKeys_Response> {
    constructor() {
        super("project.ProjectKeys.Response", [
            { no: 1, name: "total", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 2, name: "keys", kind: "message", repeat: 2 /*RepeatType.UNPACKED*/, T: () => ProjectKey_Response }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message project.ProjectKeys.Response
 */
export const ProjectKeys_Response = new ProjectKeys_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ProjectKey$Type extends MessageType<ProjectKey> {
    constructor() {
        super("project.ProjectKey", []);
    }
}
/**
 * @generated MessageType for protobuf message project.ProjectKey
 */
export const ProjectKey = new ProjectKey$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ProjectKey_Request$Type extends MessageType<ProjectKey_Request> {
    constructor() {
        super("project.ProjectKey.Request", [
            { no: 3, name: "public", kind: "message", oneof: "type", T: () => ProjectKey_Public },
            { no: 4, name: "private", kind: "message", oneof: "type", T: () => ProjectKey_Private }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message project.ProjectKey.Request
 */
export const ProjectKey_Request = new ProjectKey_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ProjectKey_Public$Type extends MessageType<ProjectKey_Public> {
    constructor() {
        super("project.ProjectKey.Public", [
            { no: 1, name: "key", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { len: "37" } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message project.ProjectKey.Public
 */
export const ProjectKey_Public = new ProjectKey_Public$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ProjectKey_Private$Type extends MessageType<ProjectKey_Private> {
    constructor() {
        super("project.ProjectKey.Private", [
            { no: 1, name: "is_admin", kind: "scalar", localName: "is_admin", T: 8 /*ScalarType.BOOL*/ },
            { no: 2, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 3, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 4, name: "key_id", kind: "scalar", localName: "key_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message project.ProjectKey.Private
 */
export const ProjectKey_Private = new ProjectKey_Private$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ProjectKey_Response$Type extends MessageType<ProjectKey_Response> {
    constructor() {
        super("project.ProjectKey.Response", [
            { no: 1, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "key_id", kind: "scalar", localName: "key_id", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "key", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "secret", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "online", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 6, name: "locked_at", kind: "message", localName: "locked_at", T: () => Timestamp, options: { "ghoster.secret": true } },
            { no: 7, name: "archived_at", kind: "message", localName: "archived_at", T: () => Timestamp, options: { "ghoster.secret": true } },
            { no: 8, name: "updated_at", kind: "message", localName: "updated_at", T: () => Timestamp, options: { "ghoster.secret": true } },
            { no: 9, name: "created_at", kind: "message", localName: "created_at", T: () => Timestamp }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message project.ProjectKey.Response
 */
export const ProjectKey_Response = new ProjectKey_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddProjectKey$Type extends MessageType<AddProjectKey> {
    constructor() {
        super("project.AddProjectKey", []);
    }
}
/**
 * @generated MessageType for protobuf message project.AddProjectKey
 */
export const AddProjectKey = new AddProjectKey$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddProjectKey_Request$Type extends MessageType<AddProjectKey_Request> {
    constructor() {
        super("project.AddProjectKey.Request", [
            { no: 1, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 2, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message project.AddProjectKey.Request
 */
export const AddProjectKey_Request = new AddProjectKey_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddProjectKey_Response$Type extends MessageType<AddProjectKey_Response> {
    constructor() {
        super("project.AddProjectKey.Response", [
            { no: 1, name: "key_id", kind: "scalar", localName: "key_id", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "key", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message project.AddProjectKey.Response
 */
export const AddProjectKey_Response = new AddProjectKey_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DeleteProjectKey$Type extends MessageType<DeleteProjectKey> {
    constructor() {
        super("project.DeleteProjectKey", []);
    }
}
/**
 * @generated MessageType for protobuf message project.DeleteProjectKey
 */
export const DeleteProjectKey = new DeleteProjectKey$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DeleteProjectKey_Request$Type extends MessageType<DeleteProjectKey_Request> {
    constructor() {
        super("project.DeleteProjectKey.Request", [
            { no: 1, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 2, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 3, name: "key_id", kind: "scalar", localName: "key_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message project.DeleteProjectKey.Request
 */
export const DeleteProjectKey_Request = new DeleteProjectKey_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DeleteProjectKey_Response$Type extends MessageType<DeleteProjectKey_Response> {
    constructor() {
        super("project.DeleteProjectKey.Response", []);
    }
}
/**
 * @generated MessageType for protobuf message project.DeleteProjectKey.Response
 */
export const DeleteProjectKey_Response = new DeleteProjectKey_Response$Type();
/**
 * @generated ServiceType for protobuf service project.ProjectHandlers
 */
export const ProjectHandlers = new ServiceType("project.ProjectHandlers", [
    { name: "Projects", options: {}, I: Projects_Request, O: Projects_Response },
    { name: "Project", options: {}, I: Project_Request, O: Project_Response },
    { name: "AddProject", options: {}, I: AddProject_Request, O: AddProject_Response },
    { name: "UpdateProject", options: {}, I: UpdateProject_Request, O: UpdateProject_Response },
    { name: "DeleteProject", options: {}, I: DeleteProject_Request, O: DeleteProject_Response },
    { name: "ProjectKeys", options: {}, I: ProjectKeys_Request, O: ProjectKeys_Response },
    { name: "ProjectKey", options: {}, I: ProjectKey_Request, O: ProjectKey_Response },
    { name: "AddProjectKey", options: {}, I: AddProjectKey_Request, O: AddProjectKey_Response },
    { name: "DeleteProjectKey", options: {}, I: DeleteProjectKey_Request, O: DeleteProjectKey_Response }
]);
