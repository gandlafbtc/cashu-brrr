<script lang="ts">
  import { getEncodedTokenV4 } from "@cashu/cashu-ts";
  import CustomNote from "./CustomNote.svelte";
  import {
    preparedTokens,
    selectedDenomination,
    selectedNumberOfNotes,
    wallet,
  } from "./stores.svelte";
  import { getAmountForTokenSet } from "./utils";

  let isBrrr = $state(false);

  let cornerInput: HTMLInputElement = $state();
  let brandInput: HTMLInputElement = $state();
  let brandImage: HTMLImageElement = $state();
  let cornerImage: HTMLImageElement = $state();

  let noteType = $state("nutstash");

  //custom note
  let colorCode = $state("#5db075");
  let brandLogoURL = $state("");
  let cornerBrandLogoURL = $state("");

  const getBrandURL = (e) => {
    brandLogoURL = URL.createObjectURL(e.target.files[0]);
  };

  const getCornerURL = (e) => {
    cornerBrandLogoURL = URL.createObjectURL(e.target.files[0]);
  };
</script>

{#if !isBrrr}
  <div class="flex flex-col gap-2 items-center w-full">
    <div class="flex flex-col gap-2">
      <div class="flex gap-2 flex-col">
        Select Color: <input type="color" bind:value={colorCode} />
        Brand Image:
        <input
          type="file"
          accept="image/*"
          oninput={getBrandURL}
          bind:this={brandInput}
        />
        Corner Image:
        <input
          type="file"
          accept="image/*"
          oninput={getCornerURL}
          bind:this={cornerInput}
        />
      </div>
      <CustomNote
        {brandLogoURL}
        {colorCode}
        {cornerBrandLogoURL}
        denomination={$selectedDenomination}
        mintUrl={$wallet?.mint.mintUrl}
        token={"blabla"}
        unit={$preparedTokens[0]?.unit??'sat'}
      />
    </div>

    <h2 class="font-bold text-lg text-center">Notes are ready to be printed</h2>
    <button class="btn btn-primary mt-2" onclick={() => (isBrrr = true)}>
      Print now! BRRRRRRRRRR
    </button>

    <div class="flex flex-col gap-1 items-center pt-10">
      <span class="font-bold badge badge-success gap-2">
        {$selectedNumberOfNotes}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
          />
        </svg>
      </span>
    </div>
  </div>
{:else}
  <div>
    <p class="font-bold">Press ctrl+P to print</p>
  </div>
  <div class="bg-white z-10 w-full">
    {#each $preparedTokens as token}
      <CustomNote
        {brandLogoURL}
        {colorCode}
        {cornerBrandLogoURL}
        denomination={getAmountForTokenSet(token.proofs)}
        mintUrl={token.mint}
        token={getEncodedTokenV4(token)}
        unit={$wallet?.unit}
      />
    {/each}
  </div>
{/if}
