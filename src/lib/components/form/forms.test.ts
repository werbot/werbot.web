import { fireEvent, render, screen, within } from "@testing-library/svelte";
import { createRawSnippet, type Snippet } from "svelte";
import { describe, expect, it } from "vitest";

import Button from "$lib/components/form/Button.svelte";
import InputHost from "$lib/components/form/__fixtures__/InputHost.svelte";
import SelectHost from "$lib/components/form/__fixtures__/SelectHost.svelte";
import ToggleHost from "$lib/components/form/__fixtures__/ToggleHost.svelte";

function saveSnippet(): Snippet {
  return createRawSnippet((): { render: () => string } => ({
    render: (): string => "<span>Save</span>"
  }));
}

describe("form components", () => {
  it("Input trims nothing by itself and emits the typed value", async () => {
    render(InputHost, { props: { name: "Title", initial: "" } });
    const input = screen.getByRole("textbox") as HTMLInputElement;

    // Parents call trim() on submit; the component must pass the raw value through.
    await fireEvent.input(input, { target: { value: "  a  " } });

    expect(screen.getByTestId("bound").textContent).toBe("  a  ");
    expect(input.value).toBe("  a  ");
  });

  it("Input shows the error span and error class", () => {
    render(InputHost, { props: { name: "Title", initial: "a", error: "Required field" } });

    const error = screen.getByText("Required field");
    expect(error.tagName).toBe("SPAN");
    expect(error).toHaveClass("error");

    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("input");
    expect(input).toHaveClass("error");
  });

  it("Toggle updates bound value on change", async () => {
    render(ToggleHost, { props: { name: "Enabled", initial: false } });
    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;

    expect(checkbox.checked).toBe(false);
    await fireEvent.click(checkbox);

    expect(screen.getByTestId("bound").textContent).toBe("true");
    expect(checkbox.checked).toBe(true);
  });

  it("Select opens on click, lists options, selects a value and closes", async () => {
    render(SelectHost, { props: { name: "Region", initial: "eu", options: ["eu", "us"] } });
    const button = screen.getByRole("button");

    expect(button).toHaveTextContent("eu");
    expect(screen.queryByRole("list")).toBeNull();

    await fireEvent.click(button);

    const list = screen.getByRole("list");
    expect(
      within(list)
        .getAllByRole("listitem")
        .map((item): string | undefined => item.textContent?.trim())
    ).toEqual(["eu", "us"]);

    await fireEvent.click(screen.getByText("us"));

    expect(screen.queryByRole("list")).toBeNull();
    expect(button).toHaveTextContent("us");
    expect(screen.getByTestId("bound").textContent).toBe("us");
  });

  it("Select closes when clicking outside", async () => {
    render(SelectHost, { props: { name: "Region", initial: "eu", options: ["eu", "us"] } });

    await fireEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("list")).toBeInTheDocument();

    await fireEvent.click(document.body);

    expect(screen.queryByRole("list")).toBeNull();
  });

  it("Button renders Loading... and disables while loading", () => {
    const children = saveSnippet();

    render(Button, { props: { loading: true, children } });

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Loading...");
    expect(button).toBeDisabled();
    expect(button).not.toHaveTextContent("Save");
  });

  it("Button renders its children with the main class when not loading", () => {
    const children = saveSnippet();

    render(Button, { props: { children } });

    const button = screen.getByRole("button");
    expect(button).toHaveClass("main");
    expect(button).not.toBeDisabled();
    expect(button).toHaveTextContent("Save");
  });
});
