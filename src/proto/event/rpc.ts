// @generated from protobuf file "rpc.proto" (package "event", syntax proto3)
// tslint:disable
// @ts-nocheck
import { ServiceType } from "@protobuf-ts/runtime-rpc";
import { MessageType } from "@protobuf-ts/runtime";
import { Scheme } from "./message";
import { Project } from "./message";
import { Profile } from "./message";
import { Timestamp } from "../google/protobuf/timestamp";
import { Session } from "./message";
import { Type } from "./enum";
/**
 * rpc Events
 *
 * @generated from protobuf message event.Events
 */
export interface Events {
}
/**
 * @generated from protobuf message event.Events.Request
 */
export interface Events_Request {
    /**
     * @generated from protobuf field: bool is_admin = 1
     */
    is_admin: boolean; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string owner_id = 2
     */
    owner_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf oneof: related_id
     */
    related_id: {
        oneofKind: "profile_id";
        /**
         * @generated from protobuf field: string profile_id = 3
         */
        profile_id: string;
    } | {
        oneofKind: "project_id";
        /**
         * @generated from protobuf field: string project_id = 4
         */
        project_id: string;
    } | {
        oneofKind: "scheme_id";
        /**
         * @generated from protobuf field: string scheme_id = 5
         */
        scheme_id: string;
    } | {
        oneofKind: undefined;
    };
    /**
     * @generated from protobuf field: int32 limit = 6
     */
    limit: number;
    /**
     * @generated from protobuf field: int32 offset = 7
     */
    offset: number;
    /**
     * @generated from protobuf field: string sort_by = 8
     */
    sort_by: string; // @gotags: json:"-"
}
/**
 * @generated from protobuf message event.Events.Response
 */
export interface Events_Response {
    /**
     * @generated from protobuf field: int32 total = 1
     */
    total: number;
    /**
     * @generated from protobuf field: repeated event.Event.Response events = 2
     */
    events: Event_Response[];
}
/**
 * rpc Event
 *
 * @generated from protobuf message event.Event
 */
export interface Event {
}
/**
 * @generated from protobuf message event.Event.Request
 */
export interface Event_Request {
    /**
     * @generated from protobuf field: bool is_admin = 1
     */
    is_admin: boolean; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string owner_id = 2
     */
    owner_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf oneof: event_id
     */
    event_id: {
        oneofKind: "profile_id";
        /**
         * @generated from protobuf field: string profile_id = 3
         */
        profile_id: string;
    } | {
        oneofKind: "project_id";
        /**
         * @generated from protobuf field: string project_id = 4
         */
        project_id: string;
    } | {
        oneofKind: "scheme_id";
        /**
         * @generated from protobuf field: string scheme_id = 5
         */
        scheme_id: string;
    } | {
        oneofKind: undefined;
    };
    /**
     * @generated from protobuf field: string session_id = 6
     */
    session_id: string;
}
/**
 * @generated from protobuf message event.Event.Response
 */
export interface Event_Response {
    /**
     * @generated from protobuf field: string owner_id = 1
     */
    owner_id: string;
    /**
     * @generated from protobuf oneof: related_id
     */
    related_id: {
        oneofKind: "profile_id";
        /**
         * @generated from protobuf field: string profile_id = 2
         */
        profile_id: string;
    } | {
        oneofKind: "project_id";
        /**
         * @generated from protobuf field: string project_id = 3
         */
        project_id: string;
    } | {
        oneofKind: "scheme_id";
        /**
         * @generated from protobuf field: string scheme_id = 4
         */
        scheme_id: string;
    } | {
        oneofKind: undefined;
    };
    /**
     * @generated from protobuf field: int32 section = 5
     */
    section: number;
    /**
     * @generated from protobuf field: eventenum.Type type = 6
     */
    type: Type;
    /**
     * @generated from protobuf field: eventmessage.Session session = 7
     */
    session?: Session;
    /**
     * @generated from protobuf field: bytes meta_data = 8
     */
    meta_data: Uint8Array;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp created_at = 9
     */
    created_at?: Timestamp;
}
/**
 * rpc AddEvent
 *
 * @generated from protobuf message event.AddEvent
 */
export interface AddEvent {
}
/**
 * @generated from protobuf message event.AddEvent.Request
 */
export interface AddEvent_Request {
    /**
     * @generated from protobuf field: string owner_id = 1
     */
    owner_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf oneof: section
     */
    section: {
        oneofKind: "profile";
        /**
         * @generated from protobuf field: eventmessage.Profile profile = 2
         */
        profile: Profile;
    } | {
        oneofKind: "project";
        /**
         * @generated from protobuf field: eventmessage.Project project = 3
         */
        project: Project;
    } | {
        oneofKind: "scheme";
        /**
         * @generated from protobuf field: eventmessage.Scheme scheme = 4
         */
        scheme: Scheme;
    } | {
        oneofKind: undefined;
    };
    /**
     * @generated from protobuf field: eventenum.Type type = 5
     */
    type: Type;
    /**
     * @generated from protobuf field: eventmessage.Session session = 6
     */
    session?: Session;
    /**
     * @generated from protobuf field: bytes meta_data = 7
     */
    meta_data: Uint8Array;
}
/**
 * @generated from protobuf message event.AddEvent.Response
 */
export interface AddEvent_Response {
    /**
     * @generated from protobuf field: string record_id = 1
     */
    record_id: string;
}
// @generated message type with reflection information, may provide speed optimized methods
class Events$Type extends MessageType<Events> {
    constructor() {
        super("event.Events", []);
    }
}
/**
 * @generated MessageType for protobuf message event.Events
 */
export const Events = new Events$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Events_Request$Type extends MessageType<Events_Request> {
    constructor() {
        super("event.Events.Request", [
            { no: 1, name: "is_admin", kind: "scalar", localName: "is_admin", T: 8 /*ScalarType.BOOL*/ },
            { no: 2, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 3, name: "profile_id", kind: "scalar", localName: "profile_id", oneof: "related_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 4, name: "project_id", kind: "scalar", localName: "project_id", oneof: "related_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 5, name: "scheme_id", kind: "scalar", localName: "scheme_id", oneof: "related_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 6, name: "limit", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 7, name: "offset", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 8, name: "sort_by", kind: "scalar", localName: "sort_by", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message event.Events.Request
 */
export const Events_Request = new Events_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Events_Response$Type extends MessageType<Events_Response> {
    constructor() {
        super("event.Events.Response", [
            { no: 1, name: "total", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 2, name: "events", kind: "message", repeat: 2 /*RepeatType.UNPACKED*/, T: () => Event_Response }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message event.Events.Response
 */
export const Events_Response = new Events_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Event$Type extends MessageType<Event> {
    constructor() {
        super("event.Event", []);
    }
}
/**
 * @generated MessageType for protobuf message event.Event
 */
export const Event = new Event$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Event_Request$Type extends MessageType<Event_Request> {
    constructor() {
        super("event.Event.Request", [
            { no: 1, name: "is_admin", kind: "scalar", localName: "is_admin", T: 8 /*ScalarType.BOOL*/ },
            { no: 2, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 3, name: "profile_id", kind: "scalar", localName: "profile_id", oneof: "event_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 4, name: "project_id", kind: "scalar", localName: "project_id", oneof: "event_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 5, name: "scheme_id", kind: "scalar", localName: "scheme_id", oneof: "event_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 6, name: "session_id", kind: "scalar", localName: "session_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { ignore: "IGNORE_IF_ZERO_VALUE", string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message event.Event.Request
 */
export const Event_Request = new Event_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Event_Response$Type extends MessageType<Event_Response> {
    constructor() {
        super("event.Event.Response", [
            { no: 1, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "ghoster.secret": true } },
            { no: 2, name: "profile_id", kind: "scalar", localName: "profile_id", oneof: "related_id", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "project_id", kind: "scalar", localName: "project_id", oneof: "related_id", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "scheme_id", kind: "scalar", localName: "scheme_id", oneof: "related_id", T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "section", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 6, name: "type", kind: "enum", T: () => ["eventenum.Type", Type] },
            { no: 7, name: "session", kind: "message", T: () => Session },
            { no: 8, name: "meta_data", kind: "scalar", localName: "meta_data", T: 12 /*ScalarType.BYTES*/ },
            { no: 9, name: "created_at", kind: "message", localName: "created_at", T: () => Timestamp }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message event.Event.Response
 */
export const Event_Response = new Event_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddEvent$Type extends MessageType<AddEvent> {
    constructor() {
        super("event.AddEvent", []);
    }
}
/**
 * @generated MessageType for protobuf message event.AddEvent
 */
export const AddEvent = new AddEvent$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddEvent_Request$Type extends MessageType<AddEvent_Request> {
    constructor() {
        super("event.AddEvent.Request", [
            { no: 1, name: "owner_id", kind: "scalar", localName: "owner_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 2, name: "profile", kind: "message", oneof: "section", T: () => Profile },
            { no: 3, name: "project", kind: "message", oneof: "section", T: () => Project },
            { no: 4, name: "scheme", kind: "message", oneof: "section", T: () => Scheme },
            { no: 5, name: "type", kind: "enum", T: () => ["eventenum.Type", Type], options: { "buf.validate.field": { required: true, enum: { definedOnly: true } } } },
            { no: 6, name: "session", kind: "message", T: () => Session },
            { no: 7, name: "meta_data", kind: "scalar", localName: "meta_data", T: 12 /*ScalarType.BYTES*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message event.AddEvent.Request
 */
export const AddEvent_Request = new AddEvent_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddEvent_Response$Type extends MessageType<AddEvent_Response> {
    constructor() {
        super("event.AddEvent.Response", [
            { no: 1, name: "record_id", kind: "scalar", localName: "record_id", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message event.AddEvent.Response
 */
export const AddEvent_Response = new AddEvent_Response$Type();
/**
 * @generated ServiceType for protobuf service event.EventHandlers
 */
export const EventHandlers = new ServiceType("event.EventHandlers", [
    { name: "Events", options: {}, I: Events_Request, O: Events_Response },
    { name: "Event", options: {}, I: Event_Request, O: Event_Response },
    { name: "AddEvent", options: {}, I: AddEvent_Request, O: AddEvent_Response }
]);
