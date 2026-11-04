import { describe, expect, it } from "vitest";

import { tokenProfile } from "$lib/api/token";

describe("tokenProfile", () => {
  it("reads profile metadata from project and registration invites", () => {
    expect(
      tokenProfile({
        profile: {
          name: "Carla",
          surname: "Smith",
          email: "carla@example.com"
        }
      })
    ).toEqual({
      name: "Carla",
      surname: "Smith",
      email: "carla@example.com"
    });
  });

  it("falls back to the scheme email for scheme invites", () => {
    expect(tokenProfile({ scheme: { email: "scheme@example.com" } })).toEqual({
      name: "",
      surname: "",
      email: "scheme@example.com"
    });
  });

  it("returns empty fields when the token has no metadata", () => {
    expect(tokenProfile(null)).toEqual({ name: "", surname: "", email: "" });
  });
});
