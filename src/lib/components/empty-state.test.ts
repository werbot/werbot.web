import { render, screen } from "@testing-library/svelte";
import { createRawSnippet } from "svelte";
import { describe, expect, it } from "vitest";

import EmptyState from "$lib/components/EmptyState.svelte";

describe("EmptyState", () => {
  it("renders the icon, title and description", () => {
    const { container } = render(EmptyState, {
      props: {
        icon: "logs",
        title: "No activity yet",
        description: "Project events will appear here."
      }
    });

    expect(screen.getByText("No activity yet")).toBeInTheDocument();
    expect(screen.getByText("Project events will appear here.")).toBeInTheDocument();
    expect(container.querySelector("use")).toHaveAttribute("href", "#icon-logs");
  });

  it("renders the action snippet when provided", () => {
    const children = createRawSnippet((): { render: () => string } => ({
      render: (): string => "<button>Clear filters</button>"
    }));

    render(EmptyState, {
      props: {
        title: "No events match your filters",
        children
      }
    });

    expect(screen.getByRole("button", { name: "Clear filters" })).toBeInTheDocument();
  });
});
