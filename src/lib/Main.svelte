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

<div class="flex m-2 gap-2 flex-col items-center">
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
	<a href="https://gandlaf.com/donate" class="m-4 btn btn-sm btn-error btn-circle">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class=" w-6 h-6">
			<path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
		  </svg>
		</a>

</div>
