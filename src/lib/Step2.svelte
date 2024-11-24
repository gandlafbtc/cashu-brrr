<script lang="ts">
	import type { Mint } from "../mint";
    import NotesCalc from "./comp/NotesCalc.svelte";
    import { proofs, selectedDenomination, selectedNumberOfNotes, step, wallet } from "./stores.svelte";
    import { createOutputAmount } from "./utils";

	const getNumberOfOuts = async () => {
		return await createOutputAmount($selectedDenomination)
	}

	let numberOfOuts = $derived(getNumberOfOuts())

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
			min=1
				type="number"
				class="input input-secondary w-full"
				bind:value={$selectedDenomination}
			/>
		</div>
		<div class="h-52">

			{#await numberOfOuts then value}
			<div class="flex flex-col gap-2">
				<div class="flex gap-2">

					<p>
						Token will be composed of the following amounts:
					</p>
					<p>
						[{value.join(', ')}]
					</p>
				</div>
				<progress class="progress w-56" 
				class:progress-error={value.length>4}
				class:progress-warning={value.length===4 || value.length===3}
				class:progress-success={value.length<3}
				value="{value.length}" max="4"></progress>
				<p>
					{value.length}/4
				</p>
				{#if value.length>4}
				<p> 
					Too many amounts are needed to make this denomination readable by QR codes.
				</p>
				{/if}
			</div>			<!-- promise was fulfilled -->
			
			{/await}
		</div>


		<div class="font-bold gap-2 flex flex-col">
			<p>Number of notes:</p>
			<input
				type="range"
				min=1
				max=100
				bind:value={$selectedNumberOfNotes}
				class="range range-primary"
			/>
			<input
			min=1
				type="number"
				class="input input-primary w-full"
				bind:value={$selectedNumberOfNotes}
			/>
		</div>
	</div>
	<div class="h-36 flex flex-col justify-end items-center">
		{#if !isNaN($selectedDenomination * $selectedNumberOfNotes)}
			<NotesCalc selectedDenomination={$selectedDenomination} selectedNumberOfNotes={$selectedNumberOfNotes} unit={$wallet.unit}></NotesCalc>
		{/if}
		<div class="flex gap-2">
			<button class="btn" onclick={()=> step.set(1)}>Back</button>
		{#await numberOfOuts then value}
		<!-- promise was fulfilled -->
			<button class="btn" class:btn-primary={!isNaN($selectedDenomination * $selectedNumberOfNotes)}
			class:btn-disabled={isNaN($selectedDenomination * $selectedNumberOfNotes)||value.length>4} onclick={()=>step.set(3)}> confirm </button>
			{/await}
		</div>
	</div>
</div>
