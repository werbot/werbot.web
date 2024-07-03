import { MenuItem } from "@/interface/menu";

export const tabMenu: MenuItem[] = [
  {
    name: "Main",
    link: { name: "projects-projectId-setting" }
  },
  {
    name: "Destroy",
    link: { name: "projects-projectId-setting-destroy" },
    danger: true
  }
];
