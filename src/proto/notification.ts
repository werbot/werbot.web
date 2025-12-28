// @generated from protobuf file "notification.proto" (package "notification", syntax proto3)
// tslint:disable
// @ts-nocheck
import { ServiceType } from "@protobuf-ts/runtime-rpc";
import { MessageType } from "@protobuf-ts/runtime";
/**
 * rpc SendMail
 *
 * @generated from protobuf message notification.SendMail
 */
export interface SendMail {
}
/**
 * @generated from protobuf message notification.SendMail.Request
 */
export interface SendMail_Request {
    /**
     * @generated from protobuf field: string email = 1
     */
    email: string;
    /**
     * @generated from protobuf field: string subject = 2
     */
    subject: string;
    /**
     * @generated from protobuf field: notification.MailTemplate template = 3
     */
    template: MailTemplate;
    /**
     * @generated from protobuf field: map<string, string> data = 4
     */
    data: {
        [key: string]: string;
    };
}
/**
 * @generated from protobuf message notification.SendMail.Response
 */
export interface SendMail_Response {
}
/**
 * @generated from protobuf enum notification.MailTemplate
 */
export enum MailTemplate {
    /**
     * @generated from protobuf enum value: unspecified = 0;
     */
    unspecified = 0,
    /**
     * @generated from protobuf enum value: password_reset = 1;
     */
    password_reset = 1,
    /**
     * @generated from protobuf enum value: project_invite = 2;
     */
    project_invite = 2,
    /**
     * @generated from protobuf enum value: account_deletion_confirmation = 3;
     */
    account_deletion_confirmation = 3,
    /**
     * @generated from protobuf enum value: account_deletion_info = 4;
     */
    account_deletion_info = 4
}
// @generated message type with reflection information, may provide speed optimized methods
class SendMail$Type extends MessageType<SendMail> {
    constructor() {
        super("notification.SendMail", []);
    }
}
/**
 * @generated MessageType for protobuf message notification.SendMail
 */
export const SendMail = new SendMail$Type();
// @generated message type with reflection information, may provide speed optimized methods
class SendMail_Request$Type extends MessageType<SendMail_Request> {
    constructor() {
        super("notification.SendMail.Request", [
            { no: 1, name: "email", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "subject", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "template", kind: "enum", T: () => ["notification.MailTemplate", MailTemplate] },
            { no: 4, name: "data", kind: "map", K: 9 /*ScalarType.STRING*/, V: { kind: "scalar", T: 9 /*ScalarType.STRING*/ } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message notification.SendMail.Request
 */
export const SendMail_Request = new SendMail_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class SendMail_Response$Type extends MessageType<SendMail_Response> {
    constructor() {
        super("notification.SendMail.Response", []);
    }
}
/**
 * @generated MessageType for protobuf message notification.SendMail.Response
 */
export const SendMail_Response = new SendMail_Response$Type();
/**
 * @generated ServiceType for protobuf service notification.NotificationHandlers
 */
export const NotificationHandlers = new ServiceType("notification.NotificationHandlers", [
    { name: "SendMail", options: {}, I: SendMail_Request, O: SendMail_Response }
]);
