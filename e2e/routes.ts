import { existsSync } from "node:fs";
import { resolve } from "node:path";

// IDs from internal/utils/test/fixture.go and fixtures/migration/20221122125822_init_data.sql
const projectId = "2bef1080-cd6e-49e5-8042-1224cf6a3da9";
const serverId = "156d8d65-cfe5-48a4-a636-198a5f509abf";
const memberId = "9d3f7efc-14a5-436d-a763-314441d6e0a5";
const sessionId = "00000000-0000-0000-0000-000000000000";
const invite = "374060a3-6c9c-44b5-9fbd-ce1ea8af6c7b";
const scheme = "server_ssh";

export interface RouteDefinition {
  id: string;
  path: string;
  auth: boolean;
  /**
   * The Vue page throws during render and leaves the page blank, so its
   * baseline records that blank page instead of a layout.
   */
  blank?: boolean;
}

const project = `/projects/${projectId}`;
const server = `${project}/servers/${serverId}`;

/**
 * `add-on/saas` contributes the `/admin/license1` and `/admin/license2` pages and
 * the "SaaS License 1/2" entries in the admin sidebar. Every `/admin` baseline
 * therefore depends on it being checked out.
 */
export const HAS_SAAS_ADDON = ["../add-on", "add-on"].some((dir) =>
  existsSync(resolve(process.cwd(), dir, "saas/web/pages/admin/menu.ts"))
);

export const ROUTES: RouteDefinition[] = [
  { id: "index", path: "/", auth: true },

  { id: "projects", path: "/projects", auth: true },
  { id: "projects-add", path: "/projects/add", auth: true },

  { id: "project", path: project, auth: true },
  { id: "project-logs", path: `${project}/logs`, auth: true },
  { id: "project-members", path: `${project}/members`, auth: true },
  { id: "project-members-add", path: `${project}/members/add`, auth: true },
  { id: "project-members-invites", path: `${project}/members/invites`, auth: true },
  { id: "project-teams", path: `${project}/teams`, auth: true },
  { id: "project-setting", path: `${project}/setting`, auth: true },
  { id: "project-setting-api", path: `${project}/setting/api`, auth: true },
  { id: "project-setting-destroy", path: `${project}/setting/destroy`, auth: true },

  { id: "project-servers", path: `${project}/servers`, auth: true },
  { id: "project-servers-add", path: `${project}/servers/add`, auth: true },
  { id: "project-servers-add-scheme", path: `${project}/servers/add/${scheme}`, auth: true },

  { id: "server", path: server, auth: true },
  { id: "server-members", path: `${server}/members`, auth: true },
  { id: "server-members-add", path: `${server}/members/add`, auth: true },
  { id: "server-members-member", path: `${server}/members/${memberId}`, auth: true },
  { id: "server-session", path: `${server}/session`, auth: true },
  // Renders blank: the page links to the non-existent `projects-projectId-servers-serverId-sessions` route.
  { id: "server-session-session", path: `${server}/session/${sessionId}`, auth: true, blank: true },
  { id: "server-activity", path: `${server}/activity`, auth: true },
  { id: "server-firewall", path: `${server}/firewall`, auth: true },
  { id: "server-setting", path: `${server}/setting`, auth: true },
  { id: "server-destroy", path: `${server}/destroy`, auth: true },

  { id: "project-applications", path: `${project}/applications`, auth: true },
  { id: "project-applications-add", path: `${project}/applications/add`, auth: true },
  { id: "project-clouds", path: `${project}/clouds`, auth: true },
  { id: "project-clouds-add", path: `${project}/clouds/add`, auth: true },
  { id: "project-containers", path: `${project}/containers`, auth: true },
  { id: "project-containers-add", path: `${project}/containers/add`, auth: true },
  { id: "project-databases", path: `${project}/databases`, auth: true },
  { id: "project-databases-add", path: `${project}/databases/add`, auth: true },
  { id: "project-desktops", path: `${project}/desktops`, auth: true },
  { id: "project-desktops-add", path: `${project}/desktops/add`, auth: true },

  { id: "profile-logs", path: "/profile/logs", auth: true },
  { id: "profile-keys", path: "/profile/keys", auth: true },
  { id: "profile-keys-add", path: "/profile/keys/add", auth: true },
  { id: "profile-setting", path: "/profile/setting", auth: true },
  { id: "profile-setting-password", path: "/profile/setting/password", auth: true },
  { id: "profile-setting-destroy", path: "/profile/setting/destroy", auth: true },

  { id: "admin", path: "/admin", auth: true },
  { id: "admin-users", path: "/admin/users", auth: true },
  { id: "admin-projects", path: "/admin/projects", auth: true },
  { id: "admin-settings", path: "/admin/settings", auth: true },
  { id: "admin-subscriptions", path: "/admin/subscriptions", auth: true },
  { id: "admin-licenses", path: "/admin/licenses", auth: true },
  ...(HAS_SAAS_ADDON
    ? [
        { id: "admin-license1", path: "/admin/license1", auth: true },
        { id: "admin-license2", path: "/admin/license2", auth: true }
      ]
    : []),

  { id: "auth-signin", path: "/auth/signin", auth: false },
  { id: "auth-signup", path: "/auth/signup", auth: false },
  { id: "auth-password-reset", path: "/auth/password_reset", auth: false },

  { id: "invite", path: "/invite", auth: false },
  { id: "invite-project", path: `/invite/project/${invite}`, auth: false },

  { id: "404", path: "/404", auth: false }
];
