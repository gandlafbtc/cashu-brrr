<script lang="ts">
    import { CashuMint, CashuWallet, type Token } from "@cashu/cashu-ts";
    import type { Mint } from "../mint";
    import { onDestroy, onMount } from "svelte";
    import { QRCodeImage } from "svelte-qrcode-image";
    import { prints } from "./stores";

    export let selectedMint: Mint;
    export let step
    export let selectedDenomination;
    export let selectedNumberOfNotes;
    export let tokens: Token[] = [];
    export let isPaid = false;

    let isAborted = false

    const mint = new CashuMint(selectedMint.mintUrl);
    const wallet = new CashuWallet(mint, selectedMint.keys);
    const amount = selectedDenomination * selectedNumberOfNotes;
    let invoice;
    let h;
    let fee;

    onMount(async () => {
        const { hash, pr, error } = await wallet.requestMint(amount);
        invoice = pr;
        h = hash;
        fee = await wallet.getFee(invoice);
        checkPaid();
    });
    onDestroy(()=> {isAborted=true})
    const checkPaid = async () => {
        try {
            const { proofs } = await wallet.requestTokens(amount, h, [
                { amount: selectedDenomination, count: selectedNumberOfNotes },
            ]);
            for (const proof of proofs) {
                tokens.push({
                    token: [{ mint: selectedMint.mintUrl, proofs: [proof] }],
                });
            }
            prints.update(ctx => [...ctx, {tokens, mint: selectedMint.mintUrl, ts: Date.now()}])
            if (tokens.length) {
                isPaid = true;
                setTimeout(()=> {
                    step=4
                },1000)
            }
        } catch (error) {
        } finally {
            if (isAborted) {
                return
            }
            if (!isPaid) {
                setTimeout(checkPaid, 5000);
            }
        }
    };
</script>

<div class="flex flex-col justify-center gap-2 items-center">
    {#if invoice}
        {#if isPaid}
        <p class="flex items-center gap-2 text-success">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            Invoice has been paid 
        </p>
        {:else}
            <a href={"lightning:" + invoice}><QRCodeImage text={invoice} /> </a>
            <input readonly class="input input-primary" value={invoice} />
            <button on:click={()=>step=2} class='btn'>Back</button>
        {/if}
    {:else}
        <span class="loading loading-dots loading-md" />
    {/if}
</div>
