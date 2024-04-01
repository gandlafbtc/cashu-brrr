<script lang="ts">
	import type { Mint } from "../mint";
    import NotesCalc from "./comp/NotesCalc.svelte";
	export let selectedMint: Mint;
	export let step;
	export let selectedDenomination;
	export let selectedNumberOfNotes = 1;

	const getDenominations = () => {
		const denos = Array<number>();
		let current = 1;
		while (current <= 100000) {
			denos.push(current);
			current = current * 2;
		}
		return denos;
	};

	const denomintations = getDenominations();
</script>

<div class="flex gap-2 flex-col items-center pt-5">
	<div class="flex gap-1 badge">
		<p>Connected to</p>
		<p>
			{selectedMint.mintUrl}
		</p>
	</div>
	<div class="flex flex-col w-full gap-4">
		<div class="flex flex-col gap-2">
			<p class="font-bold">Denomination:</p>
			<select
				class="select select-secondary select-bordered w-full"
				bind:value={selectedDenomination}
			>
				<option disabled selected
					>Choose a denomination for the notes</option
				>
				{#each denomintations as deno}
					<option value={deno}> {deno} sats</option>
				{/each}
			</select>
		</div>
		<div class="font-bold gap-2 flex flex-col">
			<p>Number of notes:</p>
			<input
				type="range"
				min="0"
				max="100"
				bind:value={selectedNumberOfNotes}
				class="range range-primary"
			/>
			<input
				type="number"
				class="input input-primary w-full"
				bind:value={selectedNumberOfNotes}
			/>
		</div>
	</div>
	<div class="h-28 flex flex-col justify-end items-center">
		
		{#if !isNaN(selectedDenomination * selectedNumberOfNotes)}
			<NotesCalc {selectedDenomination} {selectedNumberOfNotes}></NotesCalc>
		{/if}
			<div class="flex gap-2">
				<button class="btn" on:click={()=> step=1}>Back</button>
				<button class="btn" class:btn-primary={!isNaN(selectedDenomination * selectedNumberOfNotes)}
				class:btn-disabled={isNaN(selectedDenomination * selectedNumberOfNotes)} on:click={()=>step=3}> confirm </button>
			</div>
	</div>
</div>
