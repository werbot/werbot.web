// @generated from protobuf file "message.proto" (package "notificationmessage", syntax proto3)
// tslint:disable
// @ts-nocheck
import { MessageType } from "@protobuf-ts/runtime";
import { MailTemplate } from "./enum";
/**
 * rpc SendMail
 *
 * @generated from protobuf message notificationmessage.SendMail
 */
export interface SendMail {
}
/**
 * @generated from protobuf message notificationmessage.SendMail.Request
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
     * @generated from protobuf field: notificationenum.MailTemplate template = 3
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
 * @generated from protobuf message notificationmessage.SendMail.Response
 */
export interface SendMail_Response {
}
// @generated message type with reflection information, may provide speed optimized methods
class SendMail$Type extends MessageType<SendMail> {
    constructor() {
        super("notificationmessage.SendMail", []);
    }
}
/**
 * @generated MessageType for protobuf message notificationmessage.SendMail
 */
export const SendMail = new SendMail$Type();
// @generated message type with reflection information, may provide speed optimized methods
class SendMail_Request$Type extends MessageType<SendMail_Request> {
    constructor() {
        super("notificationmessage.SendMail.Request", [
            { no: 1, name: "email", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "subject", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "template", kind: "enum", T: () => ["notificationenum.MailTemplate", MailTemplate] },
            { no: 4, name: "data", kind: "map", K: 9 /*ScalarType.STRING*/, V: { kind: "scalar", T: 9 /*ScalarType.STRING*/ } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message notificationmessage.SendMail.Request
 */
export const SendMail_Request = new SendMail_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class SendMail_Response$Type extends MessageType<SendMail_Response> {
    constructor() {
        super("notificationmessage.SendMail.Response", []);
    }
}
/**
 * @generated MessageType for protobuf message notificationmessage.SendMail.Response
 */
export const SendMail_Response = new SendMail_Response$Type();
