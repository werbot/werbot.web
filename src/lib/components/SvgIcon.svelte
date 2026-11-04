<script lang="ts">
  interface Props {
    prefix?: string;
    name: string;
    class?: string;
  }

  let { prefix = "icon", name, class: className = "" }: Props = $props();
</script>

<svg aria-hidden="true" class={className}>
  <use href="#{prefix}-{name}" />
</svg>
