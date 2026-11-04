export type Section = "admin" | "profile" | "project";

export type AddonRouteNode = {
  path: string;
  name?: string;
  component?: unknown;
  redirect?: string | { name?: string; params?: Record<string, string> };
  props?: boolean;
  meta?: { layout?: string } & Record<string, unknown>;
  children?: AddonRouteNode[];
};

export type RouteModule = {
  route?: AddonRouteNode[];
};

export type MenuItem = {
  name: string;
  link: { name?: string; params?: Record<string, string> };
  icon?: string;
  sort?: number;
  danger?: boolean;
  isUserRole?: number;
};

export type MenuGroup = Record<string, MenuItem[]>;

export type GeneratedRoute = {
  name: string;
  pattern: string;
  group: string;
  segments: string;
  root: string;
  component?: string;
  props: boolean;
  redirect?: string | { name?: string; params?: Record<string, string> };
};

export type GeneratedMenu = {
  section: Section;
  menu: MenuGroup;
};

export type Manifest = {
  files: string[];
};

export const SECTIONS: Section[] = ["admin", "profile", "project"];

export const SECTION_LAYOUT: Record<Section, string> = {
  admin: "private",
  profile: "private",
  project: "private"
};
