import type { MenuItem } from "$lib/utils";

export const settingTabs: MenuItem[] = [
  {
    name: "Main",
    link: { name: "projects-projectId-setting" }
  },
  {
    name: "Api",
    link: { name: "projects-projectId-setting-api" }
  },
  {
    name: "Destroy",
    link: { name: "projects-projectId-setting-destroy" },
    danger: true
  }
];

export const membersTabs: MenuItem[] = [
  {
    name: "Members",
    link: { name: "projects-projectId-members" }
  },
  {
    name: "Invites",
    link: { name: "projects-projectId-members-invites" }
  }
];

export const serverTabs: MenuItem[] = [
  {
    name: "Info",
    link: { name: "projects-projectId-servers-serverId" }
  },
  {
    name: "Sessions",
    link: { name: "projects-projectId-servers-serverId-session" }
  },
  {
    name: "Members",
    link: { name: "projects-projectId-servers-serverId-members" }
  },
  {
    name: "Activity",
    link: { name: "projects-projectId-servers-serverId-activity" }
  },
  {
    name: "Firewall",
    link: { name: "projects-projectId-servers-serverId-firewall" }
  },
  {
    name: "Setting",
    link: { name: "projects-projectId-servers-serverId-setting" }
  },
  {
    name: "Destroy",
    link: { name: "projects-projectId-servers-serverId-destroy" },
    danger: true
  }
];
