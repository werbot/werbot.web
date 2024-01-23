import { http } from "@/api";
import { SignIn_Request, RefreshTokenRequest } from "@proto/account";

enum URL {
  auth = "auth",
}

const signIn = async (data: SignIn_Request): Promise<void> =>
  http("POST", `${URL.auth}/signin`, { data });

const logout = async (): Promise<void> => http("POST", `${URL.auth}/logout`);

const refresh = async (data: RefreshTokenRequest): Promise<void> =>
  http("POST", `${URL.auth}/refresh`, { data });

const sendEmail = async (email: string): Promise<void> =>
  http("POST", `${URL.auth}/password_reset`, { data: { email } });

const checkResetToken = async (token: string): Promise<void> =>
  http("POST", `${URL.auth}/password_reset/${token}`, {});

// This function resets the user password by making an HTTP request to the '/password_reset/:token' endpoint of the URL.auth domain.
// It takes in two parameters:
// 1. token: a string representing the password reset token for verifying the user's identity.
// 2. password: a string representing the new password that the user wants to set.
const resetPassword = async (token: string, password: string): Promise<void> =>
  http("POST", `${URL.auth}/password_reset/${token}`, { data: { password } });

const getProfile = async (): Promise<void> => http("GET", `${URL.auth}/profile`);

export { logout, signIn, refresh, getProfile, sendEmail, checkResetToken, resetPassword };
