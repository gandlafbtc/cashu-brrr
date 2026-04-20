<script lang="ts">
  interface GradientStop {
    offset: number;
    color: string;
  }

  interface Props {
    type: "linear" | "radial" | "solid";
    angle?: number;
    stops: GradientStop[];
    solidColor?: string;
    onTypeChange: (type: "linear" | "radial" | "solid") => void;
    onAngleChange?: (angle: number) => void;
    onStopsChange: (stops: GradientStop[]) => void;
    onSolidColorChange?: (color: string) => void;
  }

  let {
    type = $bindable(),
    angle = $bindable(135),
    stops = $bindable(),
    solidColor = $bindable("#F77F00"),
    onTypeChange,
    onAngleChange,
    onStopsChange,
    onSolidColorChange,
  }: Props = $props();
</script>

<div class="space-y-3">
  <!-- Type Selector -->
  <div class="flex gap-2">
    <button
      class="btn btn-sm flex-1"
      class:btn-primary={type === "solid"}
      onclick={() => {
        type = "solid";
        onTypeChange("solid");
      }}
    >
      Solid
    </button>
    <button
      class="btn btn-sm flex-1"
      class:btn-primary={type === "linear"}
      onclick={() => {
        type = "linear";
        onTypeChange("linear");
      }}
    >
      Linear
    </button>
    <button
      class="btn btn-sm flex-1"
      class:btn-primary={type === "radial"}
      onclick={() => {
        type = "radial";
        onTypeChange("radial");
      }}
    >
      Radial
    </button>
  </div>

  {#if type === "solid"}
    <!-- Solid Color -->
    <label class="form-control">
      <div class="label pb-1">
        <span class="label-text text-xs">Color</span>
      </div>
      <input
        type="color"
        bind:value={solidColor}
        onchange={() => onSolidColorChange?.(solidColor)}
        class="w-full h-10 rounded cursor-pointer"
      />
    </label>
  {:else}
    <!-- Gradient Angle (for linear only) -->
    {#if type === "linear"}
      <label class="form-control">
        <div class="label pb-1">
          <span class="label-text text-xs">Angle: {angle}°</span>
        </div>
        <input
          type="range"
          min="0"
          max="360"
          bind:value={angle}
          onchange={() => onAngleChange?.(angle)}
          class="range range-sm range-primary"
        />
      </label>
    {/if}

    <!-- Color Stops -->
    <div class="space-y-2">
      {#each stops as stop, i}
        <div class="flex gap-2 items-center">
          <input
            type="color"
            bind:value={stop.color}
            onchange={() => onStopsChange(stops)}
            class="h-8 w-12 rounded cursor-pointer"
          />
          <input
            type="range"
            min="0"
            max="100"
            bind:value={stop.offset}
            onchange={() => onStopsChange(stops)}
            class="range range-xs flex-1"
          />
          <span class="text-xs w-10 text-right">{stop.offset}%</span>
          {#if stops.length > 2}
            <button
              class="btn btn-xs btn-ghost"
              onclick={() => {
                stops = stops.filter((_, idx) => idx !== i);
                onStopsChange(stops);
              }}
            >
              ×
            </button>
          {/if}
        </div>
      {/each}
    </div>

    <!-- Add Color Stop Button -->
    {#if stops.length < 5}
      <button
        class="btn btn-xs btn-outline w-full"
        onclick={() => {
          const lastStop = stops[stops.length - 1];
          const newOffset = Math.min(lastStop.offset + 20, 100);
          stops = [...stops, { offset: newOffset, color: lastStop.color }];
          onStopsChange(stops);
        }}
      >
        + Add Color
      </button>
    {/if}
  {/if}
</div>
