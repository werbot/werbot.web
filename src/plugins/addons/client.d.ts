declare module "virtual:werbot-addon" {
  export const msg: string;
}

declare module "virtual:werbot-addon/menu" {
  export default any;
}

declare module "virtual:werbot-addon/route" {
  export const route: RouteRecordRaw[];
}
