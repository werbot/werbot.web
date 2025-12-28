// @generated from protobuf file "rpc.proto" (package "system", syntax proto3)
// tslint:disable
// @ts-nocheck
import { CountryByIP_Response } from "./message";
import { CountryByIP_Request } from "./message";
import { Countries_Response } from "./message";
import { Countries_Request } from "./message";
import { ProfileMetrics_Response } from "./message";
import { ProfileMetrics_Request } from "./message";
import { ServiceType } from "@protobuf-ts/runtime-rpc";
/**
 * @generated ServiceType for protobuf service system.SystemHandlers
 */
export const SystemHandlers = new ServiceType("system.SystemHandlers", [
    { name: "ProfileMetrics", options: {}, I: ProfileMetrics_Request, O: ProfileMetrics_Response },
    { name: "Countries", options: {}, I: Countries_Request, O: Countries_Response },
    { name: "CountryByIP", options: {}, I: CountryByIP_Request, O: CountryByIP_Response }
]);
