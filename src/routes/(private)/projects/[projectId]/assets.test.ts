import { cleanup, render } from "@testing-library/svelte";
import { tick } from "svelte";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("$app/state", async () => {
  const { pageState } = await import("$lib/test/page.svelte");
  return { page: pageState };
});

import { setPageState } from "$lib/test/page.svelte";
import ApplicationsAdd from "@/routes/(private)/projects/[projectId]/applications/add/+page.svelte";
import Applications from "@/routes/(private)/projects/[projectId]/applications/+page.svelte";
import CloudsAdd from "@/routes/(private)/projects/[projectId]/clouds/add/+page.svelte";
import Clouds from "@/routes/(private)/projects/[projectId]/clouds/+page.svelte";
import ContainersAdd from "@/routes/(private)/projects/[projectId]/containers/add/+page.svelte";
import Containers from "@/routes/(private)/projects/[projectId]/containers/+page.svelte";
import DatabasesAdd from "@/routes/(private)/projects/[projectId]/databases/add/+page.svelte";
import Databases from "@/routes/(private)/projects/[projectId]/databases/+page.svelte";
import DesktopsAdd from "@/routes/(private)/projects/[projectId]/desktops/add/+page.svelte";
import Desktops from "@/routes/(private)/projects/[projectId]/desktops/+page.svelte";

import type { Component } from "svelte";

type Asset = {
  slug: string;
  title: string;
  list: Component;
  add: Component;
  groups: number;
  schemes: { name: string; image: string }[];
};

const projectId = "2bef1080-cd6e-49e5-8042-1224cf6a3da9";

const ADD_TITLE = "Step 1: Select the scheme you want to add";

const ASSETS: Asset[] = [
  {
    slug: "applications",
    title: "Applications",
    list: Applications,
    add: ApplicationsAdd,
    groups: 5,
    schemes: [
      { name: "Site", image: "/img/schemes/applications/site.svg" },
      { name: "Grafana", image: "/img/schemes/applications/grafana.svg" },
      { name: "Kibana", image: "/img/schemes/applications/kibana.svg" },
      { name: "Portainer", image: "/img/schemes/applications/portainer.svg" },
      { name: "Rancher", image: "/img/schemes/applications/rancher.svg" }
    ]
  },
  {
    slug: "clouds",
    title: "Clouds",
    list: Clouds,
    add: CloudsAdd,
    groups: 1,
    schemes: [
      { name: "Amazon", image: "/img/schemes/clouds/amazon.svg" },
      { name: "Azure", image: "/img/schemes/clouds/azure.svg" },
      { name: "Google", image: "/img/schemes/clouds/google.svg" },
      { name: "DO", image: "/img/schemes/clouds/digitalocean.svg" },
      { name: "Hetzner", image: "/img/schemes/clouds/hetzner.svg" }
    ]
  },
  {
    slug: "containers",
    title: "Containers",
    list: Containers,
    add: ContainersAdd,
    groups: 1,
    schemes: [
      { name: "Docker", image: "/img/schemes/containers/docker.svg" },
      { name: "K8S", image: "/img/schemes/containers/k8s.svg" },
      { name: "podman", image: "/img/schemes/containers/podman.svg" }
    ]
  },
  {
    slug: "databases",
    title: "Databases",
    list: Databases,
    add: DatabasesAdd,
    groups: 1,
    schemes: [
      { name: "MySQL", image: "/img/schemes/databases/mysql.svg" },
      { name: "Postgres", image: "/img/schemes/databases/postgresql.svg" },
      { name: "Redis", image: "/img/schemes/databases/redis.svg" },
      { name: "MongoDB", image: "/img/schemes/databases/mongodb.svg" },
      { name: "Elastic", image: "/img/schemes/databases/elastic.svg" }
    ]
  },
  {
    slug: "desktops",
    title: "Desktops",
    list: Desktops,
    add: DesktopsAdd,
    groups: 1,
    schemes: [
      { name: "RDP", image: "/img/schemes/desktops/rdp.svg" },
      { name: "VNC", image: "/img/schemes/desktops/vnc.svg" }
    ]
  }
];

describe("project asset routes", () => {
  beforeEach(() => {
    cleanup();
  });

  it("each asset list renders its section placeholder and add link", async () => {
    for (const asset of ASSETS) {
      setPageState(`/projects/${projectId}/${asset.slug}`, { projectId });

      const { container, unmount } = render(asset.list);
      await tick();

      const artboard = container.querySelector(".artboard");
      expect(artboard).not.toBeNull();
      expect(container.firstElementChild).toBe(artboard);

      const header = container.querySelector(".artboard > header");
      expect(header).not.toBeNull();
      expect(header?.querySelector(":scope > h1")).toHaveTextContent(asset.title);
      expect(header?.querySelector(":scope > a.breadcrumbs")).toHaveAttribute(
        "href",
        `/projects/${projectId}/${asset.slug}/add`
      );
      expect(header?.querySelector(":scope > a.breadcrumbs")).toHaveTextContent("add new");
      expect(container.querySelector(".desc")).toHaveTextContent("Empty");
      expect(container.querySelector(".content")).toHaveTextContent("section under development");
      expect(document.title).toBe(asset.title);

      unmount();
    }
  });

  it("each add form renders the same fields as the Vue form", async () => {
    for (const asset of ASSETS) {
      setPageState(`/projects/${projectId}/${asset.slug}/add`, { projectId });

      const { container, unmount } = render(asset.add);
      await tick();

      const artboard = container.querySelector(".artboard");
      expect(artboard).not.toBeNull();
      expect(container.firstElementChild).toBe(artboard);

      const header = container.querySelector(".artboard > header");
      expect(header).not.toBeNull();
      expect(header?.querySelector(":scope > h1")).toHaveTextContent(asset.title);
      expect(header?.querySelector(":scope > div.breadcrumbs")).toHaveTextContent("Select scheme");
      expect(container.querySelector(".desc")).toHaveTextContent(ADD_TITLE);

      const content = container.querySelector(".artboard > .content");
      expect(content).not.toBeNull();

      const groups = Array.from(content?.querySelectorAll(":scope > ol.schemes") ?? []);
      expect(groups).toHaveLength(asset.groups);

      const items = Array.from(content?.querySelectorAll("ol.schemes > li.element.disable") ?? []);
      expect(items.map((item) => item.querySelector("div")?.textContent)).toEqual(
        asset.schemes.map((scheme) => scheme.name)
      );
      expect(items.map((item) => item.querySelector("img")?.getAttribute("src"))).toEqual(
        asset.schemes.map((scheme) => scheme.image)
      );
      expect(document.title).toBe(ADD_TITLE);

      unmount();
    }
  });
});
