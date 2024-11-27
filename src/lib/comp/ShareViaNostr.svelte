<script lang="ts">
  import { toast } from "svelte-sonner";
  import { discoverContacts, sendViaNostr } from "../../nostr";
  import { discoveredContacts, preparedTokens } from "../stores.svelte";
  import { Check, Minus, X } from "lucide-svelte";
  import { getEncodedTokenV4 } from "@cashu/cashu-ts";
  import { nip19 } from "nostr-tools";
    import { delay } from "../utils";
  let addressBookNpub = $state("");

  let sent = $state(false);

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
    await delay(2000)
    toast.promise(delay(2000), {
      loading: 'Finishing session...',
      success: 'Done!'
    })
    await delay(3000)
    window.location.reload()
  };

  let selectedNpubs: string[] = $state([]);
</script>

<div class="gap-4 flex w-full m-4 flex-col">
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
        <span class="text-secondary text-sm overflow-clip overflow-ellipsis">
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
