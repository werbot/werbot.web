import { api } from "$lib/api";
import { Status } from "@proto/token/tokenenum";

export interface TokenProfile {
  name: string;
  surname: string;
  email: string;
}

export interface TokenInfo {
  token?: string;
  owner_id?: string;
  section?: number | string;
  action?: number | string;
  status?: Status | number | string;
  profile_id?: string;
  profile_exists?: boolean;
  project_id?: string;
  scheme_id?: string;
  profile?: Partial<TokenProfile>;
  name?: string;
  surname?: string;
  email?: string;
  created_at?: string | { seconds: number; nanos?: number };
  updated_at?: string | { seconds: number; nanos?: number };
  expired_at?: string | { seconds: number; nanos?: number };
}

const statusNames: Record<number, string> = {
  0: "Unknown",
  1: "Done",
  2: "Sent",
  3: "Used",
  4: "Deleted",
  5: "Archived"
};

function normalizeStatus(status: TokenInfo["status"]): number {
  if (typeof status === "number") {
    return status;
  }
  if (!status) {
    return 0;
  }

  const value = String(status).toLowerCase();
  const namedStatuses: Record<string, number> = {
    done: Status.done,
    activated: Status.done,
    sent: Status.sent,
    send: Status.sent,
    used: Status.used,
    deleted: Status.deleted,
    archived: Status.archived
  };

  if (value in namedStatuses) {
    return namedStatuses[value];
  }

  const numericStatus = Number(status);
  return Number.isNaN(numericStatus) ? 0 : numericStatus;
}

export function tokenStatusName(status: TokenInfo["status"]): string {
  return statusNames[normalizeStatus(status)] ?? statusNames[0];
}

export function tokenStatusColor(status: TokenInfo["status"]): string {
  switch (normalizeStatus(status)) {
    case Status.done:
      return "green";
    case Status.sent:
      return "yellow";
    case Status.used:
      return "gray";
    case Status.deleted:
      return "red";
    case Status.archived:
      return "gray";
    default:
      return "gray";
  }
}

export function isTokenUsable(token?: TokenInfo | null): boolean {
  return normalizeStatus(token?.status) === Status.sent;
}

export function tokenProfile(token?: TokenInfo | null): TokenProfile {
  return {
    name: token?.profile?.name ?? token?.name ?? "",
    surname: token?.profile?.surname ?? token?.surname ?? "",
    email: token?.profile?.email ?? token?.email ?? ""
  };
}

export function tokenInviteLink(token: string): string {
  return `${window.location.origin}/invite/project/${token}`;
}

export async function getTokenInfo(token: string): Promise<any> {
  return api().GET(`/v1/tokens/${token}`);
}

export async function registerToken(token: string, password: string): Promise<any> {
  return api().POST(`/v1/tokens/register`, {}, { token, password });
}

export async function acceptToken(
  token: string,
  data: { password?: string; name?: string; surname?: string } = {}
): Promise<any> {
  return api().POST(`/v1/tokens/accept`, {}, { token, ...data });
}

export async function listProjectTokens(projectId: string, params: object = {}): Promise<any> {
  return api().GET(`/v1/tokens/project/${projectId}`, params);
}

export async function createProjectToken(
  projectId: string,
  data: { email?: string; name?: string; surname?: string; profile_id?: string }
): Promise<any> {
  return api().POST(`/v1/tokens/project/${projectId}`, {}, data);
}

export async function deleteToken(token: string, ownerId?: string | null): Promise<any> {
  return api().DELETE(`/v1/tokens/${token}`, ownerId ? { owner_id: ownerId } : {});
}

export async function listProfileTokens(params: object = {}): Promise<any> {
  return api().GET(`/v1/tokens/profile`, params);
}

export async function createProfileToken(data: { email: string; name: string; surname: string }): Promise<any> {
  return api().POST(`/v1/tokens/profile`, {}, data);
}

export function registrationInviteLink(token: string): string {
  return `${window.location.origin}/auth/signup/${token}`;
}

export async function createSchemeToken(schemeId: string, data: { email?: string; profile_id?: string }): Promise<any> {
  return api().POST(`/v1/tokens/scheme/${schemeId}`, {}, data);
}

export function tokenAcceptLink(token: string): string {
  return `${window.location.origin}/invite/token/${token}`;
}

export async function listSchemeTokens(schemeId: string, params: object = {}): Promise<any> {
  return api().GET(`/v1/tokens/scheme/${schemeId}`, params);
}
