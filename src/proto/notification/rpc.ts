// @generated from protobuf file "internal/core/notification/proto/rpc/rpc.proto" (package "notification", syntax proto3)
// tslint:disable
// @ts-nocheck
import { SendMail_Response } from "./message";
import { SendMail_Request } from "./message";
import { ServiceType } from "@protobuf-ts/runtime-rpc";
/**
 * @generated ServiceType for protobuf service notification.NotificationHandlers
 */
export const NotificationHandlers = new ServiceType("notification.NotificationHandlers", [
    { name: "SendMail", options: {}, I: SendMail_Request, O: SendMail_Response }
]);
