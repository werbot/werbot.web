/// <reference types="vite/client" />

declare module "virtual:svg-icons-register";

declare global {
  namespace App {
    interface PageData {
      layoutStyle?: "blank";
    }
  }
}

export {};
