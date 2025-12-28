// @generated from protobuf file "rpc.proto" (package "key", syntax proto3)
// tslint:disable
// @ts-nocheck
import { GenerateSSHKey_Response } from "./message";
import { GenerateSSHKey_Request } from "./message";
import { DeleteKey_Response } from "./message";
import { DeleteKey_Request } from "./message";
import { UpdateKey_Response } from "./message";
import { UpdateKey_Request } from "./message";
import { AddKey_Response } from "./message";
import { AddKey_Request } from "./message";
import { Key_Response } from "./message";
import { Key_Request } from "./message";
import { Keys_Response } from "./message";
import { Keys_Request } from "./message";
import { ServiceType } from "@protobuf-ts/runtime-rpc";
/**
 * @generated ServiceType for protobuf service key.KeyHandlers
 */
export const KeyHandlers = new ServiceType("key.KeyHandlers", [
    { name: "Keys", options: {}, I: Keys_Request, O: Keys_Response },
    { name: "Key", options: {}, I: Key_Request, O: Key_Response },
    { name: "AddKey", options: {}, I: AddKey_Request, O: AddKey_Response },
    { name: "UpdateKey", options: {}, I: UpdateKey_Request, O: UpdateKey_Response },
    { name: "DeleteKey", options: {}, I: DeleteKey_Request, O: DeleteKey_Response },
    { name: "GenerateSSHKey", options: {}, I: GenerateSSHKey_Request, O: GenerateSSHKey_Response }
]);
