// @generated from protobuf file "token.proto" (package "token", syntax proto3)
// tslint:disable
// @ts-nocheck
import { UpdateSchemeToken_Response } from "./message/tokenscheme";
import { UpdateSchemeToken_Request } from "./message/tokenscheme";
import { AddTokenSchemeAccess_Response } from "./message/tokenscheme";
import { AddTokenSchemeAccess_Request } from "./message/tokenscheme";
import { AddTokenSchemeAdd_Response } from "./message/tokenscheme";
import { AddTokenSchemeAdd_Request } from "./message/tokenscheme";
import { SchemeTokens_Response } from "./message/tokenscheme";
import { SchemeTokens_Request } from "./message/tokenscheme";
import { UpdateProjectToken_Response } from "./message/tokenproject";
import { UpdateProjectToken_Request } from "./message/tokenproject";
import { AddTokenProjectMember_Response } from "./message/tokenproject";
import { AddTokenProjectMember_Request } from "./message/tokenproject";
import { ProjectTokens_Response } from "./message/tokenproject";
import { ProjectTokens_Request } from "./message/tokenproject";
import { UpdateProfileToken_Response } from "./message/tokenprofile";
import { UpdateProfileToken_Request } from "./message/tokenprofile";
import { AddTokenProfileDelete_Response } from "./message/tokenprofile";
import { AddTokenProfileDelete_Request } from "./message/tokenprofile";
import { AddTokenProfileRegistration_Response } from "./message/tokenprofile";
import { AddTokenProfileRegistration_Request } from "./message/tokenprofile";
import { AddTokenProfileReset_Response } from "./message/tokenprofile";
import { AddTokenProfileReset_Request } from "./message/tokenprofile";
import { ProfileTokens_Response } from "./message/tokenprofile";
import { ProfileTokens_Request } from "./message/tokenprofile";
import { DeleteToken_Response } from "./message/tokenmessage";
import { DeleteToken_Request } from "./message/tokenmessage";
import { ArchivedToken_Response } from "./message/tokenmessage";
import { ArchivedToken_Request } from "./message/tokenmessage";
import { Token_Response } from "./message/tokenmessage";
import { Token_Request } from "./message/tokenmessage";
import { ServiceType } from "@protobuf-ts/runtime-rpc";
/**
 * @generated ServiceType for protobuf service token.TokenHandlers
 */
export const TokenHandlers = new ServiceType("token.TokenHandlers", [
    { name: "Token", options: {}, I: Token_Request, O: Token_Response },
    { name: "ArchivedToken", options: {}, I: ArchivedToken_Request, O: ArchivedToken_Response },
    { name: "DeleteToken", options: {}, I: DeleteToken_Request, O: DeleteToken_Response },
    { name: "ProfileTokens", options: {}, I: ProfileTokens_Request, O: ProfileTokens_Response },
    { name: "AddTokenProfileReset", options: {}, I: AddTokenProfileReset_Request, O: AddTokenProfileReset_Response },
    { name: "AddTokenProfileRegistration", options: {}, I: AddTokenProfileRegistration_Request, O: AddTokenProfileRegistration_Response },
    { name: "AddTokenProfileDelete", options: {}, I: AddTokenProfileDelete_Request, O: AddTokenProfileDelete_Response },
    { name: "UpdateProfileToken", options: {}, I: UpdateProfileToken_Request, O: UpdateProfileToken_Response },
    { name: "ProjectTokens", options: {}, I: ProjectTokens_Request, O: ProjectTokens_Response },
    { name: "AddTokenProjectMember", options: {}, I: AddTokenProjectMember_Request, O: AddTokenProjectMember_Response },
    { name: "UpdateProjectToken", options: {}, I: UpdateProjectToken_Request, O: UpdateProjectToken_Response },
    { name: "SchemeTokens", options: {}, I: SchemeTokens_Request, O: SchemeTokens_Response },
    { name: "AddTokenSchemeAdd", options: {}, I: AddTokenSchemeAdd_Request, O: AddTokenSchemeAdd_Response },
    { name: "AddTokenSchemeAccess", options: {}, I: AddTokenSchemeAccess_Request, O: AddTokenSchemeAccess_Response },
    { name: "UpdateSchemeToken", options: {}, I: UpdateSchemeToken_Request, O: UpdateSchemeToken_Response }
]);
