// @generated from protobuf file "rpc.proto" (package "agent", syntax proto3)
// tslint:disable
// @ts-nocheck
import { AddScheme_Response } from "./message";
import { AddScheme_Request } from "./message";
import { Auth_Response } from "./message";
import { Auth_Request } from "./message";
import { ServiceType } from "@protobuf-ts/runtime-rpc";
/**
 * @generated ServiceType for protobuf service agent.AgentHandlers
 */
export const AgentHandlers = new ServiceType("agent.AgentHandlers", [
    { name: "Auth", options: {}, I: Auth_Request, O: Auth_Response },
    { name: "AddScheme", options: {}, I: AddScheme_Request, O: AddScheme_Response }
]);
