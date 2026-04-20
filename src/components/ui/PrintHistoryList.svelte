<script lang="ts">
  import { prints } from "@/state/stores/printing.svelte";
  import type { Print } from "@/types/cashu";
  import NotesCalc from "@/features/printing/components/NotesCalc.svelte";
  import { getAmountForTokenSet } from "@/lib/utils";

  interface Props {
    onReprint: (print: Print) => void;
  }

  let { onReprint }: Props = $props();
</script>

{#if $prints.length}
  <div class="divider">or</div>
  <p class="font-bold">Re-print previous print</p>
  <div class="h-fit w-full">
    <div
      class="h-full max-h-52 lg:max-h-96 flex flex-col gap-3 overflow-y-auto"
    >
      {#each $prints as print}
        <div class="flex gap-2 flex-col bg-base-300 rounded-lg p-2 w-full">
          <button
            class="btn btn-secondary btn-sm"
            onclick={() => onReprint(print)}>Print</button
          >
          <NotesCalc
            selectedDenomination={getAmountForTokenSet(print.tokens[0].proofs)}
            selectedNumberOfNotes={print.tokens.length}
            unit={print.tokens[0].unit}
            isDonate={print.donation}
            donationAmount={getAmountForTokenSet(print.donation?.proofs ?? [])}
          ></NotesCalc>
          <p class="break-all">
            {print.mint}
          </p>
          <p class="text-sm text-neutral">
            {new Date(print.ts).toLocaleString()}
          </p>
        </div>
      {/each}
    </div>
  </div>
{/if}
