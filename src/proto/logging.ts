// @generated by protobuf-ts 2.8.2 with parameter use_proto_field_name,ts_nocheck,long_type_string,force_optimize_code_size,force_client_none
// @generated from protobuf file "logging.proto" (package "logging", syntax proto3)
// tslint:disable
// @ts-nocheck
import { ServiceType } from "@protobuf-ts/runtime-rpc";
import { MessageType } from "@protobuf-ts/runtime";
/**
 * rpc ListRecords
 *
 * @generated from protobuf message logging.ListRecords
 */
export interface ListRecords {
}
/**
 * @generated from protobuf message logging.ListRecords.Request
 */
export interface ListRecords_Request {
    /**
     * @generated from protobuf field: logging.Logger logger = 1;
     */
    logger: Logger;
    /**
     * @generated from protobuf field: string id = 2;
     */
    id: string;
}
/**
 * @generated from protobuf message logging.ListRecords.Response
 */
export interface ListRecords_Response {
}
/**
 * rpc Record
 *
 * @generated from protobuf message logging.Record
 */
export interface Record {
}
/**
 * @generated from protobuf message logging.Record.Request
 */
export interface Record_Request {
    /**
     * @generated from protobuf field: string record_id = 3;
     */
    record_id: string;
}
/**
 * @generated from protobuf message logging.Record.Response
 */
export interface Record_Response {
}
/**
 * rpc AddRecord
 *
 * @generated from protobuf message logging.AddRecord
 */
export interface AddRecord {
}
/**
 * @generated from protobuf message logging.AddRecord.Request
 */
export interface AddRecord_Request {
    /**
     * @generated from protobuf field: logging.Logger logger = 1;
     */
    logger: Logger;
    /**
     * @generated from protobuf field: logging.EventType event = 2;
     */
    event: EventType;
    /**
     * @generated from protobuf field: string id = 3;
     */
    id: string;
}
/**
 * @generated from protobuf message logging.AddRecord.Response
 */
export interface AddRecord_Response {
}
/**
 * @generated from protobuf enum logging.Logger
 */
export enum Logger {
    /**
     * @generated from protobuf enum value: loger_unspecified = 0;
     */
    loger_unspecified = 0,
    /**
     * @generated from protobuf enum value: profile = 1;
     */
    profile = 1,
    /**
     * @generated from protobuf enum value: project = 2;
     */
    project = 2,
    /**
     * @generated from protobuf enum value: server = 3;
     */
    server = 3
}
/**
 * @generated from protobuf enum logging.EventType
 */
export enum EventType {
    /**
     * @generated from protobuf enum value: event_unspecified = 0;
     */
    event_unspecified = 0,
    /**
     * @generated from protobuf enum value: onOnline = 1;
     */
    onOnline = 1,
    /**
     * @generated from protobuf enum value: onOffline = 2;
     */
    onOffline = 2,
    /**
     * @generated from protobuf enum value: onCreate = 3;
     */
    onCreate = 3,
    /**
     * @generated from protobuf enum value: onEdit = 4;
     */
    onEdit = 4,
    /**
     * @generated from protobuf enum value: onRemove = 5;
     */
    onRemove = 5,
    /**
     * @generated from protobuf enum value: onActive = 6;
     */
    onActive = 6,
    /**
     * @generated from protobuf enum value: onInactive = 7;
     */
    onInactive = 7,
    /**
     * @generated from protobuf enum value: onChange = 8;
     */
    onChange = 8
}
// @generated message type with reflection information, may provide speed optimized methods
class ListRecords$Type extends MessageType<ListRecords> {
    constructor() {
        super("logging.ListRecords", []);
    }
}
/**
 * @generated MessageType for protobuf message logging.ListRecords
 */
export const ListRecords = new ListRecords$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ListRecords_Request$Type extends MessageType<ListRecords_Request> {
    constructor() {
        super("logging.ListRecords.Request", [
            { no: 1, name: "logger", kind: "enum", T: () => ["logging.Logger", Logger], options: { "validate.rules": { enum: { definedOnly: true } } } },
            { no: 2, name: "id", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "validate.rules": { string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message logging.ListRecords.Request
 */
export const ListRecords_Request = new ListRecords_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ListRecords_Response$Type extends MessageType<ListRecords_Response> {
    constructor() {
        super("logging.ListRecords.Response", []);
    }
}
/**
 * @generated MessageType for protobuf message logging.ListRecords.Response
 */
export const ListRecords_Response = new ListRecords_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Record$Type extends MessageType<Record> {
    constructor() {
        super("logging.Record", []);
    }
}
/**
 * @generated MessageType for protobuf message logging.Record
 */
export const Record = new Record$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Record_Request$Type extends MessageType<Record_Request> {
    constructor() {
        super("logging.Record.Request", [
            { no: 3, name: "record_id", kind: "scalar", localName: "record_id", T: 9 /*ScalarType.STRING*/, options: { "validate.rules": { string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message logging.Record.Request
 */
export const Record_Request = new Record_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Record_Response$Type extends MessageType<Record_Response> {
    constructor() {
        super("logging.Record.Response", []);
    }
}
/**
 * @generated MessageType for protobuf message logging.Record.Response
 */
export const Record_Response = new Record_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddRecord$Type extends MessageType<AddRecord> {
    constructor() {
        super("logging.AddRecord", []);
    }
}
/**
 * @generated MessageType for protobuf message logging.AddRecord
 */
export const AddRecord = new AddRecord$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddRecord_Request$Type extends MessageType<AddRecord_Request> {
    constructor() {
        super("logging.AddRecord.Request", [
            { no: 1, name: "logger", kind: "enum", T: () => ["logging.Logger", Logger], options: { "validate.rules": { enum: { definedOnly: true } } } },
            { no: 2, name: "event", kind: "enum", T: () => ["logging.EventType", EventType], options: { "validate.rules": { enum: { definedOnly: true } } } },
            { no: 3, name: "id", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "validate.rules": { string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message logging.AddRecord.Request
 */
export const AddRecord_Request = new AddRecord_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddRecord_Response$Type extends MessageType<AddRecord_Response> {
    constructor() {
        super("logging.AddRecord.Response", []);
    }
}
/**
 * @generated MessageType for protobuf message logging.AddRecord.Response
 */
export const AddRecord_Response = new AddRecord_Response$Type();
/**
 * @generated ServiceType for protobuf service logging.LoggingHandlers
 */
export const LoggingHandlers = new ServiceType("logging.LoggingHandlers", [
    { name: "ListRecords", options: {}, I: ListRecords_Request, O: ListRecords_Response },
    { name: "Record", options: {}, I: Record_Request, O: Record_Response },
    { name: "AddRecord", options: {}, I: AddRecord_Request, O: AddRecord_Response }
]);
