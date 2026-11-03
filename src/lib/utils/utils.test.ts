import { afterEach, describe, expect, it, vi } from "vitest";

import {
  checkTimestampDifference,
  costFormat,
  getAddressType,
  getSetting,
  getStorage,
  parseJwt,
  removeStorage,
  saveSetting,
  setStorage,
  toDate,
  toInfinity
} from "$lib/utils";

describe("toDate", () => {
  it("formats a protobuf timestamp with the full locale format", () => {
    expect(toDate({ seconds: 1700000000 })).toBe(new Date(1700000000000).toLocaleString());
  });

  it("returns an empty string for a missing timestamp", () => {
    expect(toDate(null)).toBe("");
  });

  it("uses the short locale format for the lite method", () => {
    expect(toDate({ seconds: 1700000000 }, "lite")).toBe(new Date(1700000000000).toLocaleDateString());
  });
});

describe("format", () => {
  it("formats cents as a decimal amount", () => {
    expect(costFormat(1234)).toBe("12.34");
    expect(costFormat(0)).toBe("0");
  });

  it("renders the infinity symbol for unlimited values", () => {
    expect(toInfinity(-1)).toBe("∞");
  });
});

describe("checkTimestampDifference", () => {
  it("accepts a timestamp fresher than the lifetime window", () => {
    expect(checkTimestampDifference(Date.now() - 1000, 3600)).toBe(true);
  });

  it("rejects a timestamp older than the lifetime window", () => {
    expect(checkTimestampDifference(Date.now() - 5000, 3600)).toBe(false);
  });
});

describe("parseJwt", () => {
  it("decodes a base64url payload", () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0MiIsInJvbGUiOiJhZG1pbiJ9.signature";

    expect(parseJwt(token)).toEqual({ sub: "42", role: "admin" });
  });
});

describe("getAddressType", () => {
  it("classifies IPv4, IPv6 and hostname addresses", () => {
    expect(getAddressType("127.0.0.1")).toBe("IPv4");
    expect(getAddressType("::1")).toBe("IPv6");
    expect(getAddressType("example.com")).toBe("Hostname");
  });
});

describe("storage", () => {
  afterEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("round-trips a value through storage", () => {
    setStorage("unit-test-key", "unit-test-value");
    expect(getStorage("unit-test-key")).toBe("unit-test-value");

    removeStorage("unit-test-key");
    expect(getStorage("unit-test-key")).toBeNull();
  });

  it("ignores invalid setting values", () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});

    saveSetting("valid", "stored");
    saveSetting("undefined-value", undefined);
    saveSetting("null-value", null);
    saveSetting("undefined-string", "undefined");
    saveSetting("null-string", "null");

    expect(getSetting("valid")).toBe("stored");
    expect(localStorage.getItem("undefined-value")).toBeNull();
    expect(localStorage.getItem("null-value")).toBeNull();
    expect(localStorage.getItem("undefined-string")).toBeNull();
    expect(localStorage.getItem("null-string")).toBeNull();
  });
});
