<script lang="ts">
	import { CashuMint, CashuWallet, getDecodedToken, getEncodedToken, type Token } from '@cashu/cashu-ts';
	import Note from './Note.svelte';
    import type { Mint } from '../mint';

	export let selectedMint: Mint;
	export let selectedDenomination: number;
	export let selectedNumberOfNotes: number;
	export let tokens: Token[];

	let isBrrr = false

</script>

{#if !isBrrr}
<div class="">
	<h2 class="font-bold text-lg text-center">Notes are ready to be printed</h2>
	<div class="flex flex-col gap-1">
		<p>
			Number of notes: {selectedNumberOfNotes}
		</p>
		<p>
			Denomination: {selectedDenomination}
		</p>
		<p>
			total value: {selectedDenomination * selectedNumberOfNotes}
		</p>
		<p class="max-w-xs overflow-clip truncate">
			From mint: {selectedMint.mintUrl}
		</p>
	</div>
	<p class="font-bold">Preview:</p>
	<Note
	denomination={selectedDenomination}
	mintUrl={selectedMint.mintUrl}
	token={'blablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla'}
	/>
	<button class="btn btn-primary mt-2" on:click={()=>isBrrr=true}> BRRRRRR </button>
</div>
{:else}
<div class="bg-white">

	{#each tokens as token}
	<Note
	denomination={token.token[0].proofs[0].amount}
	mintUrl={token.token[0].mint}
	token={getEncodedToken(token)}
	/>
	{/each}
</div>
{/if}

<style>
	@font-face {
		font-family: 'testfont';
		src: url('/fonts/super-car.otf');
	}
</style>