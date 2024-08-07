// @generated from protobuf file "key.proto" (package "key", syntax proto3)
// tslint:disable
// @ts-nocheck
import { ServiceType } from "@protobuf-ts/runtime-rpc";
import { MessageType } from "@protobuf-ts/runtime";
import { Timestamp } from "./google/protobuf/timestamp";
/**
 * rpc ListKeys
 *
 * @generated from protobuf message key.ListKeys
 */
export interface ListKeys {
}
/**
 * @generated from protobuf message key.ListKeys.Request
 */
export interface ListKeys_Request {
    /**
     * @generated from protobuf field: string user_id = 1;
     */
    user_id: string;
    /**
     * @generated from protobuf field: int32 limit = 2;
     */
    limit: number;
    /**
     * @generated from protobuf field: int32 offset = 3;
     */
    offset: number;
    /**
     * @generated from protobuf field: string sort_by = 4;
     */
    sort_by: string;
}
/**
 * @generated from protobuf message key.ListKeys.Response
 */
export interface ListKeys_Response {
    /**
     * @generated from protobuf field: int32 total = 1;
     */
    total: number;
    /**
     * @generated from protobuf field: repeated key.Key.Response public_keys = 3;
     */
    public_keys: Key_Response[];
}
/**
 * rpc Key
 *
 * @generated from protobuf message key.Key
 */
export interface Key {
}
/**
 * @generated from protobuf message key.Key.Request
 */
export interface Key_Request {
    /**
     * @generated from protobuf field: string key_id = 1;
     */
    key_id: string; // @gotags: query:"key_id"
    /**
     * @generated from protobuf field: string user_id = 2;
     */
    user_id: string; // @gotags: query:"user_id"
}
/**
 * @generated from protobuf message key.Key.Response
 */
export interface Key_Response {
    /**
     * @generated from protobuf field: string key_id = 1;
     */
    key_id: string;
    /**
     * @generated from protobuf field: string user_id = 2;
     */
    user_id: string;
    /**
     * @generated from protobuf field: string user_login = 3;
     */
    user_login: string;
    /**
     * @generated from protobuf field: string title = 4;
     */
    title: string;
    /**
     * @generated from protobuf field: string key = 5;
     */
    key: string;
    /**
     * @generated from protobuf field: string fingerprint = 6;
     */
    fingerprint: string;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp locked_at = 7;
     */
    locked_at?: Timestamp;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp archived_at = 8;
     */
    archived_at?: Timestamp;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp updated_at = 9;
     */
    updated_at?: Timestamp;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp created_at = 10;
     */
    created_at?: Timestamp;
}
/**
 * rpc AddKey
 *
 * @generated from protobuf message key.AddKey
 */
export interface AddKey {
}
/**
 * @generated from protobuf message key.AddKey.Request
 */
export interface AddKey_Request {
    /**
     * @generated from protobuf field: string user_id = 1;
     */
    user_id: string;
    /**
     * @generated from protobuf field: string title = 2;
     */
    title: string;
    /**
     * @generated from protobuf field: string key = 3;
     */
    key: string;
}
/**
 * @generated from protobuf message key.AddKey.Response
 */
export interface AddKey_Response {
    /**
     * @generated from protobuf field: string key_id = 1;
     */
    key_id: string;
}
/**
 * rpc UpdateKey
 *
 * @generated from protobuf message key.UpdateKey
 */
export interface UpdateKey {
}
/**
 * @generated from protobuf message key.UpdateKey.Request
 */
export interface UpdateKey_Request {
    /**
     * @generated from protobuf field: string key_id = 1;
     */
    key_id: string; // @gotags: query:"key_id"
    /**
     * @generated from protobuf field: string user_id = 2;
     */
    user_id: string; // @gotags: query:"user_id"
    /**
     * @generated from protobuf field: string title = 3;
     */
    title: string; // @gotags: query:"title"
    /**
     * @generated from protobuf field: string key = 4;
     */
    key: string; // @gotags: query:"key"
}
/**
 * @generated from protobuf message key.UpdateKey.Response
 */
export interface UpdateKey_Response {
}
/**
 * rpc DeleteKey
 *
 * @generated from protobuf message key.DeleteKey
 */
export interface DeleteKey {
}
/**
 * @generated from protobuf message key.DeleteKey.Request
 */
export interface DeleteKey_Request {
    /**
     * @generated from protobuf field: string user_id = 1;
     */
    user_id: string; // @gotags: query:"user_id"
    /**
     * @generated from protobuf field: string key_id = 2;
     */
    key_id: string; // @gotags: query:"key_id"
}
/**
 * @generated from protobuf message key.DeleteKey.Response
 */
export interface DeleteKey_Response {
}
/**
 * rpc GenerateSSHKey
 *
 * @generated from protobuf message key.GenerateSSHKey
 */
export interface GenerateSSHKey {
}
/**
 * @generated from protobuf message key.GenerateSSHKey.Request
 */
export interface GenerateSSHKey_Request {
    /**
     * @generated from protobuf field: key.KeyType key_type = 1;
     */
    key_type: KeyType;
}
/**
 * @generated from protobuf message key.GenerateSSHKey.Response
 */
export interface GenerateSSHKey_Response {
    /**
     * @generated from protobuf field: key.KeyType key_type = 1;
     */
    key_type: KeyType;
    /**
     * @generated from protobuf field: string uuid = 2;
     */
    uuid: string;
    /**
     * @generated from protobuf field: string passphrase = 3;
     */
    passphrase: string;
    /**
     * bytes private = 3;
     *
     * @generated from protobuf field: bytes public = 4;
     */
    public: Uint8Array;
    /**
     * @generated from protobuf field: string finger_print = 5;
     */
    finger_print: string;
}
/**
 * @generated from protobuf message key.GenerateSSHKey.Key
 */
export interface GenerateSSHKey_Key {
    /**
     * @generated from protobuf field: string public = 1;
     */
    public: string;
    /**
     * @generated from protobuf field: string private = 2;
     */
    private: string;
    /**
     * @generated from protobuf field: string password = 3;
     */
    password: string;
}
/**
 * @generated from protobuf enum key.KeyType
 */
export enum KeyType {
    /**
     * @generated from protobuf enum value: unspecified = 0;
     */
    unspecified = 0,
    /**
     * @generated from protobuf enum value: ed25519 = 1;
     */
    ed25519 = 1,
    /**
     * @generated from protobuf enum value: ecdsa = 2;
     */
    ecdsa = 2,
    /**
     * @generated from protobuf enum value: rsa = 3;
     */
    rsa = 3
}
// @generated message type with reflection information, may provide speed optimized methods
class ListKeys$Type extends MessageType<ListKeys> {
    constructor() {
        super("key.ListKeys", []);
    }
}
/**
 * @generated MessageType for protobuf message key.ListKeys
 */
export const ListKeys = new ListKeys$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ListKeys_Request$Type extends MessageType<ListKeys_Request> {
    constructor() {
        super("key.ListKeys.Request", [
            { no: 1, name: "user_id", kind: "scalar", localName: "user_id", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "limit", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 3, name: "offset", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 4, name: "sort_by", kind: "scalar", localName: "sort_by", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message key.ListKeys.Request
 */
export const ListKeys_Request = new ListKeys_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ListKeys_Response$Type extends MessageType<ListKeys_Response> {
    constructor() {
        super("key.ListKeys.Response", [
            { no: 1, name: "total", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 3, name: "public_keys", kind: "message", localName: "public_keys", repeat: 1 /*RepeatType.PACKED*/, T: () => Key_Response }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message key.ListKeys.Response
 */
export const ListKeys_Response = new ListKeys_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Key$Type extends MessageType<Key> {
    constructor() {
        super("key.Key", []);
    }
}
/**
 * @generated MessageType for protobuf message key.Key
 */
export const Key = new Key$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Key_Request$Type extends MessageType<Key_Request> {
    constructor() {
        super("key.Key.Request", [
            { no: 1, name: "key_id", kind: "scalar", localName: "key_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true }, ignoreEmpty: true } } },
            { no: 2, name: "user_id", kind: "scalar", localName: "user_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true }, ignoreEmpty: true } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message key.Key.Request
 */
export const Key_Request = new Key_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Key_Response$Type extends MessageType<Key_Response> {
    constructor() {
        super("key.Key.Response", [
            { no: 1, name: "key_id", kind: "scalar", localName: "key_id", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "user_id", kind: "scalar", localName: "user_id", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "user_login", kind: "scalar", localName: "user_login", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "title", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "key", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 6, name: "fingerprint", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 7, name: "locked_at", kind: "message", localName: "locked_at", T: () => Timestamp },
            { no: 8, name: "archived_at", kind: "message", localName: "archived_at", T: () => Timestamp },
            { no: 9, name: "updated_at", kind: "message", localName: "updated_at", T: () => Timestamp },
            { no: 10, name: "created_at", kind: "message", localName: "created_at", T: () => Timestamp }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message key.Key.Response
 */
export const Key_Response = new Key_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddKey$Type extends MessageType<AddKey> {
    constructor() {
        super("key.AddKey", []);
    }
}
/**
 * @generated MessageType for protobuf message key.AddKey
 */
export const AddKey = new AddKey$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddKey_Request$Type extends MessageType<AddKey_Request> {
    constructor() {
        super("key.AddKey.Request", [
            { no: 1, name: "user_id", kind: "scalar", localName: "user_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true }, ignoreEmpty: true } } },
            { no: 2, name: "title", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { minLen: "3", maxLen: "128" } } } },
            { no: 3, name: "key", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { minLen: "70" } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message key.AddKey.Request
 */
export const AddKey_Request = new AddKey_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AddKey_Response$Type extends MessageType<AddKey_Response> {
    constructor() {
        super("key.AddKey.Response", [
            { no: 1, name: "key_id", kind: "scalar", localName: "key_id", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message key.AddKey.Response
 */
export const AddKey_Response = new AddKey_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateKey$Type extends MessageType<UpdateKey> {
    constructor() {
        super("key.UpdateKey", []);
    }
}
/**
 * @generated MessageType for protobuf message key.UpdateKey
 */
export const UpdateKey = new UpdateKey$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateKey_Request$Type extends MessageType<UpdateKey_Request> {
    constructor() {
        super("key.UpdateKey.Request", [
            { no: 1, name: "key_id", kind: "scalar", localName: "key_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } },
            { no: 2, name: "user_id", kind: "scalar", localName: "user_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true }, ignoreEmpty: true } } },
            { no: 3, name: "title", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { minLen: "3", maxLen: "128" } } } },
            { no: 4, name: "key", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { minLen: "128" } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message key.UpdateKey.Request
 */
export const UpdateKey_Request = new UpdateKey_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UpdateKey_Response$Type extends MessageType<UpdateKey_Response> {
    constructor() {
        super("key.UpdateKey.Response", []);
    }
}
/**
 * @generated MessageType for protobuf message key.UpdateKey.Response
 */
export const UpdateKey_Response = new UpdateKey_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DeleteKey$Type extends MessageType<DeleteKey> {
    constructor() {
        super("key.DeleteKey", []);
    }
}
/**
 * @generated MessageType for protobuf message key.DeleteKey
 */
export const DeleteKey = new DeleteKey$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DeleteKey_Request$Type extends MessageType<DeleteKey_Request> {
    constructor() {
        super("key.DeleteKey.Request", [
            { no: 1, name: "user_id", kind: "scalar", localName: "user_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true }, ignoreEmpty: true } } },
            { no: 2, name: "key_id", kind: "scalar", localName: "key_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { string: { uuid: true } } } }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message key.DeleteKey.Request
 */
export const DeleteKey_Request = new DeleteKey_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class DeleteKey_Response$Type extends MessageType<DeleteKey_Response> {
    constructor() {
        super("key.DeleteKey.Response", []);
    }
}
/**
 * @generated MessageType for protobuf message key.DeleteKey.Response
 */
export const DeleteKey_Response = new DeleteKey_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class GenerateSSHKey$Type extends MessageType<GenerateSSHKey> {
    constructor() {
        super("key.GenerateSSHKey", []);
    }
}
/**
 * @generated MessageType for protobuf message key.GenerateSSHKey
 */
export const GenerateSSHKey = new GenerateSSHKey$Type();
// @generated message type with reflection information, may provide speed optimized methods
class GenerateSSHKey_Request$Type extends MessageType<GenerateSSHKey_Request> {
    constructor() {
        super("key.GenerateSSHKey.Request", [
            { no: 1, name: "key_type", kind: "enum", localName: "key_type", T: () => ["key.KeyType", KeyType] }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message key.GenerateSSHKey.Request
 */
export const GenerateSSHKey_Request = new GenerateSSHKey_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class GenerateSSHKey_Response$Type extends MessageType<GenerateSSHKey_Response> {
    constructor() {
        super("key.GenerateSSHKey.Response", [
            { no: 1, name: "key_type", kind: "enum", localName: "key_type", T: () => ["key.KeyType", KeyType] },
            { no: 2, name: "uuid", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "passphrase", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "public", kind: "scalar", T: 12 /*ScalarType.BYTES*/ },
            { no: 5, name: "finger_print", kind: "scalar", localName: "finger_print", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message key.GenerateSSHKey.Response
 */
export const GenerateSSHKey_Response = new GenerateSSHKey_Response$Type();
// @generated message type with reflection information, may provide speed optimized methods
class GenerateSSHKey_Key$Type extends MessageType<GenerateSSHKey_Key> {
    constructor() {
        super("key.GenerateSSHKey.Key", [
            { no: 1, name: "public", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "private", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "password", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message key.GenerateSSHKey.Key
 */
export const GenerateSSHKey_Key = new GenerateSSHKey_Key$Type();
/**
 * @generated ServiceType for protobuf service key.KeyHandlers
 */
export const KeyHandlers = new ServiceType("key.KeyHandlers", [
    { name: "ListKeys", options: {}, I: ListKeys_Request, O: ListKeys_Response },
    { name: "Key", options: {}, I: Key_Request, O: Key_Response },
    { name: "AddKey", options: {}, I: AddKey_Request, O: AddKey_Response },
    { name: "UpdateKey", options: {}, I: UpdateKey_Request, O: UpdateKey_Response },
    { name: "DeleteKey", options: {}, I: DeleteKey_Request, O: DeleteKey_Response },
    { name: "GenerateSSHKey", options: {}, I: GenerateSSHKey_Request, O: GenerateSSHKey_Response }
]);
