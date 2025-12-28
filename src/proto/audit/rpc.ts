// @generated from protobuf file "rpc.proto" (package "audit", syntax proto3)
// tslint:disable
// @ts-nocheck
import { AddRecord_Response } from "./message";
import { AddRecord_Request } from "./message";
import { ListRecords_Response } from "./message";
import { ListRecords_Request } from "./message";
import { DeleteAudit_Response } from "./message";
import { DeleteAudit_Request } from "./message";
import { UpdateAudit_Response } from "./message";
import { UpdateAudit_Request } from "./message";
import { AddAudit_Response } from "./message";
import { AddAudit_Request } from "./message";
import { Audit_Response } from "./message";
import { Audit_Request } from "./message";
import { ListAudits_Response } from "./message";
import { ListAudits_Request } from "./message";
import { ServiceType } from "@protobuf-ts/runtime-rpc";
/**
 * @generated ServiceType for protobuf service audit.AuditHandlers
 */
export const AuditHandlers = new ServiceType("audit.AuditHandlers", [
    { name: "ListAudits", options: {}, I: ListAudits_Request, O: ListAudits_Response },
    { name: "Audit", options: {}, I: Audit_Request, O: Audit_Response },
    { name: "AddAudit", options: {}, I: AddAudit_Request, O: AddAudit_Response },
    { name: "UpdateAudit", options: {}, I: UpdateAudit_Request, O: UpdateAudit_Response },
    { name: "DeleteAudit", options: {}, I: DeleteAudit_Request, O: DeleteAudit_Response },
    { name: "ListRecords", options: {}, I: ListRecords_Request, O: ListRecords_Response },
    { name: "AddRecord", options: {}, I: AddRecord_Request, O: AddRecord_Response }
]);
