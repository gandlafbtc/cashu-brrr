<script lang="ts">
  import NotesCalc from "@/features/printing/components/NotesCalc.svelte";
  import {
    donation,
    selectedDenomination,
    selectedNumberOfNotes,
    step,
    wallet,
  } from "@/state/stores/printing.svelte";
  import { createOutputAmount } from "@/lib/utils";
  import DenominationConfig from "@/components/ui/DenominationConfig.svelte";
  import DonationToggle from "@/components/ui/DonationToggle.svelte";

  const getNumberOfOuts = async () => {
    return await createOutputAmount($selectedDenomination);
  };

  let numberOfOuts = $derived(getNumberOfOuts());

  let isDonate = $state(false);
  let noPrint = $state(false);
  let donationAmount = $state(100);
</script>

<div class="flex gap-2 flex-col items-center pt-5">
  <div class="flex gap-1 badge">
    <p>Connected to</p>
    <p>
      {$wallet?.mint.mintUrl}
    </p>
  </div>
  <DenominationConfig
    bind:denomination={$selectedDenomination}
    bind:numberOfNotes={$selectedNumberOfNotes}
    bind:noPrint
  />
  <DonationToggle bind:isDonate bind:donationAmount />

  {#if !isNaN($selectedDenomination) && !isNaN($selectedNumberOfNotes) && !isNaN(donationAmount)}
    <div class="h-36 flex flex-col justify-end items-center">
      <NotesCalc
        selectedDenomination={$selectedDenomination}
        selectedNumberOfNotes={$selectedNumberOfNotes}
        unit={$wallet.unit}
        {donationAmount}
        {isDonate}
      ></NotesCalc>
      <div class="flex gap-2">
        <button class="btn" onclick={() => step.set(1)}>Back</button>
        {#await numberOfOuts then value}
          <!-- promise was fulfilled -->
          <button
            class="btn btn-primary"
            disabled={value.length > 4 && !noPrint}
            onclick={() => {
              if (isDonate) {
                donation.set(donationAmount);
              }
              step.set(3);
            }}
          >
            confirm
          </button>
        {/await}
      </div>
    </div>
  {/if}
</div>
