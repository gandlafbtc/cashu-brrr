<script lang="ts">
  import { CashuMint, CashuWallet } from "@cashu/cashu-ts";
  import {
    mint,
    preparedTokens,
    selectedDenomination,
    selectedNumberOfNotes,
    step,
    wallet,
  } from "@/state/stores/printing.svelte";
  import type { Print } from "@/types/cashu";
  import UnitSelector from "@/lib/comp/UnitSelector.svelte";
  import { toast } from "svelte-sonner";
  import Sponsor from "@/lib/Sponsor.svelte";
  import { SPONSORS } from "@/lib/sponsors";
  import MintDiscovery from "@/components/ui/MintDiscovery.svelte";
  import PrintHistoryList from "@/components/ui/PrintHistoryList.svelte";
  import { getWalletWithUnit, loadMint } from "@/lib/utils";

  let mintUrl = $state("");
  let isConnecting = $state(false);
  let unit = $state("sat");

  const connect = async () => {
    try {
      isConnecting = true;
      const m = await loadMint(mintUrl);
      mint.set(m);
      toast.success("Connected to " + $mint.url);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to connect to mint";
      toast.error(message);
    } finally {
      isConnecting = false;
    }
  };

  const handleMintSelect = (url: string) => {
    mintUrl = url;
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
  <div
    class="w-full h-20 px-3 items-center justify-center rounded-lg border border-base-300 relative"
  >
    <div class="absolute -top-4 left-3 opacity-35 flex gap-2">Sponsors</div>
    <div class="flex h-full items-center gap-2">
      {#each SPONSORS as sponsor}
        <Sponsor {sponsor}></Sponsor>
      {/each}
      <a
        target="_blank"
        class="p-1 rounded-full bg-base-300 transition-all hover:bg-base-200 flex gap-1 items-center w-min"
        href="https://geyser.fund/project/brrr/rewards/view/5486"
      >
        <div class="avatar">
          <div class="w-12 rounded-full">
            <img src="/i.jpeg" alt="Become a sponsor on Geyser" />
          </div>
        </div>
        <p class="text-nowrap text-sm pr-2">Become a sponsor</p>
      </a>
    </div>
  </div>
  <p class="text-center font-bold text-lg">Connect to mint</p>
  <MintDiscovery onMintSelect={handleMintSelect} />
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

  <PrintHistoryList onReprint={reprint} />
</div>
