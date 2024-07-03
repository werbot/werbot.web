import { MenuItem } from "@/interface/menu";

export const tabMenu: MenuItem[] = [
  {
    name: "Main",
    link: { name: "profile-setting" }
  },
  {
    name: "Password",
    link: { name: "profile-setting-password" }
  },
  {
    name: "Destroy",
    link: { name: "profile-setting-destroy" },
    danger: true
  }
];
