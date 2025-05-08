<script lang="ts">
  import { getDecodedToken, getEncodedTokenV4, type Proof, type Token } from "@cashu/cashu-ts";
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
  } from "./stores.svelte";
  import LnInvoice from "./comp/LNInvoice.svelte";
  import {
    createOutputAmount,
    createOutputAmounts,
    formatAmount,
    getAmountForTokenSet,
  } from "./utils";
  import { toast } from "svelte-sonner";
    import { NUTSTASH_PUBKEY, sendViaNostr } from "../nostr";

  interface Props {
    isPaid?: boolean;
  }

  let inputToken = $state("");

  let isLoading = $state(false);

  let tab = $state("ecash");

  const validate = async () => {
    try {
      isLoading = true;
      const outputAmounts = await createOutputAmounts(
        $selectedDenomination,
        $selectedNumberOfNotes,
      );
      console.log(outputAmounts);
      if (!inputToken.startsWith("cashu")) {
        throw new Error("Not a cashu token");
      }
      const token = getDecodedToken(inputToken);
      if (token.mint !== $wallet.mint.mintUrl) {
        throw new Error(
          `Mint mismatch: needed ${$wallet.mint.mintUrl}, received ${token.mint}`,
        );
      }
      if (token.unit !== $wallet.unit) {
        throw new Error(
          `Unit mismatch: Needed ${$wallet.unit}, Received ${token.unit}`,
        );
      }
      if (
        getAmountForTokenSet(token.proofs) <
        ($selectedDenomination * $selectedNumberOfNotes)+$donation
      ) {
        throw new Error(
          `Amount mismatch: Needed at least ${($selectedDenomination * $selectedNumberOfNotes)+$donation}, Received ${getAmountForTokenSet(token.proofs)}`,
        );
      }
      toast.promise($wallet.receive(token, { outputAmounts }), {
        loading: "Received! Creating new cashu tokens...",
        success: (data) => {
          handleProofs(data);
          donation.set(0)
          step.set(4);
          return "Tokens created!";
        },
        error: (e) => {
          console.error(e);
          return e.message;
        },
      });
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    } finally {
      isLoading = false;
      inputToken = "";
    }
  };

  const handleProofs = async (ps: Proof[]) => {
    try {
      
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
        toast.info('We have received your '+ formatAmount(getAmountForTokenSet(donationToken.proofs), $wallet.unit) +' donation. Thank you for supporting us!')
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
  } catch (error) {
    toast.error(error.message)
    console.error(error) 
  }
    
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

<div class="flex flex-col justify-center gap-2 items-center">
  <div role="tablist" class="tabs tabs-boxed">
    <button
      role="tab"
      class="tab"
      class:tab-active={tab === "ecash"}
      onclick={() => {
        tab = "ecash";
      }}>Ecash</button
    >
    <button
      role="tab"
      class="tab"
      class:tab-active={tab === "ln"}
      onclick={() => {
        tab = "ln";
      }}>Lightning</button
    >
  </div>
  <div class="flex flex-col items-center justify-center gap-2 h-96">
    {#if tab === "ln"}
      <div>
        <LnInvoice></LnInvoice>
      </div>
    {:else}
      Paste
      <p class="badge badge-warning">
        {formatAmount(
          ($selectedDenomination * $selectedNumberOfNotes)+$donation,
          $wallet.unit,
        )} token
      </p>
      <p>From</p>
      <p class="badge badge-info">
        {$wallet?.mint.mintUrl}
      </p>

      <input
        class="input input-primary"
        placeholder="cashuB...."
        bind:value={inputToken}
        disabled={isLoading}
      />

      <button
        class="btn btn-primary mt-2"
        onclick={validate}
        disabled={isLoading || !inputToken.startsWith('cashu')}
      >
        Validar token
      </button>
      <p class="opacity-50">
        *Overpaid tokens will be donated to the money printer
      </p>
    {/if}
  </div>
</div>
