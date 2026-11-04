export function clickOutside(node: HTMLElement, handler: () => void): { destroy(): void } {
  const listener = (event: MouseEvent): void => {
    if (event.target instanceof Node && !node.contains(event.target)) {
      handler();
    }
  };

  document.addEventListener("click", listener, true);

  return {
    destroy(): void {
      document.removeEventListener("click", listener, true);
    }
  };
}
