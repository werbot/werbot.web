<script lang="ts">
  interface Props {
    name?: string;
    value: boolean;
    disabled?: boolean;
    id?: string | number;
  }

  let { name, value = $bindable(), disabled = false, id }: Props = $props();

  const toggleId = $derived(`toggle_${id}`);
</script>

<label for={toggleId} class="toggle">
  <input
    id={toggleId}
    type="checkbox"
    class="peer sr-only"
    checked={value}
    {disabled}
    onchange={(event): void => {
      value = event.currentTarget.checked;
    }}
  />
  <div
    class="peer h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-green-500 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"
  ></div>
  {#if name}
    <span class="ml-3">{name}</span>
  {/if}
</label>
