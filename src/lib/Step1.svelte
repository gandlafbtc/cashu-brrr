<script lang="ts">
  import { CashuMint, CashuWallet } from "@cashu/cashu-ts";
  import {
    discoveredMints,
    mint,
    pool,
    preparedTokens,
    prints,
    selectedDenomination,
    selectedNumberOfNotes,
    step,
    wallet,
    type Print,
  } from "./stores.svelte";
  import NotesCalc from "./comp/NotesCalc.svelte";
  import { type Event, type Filter } from "nostr-tools";
  import {
    delay,
    getAmountForTokenSet,
    getWalletWithUnit,
    loadMint,
  } from "./utils";
  import UnitSelector from "./comp/UnitSelector.svelte";
  import { toast } from "svelte-sonner";
    import { DEFAULT_RELAYS } from "../nostr";
    import Sponsor from "./Sponsor.svelte";
    import { SPONSORS } from "./sponsors";

  const mints = [
    "https://mint.minibits.cash/Bitcoin",
    "https://stablenut.umint.cash",
    "https://mint.lnvoltz.com",
  ];

  let mintUrl = $state("");
  let isConnecting = $state(false);
  let isDiscovering = $state(false);
  let unit = $state("sat");

  const connect = async () => {
    try {
      isConnecting = true;
      const m = await loadMint(mintUrl);
      mint.set(m);
      toast.success("Connected to " + $mint.url);
    } catch (error) {
      toast.error(error.message);
    } finally {
      isConnecting = false;
    }
  };

  export const discoverMints = async () => {
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
      toast.error(error.message);
    } finally {
      isDiscovering = false;
    }
  };

  const reprint = (print: Print) => {
    wallet.set(new CashuWallet(new CashuMint(print.mint)));
    preparedTokens.set(print.tokens);
    selectedDenomination.set(print.tokens[0].proofs[0].amount);
    selectedNumberOfNotes.set(print.tokens.length);
    step.set(4);
  };

  const confirm = async () => {
    wallet.set(await getWalletWithUnit($mint, unit));
    step.set(2);
  };

  
</script>

<div class="flex flex-col gap-5 justify-center items-center">
  <div class="w-full h-20 px-3 items-center justify-center rounded-lg border border-base-300">
    <div class="fixed -mt-6 opacity-35 flex gap-2">Sponsors</div>
    <div class="flex h-full items-center gap-2">
      {#each SPONSORS as sponsor}
        <Sponsor {sponsor}></Sponsor>
      {/each}
      <a target="_blank" class="p-1 rounded-full bg-base-300 transition-all hover:bg-base-200 flex gap-1 items-center w-min" href="https://geyser.fund/project/brrr/rewards/view/5486">
        <div class="avatar">
          <div class="w-12 rounded-full">
            <img src="/i.jpeg"/>
          </div>
        </div>
        <p class="text-nowrap text-sm pr-2">
          Become a sponsor
        </p>
      </a>


      
    </div>
  </div>
  <p class="text-center font-bold text-lg">Connect to mint</p>
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
          onclick={() => (mintUrl = m.url)}
        >
          {m.url}
        </button>
      {/each}
    {:else}
      {#each mints as m}
        <button
          class="btn btn-xs rounded-full btn-secondary"
          onclick={() => (mintUrl = m)}
        >
          {m}
        </button>
      {/each}
    {/if}
  </div>
  <div
    class="border-dashed border-spacing-2 border-base-100 border-2 flex gap-2 justify-center py-5 w-full"
  >
    <input
      placeholder="type mint url here..."
      type="text"
      bind:value={mintUrl}
      class="input input-primary w-full"
      onkeypress={(e) => {
        if (e.key === "Enter") {
          connect();
        }
      }}
    />
    <button
      onclick={connect}
      class="btn {isConnecting ? 'btn-disabled' : 'btn-primary'} "
    >
      Connect
    </button>
  </div>

  <div class="h-10">
    {#if $mint}
      <div class="flex gap-1 badge">
        <p>Connected to</p>
        <p>
          {$mint.url}
        </p>
      </div>
    {/if}
  </div>

  {#if $mint}
    <p>Select a currency</p>
    <div class="w-full">
      <UnitSelector bind:unit></UnitSelector>
    </div>
    <button
      onclick={confirm}
      class="btn btn-secondary w-full"
      disabled={isConnecting}
      >Confirm
    </button>
  {/if}

  {#if $prints.length}
    <div class="divider">or</div>
    <p class="font-bold">Re-print previous print</p>
    <div class="h-fit">
      <div
        class="h-full max-h-52 lg:max-h-96 flex flex-col gap-3 overflow-x-scroll"
      >
        {#each $prints as print}
          <div class="flex gap-2 flex-col bg-base-300 rounded-lg p-2 w-80">
            <button
              class="btn btn-secondary btn-sm"
              onclick={() => reprint(print)}>Print</button
            >
            {console.log(print)}
            <NotesCalc
              selectedDenomination={getAmountForTokenSet(
                print.tokens[0].proofs,
              )}
              selectedNumberOfNotes={print.tokens.length}
              unit={print.tokens[0].unit}
              isDonate={print.donation}
              donationAmount={getAmountForTokenSet(print.donation?.proofs??[])}
            ></NotesCalc>
            <p class="break-all">
              {print.mint}
            </p>
            <p class="text-sm text-neutral">
              {new Date(print.ts).toLocaleString()}
            </p>
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>
