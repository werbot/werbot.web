// @generated from protobuf file "rpc.proto" (package "project", syntax proto3)
// tslint:disable
// @ts-nocheck
import { DeleteProjectKey_Response } from "./message";
import { DeleteProjectKey_Request } from "./message";
import { AddProjectKey_Response } from "./message";
import { AddProjectKey_Request } from "./message";
import { ProjectKey_Response } from "./message";
import { ProjectKey_Request } from "./message";
import { ProjectKeys_Response } from "./message";
import { ProjectKeys_Request } from "./message";
import { DeleteProject_Response } from "./message";
import { DeleteProject_Request } from "./message";
import { UpdateProject_Response } from "./message";
import { UpdateProject_Request } from "./message";
import { AddProject_Response } from "./message";
import { AddProject_Request } from "./message";
import { Project_Response } from "./message";
import { Project_Request } from "./message";
import { Projects_Response } from "./message";
import { Projects_Request } from "./message";
import { ServiceType } from "@protobuf-ts/runtime-rpc";
/**
 * @generated ServiceType for protobuf service project.ProjectHandlers
 */
export const ProjectHandlers = new ServiceType("project.ProjectHandlers", [
    { name: "Projects", options: {}, I: Projects_Request, O: Projects_Response },
    { name: "Project", options: {}, I: Project_Request, O: Project_Response },
    { name: "AddProject", options: {}, I: AddProject_Request, O: AddProject_Response },
    { name: "UpdateProject", options: {}, I: UpdateProject_Request, O: UpdateProject_Response },
    { name: "DeleteProject", options: {}, I: DeleteProject_Request, O: DeleteProject_Response },
    { name: "ProjectKeys", options: {}, I: ProjectKeys_Request, O: ProjectKeys_Response },
    { name: "ProjectKey", options: {}, I: ProjectKey_Request, O: ProjectKey_Response },
    { name: "AddProjectKey", options: {}, I: AddProjectKey_Request, O: AddProjectKey_Response },
    { name: "DeleteProjectKey", options: {}, I: DeleteProjectKey_Request, O: DeleteProjectKey_Response }
]);
