<script lang="ts">
  import { toast } from "svelte-sonner";
  import { discoverContacts, sendViaNostr } from "@/nostr";
  import {
    discoveredContacts,
    preparedTokens,
    wallet,
  } from "@/state/stores/printing.svelte";
  import { Check, Minus, Copy } from "lucide-svelte";
  import { getEncodedTokenV4 } from "@cashu/cashu-ts";
  import { nip19 } from "nostr-tools";
  import {
    delay,
    formatAmount,
    getAmountForTokenSet,
  } from "@/lib/utils";

  let addressBookNpub = $state("");

  let sent = $state(false);

  const copyToken = async (token: any, index: number) => {
    const encodedToken = getEncodedTokenV4(token);

    try {
      await navigator.clipboard.writeText(encodedToken);
      toast.success(`Token #${index + 1} copied to clipboard!`);
    } catch (error) {
      toast.error("Failed to copy to clipboard");
      console.error(error);
    }
  };

  const discover = () => {
    if (!addressBookNpub.startsWith("npub")) {
      toast.warning("Use an NPub to import contacts from");
      return;
    }

    discoverContacts(addressBookNpub);
  };

  const send = async () => {
    for (const [i, npub] of selectedNpubs.entries()) {
      await sendViaNostr(
        nip19.decode(npub).data as string,
        getEncodedTokenV4($preparedTokens[i]),
      );
    }
    sent = true;
    toast.info("Tokens were sent over nostr!");
    await delay(2000);
    toast.promise(delay(2000), {
      loading: "Finishing session...",
      success: "Done!",
    });
    await delay(3000);
    window.location.reload();
  };

  let selectedNpubs: string[] = $state([]);
</script>

<div class="flex flex-col gap-6 w-full p-4">
  <!-- Nostr Sharing Section -->
  <div class="flex flex-col gap-4">
    <h3 class="text-xl font-bold">📡 Share via Nostr</h3>
    <p class="text-sm opacity-70">
      Load an address book from an NPUB and send tokens directly
    </p>
    <div class="gap-4 flex w-full flex-col">
      Load an address book from an NPUB
      <div class="flex gap-2">
        <input
          type="text"
          class="input input-primary"
          placeholder="npub"
          bind:value={addressBookNpub}
          onkeypress={(e: KeyboardEvent) => {
            if (e.key === "Enter") {
              discover();
            }
          }}
        />
        <button class="btn btn-primary" onclick={discover}> Confirm </button>
      </div>
      {#each $discoveredContacts as contact}
        <div class="rounded-xl border p-2 flex items-center gap-4">
          <div class="avatar">
            <div class="w-10 rounded-full">
              <img src={contact.picture ?? ""} alt={contact.alias} />
            </div>
          </div>
          <div class="flex flex-col gap-2 justify-between h-full w-60">
            <span class="font-bold">
              {contact.alias}
            </span>
            <span
              class="text-secondary text-sm overflow-clip overflow-ellipsis"
            >
              <span>
                {contact.npub}
              </span>
            </span>
          </div>
          <div class="w-full flex justify-end">
            {#if selectedNpubs.includes(contact.npub)}
              <button
                class="btn btn-success btn-square"
                onclick={() =>
                  selectedNpubs.splice(
                    selectedNpubs.findIndex((n) => n === contact.npub),
                    1,
                  )}
              >
                <Check></Check>
              </button>
            {:else}
              <button
                class="btn btn-square border border-white"
                onclick={() => selectedNpubs.push(contact.npub)}
              >
                <Minus></Minus>
              </button>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Divider -->
  <div class="divider">OR</div>

  <!-- Copy Tokens Section -->
  <div class="flex flex-col gap-4">
    <h3 class="text-xl font-bold">📋 Copy Tokens</h3>
    <p class="text-sm opacity-70">Copy tokens to clipboard for easy sharing</p>

    <div class="grid gap-3">
      {#each $preparedTokens as token, index}
        {@const amount = getAmountForTokenSet(token.proofs)}
        <div class="card bg-base-200 shadow-md">
          <div
            class="card-body p-4 flex flex-row items-center justify-between gap-4"
          >
            <div class="flex flex-col gap-1 flex-1">
              <span class="font-bold text-lg">
                Token #{index + 1}
              </span>
              <span class="text-sm opacity-70">
                {formatAmount(amount, $wallet.unit)}
              </span>
            </div>
            <div class="flex gap-2">
              <button
                class="btn btn-primary gap-2"
                onclick={() => copyToken(token, index)}
              >
                <Copy size={20} />
                Copy
              </button>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

{#if $discoveredContacts.length && !sent}
  <div
    class="fixed flex-col justify-between flex bottom-8 right-8 p-2 bg-base-300 h-32 w-56 shadow-xl rounded-lg"
  >
    <progress
      class="progress w-full {selectedNpubs.length === $preparedTokens.length
        ? 'progress-success'
        : 'progress-warning'}"
      value={selectedNpubs.length}
      max={$preparedTokens.length}
    ></progress>
    <div>
      Selected {selectedNpubs.length} from {$preparedTokens.length}
    </div>
    <button
      onclick={send}
      class="btn {selectedNpubs.length !== $preparedTokens.length
        ? 'btn-warning'
        : 'btn-primary'}"
      disabled={!selectedNpubs.length ||
        selectedNpubs.length > $preparedTokens.length}
    >
      Send
    </button>
  </div>
{/if}
