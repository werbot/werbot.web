// @generated from protobuf file "account.proto" (package "account", syntax proto3)
// tslint:disable
// @ts-nocheck
import { User_Response } from "./user";
import { ServiceType } from "@protobuf-ts/runtime-rpc";
import { MessageType } from "@protobuf-ts/runtime";
import { Timestamp } from "./google/protobuf/timestamp";
import { Role } from "./user";
/**
 * rpc SignIn
 *
 * @generated from protobuf message account.SignIn
 */
export interface SignIn {
}
/**
 * @generated from protobuf message account.SignIn.Request
 */
export interface SignIn_Request {
    /**
     * @generated from protobuf field: string email = 1;
     */
    email: string; // @gotags: query:"email"
    /**
     * @generated from protobuf field: string password = 2;
     */
    password: string; // @gotags: query:"password"
}
/**
 * @generated from protobuf message account.SignIn.Response
 */
export interface SignIn_Response {
    /**
     * @generated from protobuf field: string user_id = 1;
     */
    user_id: string;
    /**
     * @generated from protobuf field: string name = 2;
     */
    name: string;
    /**
     * @generated from protobuf field: string email = 3;
     */
    email: string;
    /**
     * @generated from protobuf field: user.Role user_role = 4;
     */
    user_role: Role;
}
/**
 * rpc ResetPassword
 *
 * @generated from protobuf message account.ResetPassword
 */
export interface ResetPassword {
}
/**
 * @generated from protobuf message account.ResetPassword.Request
 */
export interface ResetPassword_Request {
    /**
     * @generated from protobuf oneof: request
     */
    request: {
        oneofKind: "email";
        /**
         * @generated from protobuf field: string email = 1;
         */
        email: string;
    } | {
        oneofKind: "token";
        /**
         * @generated from protobuf field: string token = 2;
         */
        token: string;
    } | {
        oneofKind: "password";
        /**
         * @generated from protobuf field: account.ResetPassword.Password password = 3;
         */
        password: ResetPassword_Password;
    } | {
        oneofKind: undefined;
    };
}
/**
 * @generated from protobuf message account.ResetPassword.Response
 */
export interface ResetPassword_Response {
    /**
     * @generated from protobuf field: string message = 1;
     */
    message: string;
    /**
     * @generated from protobuf field: string token = 2;
     */
    token: string;
}
/**
 * @generated from protobuf message account.ResetPassword.Password
 */
export interface ResetPassword_Password {
    /**
     * @generated from protobuf field: string password = 1;
     */
    password: string;
    /**
     * @generated from protobuf field: string token = 2;
     */
    token: string;
}
/**
 * @generated from protobuf message account.RefreshTokenRequest
 */
export interface RefreshTokenRequest {
    /**
     * @generated from protobuf field: string refresh_token = 1;
     */
    refresh_token: string;
}
/**
 * @generated from protobuf message account.UserParameters
 */
export interface UserParameters {
    /**
     * @generated from protobuf field: string user_name = 1;
     */
    user_name: string;
    /**
     * @generated from protobuf field: string user_id = 2;
     */
    user_id: string;
    /**
     * @generated from protobuf field: user.Role roles = 3;
     */
    roles: Role;
    /**
     * @generated from protobuf field: string sub = 4;
     */
    sub: string;
}
// -----------------------------------------------------

/**
 * rpc ListAccounts
 *
 * @generated from protobuf message account.ListAccounts
 */
export interface ListAccounts {
}
/**
 * @generated from protobuf message account.ListAccounts.Request
 */
export interface ListAccounts_Request {
    /**
     * @generated from protobuf field: int32 limit = 1;
     */
    limit: number;
    /**
     * @generated from protobuf field: int32 offset = 2;
     */
    offset: number;
    /**
     * @generated from protobuf field: string sort_by = 3;
     */
    sort_by: string;
}
/**
 * @generated from protobuf message account.ListAccounts.Response
 */
export interface ListAccounts_Response {
    /**
     * @generated from protobuf field: int32 total = 1;
     */
    total: number;
    /**
     * @generated from protobuf field: repeated account.Account.Response accounts = 2;
     */
    accounts: Account_Response[];
}
/**
 * rpc Account
 *
 * @generated from protobuf message account.Account
 */
export interface Account {
}
/**
 * @generated from protobuf message account.Account.Request
 */
export interface Account_Request {
    /**
     * @generated from protobuf field: string account_id = 1;
     */
    account_id: string;
}
/**
 * @generated from protobuf message account.Account.Response
 */
export interface Account_Response {
    /**
     * @generated from protobuf field: string account_id = 1;
     */
    account_id: string;
    /**
     * @generated from protobuf field: bool online = 2;
     */
    online: boolean;
    /**
     * @generated from protobuf field: bool active = 3;
     */
    active: boolean;
    /**
     * @generated from protobuf field: string name = 4;
     */
    name: string;
    /**
     * @generated from protobuf field: string surname = 5;
     */
    surname: string;
    /**
     * @generated from protobuf field: string connection_login = 7;
     */
    connection_login: string;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp updated_at = 8;
     */
    updated_at?: Timestamp;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp created_at = 9;
     */
    created_at?: Timestamp;
}
/**
 * rpc AddAccount
 *
 * @generated from protobuf message account.AddAccount
 */
export interface AddAccount {
}
/**
 * @generated from protobuf message account.AddAccount.Request
 */
export interface AddAccount_Request {
    /**
     * @generated from protobuf field: string account_id = 1;
     */
    account_id: string;
}
/**
 * @generated from protobuf message account.AddAccount.Response
 */
export interface AddAccount_Response {
}
/**
 * rpc UpdateAccount
 *
 * @generated from protobuf message account.UpdateAccount
 */
export interface UpdateAccount {
}
/**
 * @generated from protobuf message account.UpdateAccount.Request
 */
export interface UpdateAccount_Request {
    /**
     * @generated from protobuf field: string account_id = 1;
     */
    account_id: string;
}
/**
 * @generated from protobuf message account.UpdateAccount.Response
 */
export interface UpdateAccount_Response {
}
/**
 * rpc DeleteAccount
 *
 * @generated from protobuf message account.DeleteAccount
 */
export interface DeleteAccount {
}
/**
 * @generated from protobuf message account.DeleteAccount.Request
 */
export interface DeleteAccount_Request {
    /**
     * @generated from protobuf field: string account_id = 1;
     */
    account_id: string;
}
/**
 * @generated from protobuf message account.DeleteAccount.Response
 */
export interface DeleteAccount_Response {
}
/**
 * rpc AccountIDByLogin
 *
 * @generated from protobuf message account.AccountIDByLogin
 */
export interface AccountIDByLogin {
}
/**
 * @generated from protobuf message account.AccountIDByLogin.Request
 */
export interface AccountIDByLogin_Request {
    /**
     * @generated from protobuf field: string login = 1;
     */
    login: string;
    /**
     * @generated from protobuf field: string fingerprint = 2;
     */
    fingerprint: string;
    /**
     * @generated from protobuf field: string client_ip = 3;
     */
    client_ip: string;
}
/**
 * @generated from protobuf message account.AccountIDByLogin.Response
 */
export interface AccountIDByLogin_Response {
    /**
     * @generated from protobuf field: string user_id = 1;
     */
    user_id: string;
}
/**
 * rpc UpdateStatus
 *
 * @generated from protobuf message account.UpdateStatus
 */
export interface UpdateStatus {
}
/**
 * @generated from protobuf message account.UpdateStatus.Request
 */
export interface UpdateStatus_Request {
    /**
     * @generated from protobuf field: string account_id = 1;
     */
    account_id: string;
    /**
     * @generated from protobuf field: account.AccountStatus status = 2;
     */
    status: AccountStatus;
}
/**
 * @generated from protobuf message account.UpdateStatus.Response
 */
export interface UpdateStatus_Response {
    /**
     * @generated from protobuf field: int32 total = 1;
     */
    total: number;
    /**
     * @generated from protobuf field: repeated account.Account.Response accounts = 2;
     */
    accounts: Account_Response[];
}
/**
 * rpc SessionAccount
 *
 * @generated from protobuf message account.SessionAccount
 */
export interface SessionAccount {
}
/**
 * @generated from protobuf message account.SessionAccount.Request
 */
export interface SessionAccount_Request {
    /**
     * @generated from protobuf field: string name = 1;
     */
    name: string;
}
/**
 * @generated from protobuf message account.SessionAccount.Response
 */
export interface SessionAccount_Response {
    /**
     * @generated from protobuf field: int32 total = 1;
     */
    total: number;
    /**
     * @generated from protobuf field: repeated account.Account.Response accounts = 2;
     */
    accounts: Account_Response[];
}
/**
 * rpc SessionAccount
 *
 * @generated from protobuf message account.FindByTokenAccount
 */
export interface FindByTokenAccount {
}
/**
 * @generated from protobuf message account.FindByTokenAccount.Request
 */
export interface FindByTokenAccount_Request {
    /**
     * @generated from protobuf field: string name = 1;
     */
    name: string;
}
/**
 * @generated from protobuf message account.FindByTokenAccount.Response
 */
export interface FindByTokenAccount_Response {
}
/**
 * @generated from protobuf enum account.AccountStatus
 */
export enum AccountStatus {
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
class SignIn$Type extends MessageType<SignIn> {
    constructor() {
        super("account.SignIn", []);
    }
}
/**
 * @generated MessageType for protobuf message account.SignIn
 */
export const SignIn = new SignIn$Type();
// @generated message type with reflection information, may provide speed optimized methods
class SignIn_Request$Type extends MessageType<SignIn_Request> {
    constructor() {
        super("account.SignIn.Request", [
            { no: 1, name: "email", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { cel: [{ id: "request.email", message: "value must be a valid email address", expression: "this.isEmail()" }] } } },
            { no: 2, name: "password", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { minLen: "8", maxLen: "32" } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message account.SignIn.Request
 */
export const SignIn_Request = new SignIn_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class SignIn_Response$Type extends MessageType<SignIn_Response> {
    constructor() {
        super("account.SignIn.Response", [
            { no: 1, name: "user_id", kind: "scalar", localName: "user_id", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "email", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "user_role", kind: "enum", localName: "user_role", T: () => ["user.Role", Role] }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message account.SignIn.Response
 */
export const SignIn_Response = new SignIn_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ResetPassword$Type extends MessageType<ResetPassword> {
    constructor() {
        super("account.ResetPassword", []);
    }
}
/**
 * @generated MessageType for protobuf message account.ResetPassword
 */
export const ResetPassword = new ResetPassword$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ResetPassword_Request$Type extends MessageType<ResetPassword_Request> {
    constructor() {
        super("account.ResetPassword.Request", [
            { no: 1, name: "email", kind: "scalar", oneof: "request", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { email: true } } } },
            { no: 2, name: "token", kind: "scalar", oneof: "request", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 3, name: "password", kind: "message", oneof: "request", T: () => ResetPassword_Password }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message account.ResetPassword.Request
 */
export const ResetPassword_Request = new ResetPassword_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ResetPassword_Response$Type extends MessageType<ResetPassword_Response> {
    constructor() {
        super("account.ResetPassword.Response", [
            { no: 1, name: "message", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "token", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message account.ResetPassword.Response
 */
export const ResetPassword_Response = new ResetPassword_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ResetPassword_Password$Type extends MessageType<ResetPassword_Password> {
    constructor() {
        super("account.ResetPassword.Password", [
            { no: 1, name: "password", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { minLen: "8", maxLen: "32" } } } },
            { no: 2, name: "token", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message account.ResetPassword.Password
 */
export const ResetPassword_Password = new ResetPassword_Password$Type();
// @generated message type with reflection information, may provide speed optimized methods
class RefreshTokenRequest$Type extends MessageType<RefreshTokenRequest> {
    constructor() {
        super("account.RefreshTokenRequest", [
            { no: 1, name: "refresh_token", kind: "scalar", localName: "refresh_token", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message account.RefreshTokenRequest
 */
export const RefreshTokenRequest = new RefreshTokenRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UserParameters$Type extends MessageType<UserParameters> {
    constructor() {
        super("account.UserParameters", [
            { no: 1, name: "user_name", kind: "scalar", localName: "user_name", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "user_id", kind: "scalar", localName: "user_id", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "roles", kind: "enum", T: () => ["user.Role", Role] },
            { no: 4, name: "sub", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message account.UserParameters
 */
export const UserParameters = new UserParameters$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ListAccounts$Type extends MessageType<ListAccounts> {
    constructor() {
        super("account.ListAccounts", []);
    }
}
/**
 * @generated MessageType for protobuf message account.ListAccounts
 */
export const ListAccounts = new ListAccounts$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ListAccounts_Request$Type extends MessageType<ListAccounts_Request> {
    constructor() {
        super("account.ListAccounts.Request", [
            { no: 1, name: "limit", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 2, name: "offset", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 3, name: "sort_by", kind: "scalar", localName: "sort_by", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message account.ListAccounts.Request
 */
export const ListAccounts_Request = new ListAccounts_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ListAccounts_Response$Type extends MessageType<ListAccounts_Response> {
    constructor() {
        super("account.ListAccounts.Response", [
            { no: 1, name: "total", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 2, name: "accounts", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Account_Response }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message account.ListAccounts.Response
 */
export const ListAccounts_Response = new ListAccounts_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Account$Type extends MessageType<Account> {
    constructor() {
        super("account.Account", []);
    }
}
/**
 * @generated MessageType for protobuf message account.Account
 */
export const Account = new Account$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Account_Request$Type extends MessageType<Account_Request> {
    constructor() {
        super("account.Account.Request", [
            { no: 1, name: "account_id", kind: "scalar", localName: "account_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message account.Account.Request
 */
export const Account_Request = new Account_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Account_Response$Type extends MessageType<Account_Response> {
    constructor() {
        super("account.Account.Response", [
            { no: 1, name: "account_id", kind: "scalar", localName: "account_id", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "online", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 3, name: "active", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 4, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "surname", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 7, name: "connection_login", kind: "scalar", localName: "connection_login", T: 9 /*ScalarType.STRING*/ },
            { no: 8, name: "updated_at", kind: "message", localName: "updated_at", T: () => Timestamp },
            { no: 9, name: "created_at", kind: "message", localName: "created_at", T: () => Timestamp }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message account.Account.Response
 */
export const Account_Response = new Account_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddAccount$Type extends MessageType<AddAccount> {
    constructor() {
        super("account.AddAccount", []);
    }
}
/**
 * @generated MessageType for protobuf message account.AddAccount
 */
export const AddAccount = new AddAccount$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddAccount_Request$Type extends MessageType<AddAccount_Request> {
    constructor() {
        super("account.AddAccount.Request", [
            { no: 1, name: "account_id", kind: "scalar", localName: "account_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message account.AddAccount.Request
 */
export const AddAccount_Request = new AddAccount_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddAccount_Response$Type extends MessageType<AddAccount_Response> {
    constructor() {
        super("account.AddAccount.Response", []);
    }
}
/**
 * @generated MessageType for protobuf message account.AddAccount.Response
 */
export const AddAccount_Response = new AddAccount_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateAccount$Type extends MessageType<UpdateAccount> {
    constructor() {
        super("account.UpdateAccount", []);
    }
}
/**
 * @generated MessageType for protobuf message account.UpdateAccount
 */
export const UpdateAccount = new UpdateAccount$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateAccount_Request$Type extends MessageType<UpdateAccount_Request> {
    constructor() {
        super("account.UpdateAccount.Request", [
            { no: 1, name: "account_id", kind: "scalar", localName: "account_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message account.UpdateAccount.Request
 */
export const UpdateAccount_Request = new UpdateAccount_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateAccount_Response$Type extends MessageType<UpdateAccount_Response> {
    constructor() {
        super("account.UpdateAccount.Response", []);
    }
}
/**
 * @generated MessageType for protobuf message account.UpdateAccount.Response
 */
export const UpdateAccount_Response = new UpdateAccount_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DeleteAccount$Type extends MessageType<DeleteAccount> {
    constructor() {
        super("account.DeleteAccount", []);
    }
}
/**
 * @generated MessageType for protobuf message account.DeleteAccount
 */
export const DeleteAccount = new DeleteAccount$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DeleteAccount_Request$Type extends MessageType<DeleteAccount_Request> {
    constructor() {
        super("account.DeleteAccount.Request", [
            { no: 1, name: "account_id", kind: "scalar", localName: "account_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message account.DeleteAccount.Request
 */
export const DeleteAccount_Request = new DeleteAccount_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DeleteAccount_Response$Type extends MessageType<DeleteAccount_Response> {
    constructor() {
        super("account.DeleteAccount.Response", []);
    }
}
/**
 * @generated MessageType for protobuf message account.DeleteAccount.Response
 */
export const DeleteAccount_Response = new DeleteAccount_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AccountIDByLogin$Type extends MessageType<AccountIDByLogin> {
    constructor() {
        super("account.AccountIDByLogin", []);
    }
}
/**
 * @generated MessageType for protobuf message account.AccountIDByLogin
 */
export const AccountIDByLogin = new AccountIDByLogin$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AccountIDByLogin_Request$Type extends MessageType<AccountIDByLogin_Request> {
    constructor() {
        super("account.AccountIDByLogin.Request", [
            { no: 1, name: "login", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "fingerprint", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "client_ip", kind: "scalar", localName: "client_ip", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { ip: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message account.AccountIDByLogin.Request
 */
export const AccountIDByLogin_Request = new AccountIDByLogin_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AccountIDByLogin_Response$Type extends MessageType<AccountIDByLogin_Response> {
    constructor() {
        super("account.AccountIDByLogin.Response", [
            { no: 1, name: "user_id", kind: "scalar", localName: "user_id", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message account.AccountIDByLogin.Response
 */
export const AccountIDByLogin_Response = new AccountIDByLogin_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateStatus$Type extends MessageType<UpdateStatus> {
    constructor() {
        super("account.UpdateStatus", []);
    }
}
/**
 * @generated MessageType for protobuf message account.UpdateStatus
 */
export const UpdateStatus = new UpdateStatus$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateStatus_Request$Type extends MessageType<UpdateStatus_Request> {
    constructor() {
        super("account.UpdateStatus.Request", [
            { no: 1, name: "account_id", kind: "scalar", localName: "account_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 2, name: "status", kind: "enum", T: () => ["account.AccountStatus", AccountStatus] }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message account.UpdateStatus.Request
 */
export const UpdateStatus_Request = new UpdateStatus_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateStatus_Response$Type extends MessageType<UpdateStatus_Response> {
    constructor() {
        super("account.UpdateStatus.Response", [
            { no: 1, name: "total", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 2, name: "accounts", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Account_Response }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message account.UpdateStatus.Response
 */
export const UpdateStatus_Response = new UpdateStatus_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class SessionAccount$Type extends MessageType<SessionAccount> {
    constructor() {
        super("account.SessionAccount", []);
    }
}
/**
 * @generated MessageType for protobuf message account.SessionAccount
 */
export const SessionAccount = new SessionAccount$Type();
// @generated message type with reflection information, may provide speed optimized methods
class SessionAccount_Request$Type extends MessageType<SessionAccount_Request> {
    constructor() {
        super("account.SessionAccount.Request", [
            { no: 1, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message account.SessionAccount.Request
 */
export const SessionAccount_Request = new SessionAccount_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class SessionAccount_Response$Type extends MessageType<SessionAccount_Response> {
    constructor() {
        super("account.SessionAccount.Response", [
            { no: 1, name: "total", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 2, name: "accounts", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Account_Response }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message account.SessionAccount.Response
 */
export const SessionAccount_Response = new SessionAccount_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class FindByTokenAccount$Type extends MessageType<FindByTokenAccount> {
    constructor() {
        super("account.FindByTokenAccount", []);
    }
}
/**
 * @generated MessageType for protobuf message account.FindByTokenAccount
 */
export const FindByTokenAccount = new FindByTokenAccount$Type();
// @generated message type with reflection information, may provide speed optimized methods
class FindByTokenAccount_Request$Type extends MessageType<FindByTokenAccount_Request> {
    constructor() {
        super("account.FindByTokenAccount.Request", [
            { no: 1, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message account.FindByTokenAccount.Request
 */
export const FindByTokenAccount_Request = new FindByTokenAccount_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class FindByTokenAccount_Response$Type extends MessageType<FindByTokenAccount_Response> {
    constructor() {
        super("account.FindByTokenAccount.Response", []);
    }
}
/**
 * @generated MessageType for protobuf message account.FindByTokenAccount.Response
 */
export const FindByTokenAccount_Response = new FindByTokenAccount_Response$Type();
/**
 * @generated ServiceType for protobuf service account.AccountHandlers
 */
export const AccountHandlers = new ServiceType("account.AccountHandlers", [
    { name: "SignIn", options: {}, I: SignIn_Request, O: User_Response },
    { name: "ResetPassword", options: {}, I: ResetPassword_Request, O: ResetPassword_Response },
    { name: "ListAccounts", options: {}, I: ListAccounts_Request, O: ListAccounts_Response },
    { name: "Account", options: {}, I: Account_Request, O: Account_Response },
    { name: "AddAccount", options: {}, I: AddAccount_Request, O: AddAccount_Response },
    { name: "UpdateAccount", options: {}, I: UpdateAccount_Request, O: UpdateAccount_Response },
    { name: "DeleteAccount", options: {}, I: DeleteAccount_Request, O: DeleteAccount_Response },
    { name: "AccountIDByLogin", options: {}, I: AccountIDByLogin_Request, O: AccountIDByLogin_Response },
    { name: "UpdateStatus", options: {}, I: UpdateStatus_Request, O: UpdateStatus_Response },
    { name: "SessionAccount", options: {}, I: SessionAccount_Request, O: SessionAccount_Response },
    { name: "FindByTokenAccount", options: {}, I: FindByTokenAccount_Request, O: FindByTokenAccount_Response }
]);
