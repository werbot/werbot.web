// @generated from protobuf file "message.proto" (package "key", syntax proto3)
// tslint:disable
// @ts-nocheck
import { MessageType } from "@protobuf-ts/runtime";
import { KeyType } from "./enum";
import { Timestamp } from "../google/protobuf/timestamp";
/**
 * @generated from protobuf message key.SchemeKey
 */
export interface SchemeKey {
    /**
     * @generated from protobuf field: string public = 1
     */
    public: string;
    /**
     * @generated from protobuf field: string private = 2
     */
    private: string;
    /**
     * @generated from protobuf field: string passphrase = 3
     */
    passphrase: string;
    /**
     * @generated from protobuf field: string finger_print = 4
     */
    finger_print: string;
}
/**
 * rpc Keys
 *
 * @generated from protobuf message key.Keys
 */
export interface Keys {
}
/**
 * @generated from protobuf message key.Keys.Request
 */
export interface Keys_Request {
    /**
     * @generated from protobuf field: bool is_admin = 1
     */
    is_admin: boolean; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string profile_id = 2
     */
    profile_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: int32 limit = 3
     */
    limit: number;
    /**
     * @generated from protobuf field: int32 offset = 4
     */
    offset: number;
    /**
     * @generated from protobuf field: string sort_by = 5
     */
    sort_by: string; // @gotags: json:"-"
}
/**
 * @generated from protobuf message key.Keys.Response
 */
export interface Keys_Response {
    /**
     * @generated from protobuf field: int32 total = 1
     */
    total: number;
    /**
     * @generated from protobuf field: repeated key.Key.Response public_keys = 3
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
     * @generated from protobuf field: bool is_admin = 1
     */
    is_admin: boolean; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string profile_id = 2
     */
    profile_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string key_id = 3
     */
    key_id: string;
}
/**
 * @generated from protobuf message key.Key.Response
 */
export interface Key_Response {
    /**
     * @generated from protobuf field: string key_id = 1
     */
    key_id: string;
    /**
     * @generated from protobuf field: string profile_id = 2
     */
    profile_id: string;
    /**
     * @generated from protobuf field: string title = 3
     */
    title: string;
    /**
     * @generated from protobuf field: string key = 4
     */
    key: string;
    /**
     * @generated from protobuf field: string fingerprint = 5
     */
    fingerprint: string;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp locked_at = 6
     */
    locked_at?: Timestamp;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp archived_at = 7
     */
    archived_at?: Timestamp;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp updated_at = 8
     */
    updated_at?: Timestamp;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp created_at = 9
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
     * @generated from protobuf field: string profile_id = 1
     */
    profile_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string title = 2
     */
    title: string;
    /**
     * @generated from protobuf field: string key = 3
     */
    key: string;
}
/**
 * @generated from protobuf message key.AddKey.Response
 */
export interface AddKey_Response {
    /**
     * @generated from protobuf field: string key_id = 1
     */
    key_id: string;
    /**
     * @generated from protobuf field: string fingerprint = 2
     */
    fingerprint: string;
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
     * @generated from protobuf field: string profile_id = 1
     */
    profile_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string key_id = 2
     */
    key_id: string;
    /**
     * @generated from protobuf field: string title = 3
     */
    title: string;
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
     * @generated from protobuf field: string profile_id = 1
     */
    profile_id: string; // @gotags: json:"-"
    /**
     * @generated from protobuf field: string key_id = 2
     */
    key_id: string;
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
     * @generated from protobuf field: keyenum.KeyType key_type = 1
     */
    key_type: KeyType;
}
/**
 * @generated from protobuf message key.GenerateSSHKey.Response
 */
export interface GenerateSSHKey_Response {
    /**
     * @generated from protobuf field: keyenum.KeyType key_type = 1
     */
    key_type: KeyType;
    /**
     * @generated from protobuf field: string uuid = 2
     */
    uuid: string;
    /**
     * @generated from protobuf field: string passphrase = 3
     */
    passphrase: string;
    /**
     * bytes private = 3;
     *
     * @generated from protobuf field: string public = 4
     */
    public: string;
    /**
     * @generated from protobuf field: string finger_print = 5
     */
    finger_print: string;
}
// @generated message type with reflection information, may provide speed optimized methods
class SchemeKey$Type extends MessageType<SchemeKey> {
    constructor() {
        super("key.SchemeKey", [
            { no: 1, name: "public", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "private", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "ghoster.secret": true } },
            { no: 3, name: "passphrase", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "ghoster.secret": true } },
            { no: 4, name: "finger_print", kind: "scalar", localName: "finger_print", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message key.SchemeKey
 */
export const SchemeKey = new SchemeKey$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Keys$Type extends MessageType<Keys> {
    constructor() {
        super("key.Keys", []);
    }
}
/**
 * @generated MessageType for protobuf message key.Keys
 */
export const Keys = new Keys$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Keys_Request$Type extends MessageType<Keys_Request> {
    constructor() {
        super("key.Keys.Request", [
            { no: 1, name: "is_admin", kind: "scalar", localName: "is_admin", T: 8 /*ScalarType.BOOL*/ },
            { no: 2, name: "profile_id", kind: "scalar", localName: "profile_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 3, name: "limit", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 4, name: "offset", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 5, name: "sort_by", kind: "scalar", localName: "sort_by", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message key.Keys.Request
 */
export const Keys_Request = new Keys_Request$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Keys_Response$Type extends MessageType<Keys_Response> {
    constructor() {
        super("key.Keys.Response", [
            { no: 1, name: "total", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 3, name: "public_keys", kind: "message", localName: "public_keys", repeat: 2 /*RepeatType.UNPACKED*/, T: () => Key_Response }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message key.Keys.Response
 */
export const Keys_Response = new Keys_Response$Type();
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
            { no: 1, name: "is_admin", kind: "scalar", localName: "is_admin", T: 8 /*ScalarType.BOOL*/ },
            { no: 2, name: "profile_id", kind: "scalar", localName: "profile_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 3, name: "key_id", kind: "scalar", localName: "key_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } }
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
            { no: 2, name: "profile_id", kind: "scalar", localName: "profile_id", T: 9 /*ScalarType.STRING*/, options: { "ghoster.secret": true } },
            { no: 3, name: "title", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "key", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "ghoster.secret": true } },
            { no: 5, name: "fingerprint", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 6, name: "locked_at", kind: "message", localName: "locked_at", T: () => Timestamp, options: { "ghoster.secret": true } },
            { no: 7, name: "archived_at", kind: "message", localName: "archived_at", T: () => Timestamp, options: { "ghoster.secret": true } },
            { no: 8, name: "updated_at", kind: "message", localName: "updated_at", T: () => Timestamp, options: { "ghoster.secret": true } },
            { no: 9, name: "created_at", kind: "message", localName: "created_at", T: () => Timestamp }
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
            { no: 1, name: "profile_id", kind: "scalar", localName: "profile_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 2, name: "title", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { minLen: "3", maxLen: "128" } } } },
            { no: 3, name: "key", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { minLen: "70" } } } }
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
            { no: 1, name: "key_id", kind: "scalar", localName: "key_id", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "fingerprint", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
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
            { no: 1, name: "profile_id", kind: "scalar", localName: "profile_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 2, name: "key_id", kind: "scalar", localName: "key_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 3, name: "title", kind: "scalar", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { minLen: "3", maxLen: "128" } } } }
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
            { no: 1, name: "profile_id", kind: "scalar", localName: "profile_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } },
            { no: 2, name: "key_id", kind: "scalar", localName: "key_id", T: 9 /*ScalarType.STRING*/, options: { "buf.validate.field": { required: true, string: { uuid: true } } } }
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
            { no: 1, name: "key_type", kind: "enum", localName: "key_type", T: () => ["keyenum.KeyType", KeyType], options: { "buf.validate.field": { required: true } } }
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
            { no: 1, name: "key_type", kind: "enum", localName: "key_type", T: () => ["keyenum.KeyType", KeyType] },
            { no: 2, name: "uuid", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "passphrase", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "public", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "finger_print", kind: "scalar", localName: "finger_print", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message key.GenerateSSHKey.Response
 */
export const GenerateSSHKey_Response = new GenerateSSHKey_Response$Type();
