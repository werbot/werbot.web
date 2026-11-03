import { describe, expect, it } from "vitest";

import type { MenuGroup } from "$lib/utils";
import { mergeMenus } from "$lib/utils";

describe("mergeMenus", () => {
  it("merges groups by key and sorts items by sort", () => {
    const result = mergeMenus([
      {
        group10: [
          { name: "b", link: {}, sort: 20 },
          { name: "a", link: {}, sort: 10 }
        ]
      },
      { group10: [{ name: "c", link: {}, sort: 15 }] }
    ]);

    expect(Object.keys(result)).toEqual(["group10"]);
    expect(result.group10.map((item) => item.name)).toEqual(["a", "c", "b"]);
  });

  it("orders groups by numeric prefix then name", () => {
    const result = mergeMenus([
      {
        group100: [{ name: "x", link: {}, sort: 1 }],
        group10: [{ name: "x", link: {}, sort: 1 }],
        group2: [{ name: "x", link: {}, sort: 1 }]
      }
    ]);

    expect(Object.keys(result)).toEqual(["group2", "group10", "group100"]);
  });

  it("keeps an empty result for empty input", () => {
    const result: MenuGroup = mergeMenus([]);

    expect(result).toEqual({});
  });
});
