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
	let isBrrr
</script>

<div class="h-screen w-screen bg-gradient-to-br from-primary to-secondary items-center flex justify-center">
	<div class="flex m-2 gap-2 flex-col items-center  bg-base-100 w-full {step===4&&isBrrr?'h-full max-w-full':'h-[40rem] max-w-5xl'} p-5 rounded-lg shadow-md">
		<h1 class="w-full text-center font-bold text-2xl">Money printer go brrrrr</h1>
		<ul class="steps">
			<li data-content="🏦" class="step step-primary" />
			<li
				data-content="💵"
				class="step {step > 1 ? 'step-primary' : ''}"
			/>
			<li
				data-content="⚡"
				class="step {step > 2 ? 'step-primary' : ''}"
			/>
			<li
				data-content="🖨️"
				class="step {step > 3 ? 'step-primary' : ''}"
			/>
		</ul>
		<div class="m-auto w-full">
			{#if step === 1}
				<Step1 bind:selectedMint bind:step />
			{:else if step === 2}
				<Step2
					bind:step
					bind:selectedMint
					bind:selectedDenomination
					bind:selectedNumberOfNotes
				/>
			{:else if step === 3}
				<Step3
					bind:step
					bind:selectedMint
					bind:selectedDenomination
					bind:selectedNumberOfNotes
					bind:tokens
					bind:isPaid
				/>
			{:else}
				<Step4
					bind:step
					bind:selectedMint
					bind:selectedDenomination
					bind:selectedNumberOfNotes
					bind:tokens
					bind:isBrrr
				/>
			{/if}
		</div>
		<div class="flex gap-4">
			<a
				href="https://gandlaf.com/donate"
				class="m-4 btn btn-sm btn-error btn-circle"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class=" w-6 h-6"
				>
					<path
						d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"
					/>
				</svg>
			</a>
			<a
				href="https://github.com/gandlafbtc/cashu-brrr"
				class="m-4 btn btn-sm btn-info btn-circle"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="w-6 h-6"
				>
					<path
						fill-rule="evenodd"
						d="M14.447 3.027a.75.75 0 01.527.92l-4.5 16.5a.75.75 0 01-1.448-.394l4.5-16.5a.75.75 0 01.921-.526zM16.72 6.22a.75.75 0 011.06 0l5.25 5.25a.75.75 0 010 1.06l-5.25 5.25a.75.75 0 11-1.06-1.06L21.44 12l-4.72-4.72a.75.75 0 010-1.06zm-9.44 0a.75.75 0 010 1.06L2.56 12l4.72 4.72a.75.75 0 11-1.06 1.06L.97 12.53a.75.75 0 010-1.06l5.25-5.25a.75.75 0 011.06 0z"
						clip-rule="evenodd"
					/>
				</svg>
			</a>
		</div>
	</div>
</div>
