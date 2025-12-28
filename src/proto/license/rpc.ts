// @generated from protobuf file "rpc.proto" (package "license", syntax proto3)
// tslint:disable
// @ts-nocheck
import { License_Response } from "./message";
import { License_Request } from "./message";
import { ServiceType } from "@protobuf-ts/runtime-rpc";
/**
 * @generated ServiceType for protobuf service license.LicenseHandlers
 */
export const LicenseHandlers = new ServiceType("license.LicenseHandlers", [
    { name: "License", options: {}, I: License_Request, O: License_Response }
]);
