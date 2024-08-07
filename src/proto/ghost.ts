// @generated from protobuf file "ghost.proto" (package "ghost", syntax proto3)
// tslint:disable
// @ts-nocheck
import { ServiceType } from "@protobuf-ts/runtime-rpc";
import { MessageType } from "@protobuf-ts/runtime";
/**
 * rpc Containers
 *
 * @generated from protobuf message ghost.Containers
 */
export interface Containers {
}
/**
 * @generated from protobuf message ghost.Containers.Request
 */
export interface Containers_Request {
}
/**
 * @generated from protobuf message ghost.Containers.Response
 */
export interface Containers_Response {
}
// @generated message type with reflection information, may provide speed optimized methods
class Containers$Type extends MessageType<Containers> {
    constructor() {
        super("ghost.Containers", []);
    }
}
/**
 * @generated MessageType for protobuf message ghost.Containers
 */
export const Containers = new Containers$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Containers_Request$Type extends MessageType<Containers_Request> {
    constructor() {
        super("ghost.Containers.Request", []);
    }
}
/**
 * @generated MessageType for protobuf message ghost.Containers.Request
 */
export const Containers_Request = new Containers_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Containers_Response$Type extends MessageType<Containers_Response> {
    constructor() {
        super("ghost.Containers.Response", []);
    }
}
/**
 * @generated MessageType for protobuf message ghost.Containers.Response
 */
export const Containers_Response = new Containers_Response$Type();
/**
 * @generated ServiceType for protobuf service ghost.GhostHandlers
 */
export const GhostHandlers = new ServiceType("ghost.GhostHandlers", [
    { name: "Containers", options: {}, I: Containers_Request, O: Containers_Response }
]);
