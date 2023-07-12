<script lang="ts">
	import Step1 from "./Step1.svelte";
	import Step2 from "./Step2.svelte";
	import Step3 from "./Step3.svelte";
	import Step4 from "./Step4.svelte";

	let step = 1;

	let selectedMint;
	let selectedDenomination: number;
	let selectedNumberOfNotes: number;
	let tokens = [];
	let isPaid;

	const nextStep = () => {
		if (!selectedMint) {
			return;
		}
		if (step > 3) {
			return;
		}
		step++;
	};
	const previousStep = () => {
		if (step < 2) {
			return;
		}
		step--;
	};
</script>

<div class="flex m-2 gap-2 flex-col">
	<h1 class="text-center font-bold text-2xl">Money printer go brrrrr</h1>
	<ul class="steps">
		<li data-content="🏦" class="step step-primary" />
		<li data-content="💵" class="step {step > 1 ? 'step-primary' : ''}" />
		<li data-content="⚡" class="step {step > 2 ? 'step-primary' : ''}" />
		<li data-content="🖨️" class="step {step > 3 ? 'step-primary' : ''}" />
	</ul>
	<div class="m-auto">
		{#if step === 1}
			<Step1 bind:selectedMint />
		{:else if step === 2}
			<Step2
				bind:selectedMint
				bind:selectedDenomination
				bind:selectedNumberOfNotes
			/>
		{:else if step === 3}
			<Step3
				bind:selectedMint
				bind:selectedDenomination
				bind:selectedNumberOfNotes
				bind:tokens
				bind:isPaid
			/>
		{:else}
			<Step4
				bind:selectedMint
				bind:selectedDenomination
				bind:selectedNumberOfNotes
				bind:tokens
			/>
		{/if}
	</div>
	<div class="flex justify-center w-full gap-2">
		{#if !tokens.length}
			<button
				class="btn {step === 1 ? 'btn-disabled' : ''}"
				on:click={previousStep}
			>
				back
			</button>
		{/if}
		{#if step <= 3}
			<button
				class="btn {!selectedMint || (step === 3 && !isPaid)
					? 'btn-disabled'
					: 'btn-primary'}"
				on:click={nextStep}
			>
				continue
			</button>
		{/if}
	</div>
</div>
