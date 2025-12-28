// @generated from protobuf file "profile.proto" (package "profile", syntax proto3)
// tslint:disable
// @ts-nocheck
import { ServiceType } from "@protobuf-ts/runtime-rpc";
import { MessageType } from "@protobuf-ts/runtime";
import { Timestamp } from "./google/protobuf/timestamp";
/**
 * @generated from protobuf message profile.ProfileParameters
 */
export interface ProfileParameters {
    /**
     * @generated from protobuf field: string profile_id = 1
     */
    profile_id: string;
    /**
     * @generated from protobuf field: string name = 2
     */
    name: string;
    /**
     * @generated from protobuf field: profile.Role roles = 3
     */
    roles: Role;
    /**
     * @generated from protobuf field: string session_id = 4
     */
    session_id: string;
}
/**
 * rpc SignIn
 *
 * @generated from protobuf message profile.SignIn
 */
export interface SignIn {
}
/**
 * @generated from protobuf message profile.SignIn.Request
 */
export interface SignIn_Request {
    /**
     * @generated from protobuf field: string email = 1
     */
    email: string;
    /**
     * @generated from protobuf field: string password = 2
     */
    password: string;
}
/**
 * @generated from protobuf message profile.SignIn.Response
 */
export interface SignIn_Response {
}
/**
 * rpc Token
 *
 * @generated from protobuf message profile.Token
 */
export interface Token {
}
/**
 * @generated from protobuf message profile.Token.Request
 */
export interface Token_Request {
    /**
     * @generated from protobuf field: string refresh = 1
     */
    refresh: string;
}
/**
 * @generated from protobuf message profile.Token.Response
 */
export interface Token_Response {
    /**
     * @generated from protobuf field: string access = 1
     */
    access: string; // @gotags: json:"access_token,omitempty"
    /**
     * @generated from protobuf field: string refresh = 2
     */
    refresh: string; // @gotags: json:"refresh_token,omitempty"
}
/**
 * rpc ResetPassword
 *
 * @generated from protobuf message profile.ResetPassword
 */
export interface ResetPassword {
}
/**
 * @generated from protobuf message profile.ResetPassword.Request
 */
export interface ResetPassword_Request {
    /**
     * @generated from protobuf oneof: request
     */
    request: {
        oneofKind: "email";
        /**
         * @generated from protobuf field: string email = 1
         */
        email: string;
    } | {
        oneofKind: "token";
        /**
         * @generated from protobuf field: string token = 2
         */
        token: string;
    } | {
        oneofKind: "password";
        /**
         * @generated from protobuf field: profile.ResetPassword.Password password = 3
         */
        password: ResetPassword_Password;
    } | {
        oneofKind: undefined;
    };
}
/**
 * @generated from protobuf message profile.ResetPassword.Response
 */
export interface ResetPassword_Response {
    /**
     * @generated from protobuf field: string profile_id = 1
     */
    profile_id: string;
}
/**
 * @generated from protobuf message profile.ResetPassword.Password
 */
export interface ResetPassword_Password {
    /**
     * @generated from protobuf field: string password = 1
     */
    password: string;
    /**
     * @generated from protobuf field: string token = 2
     */
    token: string;
}
/**
 * rpc Profiles
 *
 * @generated from protobuf message profile.Profiles
 */
export interface Profiles {
}
/**
 * @generated from protobuf message profile.Profiles.Request
 */
export interface Profiles_Request {
    /**
     * @generated from protobuf field: bool is_admin = 1
     */
    is_admin: boolean; // @gotags: json:"-"
    /**
     * @generated from protobuf field: int32 limit = 4
     */
    limit: number;
    /**
     * @generated from protobuf field: int32 offset = 5
     */
    offset: number;
    /**
     * @generated from protobuf field: string sort_by = 6
     */
    sort_by: string; // @gotags: json:"-"
}
/**
 * @generated from protobuf message profile.Profiles.Response
 */
export interface Profiles_Response {
    /**
     * @generated from protobuf field: int32 total = 1
     */
    total: number;
    /**
     * @generated from protobuf field: repeated profile.Profile.Response profiles = 2
     */
    profiles: Profile_Response[];
}
/**
 * rpc Profile
 *
 * @generated from protobuf message profile.Profile
 */
export interface Profile {
}
/**
 * @generated from protobuf message profile.Profile.Request
 */
export interface Profile_Request {
    /**
     * @generated from protobuf field: bool is_admin = 1
     */
    is_admin: boolean; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string profile_id = 2
     */
    profile_id: string; // @gotags: json:"-"
}
/**
 * @generated from protobuf message profile.Profile.Response
 */
export interface Profile_Response {
    /**
     * @generated from protobuf field: string profile_id = 1
     */
    profile_id: string;
    /**
     * @generated from protobuf field: string alias = 2
     */
    alias: string;
    /**
     * @generated from protobuf field: string name = 3
     */
    name: string;
    /**
     * @generated from protobuf field: string surname = 4
     */
    surname: string;
    /**
     * @generated from protobuf field: string email = 5
     */
    email: string;
    /**
     * @generated from protobuf field: bool active = 6
     */
    active: boolean;
    /**
     * @generated from protobuf field: bool confirmed = 7
     */
    confirmed: boolean;
    /**
     * @generated from protobuf field: profile.Role role = 8
     */
    role: Role;
    /**
     * @generated from protobuf field: string password = 9
     */
    password: string;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp locked_at = 10
     */
    locked_at?: Timestamp;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp archived_at = 11
     */
    archived_at?: Timestamp;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp updated_at = 12
     */
    updated_at?: Timestamp;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp created_at = 13
     */
    created_at?: Timestamp;
    /**
     * @generated from protobuf field: int32 schemes_count = 50
     */
    schemes_count: number;
    /**
     * @generated from protobuf field: int32 projects_count = 51
     */
    projects_count: number;
    /**
     * @generated from protobuf field: int32 keys_count = 52
     */
    keys_count: number;
}
/**
 * rpc AddProfile
 *
 * @generated from protobuf message profile.AddProfile
 */
export interface AddProfile {
}
/**
 * @generated from protobuf message profile.AddProfile.Request
 */
export interface AddProfile_Request {
    /**
     * @generated from protobuf field: bool is_admin = 1
     */
    is_admin: boolean; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string alias = 2
     */
    alias: string;
    /**
     * @generated from protobuf field: string email = 3
     */
    email: string;
    /**
     * @generated from protobuf field: string name = 4
     */
    name: string;
    /**
     * @generated from protobuf field: string surname = 5
     */
    surname: string;
    /**
     * @generated from protobuf field: bool active = 6
     */
    active: boolean;
    /**
     * @generated from protobuf field: bool confirmed = 7
     */
    confirmed: boolean;
    /**
     * @generated from protobuf field: string password = 8
     */
    password: string;
}
/**
 * @generated from protobuf message profile.AddProfile.Response
 */
export interface AddProfile_Response {
    /**
     * @generated from protobuf field: string profile_id = 1
     */
    profile_id: string;
}
/**
 * rpc UpdateProfile
 *
 * @generated from protobuf message profile.UpdateProfile
 */
export interface UpdateProfile {
}
/**
 * @generated from protobuf message profile.UpdateProfile.Request
 */
export interface UpdateProfile_Request {
    /**
     * @generated from protobuf field: bool is_admin = 1
     */
    is_admin: boolean; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string profile_id = 2
     */
    profile_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf oneof: setting
     */
    setting: {
        oneofKind: "name";
        /**
         * @generated from protobuf field: string name = 3
         */
        name: string;
    } | {
        oneofKind: "surname";
        /**
         * @generated from protobuf field: string surname = 4
         */
        surname: string;
    } | {
        oneofKind: "alias";
        /**
         * use only for admin
         *
         * @generated from protobuf field: string alias = 5
         */
        alias: string;
    } | {
        oneofKind: "email";
        /**
         * @generated from protobuf field: string email = 6
         */
        email: string;
    } | {
        oneofKind: "active";
        /**
         * @generated from protobuf field: bool active = 7
         */
        active: boolean;
    } | {
        oneofKind: "confirmed";
        /**
         * @generated from protobuf field: bool confirmed = 8
         */
        confirmed: boolean;
    } | {
        oneofKind: "archived";
        /**
         * @generated from protobuf field: bool archived = 9
         */
        archived: boolean;
    } | {
        oneofKind: undefined;
    };
}
/**
 * @generated from protobuf message profile.UpdateProfile.Response
 */
export interface UpdateProfile_Response {
}
/**
 * rpc DeleteProfile
 *
 * @generated from protobuf message profile.DeleteProfile
 */
export interface DeleteProfile {
}
/**
 * @generated from protobuf message profile.DeleteProfile.Request
 */
export interface DeleteProfile_Request {
    /**
     * @generated from protobuf field: string profile_id = 1
     */
    profile_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf oneof: request
     */
    request: {
        oneofKind: "password";
        /**
         * @generated from protobuf field: string password = 2
         */
        password: string;
    } | {
        oneofKind: "token";
        /**
         * @generated from protobuf field: string token = 3
         */
        token: string;
    } | {
        oneofKind: undefined;
    };
}
/**
 * @generated from protobuf message profile.DeleteProfile.Response
 */
export interface DeleteProfile_Response {
}
/**
 * rpc UpdatePassword
 *
 * @generated from protobuf message profile.UpdatePassword
 */
export interface UpdatePassword {
}
/**
 * @generated from protobuf message profile.UpdatePassword.Request
 */
export interface UpdatePassword_Request {
    /**
     * @generated from protobuf field: string profile_id = 1
     */
    profile_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string old_password = 2
     */
    old_password: string;
    /**
     * @generated from protobuf field: string new_password = 3
     */
    new_password: string;
}
/**
 * @generated from protobuf message profile.UpdatePassword.Response
 */
export interface UpdatePassword_Response {
    /**
     * @generated from protobuf field: string message = 1
     */
    message: string;
}
/**
 * rpc ProfileIDByLogin
 *
 * @generated from protobuf message profile.ProfileIDByLogin
 */
export interface ProfileIDByLogin {
}
/**
 * @generated from protobuf message profile.ProfileIDByLogin.Request
 */
export interface ProfileIDByLogin_Request {
    /**
     * @generated from protobuf field: string login = 1
     */
    login: string;
    /**
     * @generated from protobuf field: string fingerprint = 2
     */
    fingerprint: string;
    /**
     * @generated from protobuf field: string client_ip = 3
     */
    client_ip: string;
}
/**
 * @generated from protobuf message profile.ProfileIDByLogin.Response
 */
export interface ProfileIDByLogin_Response {
    /**
     * @generated from protobuf field: string profile_id = 1
     */
    profile_id: string;
}
/**
 * rpc ProfileByEmail
 *
 * @generated from protobuf message profile.ProfileByEmail
 */
export interface ProfileByEmail {
}
/**
 * @generated from protobuf message profile.ProfileByEmail.Request
 */
export interface ProfileByEmail_Request {
    /**
     * @generated from protobuf field: string email = 1
     */
    email: string;
}
/**
 * @generated from protobuf message profile.ProfileByEmail.Response
 */
export interface ProfileByEmail_Response {
}
/**
 * rpc UpdateStatus
 *
 * @generated from protobuf message profile.UpdateStatus
 */
export interface UpdateStatus {
}
/**
 * @generated from protobuf message profile.UpdateStatus.Request
 */
export interface UpdateStatus_Request {
    /**
     * @generated from protobuf field: string account_id = 1
     */
    account_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: profile.Status status = 2
     */
    status: Status;
}
/**
 * @generated from protobuf message profile.UpdateStatus.Response
 */
export interface UpdateStatus_Response {
}
/**
 * @generated from protobuf enum profile.Role
 */
export enum Role {
    /**
     * @generated from protobuf enum value: role_unspecified = 0;
     */
    role_unspecified = 0,
    /**
     * @generated from protobuf enum value: user = 1;
     */
    user = 1,
    /**
     * @generated from protobuf enum value: manager = 2;
     */
    manager = 2,
    /**
     * @generated from protobuf enum value: admin = 3;
     */
    admin = 3
}
/**
 * @generated from protobuf enum profile.Status
 */
export enum Status {
    /**
     * @generated from protobuf enum value: unspecified = 0;
     */
    unspecified = 0,
    /**
     * @generated from protobuf enum value: offline = 1;
     */
    offline = 1,
    /**
     * @generated from protobuf enum value: online = 2;
     */
    online = 2
}
// @generated message type with reflection information, may provide speed optimized methods
class ProfileParameters$Type extends MessageType<ProfileParameters> {
    constructor() {
        super("profile.ProfileParameters", [
            { no: 1, name: "profile_id", kind: "scalar", localName: "profile_id", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "roles", kind: "enum", T: () => ["profile.Role", Role] },
            { no: 4, name: "session_id", kind: "scalar", localName: "session_id", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message profile.ProfileParameters
 */
export const ProfileParameters = new ProfileParameters$Type();
// @generated message type with reflection information, may provide speed optimized methods
class SignIn$Type extends MessageType<SignIn> {
    constructor() {
        super("profile.SignIn", []);
    }
}
/**
 * @generated MessageType for protobuf message profile.SignIn
 */
export const SignIn = new SignIn$Type();
// @generated message type with reflection information, may provide speed optimized methods
class SignIn_Request$Type extends MessageType<SignIn_Request> {
    constructor() {
        super("profile.SignIn.Request", [
            { no: 1, name: "email", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { cel: [{ id: "request.email", message: "value must be a valid email address", expression: "this.isEmail()" }], required: true } } },
            { no: 2, name: "password", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { minLen: "8", maxLen: "32" } }, "ghoster.secret": true } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message profile.SignIn.Request
 */
export const SignIn_Request = new SignIn_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class SignIn_Response$Type extends MessageType<SignIn_Response> {
    constructor() {
        super("profile.SignIn.Response", []);
    }
}
/**
 * @generated MessageType for protobuf message profile.SignIn.Response
 */
export const SignIn_Response = new SignIn_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Token$Type extends MessageType<Token> {
    constructor() {
        super("profile.Token", []);
    }
}
/**
 * @generated MessageType for protobuf message profile.Token
 */
export const Token = new Token$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Token_Request$Type extends MessageType<Token_Request> {
    constructor() {
        super("profile.Token.Request", [
            { no: 1, name: "refresh", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message profile.Token.Request
 */
export const Token_Request = new Token_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Token_Response$Type extends MessageType<Token_Response> {
    constructor() {
        super("profile.Token.Response", [
            { no: 1, name: "access", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "refresh", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message profile.Token.Response
 */
export const Token_Response = new Token_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ResetPassword$Type extends MessageType<ResetPassword> {
    constructor() {
        super("profile.ResetPassword", []);
    }
}
/**
 * @generated MessageType for protobuf message profile.ResetPassword
 */
export const ResetPassword = new ResetPassword$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ResetPassword_Request$Type extends MessageType<ResetPassword_Request> {
    constructor() {
        super("profile.ResetPassword.Request", [
            { no: 1, name: "email", kind: "scalar", oneof: "request", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { cel: [{ id: "valid_email", message: "must be a valid email", expression: "this.isEmail()" }] } } },
            { no: 2, name: "token", kind: "scalar", oneof: "request", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 3, name: "password", kind: "message", oneof: "request", T: () => ResetPassword_Password }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message profile.ResetPassword.Request
 */
export const ResetPassword_Request = new ResetPassword_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ResetPassword_Response$Type extends MessageType<ResetPassword_Response> {
    constructor() {
        super("profile.ResetPassword.Response", [
            { no: 1, name: "profile_id", kind: "scalar", localName: "profile_id", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message profile.ResetPassword.Response
 */
export const ResetPassword_Response = new ResetPassword_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ResetPassword_Password$Type extends MessageType<ResetPassword_Password> {
    constructor() {
        super("profile.ResetPassword.Password", [
            { no: 1, name: "password", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { minLen: "8", maxLen: "32" } }, "ghoster.secret": true } },
            { no: 2, name: "token", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message profile.ResetPassword.Password
 */
export const ResetPassword_Password = new ResetPassword_Password$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Profiles$Type extends MessageType<Profiles> {
    constructor() {
        super("profile.Profiles", []);
    }
}
/**
 * @generated MessageType for protobuf message profile.Profiles
 */
export const Profiles = new Profiles$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Profiles_Request$Type extends MessageType<Profiles_Request> {
    constructor() {
        super("profile.Profiles.Request", [
            { no: 1, name: "is_admin", kind: "scalar", localName: "is_admin", T: 8 /*ScalarType.BOOL*/ },
            { no: 4, name: "limit", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 5, name: "offset", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 6, name: "sort_by", kind: "scalar", localName: "sort_by", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message profile.Profiles.Request
 */
export const Profiles_Request = new Profiles_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Profiles_Response$Type extends MessageType<Profiles_Response> {
    constructor() {
        super("profile.Profiles.Response", [
            { no: 1, name: "total", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 2, name: "profiles", kind: "message", repeat: 2 /*RepeatType.UNPACKED*/, T: () => Profile_Response }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message profile.Profiles.Response
 */
export const Profiles_Response = new Profiles_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Profile$Type extends MessageType<Profile> {
    constructor() {
        super("profile.Profile", []);
    }
}
/**
 * @generated MessageType for protobuf message profile.Profile
 */
export const Profile = new Profile$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Profile_Request$Type extends MessageType<Profile_Request> {
    constructor() {
        super("profile.Profile.Request", [
            { no: 1, name: "is_admin", kind: "scalar", localName: "is_admin", T: 8 /*ScalarType.BOOL*/ },
            { no: 2, name: "profile_id", kind: "scalar", localName: "profile_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message profile.Profile.Request
 */
export const Profile_Request = new Profile_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Profile_Response$Type extends MessageType<Profile_Response> {
    constructor() {
        super("profile.Profile.Response", [
            { no: 1, name: "profile_id", kind: "scalar", localName: "profile_id", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "alias", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "surname", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "email", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 6, name: "active", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 7, name: "confirmed", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 8, name: "role", kind: "enum", T: () => ["profile.Role", Role], options: { "ghoster.secret": true } },
            { no: 9, name: "password", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "ghoster.secret": true } },
            { no: 10, name: "locked_at", kind: "message", localName: "locked_at", T: () => Timestamp, options: { "ghoster.secret": true } },
            { no: 11, name: "archived_at", kind: "message", localName: "archived_at", T: () => Timestamp, options: { "ghoster.secret": true } },
            { no: 12, name: "updated_at", kind: "message", localName: "updated_at", T: () => Timestamp, options: { "ghoster.secret": true } },
            { no: 13, name: "created_at", kind: "message", localName: "created_at", T: () => Timestamp },
            { no: 50, name: "schemes_count", kind: "scalar", localName: "schemes_count", T: 5 /*ScalarType.INT32*/ },
            { no: 51, name: "projects_count", kind: "scalar", localName: "projects_count", T: 5 /*ScalarType.INT32*/ },
            { no: 52, name: "keys_count", kind: "scalar", localName: "keys_count", T: 5 /*ScalarType.INT32*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message profile.Profile.Response
 */
export const Profile_Response = new Profile_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddProfile$Type extends MessageType<AddProfile> {
    constructor() {
        super("profile.AddProfile", []);
    }
}
/**
 * @generated MessageType for protobuf message profile.AddProfile
 */
export const AddProfile = new AddProfile$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddProfile_Request$Type extends MessageType<AddProfile_Request> {
    constructor() {
        super("profile.AddProfile.Request", [
            { no: 1, name: "is_admin", kind: "scalar", localName: "is_admin", T: 8 /*ScalarType.BOOL*/ },
            { no: 2, name: "alias", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { minLen: "3", maxLen: "32", pattern: "^[a-z0-9]+$" } } } },
            { no: 3, name: "email", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { cel: [{ id: "valid_email", message: "must be a valid email", expression: "this.isEmail()" }], required: true } } },
            { no: 4, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { minLen: "3", maxLen: "32" } } } },
            { no: 5, name: "surname", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { minLen: "3", maxLen: "32" } } } },
            { no: 6, name: "active", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 7, name: "confirmed", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 8, name: "password", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { minLen: "8", maxLen: "32" } }, "ghoster.secret": true } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message profile.AddProfile.Request
 */
export const AddProfile_Request = new AddProfile_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddProfile_Response$Type extends MessageType<AddProfile_Response> {
    constructor() {
        super("profile.AddProfile.Response", [
            { no: 1, name: "profile_id", kind: "scalar", localName: "profile_id", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message profile.AddProfile.Response
 */
export const AddProfile_Response = new AddProfile_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateProfile$Type extends MessageType<UpdateProfile> {
    constructor() {
        super("profile.UpdateProfile", []);
    }
}
/**
 * @generated MessageType for protobuf message profile.UpdateProfile
 */
export const UpdateProfile = new UpdateProfile$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateProfile_Request$Type extends MessageType<UpdateProfile_Request> {
    constructor() {
        super("profile.UpdateProfile.Request", [
            { no: 1, name: "is_admin", kind: "scalar", localName: "is_admin", T: 8 /*ScalarType.BOOL*/ },
            { no: 2, name: "profile_id", kind: "scalar", localName: "profile_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 3, name: "name", kind: "scalar", oneof: "setting", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { minLen: "3", maxLen: "32" } } } },
            { no: 4, name: "surname", kind: "scalar", oneof: "setting", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { minLen: "3", maxLen: "32" } } } },
            { no: 5, name: "alias", kind: "scalar", oneof: "setting", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { ignore: "IGNORE_IF_ZERO_VALUE", string: { minLen: "3", maxLen: "32", pattern: "^[a-z0-9]+$" } } } },
            { no: 6, name: "email", kind: "scalar", oneof: "setting", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { cel: [{ id: "valid_email", message: "must be a valid email", expression: "this.isEmail()" }] } } },
            { no: 7, name: "active", kind: "scalar", oneof: "setting", T: 8 /*ScalarType.BOOL*/ },
            { no: 8, name: "confirmed", kind: "scalar", oneof: "setting", T: 8 /*ScalarType.BOOL*/ },
            { no: 9, name: "archived", kind: "scalar", oneof: "setting", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message profile.UpdateProfile.Request
 */
export const UpdateProfile_Request = new UpdateProfile_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateProfile_Response$Type extends MessageType<UpdateProfile_Response> {
    constructor() {
        super("profile.UpdateProfile.Response", []);
    }
}
/**
 * @generated MessageType for protobuf message profile.UpdateProfile.Response
 */
export const UpdateProfile_Response = new UpdateProfile_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DeleteProfile$Type extends MessageType<DeleteProfile> {
    constructor() {
        super("profile.DeleteProfile", []);
    }
}
/**
 * @generated MessageType for protobuf message profile.DeleteProfile
 */
export const DeleteProfile = new DeleteProfile$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DeleteProfile_Request$Type extends MessageType<DeleteProfile_Request> {
    constructor() {
        super("profile.DeleteProfile.Request", [
            { no: 1, name: "profile_id", kind: "scalar", localName: "profile_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 2, name: "password", kind: "scalar", oneof: "request", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { minLen: "8", maxLen: "32" } }, "ghoster.secret": true } },
            { no: 3, name: "token", kind: "scalar", oneof: "request", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { ignore: "IGNORE_IF_ZERO_VALUE", string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message profile.DeleteProfile.Request
 */
export const DeleteProfile_Request = new DeleteProfile_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DeleteProfile_Response$Type extends MessageType<DeleteProfile_Response> {
    constructor() {
        super("profile.DeleteProfile.Response", []);
    }
}
/**
 * @generated MessageType for protobuf message profile.DeleteProfile.Response
 */
export const DeleteProfile_Response = new DeleteProfile_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdatePassword$Type extends MessageType<UpdatePassword> {
    constructor() {
        super("profile.UpdatePassword", []);
    }
}
/**
 * @generated MessageType for protobuf message profile.UpdatePassword
 */
export const UpdatePassword = new UpdatePassword$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdatePassword_Request$Type extends MessageType<UpdatePassword_Request> {
    constructor() {
        super("profile.UpdatePassword.Request", [
            { no: 1, name: "profile_id", kind: "scalar", localName: "profile_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 2, name: "old_password", kind: "scalar", localName: "old_password", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { minLen: "8", maxLen: "32" } }, "ghoster.secret": true } },
            { no: 3, name: "new_password", kind: "scalar", localName: "new_password", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { minLen: "8", maxLen: "32" } }, "ghoster.secret": true } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message profile.UpdatePassword.Request
 */
export const UpdatePassword_Request = new UpdatePassword_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdatePassword_Response$Type extends MessageType<UpdatePassword_Response> {
    constructor() {
        super("profile.UpdatePassword.Response", [
            { no: 1, name: "message", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message profile.UpdatePassword.Response
 */
export const UpdatePassword_Response = new UpdatePassword_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ProfileIDByLogin$Type extends MessageType<ProfileIDByLogin> {
    constructor() {
        super("profile.ProfileIDByLogin", []);
    }
}
/**
 * @generated MessageType for protobuf message profile.ProfileIDByLogin
 */
export const ProfileIDByLogin = new ProfileIDByLogin$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ProfileIDByLogin_Request$Type extends MessageType<ProfileIDByLogin_Request> {
    constructor() {
        super("profile.ProfileIDByLogin.Request", [
            { no: 1, name: "login", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "fingerprint", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "client_ip", kind: "scalar", localName: "client_ip", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { ip: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message profile.ProfileIDByLogin.Request
 */
export const ProfileIDByLogin_Request = new ProfileIDByLogin_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ProfileIDByLogin_Response$Type extends MessageType<ProfileIDByLogin_Response> {
    constructor() {
        super("profile.ProfileIDByLogin.Response", [
            { no: 1, name: "profile_id", kind: "scalar", localName: "profile_id", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message profile.ProfileIDByLogin.Response
 */
export const ProfileIDByLogin_Response = new ProfileIDByLogin_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ProfileByEmail$Type extends MessageType<ProfileByEmail> {
    constructor() {
        super("profile.ProfileByEmail", []);
    }
}
/**
 * @generated MessageType for protobuf message profile.ProfileByEmail
 */
export const ProfileByEmail = new ProfileByEmail$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ProfileByEmail_Request$Type extends MessageType<ProfileByEmail_Request> {
    constructor() {
        super("profile.ProfileByEmail.Request", [
            { no: 1, name: "email", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { cel: [{ id: "request.email", message: "value must be a valid email address", expression: "this.isEmail()" }], required: true } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message profile.ProfileByEmail.Request
 */
export const ProfileByEmail_Request = new ProfileByEmail_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ProfileByEmail_Response$Type extends MessageType<ProfileByEmail_Response> {
    constructor() {
        super("profile.ProfileByEmail.Response", []);
    }
}
/**
 * @generated MessageType for protobuf message profile.ProfileByEmail.Response
 */
export const ProfileByEmail_Response = new ProfileByEmail_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateStatus$Type extends MessageType<UpdateStatus> {
    constructor() {
        super("profile.UpdateStatus", []);
    }
}
/**
 * @generated MessageType for protobuf message profile.UpdateStatus
 */
export const UpdateStatus = new UpdateStatus$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateStatus_Request$Type extends MessageType<UpdateStatus_Request> {
    constructor() {
        super("profile.UpdateStatus.Request", [
            { no: 1, name: "account_id", kind: "scalar", localName: "account_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 2, name: "status", kind: "enum", T: () => ["profile.Status", Status] }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message profile.UpdateStatus.Request
 */
export const UpdateStatus_Request = new UpdateStatus_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateStatus_Response$Type extends MessageType<UpdateStatus_Response> {
    constructor() {
        super("profile.UpdateStatus.Response", []);
    }
}
/**
 * @generated MessageType for protobuf message profile.UpdateStatus.Response
 */
export const UpdateStatus_Response = new UpdateStatus_Response$Type();
/**
 * @generated ServiceType for protobuf service profile.ProfileHandlers
 */
export const ProfileHandlers = new ServiceType("profile.ProfileHandlers", [
    { name: "SignIn", options: {}, I: SignIn_Request, O: Profile_Response },
    { name: "ResetPassword", options: {}, I: ResetPassword_Request, O: ResetPassword_Response },
    { name: "Profiles", options: {}, I: Profiles_Request, O: Profiles_Response },
    { name: "Profile", options: {}, I: Profile_Request, O: Profile_Response },
    { name: "AddProfile", options: {}, I: AddProfile_Request, O: AddProfile_Response },
    { name: "UpdateProfile", options: {}, I: UpdateProfile_Request, O: UpdateProfile_Response },
    { name: "DeleteProfile", options: {}, I: DeleteProfile_Request, O: DeleteProfile_Response },
    { name: "UpdatePassword", options: {}, I: UpdatePassword_Request, O: UpdatePassword_Response },
    { name: "ProfileIDByLogin", options: {}, I: ProfileIDByLogin_Request, O: ProfileIDByLogin_Response },
    { name: "ProfileByEmail", options: {}, I: ProfileByEmail_Request, O: Profile_Response },
    { name: "UpdateStatus", options: {}, I: UpdateStatus_Request, O: UpdateStatus_Response }
]);
