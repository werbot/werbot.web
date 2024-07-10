import { MenuItem } from "@/interface/menu";

export const tabMenu: MenuItem[] = [
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
