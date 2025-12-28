// @generated from protobuf file "rpc.proto" (package "member", syntax proto3)
// tslint:disable
// @ts-nocheck
import { MembersWithoutScheme_Response } from "./message";
import { MembersWithoutScheme_Request } from "./message";
import { DeleteSchemeMember_Response } from "./message";
import { DeleteSchemeMember_Request } from "./message";
import { UpdateSchemeMember_Response } from "./message";
import { UpdateSchemeMember_Request } from "./message";
import { AddSchemeMember_Response } from "./message";
import { AddSchemeMember_Request } from "./message";
import { SchemeMember_Response } from "./message";
import { SchemeMember_Request } from "./message";
import { SchemeMembers_Response } from "./message";
import { SchemeMembers_Request } from "./message";
import { ProfilesWithoutProject_Response } from "./message";
import { ProfilesWithoutProject_Request } from "./message";
import { DeleteProjectMember_Response } from "./message";
import { DeleteProjectMember_Request } from "./message";
import { UpdateProjectMember_Response } from "./message";
import { UpdateProjectMember_Request } from "./message";
import { AddProjectMember_Response } from "./message";
import { AddProjectMember_Request } from "./message";
import { ProjectMember_Response } from "./message";
import { ProjectMember_Request } from "./message";
import { ProjectMembers_Response } from "./message";
import { ProjectMembers_Request } from "./message";
import { ServiceType } from "@protobuf-ts/runtime-rpc";
/**
 * @generated ServiceType for protobuf service member.MemberHandlers
 */
export const MemberHandlers = new ServiceType("member.MemberHandlers", [
    { name: "ProjectMembers", options: {}, I: ProjectMembers_Request, O: ProjectMembers_Response },
    { name: "ProjectMember", options: {}, I: ProjectMember_Request, O: ProjectMember_Response },
    { name: "AddProjectMember", options: {}, I: AddProjectMember_Request, O: AddProjectMember_Response },
    { name: "UpdateProjectMember", options: {}, I: UpdateProjectMember_Request, O: UpdateProjectMember_Response },
    { name: "DeleteProjectMember", options: {}, I: DeleteProjectMember_Request, O: DeleteProjectMember_Response },
    { name: "ProfilesWithoutProject", options: {}, I: ProfilesWithoutProject_Request, O: ProfilesWithoutProject_Response },
    { name: "SchemeMembers", options: {}, I: SchemeMembers_Request, O: SchemeMembers_Response },
    { name: "SchemeMember", options: {}, I: SchemeMember_Request, O: SchemeMember_Response },
    { name: "AddSchemeMember", options: {}, I: AddSchemeMember_Request, O: AddSchemeMember_Response },
    { name: "UpdateSchemeMember", options: {}, I: UpdateSchemeMember_Request, O: UpdateSchemeMember_Response },
    { name: "DeleteSchemeMember", options: {}, I: DeleteSchemeMember_Request, O: DeleteSchemeMember_Response },
    { name: "MembersWithoutScheme", options: {}, I: MembersWithoutScheme_Request, O: MembersWithoutScheme_Response }
]);
