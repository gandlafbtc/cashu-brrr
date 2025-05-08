<script lang="ts">

  import { QRCodeImage } from "svelte-qrcode-image";

  interface Props {
    isPaid?: boolean;
  }
  import { onMount } from "svelte";
  import {
    donation,
    preparedTokens,
    prints,
    proofs,
    selectedDenomination,
    selectedNumberOfNotes,
    step,
    wallet,
    type Print,
  } from "../stores.svelte";
  import { getEncodedTokenV4, MintQuoteState, type Proof, type Token } from "@cashu/cashu-ts";
  import {
    copyTextToClipboard,
    createOutputAmount,
    createOutputAmounts,
    delay,
    getAmountForTokenSet,
  } from "../utils";
    import { nip04 } from "nostr-tools";
    import { NUTSTASH_PUBKEY, sendViaNostr } from "../../nostr";
    import { toast } from "svelte-sonner";

  let { isPaid = $bindable(false) }: Props = $props();

  let invoice = $state("");

  onMount(async () => {
    const quote = await $wallet.createMintQuote(
      $selectedDenomination * $selectedNumberOfNotes + $donation,
    );
    console.log("Quote generado:", quote);
    console.log("ID de quote:", quote.quote);

    invoice = quote.request;

    setTimeout(() => checkQuote(quote.quote), 5000);
  });

  const checkQuote = async (quote: string) => {
    try {
      const newquote = await $wallet.checkMintQuote(quote);
      console.log("Estado del quote:", newquote.state);

      if (newquote.state === MintQuoteState.PAID || newquote.paid === true) {
        isPaid = true;
        console.log("Invoice pagada ✅. Minting proofs...");

        const outputAmounts = await createOutputAmounts(
          $selectedDenomination,
          $selectedNumberOfNotes,
          true,
        );

        const ps = await $wallet.mintProofs(
          $selectedDenomination * $selectedNumberOfNotes + $donation,
          quote,
          { outputAmounts }
        );

        console.log("Proofs generados:", ps);

        await handleProofs(ps);
        donation.set(0);
        step.set(4);
      } else {
        console.log("Aún no pagado. Reintentando en 5s...");
        await delay(5000);
        checkQuote(quote);
      }
    } catch (e: any) {
      // ⚠️ Este bloque se activa si cashu-ts lanza un error incluso con estado válido
      const message = e?.message?.toLowerCase() ?? "";
      console.error("Error en checkQuote:", e);

      if (message.includes("pending")) {
        console.log("Estado pending, reintentando en 5s...");
        await delay(5000);
        checkQuote(quote);
      } else if (message.includes("paid")) {
        console.log("Estado 'paid' dentro de error, intentando seguir...");
        isPaid = true;
        const outputAmounts = await createOutputAmounts(
          $selectedDenomination,
          $selectedNumberOfNotes,
          true,
        );
        const ps = await $wallet.mintProofs(
          $selectedDenomination * $selectedNumberOfNotes + $donation,
          quote,
          { outputAmounts }
        );
        await handleProofs(ps);
        donation.set(0);
        step.set(4);
      } else {
        toast.error("Error checking payment status");
      }
    }
  };

  const handleProofs = async (ps: Proof[]) => {
    proofs.update((ctx) => [...ps, ...ctx]);
    const {tokens, donation: donationToken} = await createTokensForPrint(
      ps,
      $wallet.mint.mintUrl,
      $wallet.unit,
      $selectedNumberOfNotes,
    );

    if (donationToken) {
      await sendViaNostr(NUTSTASH_PUBKEY, getEncodedTokenV4(donationToken))
      setTimeout(() => {
        toast.info('We have received your donation. Thank you for supporting us!')
      }, 3000);
    }

    const print: Print = {
      tokens,
      donation: donationToken,
      mint: $wallet.mint.mintUrl,
      ts: Date.now(),
    };
    prints.update((ctx) => [print, ...ctx]);
    preparedTokens.set(tokens);
  };

  const createTokensForPrint = async (
    proofs: Proof[],
    mint: string,
    unit: string,
    n: number,
  ) => {
    const tokens: Token[] = [];
    let donationToken: Token | undefined = undefined;
    const ps = [...proofs];
    const outputAmount = await createOutputAmount($selectedDenomination);

    while (ps.length) {
      const token: Token = {
        mint,
        unit,
        proofs: [],
      };
      if (getAmountForTokenSet(tokens.map(t=> t.proofs).flat())>=$selectedDenomination*$selectedNumberOfNotes) {
        token.proofs.push(...ps)
        donationToken = token
        return {tokens: tokens, donation: donationToken};
      }
      for (const amount of outputAmount) {
        const proof = ps.splice(
          ps.findIndex((p) => p.amount === amount),
          1,
        );
        token.proofs.push(...proof);
      }
      tokens.push(token);
    }
    return {tokens: tokens, donation: donationToken};
  };

</script>

<!-- content here -->
<div class="flex flex-col gap-2 items-center">
  {#if invoice}
    {#if isPaid}
      <p class="flex items-center gap-2 text-success">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        Invoice has been paid
      </p>
    {:else}
    <a href={"lightning:" + invoice}><QRCodeImage text={invoice} /> </a>
    <div class="flex items-center gap-2 w-full">
      <input readonly class="input input-primary" value={invoice} />
      <button
      class="btn btn-primary"
      onclick={() => copyTextToClipboard(invoice)}
      >
      <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="size-6"
      >
      <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
      />
    </svg>
    Copy
  </button>
</div>

<p class="opacity-50">
  *Overpaid LN fees will be donated to the money printer
</p>
    {/if}
  {:else}
    <span class="loading loading-dots loading-md"></span>
  {/if}

</div>
