// @generated from protobuf file "audit.proto" (package "audit", syntax proto3)
// tslint:disable
// @ts-nocheck
import { ServiceType } from "@protobuf-ts/runtime-rpc";
import { MessageType } from "@protobuf-ts/runtime";
import { Timestamp } from "./google/protobuf/timestamp";
/**
 * rpc ListAudits
 *
 * @generated from protobuf message audit.ListAudits
 */
export interface ListAudits {
}
/**
 * @generated from protobuf message audit.ListAudits.Request
 */
export interface ListAudits_Request {
    /**
     * @generated from protobuf field: string server_id = 1;
     */
    server_id: string;
}
/**
 * @generated from protobuf message audit.ListAudits.Response
 */
export interface ListAudits_Response {
    /**
     * @generated from protobuf field: int32 total = 1;
     */
    total: number;
    /**
     * @generated from protobuf field: repeated audit.Audit.Response accounts = 2;
     */
    accounts: Audit_Response[];
}
/**
 * rpc Audit
 *
 * @generated from protobuf message audit.Audit
 */
export interface Audit {
}
/**
 * @generated from protobuf message audit.Audit.Request
 */
export interface Audit_Request {
    /**
     * @generated from protobuf field: string audit_id = 1;
     */
    audit_id: string;
}
/**
 * @generated from protobuf message audit.Audit.Response
 */
export interface Audit_Response {
    /**
     * @generated from protobuf field: google.protobuf.Timestamp updated_at = 1;
     */
    updated_at?: Timestamp;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp created_at = 2;
     */
    created_at?: Timestamp;
}
/**
 * rpc rpc AddAudit
 *
 * @generated from protobuf message audit.AddAudit
 */
export interface AddAudit {
}
/**
 * @generated from protobuf message audit.AddAudit.Request
 */
export interface AddAudit_Request {
    /**
     * @generated from protobuf field: string server_id = 1;
     */
    server_id: string;
    /**
     * @generated from protobuf field: string account_id = 2;
     */
    account_id: string;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp time_start = 3;
     */
    time_start?: Timestamp;
    /**
     * @generated from protobuf field: int32 version = 4;
     */
    version: number;
    /**
     * @generated from protobuf field: string session = 5;
     */
    session: string;
    /**
     * @generated from protobuf field: string client_ip = 6;
     */
    client_ip: string;
    /**
     * @generated from protobuf field: int32 width = 7;
     */
    width: number;
    /**
     * @generated from protobuf field: int32 height = 8;
     */
    height: number;
    /**
     * @generated from protobuf field: string command = 9;
     */
    command: string;
    /**
     * @generated from protobuf field: string title = 10;
     */
    title: string;
    /**
     * @generated from protobuf field: string env_term = 11;
     */
    env_term: string;
    /**
     * @generated from protobuf field: string env_shell = 12;
     */
    env_shell: string;
}
/**
 * @generated from protobuf message audit.AddAudit.Response
 */
export interface AddAudit_Response {
    /**
     * @generated from protobuf field: string audit_id = 1;
     */
    audit_id: string;
}
/**
 * rpc UpdateAudit
 *
 * @generated from protobuf message audit.UpdateAudit
 */
export interface UpdateAudit {
}
/**
 * @generated from protobuf message audit.UpdateAudit.Request
 */
export interface UpdateAudit_Request {
    /**
     * @generated from protobuf field: string audit_id = 1;
     */
    audit_id: string;
    /**
     * @generated from protobuf field: int32 width = 2;
     */
    width: number;
    /**
     * @generated from protobuf field: int32 height = 3;
     */
    height: number;
    /**
     * @generated from protobuf field: string env_term = 4;
     */
    env_term: string;
    /**
     * @generated from protobuf field: string duration = 5;
     */
    duration: string;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp time_end = 6;
     */
    time_end?: Timestamp;
}
/**
 * @generated from protobuf message audit.UpdateAudit.Response
 */
export interface UpdateAudit_Response {
}
/**
 * rpc DeleteAudit
 *
 * @generated from protobuf message audit.DeleteAudit
 */
export interface DeleteAudit {
}
/**
 * @generated from protobuf message audit.DeleteAudit.Request
 */
export interface DeleteAudit_Request {
    /**
     * @generated from protobuf field: string audit_id = 1;
     */
    audit_id: string;
}
/**
 * @generated from protobuf message audit.DeleteAudit.Response
 */
export interface DeleteAudit_Response {
}
/**
 * rpc ListRecords
 *
 * @generated from protobuf message audit.Record
 */
export interface Record {
    /**
     * @generated from protobuf field: string id = 1;
     */
    id: string;
    /**
     * @generated from protobuf field: bool audit = 2;
     */
    audit: boolean;
    /**
     * @generated from protobuf field: string duration = 3;
     */
    duration: string;
    /**
     * @generated from protobuf field: string screen = 4;
     */
    screen: string;
    /**
     * @generated from protobuf field: string type = 5;
     */
    type: string;
}
/**
 * rpc ListRecords
 *
 * @generated from protobuf message audit.ListRecords
 */
export interface ListRecords {
}
/**
 * @generated from protobuf message audit.ListRecords.Request
 */
export interface ListRecords_Request {
    /**
     * @generated from protobuf field: string audit_id = 1;
     */
    audit_id: string;
}
/**
 * @generated from protobuf message audit.ListRecords.Response
 */
export interface ListRecords_Response {
    /**
     * @generated from protobuf field: repeated audit.Record records = 1;
     */
    records: Record[];
}
/**
 * rpc AddRecord
 *
 * @generated from protobuf message audit.AddRecord
 */
export interface AddRecord {
}
/**
 * @generated from protobuf message audit.AddRecord.Request
 */
export interface AddRecord_Request {
    /**
     * @generated from protobuf field: string audit_id = 1;
     */
    audit_id: string;
    /**
     * @generated from protobuf field: repeated audit.Record records = 2;
     */
    records: Record[];
}
/**
 * @generated from protobuf message audit.AddRecord.Response
 */
export interface AddRecord_Response {
}
// @generated message type with reflection information, may provide speed optimized methods
class ListAudits$Type extends MessageType<ListAudits> {
    constructor() {
        super("audit.ListAudits", []);
    }
}
/**
 * @generated MessageType for protobuf message audit.ListAudits
 */
export const ListAudits = new ListAudits$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ListAudits_Request$Type extends MessageType<ListAudits_Request> {
    constructor() {
        super("audit.ListAudits.Request", [
            { no: 1, name: "server_id", kind: "scalar", localName: "server_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message audit.ListAudits.Request
 */
export const ListAudits_Request = new ListAudits_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ListAudits_Response$Type extends MessageType<ListAudits_Response> {
    constructor() {
        super("audit.ListAudits.Response", [
            { no: 1, name: "total", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 2, name: "accounts", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Audit_Response }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message audit.ListAudits.Response
 */
export const ListAudits_Response = new ListAudits_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Audit$Type extends MessageType<Audit> {
    constructor() {
        super("audit.Audit", []);
    }
}
/**
 * @generated MessageType for protobuf message audit.Audit
 */
export const Audit = new Audit$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Audit_Request$Type extends MessageType<Audit_Request> {
    constructor() {
        super("audit.Audit.Request", [
            { no: 1, name: "audit_id", kind: "scalar", localName: "audit_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message audit.Audit.Request
 */
export const Audit_Request = new Audit_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Audit_Response$Type extends MessageType<Audit_Response> {
    constructor() {
        super("audit.Audit.Response", [
            { no: 1, name: "updated_at", kind: "message", localName: "updated_at", T: () => Timestamp },
            { no: 2, name: "created_at", kind: "message", localName: "created_at", T: () => Timestamp }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message audit.Audit.Response
 */
export const Audit_Response = new Audit_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddAudit$Type extends MessageType<AddAudit> {
    constructor() {
        super("audit.AddAudit", []);
    }
}
/**
 * @generated MessageType for protobuf message audit.AddAudit
 */
export const AddAudit = new AddAudit$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddAudit_Request$Type extends MessageType<AddAudit_Request> {
    constructor() {
        super("audit.AddAudit.Request", [
            { no: 1, name: "server_id", kind: "scalar", localName: "server_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 2, name: "account_id", kind: "scalar", localName: "account_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 3, name: "time_start", kind: "message", localName: "time_start", T: () => Timestamp },
            { no: 4, name: "version", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 5, name: "session", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 6, name: "client_ip", kind: "scalar", localName: "client_ip", T: 9 /*ScalarType.STRING*/ },
            { no: 7, name: "width", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 8, name: "height", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 9, name: "command", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 10, name: "title", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 11, name: "env_term", kind: "scalar", localName: "env_term", T: 9 /*ScalarType.STRING*/ },
            { no: 12, name: "env_shell", kind: "scalar", localName: "env_shell", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message audit.AddAudit.Request
 */
export const AddAudit_Request = new AddAudit_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddAudit_Response$Type extends MessageType<AddAudit_Response> {
    constructor() {
        super("audit.AddAudit.Response", [
            { no: 1, name: "audit_id", kind: "scalar", localName: "audit_id", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message audit.AddAudit.Response
 */
export const AddAudit_Response = new AddAudit_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateAudit$Type extends MessageType<UpdateAudit> {
    constructor() {
        super("audit.UpdateAudit", []);
    }
}
/**
 * @generated MessageType for protobuf message audit.UpdateAudit
 */
export const UpdateAudit = new UpdateAudit$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateAudit_Request$Type extends MessageType<UpdateAudit_Request> {
    constructor() {
        super("audit.UpdateAudit.Request", [
            { no: 1, name: "audit_id", kind: "scalar", localName: "audit_id", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "width", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 3, name: "height", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 4, name: "env_term", kind: "scalar", localName: "env_term", T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "duration", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 6, name: "time_end", kind: "message", localName: "time_end", T: () => Timestamp }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message audit.UpdateAudit.Request
 */
export const UpdateAudit_Request = new UpdateAudit_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateAudit_Response$Type extends MessageType<UpdateAudit_Response> {
    constructor() {
        super("audit.UpdateAudit.Response", []);
    }
}
/**
 * @generated MessageType for protobuf message audit.UpdateAudit.Response
 */
export const UpdateAudit_Response = new UpdateAudit_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DeleteAudit$Type extends MessageType<DeleteAudit> {
    constructor() {
        super("audit.DeleteAudit", []);
    }
}
/**
 * @generated MessageType for protobuf message audit.DeleteAudit
 */
export const DeleteAudit = new DeleteAudit$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DeleteAudit_Request$Type extends MessageType<DeleteAudit_Request> {
    constructor() {
        super("audit.DeleteAudit.Request", [
            { no: 1, name: "audit_id", kind: "scalar", localName: "audit_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message audit.DeleteAudit.Request
 */
export const DeleteAudit_Request = new DeleteAudit_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DeleteAudit_Response$Type extends MessageType<DeleteAudit_Response> {
    constructor() {
        super("audit.DeleteAudit.Response", []);
    }
}
/**
 * @generated MessageType for protobuf message audit.DeleteAudit.Response
 */
export const DeleteAudit_Response = new DeleteAudit_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Record$Type extends MessageType<Record> {
    constructor() {
        super("audit.Record", [
            { no: 1, name: "id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "audit", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 3, name: "duration", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "screen", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "type", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message audit.Record
 */
export const Record = new Record$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ListRecords$Type extends MessageType<ListRecords> {
    constructor() {
        super("audit.ListRecords", []);
    }
}
/**
 * @generated MessageType for protobuf message audit.ListRecords
 */
export const ListRecords = new ListRecords$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ListRecords_Request$Type extends MessageType<ListRecords_Request> {
    constructor() {
        super("audit.ListRecords.Request", [
            { no: 1, name: "audit_id", kind: "scalar", localName: "audit_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message audit.ListRecords.Request
 */
export const ListRecords_Request = new ListRecords_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ListRecords_Response$Type extends MessageType<ListRecords_Response> {
    constructor() {
        super("audit.ListRecords.Response", [
            { no: 1, name: "records", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Record }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message audit.ListRecords.Response
 */
export const ListRecords_Response = new ListRecords_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddRecord$Type extends MessageType<AddRecord> {
    constructor() {
        super("audit.AddRecord", []);
    }
}
/**
 * @generated MessageType for protobuf message audit.AddRecord
 */
export const AddRecord = new AddRecord$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddRecord_Request$Type extends MessageType<AddRecord_Request> {
    constructor() {
        super("audit.AddRecord.Request", [
            { no: 1, name: "audit_id", kind: "scalar", localName: "audit_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 2, name: "records", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Record }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message audit.AddRecord.Request
 */
export const AddRecord_Request = new AddRecord_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddRecord_Response$Type extends MessageType<AddRecord_Response> {
    constructor() {
        super("audit.AddRecord.Response", []);
    }
}
/**
 * @generated MessageType for protobuf message audit.AddRecord.Response
 */
export const AddRecord_Response = new AddRecord_Response$Type();
/**
 * @generated ServiceType for protobuf service audit.AuditHandlers
 */
export const AuditHandlers = new ServiceType("audit.AuditHandlers", [
    { name: "ListAudits", options: {}, I: ListAudits_Request, O: ListAudits_Response },
    { name: "Audit", options: {}, I: Audit_Request, O: Audit_Response },
    { name: "AddAudit", options: {}, I: AddAudit_Request, O: AddAudit_Response },
    { name: "UpdateAudit", options: {}, I: UpdateAudit_Request, O: UpdateAudit_Response },
    { name: "DeleteAudit", options: {}, I: DeleteAudit_Request, O: DeleteAudit_Response },
    { name: "ListRecords", options: {}, I: ListRecords_Request, O: ListRecords_Response },
    { name: "AddRecord", options: {}, I: AddRecord_Request, O: AddRecord_Response }
]);
