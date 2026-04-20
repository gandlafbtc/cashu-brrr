<script lang="ts">
  interface Props {
    onDownloadQRs?: () => void;
    onDownloadAll?: () => void;
    onBack?: () => void;
  }

  let { onDownloadQRs, onDownloadAll, onBack }: Props = $props();
</script>

<div class="flex flex-col gap-4 w-full max-w-md">
  <button class="btn btn-primary btn-lg" onclick={onDownloadQRs}>
    Download QR Codes as ZIP
  </button>
  <button class="btn btn-secondary btn-lg" onclick={onDownloadAll}>
    Download All Notes (with design)
  </button>
  <button class="btn btn-outline" onclick={onBack}> Back to customize </button>
</div>
