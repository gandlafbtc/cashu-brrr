<script lang="ts">
    import { Ambulance } from "lucide-svelte";
    import type { Sponsor } from "./sponsors";

    interface Props {sponsor: Sponsor}
    
    let {sponsor}: Props = $props();
</script>

<a target="_blank" class="p-1 rounded-full bg-base-300 transition-all hover:bg-base-200 flex gap-1 items-center w-min border-2 {sponsor.tier==="GOLD"?"border-yellow-400": sponsor.tier==="SILVER"?"border-slate-400":"border-orange-700"}" href="{sponsor.link}">
    <div class="avatar">
      <div class="w-12 rounded-full">
        <img src="{sponsor.imageLink}"/>
      </div>
    </div>
    <p class="text-nowrap text pr-2 font-bold flex flex-col">
        <span>
            {sponsor.name}
      </span>
      <span class="text-sm text-gray-700">
        {sponsor.amount}
      </span>
    </p>
  </a>