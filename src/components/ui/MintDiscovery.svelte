<script lang="ts">
  import { type Filter, type Event } from "nostr-tools";
  import { toast } from "svelte-sonner";
  import { discoveredMints, pool } from "@/state/stores/printing.svelte";
  import { DEFAULT_RELAYS } from "@/nostr";
  import { delay } from "@/lib/utils";

  interface Props {
    onMintSelect?: (url: string) => void;
  }

  let { onMintSelect }: Props = $props();

  const mints = [
    "https://mint.minibits.cash/Bitcoin",
    "https://stablenut.umint.cash",
    "https://mint.lnvoltz.com",
    "https://mint.mountainlake.io",
  ];

  let isDiscovering = $state(false);

  const discoverMints = async () => {
    try {
      isDiscovering = true;
      discoveredMints.set([]);
      const activeRelays = DEFAULT_RELAYS;
      const filter: Filter = { kinds: [38000], limit: 2000 };
      pool.subscribeMany(activeRelays, [filter], {
        onevent: (event: Event) => {
          const uTag = event.tags.find((t) => t[0] === "u");
          const kTag = event.tags.find((t) => t[0] === "k");
          if (!kTag || !uTag) {
            return;
          }

          if (kTag[1] != "38172") {
            return;
          }
          const mintUrl = uTag[1];
          discoveredMints.add(mintUrl);
        },
      });
      await delay(2000);
    } catch (error) {
      console.error(error);
      const message =
        error instanceof Error ? error.message : "Failed to discover mints";
      toast.error(message);
    } finally {
      isDiscovering = false;
    }
  };

  const selectMint = (url: string) => {
    if (onMintSelect) {
      onMintSelect(url);
    }
  };
</script>

<div class="flex flex-col lg:flex-row gap-2 flex-wrap">
  <button
    class="btn btn-xs rounded-full btn-primary"
    onclick={discoverMints}
    disabled={isDiscovering}
  >
    Discover more mints
  </button>
  {#if $discoveredMints.length}
    {#each $discoveredMints as m}
      <button
        class="btn btn-xs rounded-full btn-secondary"
        onclick={() => selectMint(m.url)}
      >
        {m.url}
      </button>
    {/each}
  {:else}
    {#each mints as m}
      <button
        class="btn btn-xs rounded-full btn-secondary"
        onclick={() => selectMint(m)}
      >
        {m}
      </button>
    {/each}
  {/if}
</div>
