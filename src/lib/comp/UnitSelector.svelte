<script lang="ts">
  import { mint } from "@/state/stores/printing.svelte";

  let { unit = $bindable() } = $props();

  const getUnits = () => {
    if (!$mint) {
      return ["sat"];
    }
    return $mint.keysets.keysets.reduce((acc, curr) => {
      if (acc.includes(curr.unit)) {
        return acc;
      } else {
        acc.push(curr.unit);
      }
      return acc;
    }, [] as string[]);
  };

  let units = $derived(getUnits());
</script>

<select class="select select-bordered w-full" bind:value={unit}>
  {#each units as unit}
    <option value={unit}>{unit}</option>
  {/each}
</select>
