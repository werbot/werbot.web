// @generated from protobuf file "user.proto" (package "user", syntax proto3)
// tslint:disable
// @ts-nocheck
import { ServiceType } from "@protobuf-ts/runtime-rpc";
import { MessageType } from "@protobuf-ts/runtime";
import { Timestamp } from "./google/protobuf/timestamp";
/**
 * rpc ListUsers
 *
 * @generated from protobuf message user.ListUsers
 */
export interface ListUsers {
}
/**
 * @generated from protobuf message user.ListUsers.Request
 */
export interface ListUsers_Request {
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
}
/**
 * @generated from protobuf message user.ListUsers.Response
 */
export interface ListUsers_Response {
    /**
     * @generated from protobuf field: int32 total = 1;
     */
    total: number;
    /**
     * @generated from protobuf field: repeated user.ListUsers.Response.UserInfo users = 2;
     */
    users: ListUsers_Response_UserInfo[];
}
/**
 * @generated from protobuf message user.ListUsers.Response.UserInfo
 */
export interface ListUsers_Response_UserInfo {
    /**
     * @generated from protobuf field: int32 servers_count = 1;
     */
    servers_count: number;
    /**
     * @generated from protobuf field: int32 projects_count = 2;
     */
    projects_count: number;
    /**
     * @generated from protobuf field: int32 keys_count = 3;
     */
    keys_count: number;
    /**
     * @generated from protobuf field: user.User.Response user = 4;
     */
    user?: User_Response;
}
/**
 * rpc User
 *
 * @generated from protobuf message user.User
 */
export interface User {
}
/**
 * @generated from protobuf message user.User.Request
 */
export interface User_Request {
    /**
     * @generated from protobuf field: string user_id = 1;
     */
    user_id: string; // @gotags: query:"user_id" 
}
/**
 * @generated from protobuf message user.User.Response
 */
export interface User_Response {
    /**
     * @generated from protobuf field: string user_id = 1;
     */
    user_id: string;
    /**
     * @generated from protobuf field: string login = 2;
     */
    login: string;
    /**
     * @generated from protobuf field: string name = 3;
     */
    name: string;
    /**
     * @generated from protobuf field: string surname = 4;
     */
    surname: string;
    /**
     * @generated from protobuf field: string email = 5;
     */
    email: string;
    /**
     * @generated from protobuf field: bool enabled = 6;
     */
    enabled: boolean;
    /**
     * @generated from protobuf field: bool confirmed = 7;
     */
    confirmed: boolean;
    /**
     * @generated from protobuf field: user.Role role = 8;
     */
    role: Role;
    /**
     * @generated from protobuf field: string password = 9;
     */
    password: string;
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
 * rpc AddUser
 *
 * @generated from protobuf message user.AddUser
 */
export interface AddUser {
}
/**
 * @generated from protobuf message user.AddUser.Request
 */
export interface AddUser_Request {
    /**
     * @generated from protobuf field: string login = 1;
     */
    login: string;
    /**
     * @generated from protobuf field: string email = 2;
     */
    email: string;
    /**
     * @generated from protobuf field: string name = 3;
     */
    name: string;
    /**
     * @generated from protobuf field: string surname = 4;
     */
    surname: string;
    /**
     * @generated from protobuf field: bool enabled = 5;
     */
    enabled: boolean;
    /**
     * @generated from protobuf field: bool confirmed = 6;
     */
    confirmed: boolean;
    /**
     * @generated from protobuf field: string password = 7;
     */
    password: string;
}
/**
 * @generated from protobuf message user.AddUser.Response
 */
export interface AddUser_Response {
    /**
     * @generated from protobuf field: string user_id = 1;
     */
    user_id: string;
}
/**
 * rpc UpdateUser
 *
 * @generated from protobuf message user.UpdateUser
 */
export interface UpdateUser {
}
/**
 * @generated from protobuf message user.UpdateUser.Request
 */
export interface UpdateUser_Request {
    /**
     * @generated from protobuf field: string user_id = 1;
     */
    user_id: string; // @gotags: query:"user_id"
    /**
     * @generated from protobuf oneof: request
     */
    request: {
        oneofKind: "info";
        /**
         * @generated from protobuf field: user.UpdateUser.Info info = 2;
         */
        info: UpdateUser_Info;
    } | {
        oneofKind: "enabled";
        /**
         * @generated from protobuf field: bool enabled = 3;
         */
        enabled: boolean;
    } | {
        oneofKind: "confirmed";
        /**
         * @generated from protobuf field: bool confirmed = 4;
         */
        confirmed: boolean;
    } | {
        oneofKind: undefined;
    };
}
/**
 * @generated from protobuf message user.UpdateUser.Response
 */
export interface UpdateUser_Response {
}
/**
 * @generated from protobuf message user.UpdateUser.Info
 */
export interface UpdateUser_Info {
    /**
     * @generated from protobuf field: string login = 1;
     */
    login: string;
    /**
     * @generated from protobuf field: string email = 2;
     */
    email: string; // @gotags: query:"email"
    /**
     * @generated from protobuf field: string name = 3;
     */
    name: string; // @gotags: query:"name"
    /**
     * @generated from protobuf field: string surname = 4;
     */
    surname: string; // @gotags: query:"surname"
}
// -----------------------------------------------------

/**
 * rpc DeleteUser
 *
 * @generated from protobuf message user.DeleteUser
 */
export interface DeleteUser {
}
/**
 * @generated from protobuf message user.DeleteUser.Request
 */
export interface DeleteUser_Request {
    /**
     * @generated from protobuf field: string user_id = 1;
     */
    user_id: string;
    /**
     * @generated from protobuf oneof: request
     */
    request: {
        oneofKind: "password";
        /**
         * @generated from protobuf field: string password = 2;
         */
        password: string;
    } | {
        oneofKind: "token";
        /**
         * @generated from protobuf field: string token = 3;
         */
        token: string;
    } | {
        oneofKind: undefined;
    };
}
/**
 * @generated from protobuf message user.DeleteUser.Response
 */
export interface DeleteUser_Response {
    /**
     * @generated from protobuf field: string login = 1;
     */
    login: string;
    /**
     * @generated from protobuf field: string email = 2;
     */
    email: string;
    /**
     * @generated from protobuf field: string token = 3;
     */
    token: string;
}
/**
 * rpc UpdatePassword
 *
 * @generated from protobuf message user.UpdatePassword
 */
export interface UpdatePassword {
}
/**
 * @generated from protobuf message user.UpdatePassword.Request
 */
export interface UpdatePassword_Request {
    /**
     * @generated from protobuf field: string user_id = 1;
     */
    user_id: string;
    /**
     * @generated from protobuf field: string old_password = 2;
     */
    old_password: string;
    /**
     * @generated from protobuf field: string new_password = 3;
     */
    new_password: string;
}
/**
 * @generated from protobuf message user.UpdatePassword.Response
 */
export interface UpdatePassword_Response {
    /**
     * @generated from protobuf field: string message = 1;
     */
    message: string;
}
/**
 * @generated from protobuf enum user.Role
 */
export enum Role {
    /**
     * @generated from protobuf enum value: role_unspecified = 0;
     */
    role_unspecified = 0,
    /**
     * @generated from protobuf enum value: user = 1;
     */
    user = 1,
    /**
     * @generated from protobuf enum value: manager = 2;
     */
    manager = 2,
    /**
     * @generated from protobuf enum value: admin = 3;
     */
    admin = 3
}
// @generated message type with reflection information, may provide speed optimized methods
class ListUsers$Type extends MessageType<ListUsers> {
    constructor() {
        super("user.ListUsers", []);
    }
}
/**
 * @generated MessageType for protobuf message user.ListUsers
 */
export const ListUsers = new ListUsers$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ListUsers_Request$Type extends MessageType<ListUsers_Request> {
    constructor() {
        super("user.ListUsers.Request", [
            { no: 1, name: "limit", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 2, name: "offset", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 3, name: "sort_by", kind: "scalar", localName: "sort_by", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message user.ListUsers.Request
 */
export const ListUsers_Request = new ListUsers_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ListUsers_Response$Type extends MessageType<ListUsers_Response> {
    constructor() {
        super("user.ListUsers.Response", [
            { no: 1, name: "total", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 2, name: "users", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => ListUsers_Response_UserInfo }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message user.ListUsers.Response
 */
export const ListUsers_Response = new ListUsers_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ListUsers_Response_UserInfo$Type extends MessageType<ListUsers_Response_UserInfo> {
    constructor() {
        super("user.ListUsers.Response.UserInfo", [
            { no: 1, name: "servers_count", kind: "scalar", localName: "servers_count", T: 5 /*ScalarType.INT32*/ },
            { no: 2, name: "projects_count", kind: "scalar", localName: "projects_count", T: 5 /*ScalarType.INT32*/ },
            { no: 3, name: "keys_count", kind: "scalar", localName: "keys_count", T: 5 /*ScalarType.INT32*/ },
            { no: 4, name: "user", kind: "message", T: () => User_Response }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message user.ListUsers.Response.UserInfo
 */
export const ListUsers_Response_UserInfo = new ListUsers_Response_UserInfo$Type();
// @generated message type with reflection information, may provide speed optimized methods
class User$Type extends MessageType<User> {
    constructor() {
        super("user.User", []);
    }
}
/**
 * @generated MessageType for protobuf message user.User
 */
export const User = new User$Type();
// @generated message type with reflection information, may provide speed optimized methods
class User_Request$Type extends MessageType<User_Request> {
    constructor() {
        super("user.User.Request", [
            { no: 1, name: "user_id", kind: "scalar", localName: "user_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true }, ignoreEmpty: true } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message user.User.Request
 */
export const User_Request = new User_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class User_Response$Type extends MessageType<User_Response> {
    constructor() {
        super("user.User.Response", [
            { no: 1, name: "user_id", kind: "scalar", localName: "user_id", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "login", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "surname", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "email", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 6, name: "enabled", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 7, name: "confirmed", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 8, name: "role", kind: "enum", T: () => ["user.Role", Role] },
            { no: 9, name: "password", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 10, name: "locked_at", kind: "message", localName: "locked_at", T: () => Timestamp },
            { no: 11, name: "archived_at", kind: "message", localName: "archived_at", T: () => Timestamp },
            { no: 12, name: "updated_at", kind: "message", localName: "updated_at", T: () => Timestamp },
            { no: 13, name: "created_at", kind: "message", localName: "created_at", T: () => Timestamp }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message user.User.Response
 */
export const User_Response = new User_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddUser$Type extends MessageType<AddUser> {
    constructor() {
        super("user.AddUser", []);
    }
}
/**
 * @generated MessageType for protobuf message user.AddUser
 */
export const AddUser = new AddUser$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddUser_Request$Type extends MessageType<AddUser_Request> {
    constructor() {
        super("user.AddUser.Request", [
            { no: 1, name: "login", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { minLen: "3", maxLen: "20", pattern: "^[a-z0-9]+$" } } } },
            { no: 2, name: "email", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { email: true } } } },
            { no: 3, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { minLen: "3", maxLen: "128" } } } },
            { no: 4, name: "surname", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { minLen: "3", maxLen: "128" } } } },
            { no: 5, name: "enabled", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 6, name: "confirmed", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 7, name: "password", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { minLen: "8", maxLen: "32" } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message user.AddUser.Request
 */
export const AddUser_Request = new AddUser_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddUser_Response$Type extends MessageType<AddUser_Response> {
    constructor() {
        super("user.AddUser.Response", [
            { no: 1, name: "user_id", kind: "scalar", localName: "user_id", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message user.AddUser.Response
 */
export const AddUser_Response = new AddUser_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateUser$Type extends MessageType<UpdateUser> {
    constructor() {
        super("user.UpdateUser", []);
    }
}
/**
 * @generated MessageType for protobuf message user.UpdateUser
 */
export const UpdateUser = new UpdateUser$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateUser_Request$Type extends MessageType<UpdateUser_Request> {
    constructor() {
        super("user.UpdateUser.Request", [
            { no: 1, name: "user_id", kind: "scalar", localName: "user_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true }, ignoreEmpty: true } } },
            { no: 2, name: "info", kind: "message", oneof: "request", T: () => UpdateUser_Info },
            { no: 3, name: "enabled", kind: "scalar", oneof: "request", T: 8 /*ScalarType.BOOL*/ },
            { no: 4, name: "confirmed", kind: "scalar", oneof: "request", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message user.UpdateUser.Request
 */
export const UpdateUser_Request = new UpdateUser_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateUser_Response$Type extends MessageType<UpdateUser_Response> {
    constructor() {
        super("user.UpdateUser.Response", []);
    }
}
/**
 * @generated MessageType for protobuf message user.UpdateUser.Response
 */
export const UpdateUser_Response = new UpdateUser_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateUser_Info$Type extends MessageType<UpdateUser_Info> {
    constructor() {
        super("user.UpdateUser.Info", [
            { no: 1, name: "login", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { minLen: "3", maxLen: "20", pattern: "^[a-z0-9]+$" }, ignoreEmpty: true } } },
            { no: 2, name: "email", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { email: true } } } },
            { no: 3, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { minLen: "3", maxLen: "128" } } } },
            { no: 4, name: "surname", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { minLen: "3", maxLen: "128" } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message user.UpdateUser.Info
 */
export const UpdateUser_Info = new UpdateUser_Info$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DeleteUser$Type extends MessageType<DeleteUser> {
    constructor() {
        super("user.DeleteUser", []);
    }
}
/**
 * @generated MessageType for protobuf message user.DeleteUser
 */
export const DeleteUser = new DeleteUser$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DeleteUser_Request$Type extends MessageType<DeleteUser_Request> {
    constructor() {
        super("user.DeleteUser.Request", [
            { no: 1, name: "user_id", kind: "scalar", localName: "user_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 2, name: "password", kind: "scalar", oneof: "request", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { minLen: "8", maxLen: "32" } } } },
            { no: 3, name: "token", kind: "scalar", oneof: "request", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true }, ignoreEmpty: true } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message user.DeleteUser.Request
 */
export const DeleteUser_Request = new DeleteUser_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DeleteUser_Response$Type extends MessageType<DeleteUser_Response> {
    constructor() {
        super("user.DeleteUser.Response", [
            { no: 1, name: "login", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "email", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "token", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message user.DeleteUser.Response
 */
export const DeleteUser_Response = new DeleteUser_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdatePassword$Type extends MessageType<UpdatePassword> {
    constructor() {
        super("user.UpdatePassword", []);
    }
}
/**
 * @generated MessageType for protobuf message user.UpdatePassword
 */
export const UpdatePassword = new UpdatePassword$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdatePassword_Request$Type extends MessageType<UpdatePassword_Request> {
    constructor() {
        super("user.UpdatePassword.Request", [
            { no: 1, name: "user_id", kind: "scalar", localName: "user_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 2, name: "old_password", kind: "scalar", localName: "old_password", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { minLen: "8", maxLen: "32" } } } },
            { no: 3, name: "new_password", kind: "scalar", localName: "new_password", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { minLen: "8", maxLen: "32" } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message user.UpdatePassword.Request
 */
export const UpdatePassword_Request = new UpdatePassword_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdatePassword_Response$Type extends MessageType<UpdatePassword_Response> {
    constructor() {
        super("user.UpdatePassword.Response", [
            { no: 1, name: "message", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message user.UpdatePassword.Response
 */
export const UpdatePassword_Response = new UpdatePassword_Response$Type();
/**
 * @generated ServiceType for protobuf service user.UserHandlers
 */
export const UserHandlers = new ServiceType("user.UserHandlers", [
    { name: "ListUsers", options: {}, I: ListUsers_Request, O: ListUsers_Response },
    { name: "User", options: {}, I: User_Request, O: User_Response },
    { name: "AddUser", options: {}, I: AddUser_Request, O: AddUser_Response },
    { name: "UpdateUser", options: {}, I: UpdateUser_Request, O: UpdateUser_Response },
    { name: "DeleteUser", options: {}, I: DeleteUser_Request, O: DeleteUser_Response },
    { name: "UpdatePassword", options: {}, I: UpdatePassword_Request, O: UpdatePassword_Response }
]);
