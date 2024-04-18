<script lang="ts">
	import { CashuMint } from "@cashu/cashu-ts";
	import type { Mint } from "../mint";
    import { prints, type Print } from "./stores";
    import NotesCalc from "./comp/NotesCalc.svelte";

	export let selectedMint: Mint;
	export let step
	export let tokens = []
	export let selectedDenomination = 0
	export let selectedNumberOfNotes = 0

	const mints = [
		"https://mint.minibits.cash/Bitcoin",
		"https://8333.space:3338",
		"https://stpaulinternet.net/cashu/api/v1/TTcmiEDSWmkefef3XqERKv",
];

	let mintUrl = "";
	let isConnecting = false;
	const connect = async () => {
		try {
			isConnecting = true;
			const mint = new CashuMint(mintUrl);
			const keys = await mint.getKeys();
			if (!keys) {
				return;
			} else {
				selectedMint = {
					keys,
					mintUrl,
				};
				step = 2
			}
		} catch (error) {
		} finally {
			isConnecting = false;
		}
	};

	const reprint = (print: Print) => {
		tokens = print.tokens
		selectedDenomination = print.tokens[0].token[0].proofs[0].amount
		selectedNumberOfNotes = print.tokens.length
		selectedMint = {mintUrl: print.mint, keys: []}
		step =4
	}
</script>

<div class="flex flex-col gap-5 justify-center items-center">
	<p class="text-center font-bold text-lg">Connect to mint</p>
	<div class="flex flex-col lg:flex-row gap-2">
		{#each mints as m}
			<button
				class="btn btn-xs rounded-full btn-secondary"
				on:click={() => (mintUrl = m)}
			>
				{m}
			</button>
		{/each}
	</div>
	<div
		class="border-dashed border-spacing-2 border-base-100 border-2 flex gap-2 justify-center p-5"
	>
		<input
			placeholder="type mint url here..."
			type="text"
			bind:value={mintUrl}
			class="input input-primary"
			on:keypress={(e)=> {
				if (e.key==='Enter') {
					connect()					
				}
			}}
		/>
		<button
			on:click={connect}
			class="btn {isConnecting ? 'btn-disabled' : 'btn-primary'} "
			>Connect</button
		>
	</div>

	<div class="h-10">
		{#if selectedMint}
		<div class="flex gap-1 badge">
			<p>Connected to</p>
			<p>
				{selectedMint.mintUrl}
			</p>
		</div>
		{/if}
	</div>

	{#if $prints.length}
	<div class="divider">
		or
	</div>
		<p class="font-bold">
			Re-print previous print
		</p>
		<div class="h-fit">

			<div class="h-full max-h-52 lg:max-h-96 flex flex-col gap-3 overflow-x-scroll">
				{#each $prints as print}
				<div class="flex gap-2 flex-col bg-base-300 rounded-lg p-2 w-80">
				<button class="btn btn-secondary btn-sm" on:click={()=>reprint(print)}>Print</button>
				<NotesCalc selectedDenomination={print.tokens[0].token[0].proofs[0].amount} selectedNumberOfNotes={print.tokens.length}></NotesCalc>
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
