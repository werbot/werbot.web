// @generated from protobuf file "info.proto" (package "info", syntax proto3)
// tslint:disable
// @ts-nocheck
import { ServiceType } from "@protobuf-ts/runtime-rpc";
import { MessageType } from "@protobuf-ts/runtime";
import { Role } from "./user";
/**
 * rpc UserMetrics
 *
 * @generated from protobuf message info.UserMetrics
 */
export interface UserMetrics {
}
/**
 * @generated from protobuf message info.UserMetrics.Request
 */
export interface UserMetrics_Request {
    /**
     * @generated from protobuf field: string user_id = 1;
     */
    user_id: string; // @gotags: query:"user_id" 
    /**
     * @generated from protobuf field: user.Role role = 2;
     */
    role: Role;
}
/**
 * @generated from protobuf message info.UserMetrics.Response
 */
export interface UserMetrics_Response {
    /**
     * @generated from protobuf field: int32 users = 1;
     */
    users: number;
    /**
     * @generated from protobuf field: int32 projects = 2;
     */
    projects: number;
    /**
     * @generated from protobuf field: int32 servers = 3;
     */
    servers: number;
}
// @generated message type with reflection information, may provide speed optimized methods
class UserMetrics$Type extends MessageType<UserMetrics> {
    constructor() {
        super("info.UserMetrics", []);
    }
}
/**
 * @generated MessageType for protobuf message info.UserMetrics
 */
export const UserMetrics = new UserMetrics$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UserMetrics_Request$Type extends MessageType<UserMetrics_Request> {
    constructor() {
        super("info.UserMetrics.Request", [
            { no: 1, name: "user_id", kind: "scalar", localName: "user_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true }, ignoreEmpty: true } } },
            { no: 2, name: "role", kind: "enum", T: () => ["user.Role", Role] }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message info.UserMetrics.Request
 */
export const UserMetrics_Request = new UserMetrics_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UserMetrics_Response$Type extends MessageType<UserMetrics_Response> {
    constructor() {
        super("info.UserMetrics.Response", [
            { no: 1, name: "users", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 2, name: "projects", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 3, name: "servers", kind: "scalar", T: 5 /*ScalarType.INT32*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message info.UserMetrics.Response
 */
export const UserMetrics_Response = new UserMetrics_Response$Type();
/**
 * @generated ServiceType for protobuf service info.InfoHandlers
 */
export const InfoHandlers = new ServiceType("info.InfoHandlers", [
    { name: "UserMetrics", options: {}, I: UserMetrics_Request, O: UserMetrics_Response }
]);
