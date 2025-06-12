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
    import ShareViaNostr from "./comp/ShareViaNostr.svelte";
    import ComicNote from "./ComicNote.svelte";
    import encodeQR from "qr";
    import JSZip from "jszip";

  let active = $state('customize');

  let cornerInput: HTMLInputElement = $state();
  let brandInput: HTMLInputElement = $state();
  let brandImage: HTMLImageElement = $state();
  let cornerImage: HTMLImageElement = $state();

  let design = $state(3);

  let selectedTemplate = $state("comic");

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

  const downloadQRs = async () => {
    const zip = new JSZip();
    
    // Add each QR code to the zip file
    $preparedTokens.forEach((token, index) => {
      // Generate the SVG
      let svg = encodeQR(getEncodedTokenV4(token), "svg");
      
      // Add a white background by inserting a rectangle element
      // Find where the SVG element starts
      const svgStartIndex = svg.indexOf("<svg");
      if (svgStartIndex !== -1) {
        // Find where the content after the svg tag starts
        const contentStartIndex = svg.indexOf(">", svgStartIndex) + 1;
        if (contentStartIndex !== 0) {
          // Extract viewBox to determine size
          const viewBoxMatch = svg.match(/viewBox="([^"]+)"/);
          let width = 100;
          let height = 100;
          
          if (viewBoxMatch && viewBoxMatch[1]) {
            const viewBoxValues = viewBoxMatch[1].split(" ");
            if (viewBoxValues.length >= 4) {
              width = parseFloat(viewBoxValues[2]);
              height = parseFloat(viewBoxValues[3]);
            }
          }
          
          // Insert a white rectangle as the first element after the svg tag
          const whiteRect = `<rect width="${width}" height="${height}" fill="white"/>`;
          svg = svg.slice(0, contentStartIndex) + whiteRect + svg.slice(contentStartIndex);
        }
      }
      // Use a more readable name for each file based on the token amount
      const amount = getAmountForTokenSet(token.proofs);
      const unit = token.unit || 'sat';
      zip.file(`${amount}_${unit}_${index + 1}.svg`, svg);
    });
    
    // Generate the zip file
    const zipBlob = await zip.generateAsync({ type: "blob" });
    
    // Download the zip file
    const url = URL.createObjectURL(zipBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cashu_qr_codes.zip";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

</script>
<div class="flex w-full items-center justify-center">

  <div role="tablist" class="tabs tabs-boxed min-w-80">
    <button role="tab" class="tab" class:tab-active={active === 'customize'} onclick={()=> active = 'customize'}>Customize</button>
    <button role="tab" class="tab" class:tab-active={active === 'print'} onclick={()=> active = 'print'}>Print</button>
    <button role="tab" class="tab" class:tab-active={active === 'share'} onclick={()=> active = 'share'}>Share</button>
  </div>
</div>

{#if active === 'customize'}
  <div class="flex flex-col gap-2 items-center w-full">
    <div class="flex gap-2">
      <button onclick={()=> selectedTemplate="comic"} class="w-32 p-2 border-2 rounded-md {selectedTemplate==="comic"?"border-primary":"border-base-300"}">
        <ComicNote
        {design}
        denomination={getAmountForTokenSet($preparedTokens[0]?.proofs??[])}
        mintUrl={$wallet?.mint.mintUrl}
        token={"blabla"}
        unit={$preparedTokens[0]?.unit??'sat'}
        />
      </button>
      <button onclick={()=> selectedTemplate="custom"} class="w-32 p-2 border-2 rounded-md {selectedTemplate==="custom"?"border-primary":"border-base-300"}">
        <CustomNote 
        {brandLogoURL}
        {colorCode}
        {cornerBrandLogoURL}
        denomination={getAmountForTokenSet($preparedTokens[0]?.proofs??[])}
        mintUrl={$wallet?.mint.mintUrl}
        token={"blabla"}
        unit={$preparedTokens[0]?.unit??'sat'}
        />
      </button>

    </div>
    <div class="flex flex-col gap-2">
      {#if selectedTemplate === 'comic'}
      <p class="my-2">
        Comic nuts by <a href="https://njump.me/npub1gwa27rpgum8mr9d30msg8cv7kwj2lhav2nvmdwh3wqnsa5vnudxqlta2sz" class="link link-primary" target="_blank">@BitPopart</a>
      </p>
      Designs
      <input
      type="range"
      min="3"
      max="25"
      bind:value={design}
      class="range range-primary"
      />

      <ComicNote
      {design}
      denomination={getAmountForTokenSet($preparedTokens[0]?.proofs??[])}
      mintUrl={$wallet?.mint.mintUrl}
      token={"blabla"}
      unit={$preparedTokens[0]?.unit??'sat'}
      />
        
      {:else if selectedTemplate === "custom"}
      <p class="my-2">
        Custom note by <a href="https://njump.me/npub1cj6ndx5akfazux7f0vjl4fyx9k0ulf682p437fe03a9ndwqjm0tqj886t6" class="link link-primary" target="_blank">@gandlaf21</a>
      </p>
      <div class="flex gap-2 flex-col">
        Select Color: <input type="color" bind:value={colorCode} />
        Brand Image:
        <input
          type="file"
          class="file-input file-input-bordered"

          accept="image/*"
          oninput={getBrandURL}
          bind:this={brandInput}
        />
        Corner Image:
        <input
          type="file"
          class="file-input file-input-bordered"
          accept="image/*"
          oninput={getCornerURL}
          bind:this={cornerInput}
        />
      </div>

        
      <CustomNote
      {brandLogoURL}
      {colorCode}
      {cornerBrandLogoURL}
      denomination={getAmountForTokenSet($preparedTokens[0]?.proofs??[])}
      mintUrl={$wallet?.mint.mintUrl}
      token={"blabla"}
      unit={$preparedTokens[0]?.unit??'sat'}
      />
      {/if}
    </div>

    <h2 class="font-bold text-lg text-center">Notes are ready to be printed</h2>
    <div class="flex flex-col gap-2">

      <button class="btn btn-primary" onclick={() => (active = 'print')}>
        Print now! BRRRRRRRRRR
      </button>
      <button class="btn  btn-outline btn-secondary" onclick={downloadQRs}>
        Download QR codes only
      </button>
      <button class="btn btn-secondary" onclick={() => (active ='share')}>
        Share via nostr
      </button>
    </div>
    
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
{:else if active === 'print'}
  <div>
    <button class="btn btn-primary" onclick={()=> window.print()}>
      Print
    </button>
    <p class="font-bold">Press ctrl+P to print</p>

  </div>
  <div class="bg-white z-10 w-full">
    {#each $preparedTokens as token}
    {#if selectedTemplate==="comic"}
      <ComicNote
      {design}
      denomination={getAmountForTokenSet(token.proofs)}
      mintUrl={token.mint}
      token={getEncodedTokenV4(token)}
      unit={$wallet?.unit}
    />
    {:else if selectedTemplate ==="custom"}
    <CustomNote
      {brandLogoURL}
      {colorCode}
      {cornerBrandLogoURL}
      denomination={getAmountForTokenSet(token.proofs)}
      mintUrl={token.mint}
      token={getEncodedTokenV4(token)}
      unit={$wallet?.unit}
    />
    {/if}
    {/each}
  </div>
    
  {:else if active === 'share'}
      <ShareViaNostr></ShareViaNostr>
  {/if}
