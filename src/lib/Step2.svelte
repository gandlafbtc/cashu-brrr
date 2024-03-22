<script lang="ts">
	import type { Mint } from "../mint";
	export let selectedMint: Mint;
	export let step;
	export let selectedDenomination;
	export let selectedNumberOfNotes = 1;

	const getDenominations = () => {
		const denos = Array<number>();
		let current = 1;
		while (current <= 1025) {
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
		<div class="flex gap-1 items-center pb-5">
			<span class="font-bold badge badge-success gap-2">
				{selectedNumberOfNotes}
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
			x
			<span class="font-bold badge badge-warning gap-2"
				>{selectedDenomination} sats
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-4 h-4"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
					/>
				</svg>
			</span>
			<div>
				<span class="rotate-90"> = </span>
			</div>
			<span class="font-bold badge badge-warning gap-2">
				{selectedDenomination * selectedNumberOfNotes} sats
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-4 h-4"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
					/>
				</svg>
			</span>
		</div>
		{/if}
			<div class="flex gap-2">
				<button class="btn" on:click={()=> step=1}>Back</button>
				<button class="btn" class:btn-primary={!isNaN(selectedDenomination * selectedNumberOfNotes)}
				class:btn-disabled={isNaN(selectedDenomination * selectedNumberOfNotes)} on:click={()=>step=3}> confirm </button>
			</div>
	</div>
</div>
