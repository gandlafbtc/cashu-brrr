<script lang="ts">
  import { formatAmount } from "@/lib/utils";
  import LnInvoice from "@/features/printing/components/LNInvoice.svelte";

  interface Props {
    selectedTab?: string;
    totalAmount: number;
    unit: string;
    mintUrl: string;
    onEcashPaste?: (token: string) => void;
  }

  let {
    selectedTab = $bindable("ecash"),
    totalAmount,
    unit,
    mintUrl,
    onEcashPaste,
  }: Props = $props();

  let inputToken = $state("");
  let isLoading = $state(false);

  const handlePaste = async (e: ClipboardEvent) => {
    if (onEcashPaste) {
      e.preventDefault();
      const pastedText = e.clipboardData?.getData("text") || "";
      if (pastedText) {
        isLoading = true;
        onEcashPaste(pastedText);
        setTimeout(() => {
          inputToken = "";
          isLoading = false;
        }, 500);
      }
    }
  };
</script>

<div
  class="flex flex-col justify-center gap-4 items-center w-full max-w-lg mx-auto"
>
  <div role="tablist" class="tabs tabs-boxed">
    <button
      role="tab"
      class="tab"
      class:tab-active={selectedTab === "ecash"}
      onclick={() => {
        selectedTab = "ecash";
      }}>Ecash</button
    >
    <button
      role="tab"
      class="tab"
      class:tab-active={selectedTab === "ln"}
      onclick={() => {
        selectedTab = "ln";
      }}>Lightning</button
    >
  </div>

  <div
    class="flex flex-col items-center justify-center gap-3 min-h-[400px] w-full p-4"
  >
    {#if selectedTab === "ln"}
      <div class="w-full flex justify-center">
        <LnInvoice></LnInvoice>
      </div>
    {:else}
      <div class="flex flex-col items-center gap-2 w-full">
        <p class="text-sm">Paste</p>
        <p class="badge badge-warning badge-lg">
          {formatAmount(totalAmount, unit)} token
        </p>
        <p class="text-sm">From</p>
        <p class="badge badge-info truncate max-w-full">
          {mintUrl}
        </p>

        <input
          class="input input-primary w-full max-w-md mt-2"
          placeholder="cashuB...."
          bind:value={inputToken}
          onpaste={handlePaste}
          disabled={isLoading}
        />
        <p class="text-xs opacity-60 mt-1">
          *Overpaid tokens will be donated to the money printer
        </p>
      </div>
    {/if}
  </div>
</div>
