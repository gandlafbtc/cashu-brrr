<script lang="ts">
  import { getDecodedToken, getEncodedTokenV4 } from "@cashu/cashu-ts";
  import "@/app.css";
  import ComicNote from "@/features/templates/comic/ComicNote.svelte"
  import Main from "@/lib/Main.svelte";
  import { getAmountForTokenSet } from "@/lib/utils";

  const urlParams = window.location.hash.slice(1).split("/");

  const token = $derived.by(() => {
    const tokenString = urlParams[0];
    try {
      return getDecodedToken(tokenString ?? "");
    } catch (error) {
      return undefined;
    }
  });
  const template = $derived.by(() => {
    const param = urlParams[1];
    if (!param) return 5;
    const design = Number.parseInt(param);
    const d = isNaN(design) ? 5 : design;
    return d;
  });
</script>

{#if token}
  <div>
    <ComicNote
      design={template}
      denomination={getAmountForTokenSet(token.proofs)}
      mintUrl={token.mint}
      token={getEncodedTokenV4(token)}
      unit={token.unit ?? "sat"}
    />
  </div>
{:else}
  <Main></Main>
{/if}
