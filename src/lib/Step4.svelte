<script lang="ts">
	import {
		CashuMint,
		CashuWallet,
		getDecodedToken,
		getEncodedToken,
		type Token,
	} from "@cashu/cashu-ts";
	import Note2 from "./Note2.svelte";
	import type { Mint } from "../mint";
	import Note3 from "./Note3.svelte";
	import Note4 from "./Note4.svelte";
	import Note5 from "./Note5.svelte";
	import CustomNote from "./CustomNote.svelte";

	export let selectedMint: Mint = { keys: [], mintUrl: "blabla" };
	export let step;
	export let selectedDenomination: number = 1;
	export let selectedNumberOfNotes: number = 1;
	export let tokens: Token[] = [];

	export let isBrrr = false;

	let cornerInput: HTMLInputElement;
	let brandInput: HTMLInputElement;
	let brandImage: HTMLImageElement;
	let cornerImage: HTMLImageElement;

	let noteType = "nutstash";

	//custom note
	let colorCode = "#5db075";
	let brandLogoURL = "";
	let cornerBrandLogoURL = "";

	const getBrandURL = (e) => {
		brandLogoURL = URL.createObjectURL(e.target.files[0]);
	};
	
	const getCornerURL = (e) => {
		cornerBrandLogoURL = URL.createObjectURL(e.target.files[0]);
	};
</script>

{#if !isBrrr}
	<div class="flex flex-col gap-2 items-center w-full">
		<div role="tablist" class="tabs tabs-boxed">
			<button role="tab" class="tab {noteType!=='custom'?'tab-active':''}" on:click={()=> noteType='nutstash'}>Select Theme</button>
			<button role="tab" class="tab {noteType==='custom'?'tab-active':''}" on:click={()=> noteType='custom'}>Custom</button>
		</div>
		{#if noteType !== "custom"}
		<div class="flex flex-col gap-2">
			<div class="flex gap-2 items-center justify-between w-80">
				<div class="flex gap-1 w-full">
					<input
						class="radio radio-primary"
						type="radio"
						name="scoops"
						value="nutstash"
						bind:group={noteType}
					/>
					<p>Nutstash</p>
				</div>
				<div class="h-12 w-44">
					<img src="/ns.png" alt="" class="h-12 w-44" />
				</div>
			</div>
			<div class="flex gap-2 items-center w-full justify-between">
				<div class="flex gap-1 w-full">
					<input
						class="radio radio-primary"
						type="radio"
						name="scoops"
						value="cashu"
						bind:group={noteType}
					/>
					<p>Cashu</p>
				</div>
				<div class="h-12 w-44">
					<img src="/cashu.png" alt="" class="h-12 w-44" />
				</div>
			</div>
			<div class="flex gap-2 items-center w-full justify-between">
				<div class="flex gap-1 w-full">
					<input
						class="radio radio-primary"
						type="radio"
						name="scoops"
						value="bobstash"
						bind:group={noteType}
					/>
					<p>Bo₿stash</p>
				</div>
				<div class="h-12 w-44">
					<img src="/bobstash.png" alt="" class="h-12 w-44" />
				</div>
			</div>
		</div>
		{:else}
		<div class="flex flex-col gap-2">
					<div class="flex gap-2 flex-col">
						Select Color: <input
							type="color"
							bind:value={colorCode}
						/>
						Brand Image:
						<input
							type="file"
							accept="image/*"
							on:input={getBrandURL}
							bind:this={brandInput}
						/>
						Corner Image:
						<input
							type="file"
							accept="image/*"
							on:input={getCornerURL}
							bind:this={cornerInput}
						/>
					</div>
					<CustomNote
						{brandLogoURL}
						{colorCode}
						{cornerBrandLogoURL}
						denomination={selectedDenomination}
						mintUrl={selectedMint.mintUrl}
						token={"blabla"}
					/>
				</div>
		{/if}
		<h2 class="font-bold text-lg text-center">
			Notes are ready to be printed
		</h2>
		<button class="btn btn-primary mt-2" on:click={() => (isBrrr = true)}>
			Print now! BRRRRRRRRRR
		</button>

		<div class="flex flex-col gap-1 items-center pt-10">
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
		<p class="flex justify-between">
			<span class="badge">
				{selectedMint.mintUrl}
			</span>
		</p>
	</div>
{:else}
	<div>
		<p class="font-bold">Press ctrl+P to print</p>
	</div>
	<div class="bg-white z-10">
		{#each tokens as token}
			{#if noteType === "nutstash"}
				<Note2
					denomination={token.token[0].proofs[0].amount}
					mintUrl={token.token[0].mint}
					token={getEncodedToken(token)}
				/>
			{:else if noteType === "bobstash"}
				<Note4
					denomination={token.token[0].proofs[0].amount}
					mintUrl={selectedMint.mintUrl}
					token={getEncodedToken(token)}
				/>
			{:else if noteType === "cashu"}
				<Note5
					denomination={token.token[0].proofs[0].amount}
					mintUrl={selectedMint.mintUrl}
					token={getEncodedToken(token)}
				/>
			{:else if noteType === "custom"}
				<CustomNote
					{brandLogoURL}
					{colorCode}
					{cornerBrandLogoURL}
					denomination={token.token[0].proofs[0].amount}
					mintUrl={selectedMint.mintUrl}
					token={getEncodedToken(token)}
				/>
			{:else}
				<Note3
					denomination={token.token[0].proofs[0].amount}
					mintUrl={token.token[0].mint}
					token={getEncodedToken(token)}
				/>
			{/if}
		{/each}
	</div>
{/if}
