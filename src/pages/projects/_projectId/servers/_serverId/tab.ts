import { MenuItem } from "@/interface/menu";

export const tabMenu: MenuItem[] = [
  {
    name: "Info",
    link: { name: "projects-projectId-servers-serverId" },
  },
  {
    name: "Sessions",
    link: { name: "projects-projectId-servers-serverId-session" },
  },
  {
    name: "Members",
    link: { name: "projects-projectId-servers-serverId-members" },
  },
  {
    name: "Activity",
    link: { name: "projects-projectId-servers-serverId-activity" },
  },
  {
    name: "Firewall",
    link: { name: "projects-projectId-servers-serverId-firewall" },
  },
  {
    name: "Setting",
    link: { name: "projects-projectId-servers-serverId-setting" },
  },
  {
    name: "Destroy",
    link: { name: "projects-projectId-servers-serverId-destroy" },
    danger: true,
  },
];
