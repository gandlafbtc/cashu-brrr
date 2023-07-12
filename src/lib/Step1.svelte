<script lang="ts">
    import { CashuMint } from "@cashu/cashu-ts";
    import type { Mint } from "../mint";

	export let selectedMint: Mint

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

<div class="border-dashed border-spacing-2 border-base-100 border-2">
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