// @generated from protobuf file "message.proto" (package "eventmessage", syntax proto3)
// tslint:disable
// @ts-nocheck
import { MessageType } from "@protobuf-ts/runtime";
/**
 * session data
 *
 * @generated from protobuf message eventmessage.Session
 */
export interface Session {
    /**
     * @generated from protobuf field: string id = 1
     */
    id: string;
    /**
     * @generated from protobuf field: string user_agent = 2
     */
    user_agent: string;
    /**
     * @generated from protobuf field: string ip = 3
     */
    ip: string;
}
/**
 * section profile
 *
 * @generated from protobuf message eventmessage.Profile
 */
export interface Profile {
    /**
     * @generated from protobuf field: string id = 1
     */
    id: string;
    /**
     * @generated from protobuf field: eventmessage.Profile.Section section = 2
     */
    section: Profile_Section;
}
/**
 * @generated from protobuf enum eventmessage.Profile.Section
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
 * @generated from protobuf message eventmessage.Project
 */
export interface Project {
    /**
     * @generated from protobuf field: string id = 1
     */
    id: string;
    /**
     * @generated from protobuf field: eventmessage.Project.Section section = 2
     */
    section: Project_Section;
}
/**
 * @generated from protobuf enum eventmessage.Project.Section
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
 * section scheme
 *
 * @generated from protobuf message eventmessage.Scheme
 */
export interface Scheme {
    /**
     * @generated from protobuf field: string id = 1
     */
    id: string;
    /**
     * @generated from protobuf field: eventmessage.Scheme.Section section = 2
     */
    section: Scheme_Section;
}
/**
 * @generated from protobuf enum eventmessage.Scheme.Section
 */
export enum Scheme_Section {
    /**
     * @generated from protobuf enum value: section_unspecified = 0;
     */
    section_unspecified = 0,
    /**
     * @generated from protobuf enum value: scheme = 1;
     */
    scheme = 1,
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
// @generated message type with reflection information, may provide speed optimized methods
class Session$Type extends MessageType<Session> {
    constructor() {
        super("eventmessage.Session", [
            { no: 1, name: "id", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 2, name: "user_agent", kind: "scalar", localName: "user_agent", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "ip", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { ip: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message eventmessage.Session
 */
export const Session = new Session$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Profile$Type extends MessageType<Profile> {
    constructor() {
        super("eventmessage.Profile", [
            { no: 1, name: "id", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 2, name: "section", kind: "enum", T: () => ["eventmessage.Profile.Section", Profile_Section], options: { "buf.validate.field": { required: true, enum: { definedOnly: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message eventmessage.Profile
 */
export const Profile = new Profile$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Project$Type extends MessageType<Project> {
    constructor() {
        super("eventmessage.Project", [
            { no: 1, name: "id", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 2, name: "section", kind: "enum", T: () => ["eventmessage.Project.Section", Project_Section], options: { "buf.validate.field": { required: true, enum: { definedOnly: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message eventmessage.Project
 */
export const Project = new Project$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Scheme$Type extends MessageType<Scheme> {
    constructor() {
        super("eventmessage.Scheme", [
            { no: 1, name: "id", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 2, name: "section", kind: "enum", T: () => ["eventmessage.Scheme.Section", Scheme_Section], options: { "buf.validate.field": { required: true, enum: { definedOnly: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message eventmessage.Scheme
 */
export const Scheme = new Scheme$Type();
