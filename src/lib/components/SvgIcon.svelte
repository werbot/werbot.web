<script lang="ts">
  import type { SVGAttributes } from "svelte/elements";

  interface Props extends Omit<SVGAttributes<SVGSVGElement>, "class"> {
    prefix?: string;
    name: string;
    class?: string;
  }

  let { prefix = "icon", name, class: className = "", ...rest }: Props = $props();
</script>

<svg {...rest} aria-hidden="true" class={className}>
  <use href="#{prefix}-{name}" />
</svg>
