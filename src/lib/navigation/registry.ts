export type RouteDef = {
  name: string;
  pattern: string;
};

export const ROUTES: RouteDef[] = [
  { name: "index", pattern: "/" },
  { name: "404", pattern: "/404" },

  { name: "admin", pattern: "/admin" },
  { name: "admin-license", pattern: "/admin/licenses" },
  { name: "admin-projects", pattern: "/admin/projects" },
  { name: "admin-settings", pattern: "/admin/settings" },
  { name: "admin-subscriptions", pattern: "/admin/subscriptions" },
  { name: "admin-users", pattern: "/admin/users" },

  { name: "auth", pattern: "/auth" },
  { name: "auth-signin", pattern: "/auth/signin" },
  { name: "auth-signup", pattern: "/auth/signup/[[token]]" },
  { name: "auth-logout", pattern: "/auth/logout" },
  { name: "auth-password_reset", pattern: "/auth/password_reset" },
  { name: "auth-password_reset-token", pattern: "/auth/password_reset/[token]" },

  { name: "invite", pattern: "/invite" },
  { name: "invite-token", pattern: "/invite/token/[invite]" },
  { name: "invite-project", pattern: "/invite/project" },
  { name: "invite-project-invite", pattern: "/invite/project/[invite]" },

  { name: "profile", pattern: "/profile" },
  { name: "profile-logs", pattern: "/profile/logs" },
  { name: "profile-keys", pattern: "/profile/keys" },
  { name: "profile-keys-add", pattern: "/profile/keys/add" },
  { name: "profile-setting", pattern: "/profile/setting" },
  { name: "profile-setting-password", pattern: "/profile/setting/password" },
  { name: "profile-setting-destroy", pattern: "/profile/setting/destroy" },
  { name: "profile-setting-destroy-token", pattern: "/profile/setting/destroy/[token]" },

  { name: "projects", pattern: "/projects" },
  { name: "projects-add", pattern: "/projects/add" },
  { name: "projects-projectId", pattern: "/projects/[projectId]" },
  { name: "projects-projectId-logs", pattern: "/projects/[projectId]/logs" },
  { name: "projects-projectId-members", pattern: "/projects/[projectId]/members" },
  { name: "projects-projectId-members-add", pattern: "/projects/[projectId]/members/add" },
  { name: "projects-projectId-members-invites", pattern: "/projects/[projectId]/members/invites" },
  { name: "projects-projectId-setting", pattern: "/projects/[projectId]/setting" },
  { name: "projects-projectId-setting-api", pattern: "/projects/[projectId]/setting/api" },
  { name: "projects-projectId-setting-destroy", pattern: "/projects/[projectId]/setting/destroy" },
  { name: "projects-projectId-teams", pattern: "/projects/[projectId]/teams" },
  { name: "projects-projectId-applications", pattern: "/projects/[projectId]/applications" },
  { name: "projects-projectId-applications-add", pattern: "/projects/[projectId]/applications/add" },
  { name: "projects-projectId-clouds", pattern: "/projects/[projectId]/clouds" },
  { name: "projects-projectId-clouds-add", pattern: "/projects/[projectId]/clouds/add" },
  { name: "projects-projectId-containers", pattern: "/projects/[projectId]/containers" },
  { name: "projects-projectId-containers-add", pattern: "/projects/[projectId]/containers/add" },
  { name: "projects-projectId-databases", pattern: "/projects/[projectId]/databases" },
  { name: "projects-projectId-databases-add", pattern: "/projects/[projectId]/databases/add" },
  { name: "projects-projectId-desktops", pattern: "/projects/[projectId]/desktops" },
  { name: "projects-projectId-desktops-add", pattern: "/projects/[projectId]/desktops/add" },
  { name: "projects-projectId-servers", pattern: "/projects/[projectId]/servers" },
  { name: "projects-projectId-servers-add", pattern: "/projects/[projectId]/servers/add" },
  {
    name: "projects-projectId-servers-add-scheme",
    pattern: "/projects/[projectId]/servers/add/[scheme]"
  },
  {
    name: "projects-projectId-servers-serverId",
    pattern: "/projects/[projectId]/servers/[serverId]"
  },
  {
    name: "projects-projectId-servers-serverId-members",
    pattern: "/projects/[projectId]/servers/[serverId]/members"
  },
  {
    name: "projects-projectId-servers-serverId-members-add",
    pattern: "/projects/[projectId]/servers/[serverId]/members/add"
  },
  {
    name: "projects-projectId-servers-serverId-members-memberId",
    pattern: "/projects/[projectId]/servers/[serverId]/members/[memberId]"
  },
  {
    name: "/projects-projectId-servers-serverId-members-memberId-logId",
    pattern: "/projects/[projectId]/servers/[serverId]/members/[memberId]/[logId]"
  },
  {
    name: "projects-projectId-servers-serverId-session",
    pattern: "/projects/[projectId]/servers/[serverId]/session"
  },
  {
    name: "projects-projectId-servers-serverId-session-sessionId",
    pattern: "/projects/[projectId]/servers/[serverId]/session/[sessionId]"
  },
  {
    name: "projects-projectId-servers-serverId-activity",
    pattern: "/projects/[projectId]/servers/[serverId]/activity"
  },
  {
    name: "projects-projectId-servers-serverId-firewall",
    pattern: "/projects/[projectId]/servers/[serverId]/firewall"
  },
  {
    name: "projects-projectId-servers-serverId-setting",
    pattern: "/projects/[projectId]/servers/[serverId]/setting"
  },
  {
    name: "projects-projectId-servers-serverId-destroy",
    pattern: "/projects/[projectId]/servers/[serverId]/destroy"
  }
];

const routes = new Map<string, string>(ROUTES.map((route) => [route.name, route.pattern]));

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function patternRegExp(pattern: string): RegExp {
  if (pattern === "/") {
    return /^\/$/;
  }

  let source = "";

  for (const segment of pattern.split("/").filter(Boolean)) {
    if (segment.startsWith("[[") && segment.endsWith("]]")) {
      source += "(?:/[^/]+)?";
    } else if (segment.startsWith("[") && segment.endsWith("]")) {
      source += "/[^/]+";
    } else {
      source += `/${escapeRegExp(segment)}`;
    }
  }

  return new RegExp(`^${source}(?:/|$)`);
}

export function registerRoutes(defs: RouteDef[]): void {
  for (const def of defs) {
    const existing = ROUTES.findIndex((route) => route.name === def.name);

    if (existing === -1) {
      ROUTES.push(def);
    } else {
      ROUTES[existing] = def;
    }

    routes.set(def.name, def.pattern);
  }
}

export function routePath(name: string, params: Record<string, string> = {}): string {
  const pattern = routes.get(name);

  if (pattern === undefined) {
    throw new Error(`Unknown route name: ${name}`);
  }

  if (pattern === "/") {
    return "/";
  }

  let path = "";

  for (const segment of pattern.split("/").filter(Boolean)) {
    if (segment.startsWith("[[") && segment.endsWith("]]")) {
      const key = segment.slice(2, -2);

      if (params[key]) {
        path += `/${encodeURIComponent(params[key])}`;
      }
    } else if (segment.startsWith("[") && segment.endsWith("]")) {
      const key = segment.slice(1, -1);
      const value = params[key];

      if (value === undefined) {
        throw new Error(`Missing route param: ${key} for route: ${name}`);
      }

      path += `/${encodeURIComponent(value)}`;
    } else {
      path += `/${segment}`;
    }
  }

  return path;
}

export function isActiveRoute(name: string, pathname: string): boolean {
  const pattern = routes.get(name);

  if (pattern === undefined) {
    throw new Error(`Unknown route name: ${name}`);
  }

  return patternRegExp(pattern).test(pathname);
}
