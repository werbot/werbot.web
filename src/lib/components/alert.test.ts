import { render, screen } from "@testing-library/svelte";
import { tick } from "svelte";
import { afterEach, describe, expect, it, vi } from "vitest";

import Alert from "$lib/components/Alert.svelte";

function dispatchMessage(name: string, detail: string): void {
  window.dispatchEvent(new CustomEvent(name, { detail }));
}

describe("Alert", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders a notification for a connextSuccess event with its text", async () => {
    render(Alert);
    await tick();

    dispatchMessage("connextSuccess", "Project created");
    await tick();

    const text = screen.getByText("Project created");
    const notification = text.closest(".notification");
    expect(notification).not.toBeNull();
    expect(notification).toHaveClass("notification");
    expect(notification?.querySelector(".ico")).not.toBeNull();
    expect(notification?.querySelector(".message")).not.toBeNull();
    expect(screen.getByText("Success")).toHaveClass("text-green-500");
  });

  it("removes the notification after 4000 ms", async () => {
    vi.useFakeTimers();

    render(Alert);
    await tick();

    dispatchMessage("connextError", "Something broke");
    await tick();
    expect(screen.getByText("Something broke")).toBeInTheDocument();

    await vi.advanceTimersByTimeAsync(3999);
    await tick();
    expect(screen.getByText("Something broke")).toBeInTheDocument();

    await vi.advanceTimersByTimeAsync(1);
    await tick();
    expect(screen.queryByText("Something broke")).toBeNull();
  });
});
