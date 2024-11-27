<script lang="ts">
  import { Frown, Smile } from "lucide-svelte";
import NotesCalc from "./comp/NotesCalc.svelte";
  import {
    donation,
    selectedDenomination,
    selectedNumberOfNotes,
    step,
    wallet,
  } from "./stores.svelte";
  import { createOutputAmount } from "./utils";

  const getNumberOfOuts = async () => {
    return await createOutputAmount($selectedDenomination);
  };

  let numberOfOuts = $derived(getNumberOfOuts());
  
  let isDonate = $state(false)
  let noPrint = $state(false)
  let donationAmount = $state(100)

</script>

<div class="flex gap-2 flex-col items-center pt-5">
  <div class="flex gap-1 badge">
    <p>Connected to</p>
    <p>
      {$wallet?.mint.mintUrl}
    </p>
  </div>
  <div class="flex flex-col w-full gap-4">
    <div class="flex flex-col gap-2">
      <p class="font-bold">Denomination:</p>
      <input
        min="1"
        type="number"
        class="input input-secondary w-full"
        bind:value={$selectedDenomination}
      />
    </div>
    <div class="min-h-60">
      {#await numberOfOuts then value}
        <div class="flex flex-col gap-2">
          <div class="flex gap-2">
            <p>Token will be composed of the following amounts:</p>
            <p>
              [{value.join(", ")}]
            </p>
          </div>
          <progress
            class="progress w-56"
            class:progress-error={value.length > 4}
            class:progress-warning={value.length === 4 || value.length === 3}
            class:progress-success={value.length < 3}
            value={value.length}
            max="4"
          ></progress>
          <p>
            {value.length}/4
          </p>
          {#if value.length > 4}
            <p class="font-bold">
              Too many amounts are needed to make this denomination readable by
              QR codes.
            </p>
            <div class="flex gap-2 mt-3">
              <p>
                It's ok, I won't use QR codes to distribute the tokens
              </p>
              <input type="checkbox" class="checkbox-primary checkbox" bind:checked={noPrint} />
            </div>

          {/if}
        </div>
        <!-- promise was fulfilled -->
      {/await}
    </div>
    
    <div class="font-bold gap-2 flex flex-col">
      <p>Number of notes:</p>
      <input
      type="range"
      min="1"
      max="100"
      bind:value={$selectedNumberOfNotes}
      class="range range-primary"
      />
      <input
      min="1"
      type="number"
      class="input input-primary w-full"
      bind:value={$selectedNumberOfNotes}
      />
    </div>
  </div>
  <div class="flex w-full mt-10">
    Do you want to add a donation for the money printer developers?
  </div>
  <div class="flex w-full gap-4 h-5 items-center">

    <input type="checkbox" class="toggle toggle-primary" bind:checked={isDonate} />
    
    {#if isDonate}
    <p class="flex gap-2 w-12">
      <span>

        Yes 
      </span>
      <span>

        <Smile></Smile>
      </span>
    </p>
    <input type="number" class="input input-primary input-sm" bind:value={donationAmount}/>
    {:else}
    No <Frown></Frown>
    {/if}
  </div>
  
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
    disabled={ value.length > 4 && !noPrint}
    onclick={() => {
      if (isDonate) {
        donation.set(donationAmount)
      }
      step.set(3)
    }}
        >
        confirm
      </button>
      {/await}
    </div>
  </div>
  {/if}
</div>
