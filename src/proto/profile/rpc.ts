// @generated from protobuf file "rpc.proto" (package "profile", syntax proto3)
// tslint:disable
// @ts-nocheck
import { UpdateStatus_Response } from "./message";
import { UpdateStatus_Request } from "./message";
import { ProfileByEmail_Request } from "./message";
import { ProfileIDByLogin_Response } from "./message";
import { ProfileIDByLogin_Request } from "./message";
import { UpdatePassword_Response } from "./message";
import { UpdatePassword_Request } from "./message";
import { DeleteProfile_Response } from "./message";
import { DeleteProfile_Request } from "./message";
import { UpdateProfile_Response } from "./message";
import { UpdateProfile_Request } from "./message";
import { AddProfile_Response } from "./message";
import { AddProfile_Request } from "./message";
import { Profile_Request } from "./message";
import { Profiles_Response } from "./message";
import { Profiles_Request } from "./message";
import { ResetPassword_Response } from "./message";
import { ResetPassword_Request } from "./message";
import { Profile_Response } from "./message";
import { SignIn_Request } from "./message";
import { ServiceType } from "@protobuf-ts/runtime-rpc";
/**
 * @generated ServiceType for protobuf service profile.ProfileHandlers
 */
export const ProfileHandlers = new ServiceType("profile.ProfileHandlers", [
    { name: "SignIn", options: {}, I: SignIn_Request, O: Profile_Response },
    { name: "ResetPassword", options: {}, I: ResetPassword_Request, O: ResetPassword_Response },
    { name: "Profiles", options: {}, I: Profiles_Request, O: Profiles_Response },
    { name: "Profile", options: {}, I: Profile_Request, O: Profile_Response },
    { name: "AddProfile", options: {}, I: AddProfile_Request, O: AddProfile_Response },
    { name: "UpdateProfile", options: {}, I: UpdateProfile_Request, O: UpdateProfile_Response },
    { name: "DeleteProfile", options: {}, I: DeleteProfile_Request, O: DeleteProfile_Response },
    { name: "UpdatePassword", options: {}, I: UpdatePassword_Request, O: UpdatePassword_Response },
    { name: "ProfileIDByLogin", options: {}, I: ProfileIDByLogin_Request, O: ProfileIDByLogin_Response },
    { name: "ProfileByEmail", options: {}, I: ProfileByEmail_Request, O: Profile_Response },
    { name: "UpdateStatus", options: {}, I: UpdateStatus_Request, O: UpdateStatus_Response }
]);
