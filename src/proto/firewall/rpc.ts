// @generated from protobuf file "rpc.proto" (package "firewall", syntax proto3)
// tslint:disable
// @ts-nocheck
import { UpdateFirewallListData_Response } from "./message";
import { UpdateFirewallListData_Request } from "./message";
import { IPAccess_Response } from "./message";
import { IPAccess_Request } from "./message";
import { ServiceType } from "@protobuf-ts/runtime-rpc";
/**
 * @generated ServiceType for protobuf service firewall.FirewallHandlers
 */
export const FirewallHandlers = new ServiceType("firewall.FirewallHandlers", [
    { name: "IPAccess", options: {}, I: IPAccess_Request, O: IPAccess_Response },
    { name: "UpdateFirewallListData", options: {}, I: UpdateFirewallListData_Request, O: UpdateFirewallListData_Response }
]);
