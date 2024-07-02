// @generated from protobuf file "project.proto" (package "project", syntax proto3)
// tslint:disable
// @ts-nocheck
import { ServiceType } from "@protobuf-ts/runtime-rpc";
import { MessageType } from "@protobuf-ts/runtime";
import { Timestamp } from "./google/protobuf/timestamp";
/**
 * rpc ListProjects
 *
 * @generated from protobuf message project.ListProjects
 */
export interface ListProjects {
}
/**
 * @generated from protobuf message project.ListProjects.Request
 */
export interface ListProjects_Request {
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
     * @generated from protobuf field: string query = 4;
     */
    query: string;
}
/**
 * @generated from protobuf message project.ListProjects.Response
 */
export interface ListProjects_Response {
    /**
     * @generated from protobuf field: int32 total = 1;
     */
    total: number;
    /**
     * @generated from protobuf field: repeated project.Project.Response projects = 2;
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
     * @generated from protobuf field: string owner_id = 1;
     */
    owner_id: string; // @gotags: query:"owner_id" params:"owner_id"
    /**
     * @generated from protobuf field: string project_id = 2;
     */
    project_id: string; // @gotags: query:"project_id" params:"project_id"
}
/**
 * @generated from protobuf message project.Project.Response
 */
export interface Project_Response {
    /**
     * @generated from protobuf field: string project_id = 1;
     */
    project_id: string;
    /**
     * @generated from protobuf field: string owner_id = 2;
     */
    owner_id: string;
    /**
     * @generated from protobuf field: string title = 3;
     */
    title: string;
    /**
     * @generated from protobuf field: string login = 4;
     */
    login: string;
    /**
     * @generated from protobuf field: int32 members_count = 5;
     */
    members_count: number;
    /**
     * @generated from protobuf field: int32 servers_count = 6;
     */
    servers_count: number;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp locked_at = 7;
     */
    locked_at?: Timestamp;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp archived_at = 8;
     */
    archived_at?: Timestamp;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp updated_at = 9;
     */
    updated_at?: Timestamp;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp created_at = 10;
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
     * @generated from protobuf field: string owner_id = 1;
     */
    owner_id: string;
    /**
     * @generated from protobuf field: string login = 2;
     */
    login: string;
    /**
     * @generated from protobuf field: string title = 3;
     */
    title: string;
}
/**
 * @generated from protobuf message project.AddProject.Response
 */
export interface AddProject_Response {
    /**
     * @generated from protobuf field: string project_id = 1;
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
     * @generated from protobuf field: string project_id = 1;
     */
    project_id: string; // @gotags: query:"project_id" params:"project_id"
    /**
     * @generated from protobuf field: string owner_id = 2;
     */
    owner_id: string; // @gotags: query:"owner_id" params:"owner_id"
    /**
     * @generated from protobuf field: string title = 3;
     */
    title: string; // @gotags: query:"title" params:"title"
    /**
     * @generated from protobuf field: string login = 4;
     */
    login: string; // @gotags: query:"login" params:"login"
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
     * @generated from protobuf field: string owner_id = 1;
     */
    owner_id: string; // @gotags: query:"owner_id" params:"owner_id"
    /**
     * @generated from protobuf field: string project_id = 2;
     */
    project_id: string; // @gotags: query:"project_id" params:"project_id"
}
/**
 * @generated from protobuf message project.DeleteProject.Response
 */
export interface DeleteProject_Response {
}
/**
 * rpc Key
 *
 * @generated from protobuf message project.Key
 */
export interface Key {
}
/**
 * @generated from protobuf message project.Key.Request
 */
export interface Key_Request {
    /**
     * @generated from protobuf field: string project_id = 1;
     */
    project_id: string; // @gotags: query:"project_id"
}
/**
 * @generated from protobuf message project.Key.Response
 */
export interface Key_Response {
    /**
     * @generated from protobuf field: string api_key = 1;
     */
    api_key: string;
    /**
     * @generated from protobuf field: string api_secret = 2;
     */
    api_secret: string;
    /**
     * @generated from protobuf field: bool api_online = 3;
     */
    api_online: boolean;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp locked_at = 4;
     */
    locked_at?: Timestamp;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp archived_at = 5;
     */
    archived_at?: Timestamp;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp updated_at = 6;
     */
    updated_at?: Timestamp;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp created_at = 7;
     */
    created_at?: Timestamp;
}
/**
 * rpc AddKey
 *
 * @generated from protobuf message project.AddKey
 */
export interface AddKey {
}
/**
 * @generated from protobuf message project.AddKey.Request
 */
export interface AddKey_Request {
    /**
     * @generated from protobuf field: string project_id = 1;
     */
    project_id: string; // @gotags: query:"project_id"
}
/**
 * @generated from protobuf message project.AddKey.Response
 */
export interface AddKey_Response {
    /**
     * @generated from protobuf field: project.Key.Response key = 1;
     */
    key?: Key_Response;
}
/**
 * rpc UpdateKey
 *
 * @generated from protobuf message project.UpdateKey
 */
export interface UpdateKey {
}
/**
 * @generated from protobuf message project.UpdateKey.Request
 */
export interface UpdateKey_Request {
    /**
     * @generated from protobuf field: string project_id = 1;
     */
    project_id: string; // @gotags: query:"project_id"
    /**
     * @generated from protobuf field: string api_key = 2;
     */
    api_key: string; // @gotags: query:"api_key"
}
/**
 * @generated from protobuf message project.UpdateKey.Response
 */
export interface UpdateKey_Response {
    /**
     * @generated from protobuf field: project.Key.Response key = 1;
     */
    key?: Key_Response;
}
/**
 * rpc DeleteKey
 *
 * @generated from protobuf message project.DeleteKey
 */
export interface DeleteKey {
}
/**
 * @generated from protobuf message project.DeleteKey.Request
 */
export interface DeleteKey_Request {
    /**
     * @generated from protobuf field: string project_id = 1;
     */
    project_id: string; // @gotags: query:"project_id"
    /**
     * @generated from protobuf field: string api_key = 2;
     */
    api_key: string; // @gotags: query:"api_key"
}
/**
 * @generated from protobuf message project.DeleteKey.Response
 */
export interface DeleteKey_Response {
}
// @generated message type with reflection information, may provide speed optimized methods
class ListProjects$Type extends MessageType<ListProjects> {
    constructor() {
        super("project.ListProjects", []);
    }
}
/**
 * @generated MessageType for protobuf message project.ListProjects
 */
export const ListProjects = new ListProjects$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ListProjects_Request$Type extends MessageType<ListProjects_Request> {
    constructor() {
        super("project.ListProjects.Request", [
            { no: 1, name: "limit", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 2, name: "offset", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 3, name: "sort_by", kind: "scalar", localName: "sort_by", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "query", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message project.ListProjects.Request
 */
export const ListProjects_Request = new ListProjects_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ListProjects_Response$Type extends MessageType<ListProjects_Response> {
    constructor() {
        super("project.ListProjects.Response", [
            { no: 1, name: "total", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 2, name: "projects", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Project_Response }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message project.ListProjects.Response
 */
export const ListProjects_Response = new ListProjects_Response$Type();
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
            { no: 1, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true }, ignoreEmpty: true } } },
            { no: 2, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true }, ignoreEmpty: true } } }
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
            { no: 2, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "title", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "login", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "members_count", kind: "scalar", localName: "members_count", T: 5 /*ScalarType.INT32*/ },
            { no: 6, name: "servers_count", kind: "scalar", localName: "servers_count", T: 5 /*ScalarType.INT32*/ },
            { no: 7, name: "locked_at", kind: "message", localName: "locked_at", T: () => Timestamp },
            { no: 8, name: "archived_at", kind: "message", localName: "archived_at", T: () => Timestamp },
            { no: 9, name: "updated_at", kind: "message", localName: "updated_at", T: () => Timestamp },
            { no: 10, name: "created_at", kind: "message", localName: "created_at", T: () => Timestamp }
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
            { no: 1, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true }, ignoreEmpty: true } } },
            { no: 2, name: "login", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { minLen: "3", maxLen: "20", pattern: "^[a-z0-9]+$" } } } },
            { no: 3, name: "title", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { minLen: "3", maxLen: "128" } } } }
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
            { no: 1, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 2, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true }, ignoreEmpty: true } } },
            { no: 3, name: "title", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { minLen: "3", maxLen: "128" } } } },
            { no: 4, name: "login", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { minLen: "3", maxLen: "128" } } } }
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
            { no: 1, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true }, ignoreEmpty: true } } },
            { no: 2, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } }
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
class Key$Type extends MessageType<Key> {
    constructor() {
        super("project.Key", []);
    }
}
/**
 * @generated MessageType for protobuf message project.Key
 */
export const Key = new Key$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Key_Request$Type extends MessageType<Key_Request> {
    constructor() {
        super("project.Key.Request", [
            { no: 1, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message project.Key.Request
 */
export const Key_Request = new Key_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Key_Response$Type extends MessageType<Key_Response> {
    constructor() {
        super("project.Key.Response", [
            { no: 1, name: "api_key", kind: "scalar", localName: "api_key", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "api_secret", kind: "scalar", localName: "api_secret", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "api_online", kind: "scalar", localName: "api_online", T: 8 /*ScalarType.BOOL*/ },
            { no: 4, name: "locked_at", kind: "message", localName: "locked_at", T: () => Timestamp },
            { no: 5, name: "archived_at", kind: "message", localName: "archived_at", T: () => Timestamp },
            { no: 6, name: "updated_at", kind: "message", localName: "updated_at", T: () => Timestamp },
            { no: 7, name: "created_at", kind: "message", localName: "created_at", T: () => Timestamp }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message project.Key.Response
 */
export const Key_Response = new Key_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddKey$Type extends MessageType<AddKey> {
    constructor() {
        super("project.AddKey", []);
    }
}
/**
 * @generated MessageType for protobuf message project.AddKey
 */
export const AddKey = new AddKey$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddKey_Request$Type extends MessageType<AddKey_Request> {
    constructor() {
        super("project.AddKey.Request", [
            { no: 1, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message project.AddKey.Request
 */
export const AddKey_Request = new AddKey_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddKey_Response$Type extends MessageType<AddKey_Response> {
    constructor() {
        super("project.AddKey.Response", [
            { no: 1, name: "key", kind: "message", T: () => Key_Response }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message project.AddKey.Response
 */
export const AddKey_Response = new AddKey_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateKey$Type extends MessageType<UpdateKey> {
    constructor() {
        super("project.UpdateKey", []);
    }
}
/**
 * @generated MessageType for protobuf message project.UpdateKey
 */
export const UpdateKey = new UpdateKey$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateKey_Request$Type extends MessageType<UpdateKey_Request> {
    constructor() {
        super("project.UpdateKey.Request", [
            { no: 1, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 2, name: "api_key", kind: "scalar", localName: "api_key", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message project.UpdateKey.Request
 */
export const UpdateKey_Request = new UpdateKey_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateKey_Response$Type extends MessageType<UpdateKey_Response> {
    constructor() {
        super("project.UpdateKey.Response", [
            { no: 1, name: "key", kind: "message", T: () => Key_Response }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message project.UpdateKey.Response
 */
export const UpdateKey_Response = new UpdateKey_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DeleteKey$Type extends MessageType<DeleteKey> {
    constructor() {
        super("project.DeleteKey", []);
    }
}
/**
 * @generated MessageType for protobuf message project.DeleteKey
 */
export const DeleteKey = new DeleteKey$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DeleteKey_Request$Type extends MessageType<DeleteKey_Request> {
    constructor() {
        super("project.DeleteKey.Request", [
            { no: 1, name: "project_id", kind: "scalar", localName: "project_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 2, name: "api_key", kind: "scalar", localName: "api_key", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message project.DeleteKey.Request
 */
export const DeleteKey_Request = new DeleteKey_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DeleteKey_Response$Type extends MessageType<DeleteKey_Response> {
    constructor() {
        super("project.DeleteKey.Response", []);
    }
}
/**
 * @generated MessageType for protobuf message project.DeleteKey.Response
 */
export const DeleteKey_Response = new DeleteKey_Response$Type();
/**
 * @generated ServiceType for protobuf service project.ProjectHandlers
 */
export const ProjectHandlers = new ServiceType("project.ProjectHandlers", [
    { name: "ListProjects", options: {}, I: ListProjects_Request, O: ListProjects_Response },
    { name: "Project", options: {}, I: Project_Request, O: Project_Response },
    { name: "AddProject", options: {}, I: AddProject_Request, O: AddProject_Response },
    { name: "UpdateProject", options: {}, I: UpdateProject_Request, O: UpdateProject_Response },
    { name: "DeleteProject", options: {}, I: DeleteProject_Request, O: DeleteProject_Response },
    { name: "Key", options: {}, I: Key_Request, O: Key_Response },
    { name: "AddKey", options: {}, I: AddKey_Request, O: AddKey_Response },
    { name: "UpdateKey", options: {}, I: UpdateKey_Request, O: UpdateKey_Response },
    { name: "DeleteKey", options: {}, I: DeleteKey_Request, O: DeleteKey_Response }
]);
