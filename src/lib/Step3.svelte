<script lang="ts">
    import { CashuMint, CashuWallet, type Token } from "@cashu/cashu-ts";
    import type { Mint } from "../mint";
    import { onMount } from "svelte";
    import { QRCode } from "svelte-qrcode-image/util";
    import { QRCodeImage } from "svelte-qrcode-image";

    export let selectedMint: Mint;
    export let selectedDenomination;
    export let selectedNumberOfNotes;
    export let tokens: Token[] = [];
    export let isPaid = false;

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
            if (tokens.length) {
                isPaid = true;
            }
        } catch (error) {
        } finally {
            if (!isPaid) {
                setTimeout(checkPaid, 5000);
            }
        }
    };
</script>

<div class="flex flex-col justify-center gap-2 items-center">
    {#if invoice}
        {#if isPaid}
            Invoice has been paid
        {:else}
            <a href={"lightning:" + invoice}><QRCodeImage text={invoice} /> </a>
            <input readonly class="input input-primary" value={invoice} />
        {/if}
    {:else}
        <span class="loading loading-dots loading-md" />
    {/if}
</div>
