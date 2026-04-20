<script lang="ts">
  interface Props {
    selectedTemplate: string;
    onTemplateChange?: (template: string) => void;
  }

  let { selectedTemplate = $bindable(), onTemplateChange }: Props = $props();

  const templates = [
    { id: "comic", label: "Comic", description: "Fun comic-style design" },
    {
      id: "custom",
      label: "Custom",
      description: "Create your own custom design",
    },
    {
      id: "mountainlake",
      label: "Mountainlake",
      description: "Pparofessional mountain theme",
    },
  ];

  const selectTemplate = (id: string) => {
    selectedTemplate = id;
    if (onTemplateChange) {
      onTemplateChange(id);
    }
  };
</script>

<div class="flex flex-col gap-4">
  <p class="font-bold text-lg">Select Template</p>
  <div class="flex gap-3 flex-wrap">
    {#each templates as template}
      <button
        class="btn {selectedTemplate === template.id
          ? 'btn-primary'
          : 'btn-outline'}"
        onclick={() => selectTemplate(template.id)}
      >
        <div class="flex flex-col">
          <span>{template.label}</span>
          <span class="text-xs opacity-70">{template.description}</span>
        </div>
      </button>
    {/each}
  </div>
</div>
