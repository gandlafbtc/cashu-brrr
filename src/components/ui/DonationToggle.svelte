<script lang="ts">
  import { Frown, Smile } from "lucide-svelte";

  interface Props {
    isDonate?: boolean;
    donationAmount?: number;
  }

  let { isDonate = $bindable(), donationAmount = $bindable() }: Props =
    $props();
</script>

<div class="flex w-full mt-10">
  Do you want to add a donation for the money printer developers?
</div>
<div class="flex w-full gap-4 h-5 items-center">
  <input
    type="checkbox"
    class="toggle toggle-primary"
    bind:checked={isDonate}
  />

  {#if isDonate}
    <p class="flex gap-2 w-12">
      <span> Yes </span>
      <span>
        <Smile></Smile>
      </span>
    </p>
    <input
      type="number"
      class="input input-primary input-sm"
      bind:value={donationAmount}
    />
  {:else}
    No <Frown></Frown>
  {/if}
</div>
