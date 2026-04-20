<script lang="ts">
  import { Toaster } from "svelte-sonner";
  import Step1 from "@/features/printing/Step1.svelte";
  import Step2 from "@/features/printing/Step2.svelte";
  import Step3 from "@/features/printing/Step3.svelte";
  import Step4 from "@/features/printing/Step4.svelte";
  import { step } from "@/state/stores/printing.svelte";
  import { Bitcoin, Code, Copy, Heart, Zap } from "lucide-svelte";
  import { copyTextToClipboard } from "@/lib/utils";
  import DonateCashu from "@/lib/DonateCashu.svelte";
  let showDonate = $state(false);
</script>

<Toaster richColors position="top-right"></Toaster>
<div
  class="h-full min-h-screen w-screen bg-gradient-to-br from-primary to-secondary items-center flex justify-center flex-col p-2"
>
  <div
    class="flex m-3 mb-3 gap-2 flex-col items-center bg-base-100 w-full max-w-6xl h-full p-5 rounded-lg shadow-md"
  >
    <h1 class="w-full text-center font-bold text-2xl">
      Money printer go brrrrr
    </h1>
    <ul class="steps w-full max-w-md">
      <li data-content="🏦" class="step {$step >= 1 ? 'step-primary' : ''}">
        <span class="hidden sm:inline text-xs">Mint</span>
      </li>
      <li data-content="💵" class="step {$step >= 2 ? 'step-primary' : ''}">
        <span class="hidden sm:inline text-xs">Amount</span>
      </li>
      <li data-content="⚡" class="step {$step >= 3 ? 'step-primary' : ''}">
        <span class="hidden sm:inline text-xs">Pay</span>
      </li>
      <li data-content="🖨️" class="step {$step >= 4 ? 'step-primary' : ''}">
        <span class="hidden sm:inline text-xs">Print</span>
      </li>
    </ul>
    <div class="m-auto w-full">
      {#if $step === 1}
        <Step1 />
      {:else if $step === 2}
        <Step2 />
      {:else if $step === 3}
        <Step3 />
      {:else}
        <Step4 />
      {/if}
    </div>
    <div class="flex gap-4 flex-wrap justify-center">
      <button
        class="m-2 btn btn-sm btn-error flex"
        onclick={() => (showDonate = !showDonate)}
      >
        <Heart></Heart>
        {#if showDonate}
          Hide
        {:else}
          Donate
        {/if}
      </button>
      <a
        href="https://github.com/gandlafbtc/cashu-brrr"
        class="m-2 btn btn-sm btn-info"
      >
        <Code></Code>
        Code
      </a>
    </div>
    {#if showDonate}
      <div class="flex flex-col gap-2 flex-wrap">
        <div class="flex flex-col gap-2 w-80">
          <p>
            Hi anon! If you appreciate the money printer, consider donating some
            sats. Value4Value!
          </p>
          <p>Let's keep the money printer running.</p>
          <p>Brrrrrrrrrrrrrrrrr...</p>
        </div>
        <div class="flex gap-2 items-center">
          <DonateCashu></DonateCashu>
        </div>
        <div class="flex gap-2 items-center">
          <a
            href="https://geyser.fund/project/brrr"
            target="_blank"
            rel="nofollow noopener noreferrer"
            class="rounded-full w-40 bg-[#2dd4bf] bg-opacity-35 hover:bg-opacity-100 transition-all"
          >
            <img src="/geyser.svg" alt="geyser" />
          </a>
          <button>
            <Copy
              class="w-5 h-5"
              onclick={() =>
                copyTextToClipboard("https://geyser.fund/project/brrr")}
            ></Copy>
          </button>
          <p class="w-24 overflow-clip text-ellipsis text-xs text-nowrap">
            https://geyser.fund/project/brrr
          </p>
        </div>
        <div class="flex gap-2 items-center">
          <a
            class="p-2 flex items-center gap-1 rounded-full bg-blue-600 w-40 bg-opacity-35 hover:bg-opacity-100 transition-all"
            href="bitcoin:+glisteningstruggle62"
          >
            <Bitcoin></Bitcoin>
            <p class="text-xs">PayNym</p>
          </a>
          <button>
            <Copy
              class="w-5 h-5"
              onclick={() => copyTextToClipboard("+glisteningstruggle62")}
            ></Copy>
          </button>
          <p class="w-24 overflow-clip text-ellipsis text-xs break-all">
            +glisteningstruggle62
          </p>
        </div>
        <div class="flex gap-2 items-center">
          <a
            class="p-2 flex items-center gap-1 rounded-full bg-blue-600 w-40 bg-opacity-35 hover:bg-opacity-100 transition-all"
            href="bitcoin:PM8TJQQMZMvfVGsJ2bJmbtDnx2BVgcPThnF8XS9ApGvuzYDPWirVuMencyhvK8WBDTgeaLLEoGEYggTMJFwjDkW8HhfqijrYHStMiFhKfA7UYbwXqYB6"
          >
            <Bitcoin></Bitcoin>
            <p class="text-xs">Payment code</p>
          </a>
          <button>
            <Copy
              class="w-5 h-5"
              onclick={() =>
                copyTextToClipboard(
                  "PM8TJQQMZMvfVGsJ2bJmbtDnx2BVgcPThnF8XS9ApGvuzYDPWirVuMencyhvK8WBDTgeaLLEoGEYggTMJFwjDkW8HhfqijrYHStMiFhKfA7UYbwXqYB6",
                )}
            ></Copy>
          </button>
          <p class="w-24 overflow-clip text-ellipsis text-xs text-nowrap">
            PM8TJQQMZMvfVGsJ2bJmbtDnx2BVgcPThnF8XS9ApGvuzYDPWirVuMencyhvK8WBDTgeaLLEoGEYggTMJFwjDkW8HhfqijrYHStMiFhKfA7UYbwXqYB6
          </p>
        </div>
        <div class="flex gap-2 items-center">
          <a
            class="p-2 flex items-center gap-1 rounded-full bg-orange-600 w-40 bg-opacity-35 hover:bg-opacity-100 transition-all"
            href="bitcoin:bc1q8sy2kd4c907r5y05wwghldpvvnkapkn7yrvs2u"
          >
            <Bitcoin></Bitcoin>
            <p class="text-xs">Onchain address</p>
          </a>
          <button>
            <Copy
              class="w-5 h-5"
              onclick={() =>
                copyTextToClipboard(
                  "bc1q8sy2kd4c907r5y05wwghldpvvnkapkn7yrvs2u",
                )}
            ></Copy>
          </button>
          <p class="w-24 overflow-clip text-ellipsis text-xs">
            bc1q8sy2kd4c907r5y05wwghldpvvnkapkn7yrvs2u
          </p>
        </div>
        <div class="flex gap-2 items-center">
          <a
            class="p-2 flex items-center gap-1 rounded-full bg-yellow-600 w-40 bg-opacity-35 hover:bg-opacity-100 transition-all"
            href="lightning:lno1zrxq8pjw7qjlm68mtp7e3yvxee4y5xrgjhhyf2fxhlphpckrvevh50u0q0pdmt47mvjvq77n7thpvj9m3hcppl4hu95ue953uq46ej46el9rxqsznmjm9j44w9jntmpsq9eec9002pmyjjf6w75v88dn4472zmctcdxqqvewfj3vxyqv54q4gzy7v60u27kgwnurfzpykxnwz0jr4gzg4swld8pglcv7rlulaemm665l4pmftckhj6vwq2e6l4zk8xc53rgt7dyfdd9j86pgfsgmhx67v4a64lfeqggchfm0uqqs6jz4x5lxj3f6qw7vxe4fg8s4z5"
          >
            <Zap></Zap>
            <p class="text-xs">Bolt 12</p>
          </a>
          <button>
            <Copy
              class="w-5 h-5"
              onclick={() =>
                copyTextToClipboard(
                  "lno1zrxq8pjw7qjlm68mtp7e3yvxee4y5xrgjhhyf2fxhlphpckrvevh50u0q0pdmt47mvjvq77n7thpvj9m3hcppl4hu95ue953uq46ej46el9rxqsznmjm9j44w9jntmpsq9eec9002pmyjjf6w75v88dn4472zmctcdxqqvewfj3vxyqv54q4gzy7v60u27kgwnurfzpykxnwz0jr4gzg4swld8pglcv7rlulaemm665l4pmftckhj6vwq2e6l4zk8xc53rgt7dyfdd9j86pgfsgmhx67v4a64lfeqggchfm0uqqs6jz4x5lxj3f6qw7vxe4fg8s4z5",
                )}
            ></Copy>
          </button>
          <p class="w-24 overflow-clip text-ellipsis text-xs">
            lno1zrxq8pjw7qjlm68mtp7e3yvxee4y5xrgjhhyf2fxhlphpckrvevh50u0q0pdmt47mvjvq77n7thpvj9m3hcppl4hu95ue953uq46ej46el9rxqsznmjm9j44w9jntmpsq9eec9002pmyjjf6w75v88dn4472zmctcdxqqvewfj3vxyqv54q4gzy7v60u27kgwnurfzpykxnwz0jr4gzg4swld8pglcv7rlulaemm665l4pmftckhj6vwq2e6l4zk8xc53rgt7dyfdd9j86pgfsgmhx67v4a64lfeqggchfm0uqqs6jz4x5lxj3f6qw7vxe4fg8s4z5
          </p>
        </div>
        <div class="flex gap-2 items-center">
          <a
            class="p-2 flex items-center gap-1 rounded-full bg-yellow-600 w-40 bg-opacity-35 hover:bg-opacity-100 transition-all"
            href="lightning:nutstashapp@geyser.fund"
          >
            <Zap></Zap>
            <p class="text-xs">Lightning address</p>
          </a>
          <button>
            <Copy
              class="w-5 h-5"
              onclick={() => copyTextToClipboard("nutstashapp@geyser.fund")}
            ></Copy>
          </button>
          <p class="w-24 overflow-clip text-ellipsis text-xs">
            nutstashapp@geyser.fund
          </p>
        </div>
      </div>
    {/if}
  </div>
</div>
