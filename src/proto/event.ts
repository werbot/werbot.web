// @generated from protobuf file "event.proto" (package "event", syntax proto3)
// tslint:disable
// @ts-nocheck
import { ServiceType } from "@protobuf-ts/runtime-rpc";
import { MessageType } from "@protobuf-ts/runtime";
import { Timestamp } from "./google/protobuf/timestamp";
/**
 * section profile
 *
 * @generated from protobuf message event.Profile
 */
export interface Profile {
    /**
     * @generated from protobuf field: string id = 1;
     */
    id: string;
    /**
     * @generated from protobuf field: event.Profile.Section section = 2;
     */
    section: Profile_Section;
}
/**
 * @generated from protobuf enum event.Profile.Section
 */
export enum Profile_Section {
    /**
     * @generated from protobuf enum value: section_unspecified = 0;
     */
    section_unspecified = 0,
    /**
     * @generated from protobuf enum value: profile = 1;
     */
    profile = 1,
    /**
     * @generated from protobuf enum value: setting = 2;
     */
    setting = 2,
    /**
     * @generated from protobuf enum value: password = 3;
     */
    password = 3,
    /**
     * @generated from protobuf enum value: ssh_key = 4;
     */
    ssh_key = 4,
    /**
     * @generated from protobuf enum value: license = 5;
     */
    license = 5,
    /**
     * @generated from protobuf enum value: project = 6;
     */
    project = 6
}
/**
 * section project
 *
 * @generated from protobuf message event.Project
 */
export interface Project {
    /**
     * @generated from protobuf field: string id = 1;
     */
    id: string;
    /**
     * @generated from protobuf field: event.Project.Section section = 2;
     */
    section: Project_Section;
}
/**
 * @generated from protobuf enum event.Project.Section
 */
export enum Project_Section {
    /**
     * @generated from protobuf enum value: section_unspecified = 0;
     */
    section_unspecified = 0,
    /**
     * @generated from protobuf enum value: project = 1;
     */
    project = 1,
    /**
     * @generated from protobuf enum value: setting = 2;
     */
    setting = 2,
    /**
     * @generated from protobuf enum value: member = 3;
     */
    member = 3,
    /**
     * @generated from protobuf enum value: team = 4;
     */
    team = 4,
    /**
     * @generated from protobuf enum value: server = 10;
     */
    server = 10,
    /**
     * @generated from protobuf enum value: database = 11;
     */
    database = 11,
    /**
     * @generated from protobuf enum value: application = 12;
     */
    application = 12,
    /**
     * @generated from protobuf enum value: desktop = 13;
     */
    desktop = 13,
    /**
     * @generated from protobuf enum value: container = 14;
     */
    container = 14,
    /**
     * @generated from protobuf enum value: cloud = 15;
     */
    cloud = 15
}
/**
 * section server
 *
 * @generated from protobuf message event.Server
 */
export interface Server {
    /**
     * @generated from protobuf field: string id = 1;
     */
    id: string;
    /**
     * @generated from protobuf field: event.Server.Section section = 2;
     */
    section: Server_Section;
}
/**
 * @generated from protobuf enum event.Server.Section
 */
export enum Server_Section {
    /**
     * @generated from protobuf enum value: section_unspecified = 0;
     */
    section_unspecified = 0,
    /**
     * @generated from protobuf enum value: server = 1;
     */
    server = 1,
    /**
     * @generated from protobuf enum value: member = 2;
     */
    member = 2,
    /**
     * @generated from protobuf enum value: activity = 3;
     */
    activity = 3,
    /**
     * @generated from protobuf enum value: firewall = 4;
     */
    firewall = 4,
    /**
     * @generated from protobuf enum value: setting = 5;
     */
    setting = 5
}
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
     * @generated from protobuf oneof: id
     */
    id: {
        oneofKind: "profile_id";
        /**
         * @generated from protobuf field: string profile_id = 1;
         */
        profile_id: string;
    } | {
        oneofKind: "project_id";
        /**
         * @generated from protobuf field: string project_id = 2;
         */
        project_id: string;
    } | {
        oneofKind: "server_id";
        /**
         * @generated from protobuf field: string server_id = 3;
         */
        server_id: string;
    } | {
        oneofKind: undefined;
    };
    /**
     * @generated from protobuf field: string user_id = 4;
     */
    user_id: string;
    /**
     * @generated from protobuf field: int32 limit = 5;
     */
    limit: number;
    /**
     * @generated from protobuf field: int32 offset = 6;
     */
    offset: number;
    /**
     * @generated from protobuf field: string sort_by = 7;
     */
    sort_by: string;
}
/**
 * @generated from protobuf message event.Events.Response
 */
export interface Events_Response {
    /**
     * @generated from protobuf field: int32 total = 1;
     */
    total: number;
    /**
     * @generated from protobuf field: repeated event.Event.Response records = 2;
     */
    records: Event_Response[];
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
     * @generated from protobuf oneof: id
     */
    id: {
        oneofKind: "profile_id";
        /**
         * @generated from protobuf field: string profile_id = 1;
         */
        profile_id: string;
    } | {
        oneofKind: "project_id";
        /**
         * @generated from protobuf field: string project_id = 2;
         */
        project_id: string;
    } | {
        oneofKind: "server_id";
        /**
         * @generated from protobuf field: string server_id = 3;
         */
        server_id: string;
    } | {
        oneofKind: undefined;
    };
    /**
     * @generated from protobuf field: string user_id = 4;
     */
    user_id: string;
}
/**
 * @generated from protobuf message event.Event.Response
 */
export interface Event_Response {
    /**
     * @generated from protobuf field: string id = 1;
     */
    id: string; // profile_id, project_id, server_id
    /**
     * @generated from protobuf field: string user_id = 2;
     */
    user_id: string;
    /**
     * @generated from protobuf field: string user_agent = 3;
     */
    user_agent: string;
    /**
     * @generated from protobuf field: string ip = 4;
     */
    ip: string;
    /**
     * @generated from protobuf field: event.EventType event = 5;
     */
    event: EventType;
    /**
     * @generated from protobuf field: int32 section = 6;
     */
    section: number;
    /**
     * @generated from protobuf field: bytes meta_data = 7;
     */
    meta_data: Uint8Array;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp created_at = 8;
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
     * @generated from protobuf oneof: section
     */
    section: {
        oneofKind: "profile";
        /**
         * @generated from protobuf field: event.Profile profile = 1;
         */
        profile: Profile;
    } | {
        oneofKind: "project";
        /**
         * @generated from protobuf field: event.Project project = 2;
         */
        project: Project;
    } | {
        oneofKind: "server";
        /**
         * @generated from protobuf field: event.Server server = 3;
         */
        server: Server;
    } | {
        oneofKind: undefined;
    };
    /**
     * @generated from protobuf field: string user_id = 4;
     */
    user_id: string;
    /**
     * @generated from protobuf field: string user_agent = 5;
     */
    user_agent: string;
    /**
     * @generated from protobuf field: string ip = 6;
     */
    ip: string;
    /**
     * @generated from protobuf field: event.EventType event = 7;
     */
    event: EventType;
    /**
     * @generated from protobuf field: bytes meta_data = 8;
     */
    meta_data: Uint8Array;
}
/**
 * @generated from protobuf message event.AddEvent.Response
 */
export interface AddEvent_Response {
    /**
     * @generated from protobuf field: string record_id = 1;
     */
    record_id: string;
}
/**
 * @generated from protobuf enum event.EventType
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
    onChange = 8,
    /**
     * @generated from protobuf enum value: onLogin = 9;
     */
    onLogin = 9,
    /**
     * @generated from protobuf enum value: onLogoff = 10;
     */
    onLogoff = 10
}
// @generated message type with reflection information, may provide speed optimized methods
class Profile$Type extends MessageType<Profile> {
    constructor() {
        super("event.Profile", [
            { no: 1, name: "id", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 2, name: "section", kind: "enum", T: () => ["event.Profile.Section", Profile_Section], options: { "buf.validate.field": { enum: { definedOnly: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message event.Profile
 */
export const Profile = new Profile$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Project$Type extends MessageType<Project> {
    constructor() {
        super("event.Project", [
            { no: 1, name: "id", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 2, name: "section", kind: "enum", T: () => ["event.Project.Section", Project_Section], options: { "buf.validate.field": { enum: { definedOnly: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message event.Project
 */
export const Project = new Project$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Server$Type extends MessageType<Server> {
    constructor() {
        super("event.Server", [
            { no: 1, name: "id", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 2, name: "section", kind: "enum", T: () => ["event.Server.Section", Server_Section], options: { "buf.validate.field": { enum: { definedOnly: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message event.Server
 */
export const Server = new Server$Type();
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
            { no: 1, name: "profile_id", kind: "scalar", localName: "profile_id", oneof: "id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 2, name: "project_id", kind: "scalar", localName: "project_id", oneof: "id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 3, name: "server_id", kind: "scalar", localName: "server_id", oneof: "id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 4, name: "user_id", kind: "scalar", localName: "user_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true }, ignoreEmpty: true } } },
            { no: 5, name: "limit", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 6, name: "offset", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 7, name: "sort_by", kind: "scalar", localName: "sort_by", T: 9 /*ScalarType.STRING*/ }
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
            { no: 2, name: "records", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Event_Response }
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
            { no: 1, name: "profile_id", kind: "scalar", localName: "profile_id", oneof: "id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 2, name: "project_id", kind: "scalar", localName: "project_id", oneof: "id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 3, name: "server_id", kind: "scalar", localName: "server_id", oneof: "id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 4, name: "user_id", kind: "scalar", localName: "user_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true }, ignoreEmpty: true } } }
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
            { no: 1, name: "id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "user_id", kind: "scalar", localName: "user_id", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "user_agent", kind: "scalar", localName: "user_agent", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "ip", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "event", kind: "enum", T: () => ["event.EventType", EventType] },
            { no: 6, name: "section", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 7, name: "meta_data", kind: "scalar", localName: "meta_data", T: 12 /*ScalarType.BYTES*/ },
            { no: 8, name: "created_at", kind: "message", localName: "created_at", T: () => Timestamp }
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
            { no: 1, name: "profile", kind: "message", oneof: "section", T: () => Profile },
            { no: 2, name: "project", kind: "message", oneof: "section", T: () => Project },
            { no: 3, name: "server", kind: "message", oneof: "section", T: () => Server },
            { no: 4, name: "user_id", kind: "scalar", localName: "user_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true }, ignoreEmpty: true } } },
            { no: 5, name: "user_agent", kind: "scalar", localName: "user_agent", T: 9 /*ScalarType.STRING*/ },
            { no: 6, name: "ip", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { ip: true } } } },
            { no: 7, name: "event", kind: "enum", T: () => ["event.EventType", EventType], options: { "buf.validate.field": { enum: { definedOnly: true } } } },
            { no: 8, name: "meta_data", kind: "scalar", localName: "meta_data", T: 12 /*ScalarType.BYTES*/ }
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
