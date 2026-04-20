<script lang="ts">
  import { createOutputAmount } from "@/lib/utils";
  import { ChevronDown, ChevronUp } from "lucide-svelte";

  interface Props {
    denomination: number;
    numberOfNotes: number;
    noPrint?: boolean;
  }

  let {
    denomination = $bindable(),
    numberOfNotes = $bindable(),
    noPrint = $bindable(false),
  }: Props = $props();

  const getNumberOfOuts = async () => {
    return await createOutputAmount(denomination);
  };

  let numberOfOuts = $derived(getNumberOfOuts());

  // Cache for valid denominations (≤4 outputs)
  const validDenominationsCache = new Map<number, boolean>();

  // Check if a denomination is valid (has ≤4 outputs)
  const isValidDenomination = async (value: number): Promise<boolean> => {
    if (validDenominationsCache.has(value)) {
      return validDenominationsCache.get(value)!;
    }

    try {
      const outputs = await createOutputAmount(value);
      const isValid = outputs.length <= 4;
      validDenominationsCache.set(value, isValid);
      return isValid;
    } catch {
      validDenominationsCache.set(value, false);
      return false;
    }
  };

  // Find closest valid denomination using cached results
  const findClosestValidDenomination = async (
    current: number,
    direction: "up" | "down",
  ) => {
    const step = direction === "up" ? 1 : -1;
    const maxIterations = 1000; // Safety limit

    for (let i = 1; i <= maxIterations; i++) {
      const testValue = current + step * i;

      if (testValue < 1) {
        return 1;
      }

      const isValid = await isValidDenomination(testValue);
      if (isValid) {
        return testValue;
      }
    }

    return current; // Fallback
  };

  const adjustToLower = async () => {
    const closest = await findClosestValidDenomination(denomination, "down");
    denomination = closest;
    noPrint = false;
  };

  const adjustToUpper = async () => {
    const closest = await findClosestValidDenomination(denomination, "up");
    denomination = closest;
    noPrint = false;
  };
</script>

<div class="flex flex-col w-full gap-3">
  <div class="flex flex-col gap-2">
    <p class="font-semibold text-sm">Denomination:</p>
    <input
      min="1"
      type="number"
      class="input input-secondary w-full"
      bind:value={denomination}
    />
  </div>
  <div class="min-h-52">
    {#await numberOfOuts then value}
      <div class="flex flex-col gap-2">
        <div class="flex gap-2 flex-wrap text-sm">
          <p class="opacity-70">Token composition:</p>
          <p class="font-mono">
            [{value.join(", ")}]
          </p>
        </div>
        <progress
          class="progress w-56"
          class:progress-error={value.length > 4}
          class:progress-warning={value.length === 4 || value.length === 3}
          class:progress-success={value.length < 3}
          value={value.length}
          max="4"
        ></progress>
        <p class="text-xs opacity-70">
          {value.length}/4 outputs
        </p>
        {#if value.length > 4}
          <p class="font-semibold text-sm text-error">
            Too many outputs for QR code readability
          </p>
          <div class="flex gap-2 flex-wrap items-center mt-2">
            <p class="text-xs opacity-70">Quick adjust:</p>
            <button
              class="btn btn-xs btn-outline btn-success gap-1"
              onclick={adjustToLower}
            >
              <ChevronDown size={14} />
              Lower
            </button>
            <button
              class="btn btn-xs btn-outline btn-success gap-1"
              onclick={adjustToUpper}
            >
              <ChevronUp size={14} />
              Upper
            </button>
          </div>
          <label class="flex gap-2 items-center mt-2 cursor-pointer">
            <input
              type="checkbox"
              class="checkbox checkbox-primary checkbox-sm"
              bind:checked={noPrint}
            />
            <span class="text-xs">I won't use QR codes</span>
          </label>
        {/if}
      </div>
    {/await}
  </div>

  <div class="flex flex-col gap-2">
    <p class="font-semibold text-sm">Number of notes:</p>
    <input
      type="range"
      min="1"
      max="100"
      bind:value={numberOfNotes}
      class="range range-primary range-sm"
    />
    <input
      min="1"
      type="number"
      class="input input-primary w-full"
      bind:value={numberOfNotes}
    />
  </div>
</div>
