<script lang="ts">
  import {
    getDecodedToken,
    getEncodedTokenV4,
    type Proof,
    type Token,
  } from "@cashu/cashu-ts";
  import {
    donation,
    preparedTokens,
    prints,
    proofs,
    selectedDenomination,
    selectedNumberOfNotes,
    step,
    wallet,
  } from "@/state/stores/printing.svelte";
  import type { Print } from "@/types/cashu";
  import {
    createOutputAmount,
    createOutputAmounts,
    formatAmount,
    getAmountForTokenSet,
  } from "@/lib/utils";
  import { toast } from "svelte-sonner";
  import { NUTSTASH_PUBKEY, sendViaNostr } from "@/nostr";
  import PaymentMethod from "@/components/ui/PaymentMethod.svelte";

  let tab = $state("ecash");

  const validate = async (inputToken: string) => {
    try {
      const outputAmounts = await createOutputAmounts(
        $selectedDenomination,
        $selectedNumberOfNotes,
      );
      console.log("Output amounts:", outputAmounts);
      
      // More flexible token validation
      if (!inputToken.trim()) {
        throw new Error("Empty token");
      }
      
      let token;
      try {
        token = getDecodedToken(inputToken);
      } catch (e) {
        throw new Error("Invalid token format - could not decode");
      }
      
      const tokenAmount = getAmountForTokenSet(token.proofs);
      const requiredAmount = $selectedDenomination * $selectedNumberOfNotes + $donation;
      
      console.log(`Token amount: ${tokenAmount}, Required: ${requiredAmount}`);
      
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
      
      // Account for potential swap fees (typically 1-2 sats)
      const estimatedFees = 2; // Conservative estimate for swap fees
      const availableAmount = tokenAmount - estimatedFees;
      
      if (availableAmount < requiredAmount) {
        throw new Error(
          `Insufficient amount: Need ${requiredAmount} sats, but only ${availableAmount} sats available after fees (${estimatedFees} sat estimated fees). Token has ${tokenAmount} sats total.`,
        );
      }
      
      toast.promise($wallet.receive(token, { outputAmounts }), {
        loading: "Received! Creating new cashu tokens...",
        success: (data) => {
          handleProofs(data);
          donation.set(0);
          step.set(4);
          return "Tokens created!";
        },
        error: (e) => {
          console.error(e);
          const message =
            e instanceof Error ? e.message : "Failed to create tokens";
          return message;
        },
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Validation failed";
      toast.error(message);
      console.error(error);
    } finally {
      // isLoading is managed by PaymentMethod component now
    }
  };

  const handleProofs = async (ps: Proof[]) => {
    try {
      proofs.update((ctx) => [...ps, ...ctx]);
      const { tokens, donation: donationToken } = await createTokensForPrint(
        ps,
        $wallet.mint.mintUrl,
        $wallet.unit,
      );

      if (donationToken) {
        await sendViaNostr(NUTSTASH_PUBKEY, getEncodedTokenV4(donationToken));
        setTimeout(() => {
          toast.info(
            "We have received your " +
              formatAmount(
                getAmountForTokenSet(donationToken.proofs),
                $wallet.unit,
              ) +
              " donation. Thank you for supporting us!",
          );
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
      const message =
        error instanceof Error ? error.message : "Failed to handle proofs";
      toast.error(message);
      console.error(error);
    }
  };

  const createTokensForPrint = async (
    proofs: Proof[],
    mint: string,
    unit: string,
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
      if (
        getAmountForTokenSet(tokens.map((t) => t.proofs).flat()) >=
        $selectedDenomination * $selectedNumberOfNotes
      ) {
        token.proofs.push(...ps);
        donationToken = token;
        return { tokens: tokens, donation: donationToken };
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
    return { tokens: tokens, donation: donationToken };
  };
</script>

<PaymentMethod
  bind:selectedTab={tab}
  totalAmount={$selectedDenomination * $selectedNumberOfNotes + $donation}
  unit={$wallet.unit}
  mintUrl={$wallet?.mint.mintUrl}
  onEcashPaste={validate}
/>
