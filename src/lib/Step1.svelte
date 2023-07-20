<script lang="ts">
    import { CashuMint } from "@cashu/cashu-ts";
    import type { Mint } from "../mint";

	export let selectedMint: Mint

	const mints = ['https://legend.lnbits.com/cashu/api/v1/4gr9Xcmz3XEkUNwiBiQGoC', 'https://8333.space:3338', 'https://nuts.semisol.dev']

	let mintUrl = ''
	let isConnecting = false
	const connect = async () => {
		try {
			isConnecting = true
			const mint = new CashuMint(mintUrl)
			const keys = await mint.getKeys()
			if (!keys) {
				return
			}
			else {
				selectedMint = {
					keys,
					mintUrl
				}
			}
		} catch (error) {
			
		}
		finally {
			isConnecting = false
		}

	}
</script>

<p class="text-center font-bold text-lg">connect to mint</p>

<div class="flex flex-col lg:flex-row gap-2">

	{#each mints as m}
	<button class="btn btn-xs rounded-full btn-secondary" on:click={()=> mintUrl=m}>
		{m}
	</button>
	{/each}
</div>
<div class="border-dashed border-spacing-2 border-base-100 border-2 flex gap-2 justify-center p-5">
	<input type="text" bind:value={mintUrl} class="input input-primary">
	<button on:click={connect} class="btn {isConnecting?'btn-disabled':'btn-primary'} ">connect</button>
</div>

{#if selectedMint}
	 <p>
		connected to
	 </p>
	 <p>
		{selectedMint.mintUrl}
	 </p>
{/if}