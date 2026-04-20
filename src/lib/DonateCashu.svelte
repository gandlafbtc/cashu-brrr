<script>
  import { getDecodedToken } from "@cashu/cashu-ts";
  import { toast } from "svelte-sonner";
  import { NUTSTASH_PUBKEY, sendViaNostr } from "@/nostr";

  let inputCashu = $state("");
  const process = () => {
    setTimeout(async () => {
      try {
        if (!inputCashu.startsWith("cashu")) {
          throw new Error("Not a cashu token");
        }
        const token = getDecodedToken(inputCashu);
        if (!token) {
          throw new Error("Could not process token");
        }
        sendViaNostr(NUTSTASH_PUBKEY, inputCashu);
        toast.info("Donation received! Thanks for your support 🧡");
      } catch (error) {
        console.error(error);
        toast.error(
          error instanceof Error ? error.message : "An error occurred",
        );
      } finally {
        inputCashu = "";
      }
    }, 200);
  };
</script>

<input
  type="text"
  bind:value={inputCashu}
  class="input input-primary w-full"
  placeholder="paste a Cashu token to donate"
  onpaste={process}
/>
