<script lang="ts">
  import { toast } from "svelte-sonner";
  import {
    loadAvailableTemplates,
    getTemplateByName,
    getDefaultTemplate,
    downloadTemplate,
    loadTemplateFromFile,
    type MountainlakeTemplateConfig,
    type MountainlakeTemplate,
  } from "@/features/templates/mountainlake/mountainlake-templates";

  interface GradientStop {
    offset: number;
    color: string;
  }

  interface CustomImage {
    id: string;
    url: string;
    x: number;
    y: number;
    opacity: number;
    width: number;
    height: number;
  }

  interface Props {
    // Backside controls
    enableBackside: boolean;
    activeSide: "front" | "back";
    
    // Optional: The opposite side's design config for copying
    oppositeSideConfig?: MountainlakeTemplateConfig;

    // Collapsible sections
    bgSectionOpen: boolean;
    topLeftSectionOpen: boolean;
    topRightSectionOpen: boolean;
    qrSectionOpen: boolean;
    bottomSectionOpen: boolean;

    // Background
    bgGradientType: "linear" | "radial" | "solid";
    gradientType: "linear" | "radial";
    gradientAngle: number;
    gradientStops: GradientStop[];
    radialCenterX: number;
    radialCenterY: number;
    bgSolidColor: string;

    // Top Left Icon
    enableTopLeftIcon: boolean;
    topLeftIcon:
      | "cashu-logo"
      | "bitcoin"
      | "satoshi-v1"
      | "satoshi-v2"
      | "satoshi-v3"
      | "none"
      | "custom";
    customLogoUrl: string;
    topLeftIconColor: string;
    enableIconColorOverride: boolean;
    topLeftIconSize: number;
    topLeftIconX: number;
    topLeftIconY: number;
    topLeftIconOpacity: number;

    // Top Right Text
    enableHeaderText: boolean;
    headerText: string;
    headerTextColor: string;
    headerTextX: number;
    headerTextY: number;

    // QR Code
    enableQrCode: boolean;
    qrGradientType: "linear" | "radial" | "solid";
    qrGradientAngle: number;
    qrGradientStops: GradientStop[];
    qrBackgroundColor: string;
    qrBorderColor: string;
    qrCodeColor: string;
    disableQrBorder: boolean;
    disableQrBackground: boolean;
    qrX: number;
    qrY: number;

    // Bottom
    enableDenomination: boolean;
    denominationColor: string;
    bottomBoxColor: string;
    bottomTextColor: string;
    customBottomText: string;
    denominationX: number;
    denominationY: number;

    // Custom Images
    customImages: CustomImage[];

    // Guide Text Box
    enableGuideText: boolean;
    guideText: string;
    guideTextColor: string;
    guideBackgroundColor: string;
    guideBorderColor: string;
    disableGuideBorder: boolean;
    disableGuideBackground: boolean;
    guideX: number;
    guideY: number;
    guideWidth: number;
    guideHeight: number;
  }

  let {
    enableBackside = $bindable(),
    activeSide = $bindable(),
    oppositeSideConfig = undefined,

    bgSectionOpen = $bindable(),
    topLeftSectionOpen = $bindable(),
    topRightSectionOpen = $bindable(),
    qrSectionOpen = $bindable(),
    bottomSectionOpen = $bindable(),

    bgGradientType = $bindable(),
    gradientType = $bindable(),
    gradientAngle = $bindable(),
    gradientStops = $bindable(),
    radialCenterX = $bindable(),
    radialCenterY = $bindable(),
    bgSolidColor = $bindable(),

    enableTopLeftIcon = $bindable(),
    topLeftIcon = $bindable(),
    customLogoUrl = $bindable(),
    topLeftIconColor = $bindable(),
    enableIconColorOverride = $bindable(),
    topLeftIconSize = $bindable(),
    topLeftIconX = $bindable(),
    topLeftIconY = $bindable(),
    topLeftIconOpacity = $bindable(),

    enableHeaderText = $bindable(),
    headerText = $bindable(),
    headerTextColor = $bindable(),
    headerTextX = $bindable(),
    headerTextY = $bindable(),

    enableQrCode = $bindable(),
    qrGradientType = $bindable(),
    qrGradientAngle = $bindable(),
    qrGradientStops = $bindable(),
    qrBackgroundColor = $bindable(),
    qrBorderColor = $bindable(),
    qrCodeColor = $bindable(),
    disableQrBorder = $bindable(),
    disableQrBackground = $bindable(),
    qrX = $bindable(),
    qrY = $bindable(),

    enableDenomination = $bindable(),
    denominationColor = $bindable(),
    bottomBoxColor = $bindable(),
    bottomTextColor = $bindable(),
    customBottomText = $bindable(),
    denominationX = $bindable(),
    denominationY = $bindable(),

    customImages = $bindable(),

    enableGuideText = $bindable(),
    guideText = $bindable(),
    guideTextColor = $bindable(),
    guideBackgroundColor = $bindable(),
    guideBorderColor = $bindable(),
    disableGuideBorder = $bindable(),
    disableGuideBackground = $bindable(),
    guideX = $bindable(),
    guideY = $bindable(),
    guideWidth = $bindable(),
    guideHeight = $bindable(),
  }: Props = $props();

  // These props are needed for two-way binding but not actively used in UI
  void gradientType;
  void radialCenterX;
  void radialCenterY;

  // Template management state
  let selectedPreset = $state<string>("");
  let templateName = $state<string>("My Custom Template");
  let templateAuthor = $state<string>("");
  let availableTemplates = $state<MountainlakeTemplate[]>([]);
  let templatesLoading = $state<boolean>(true);
  let defaultTemplateLoaded = $state<boolean>(false);

  // Load available templates and default template when component initializes
  let templatesPromise = loadAvailableTemplates();
  
  $effect(() => {
    templatesPromise.then(async (templates) => {
      availableTemplates = templates;
      
      // Load and apply default template if not already loaded
      if (!defaultTemplateLoaded && templates.length > 0) {
        try {
          const defaultTemplate = await getDefaultTemplate();
          
          // Set the default template as selected
          selectedPreset = defaultTemplate.name;
          
          // Apply the default template automatically
          const currentSide = activeSide;

          // Apply front design
          activeSide = "front";
          applyConfigToBindings(defaultTemplate.front);

          // Apply back design
          activeSide = "back";
          applyConfigToBindings(defaultTemplate.back);

          // Restore original side
          activeSide = currentSide;

          // Enable backside for templates
          enableBackside = true;
          
          defaultTemplateLoaded = true;
        } catch (error) {
          console.error('Failed to load default template:', error);
        }
      }
      
      templatesLoading = false;
    }).catch(error => {
      console.error('Failed to load templates:', error);
      toast.error('Failed to load available templates');
      templatesLoading = false;
    });
  });

  /**
   * Apply all properties from a template config to the current design
   */
  function applyConfigToBindings(config: MountainlakeTemplateConfig) {
    // Background
    bgGradientType = config.bgGradientType;
    bgSolidColor = config.bgSolidColor;
    gradientAngle = config.gradientAngle;
    gradientStops = [...config.gradientStops];

    // Top Left Icon
    enableTopLeftIcon = config.enableTopLeftIcon;
    topLeftIcon = config.topLeftIcon;
    customLogoUrl = config.customLogoUrl;
    topLeftIconColor = config.topLeftIconColor;
    enableIconColorOverride = config.enableIconColorOverride;
    topLeftIconSize = config.topLeftIconSize;
    topLeftIconX = config.topLeftIconX;
    topLeftIconY = config.topLeftIconY;
    topLeftIconOpacity = config.topLeftIconOpacity;

    // Top Right Text
    enableHeaderText = config.enableHeaderText;
    headerText = config.headerText;
    headerTextColor = config.headerTextColor;
    headerTextX = config.headerTextX;
    headerTextY = config.headerTextY;

    // QR Code
    enableQrCode = config.enableQrCode;
    qrGradientType = config.qrGradientType;
    qrGradientAngle = config.qrGradientAngle;
    qrGradientStops = [...config.qrGradientStops];
    qrBackgroundColor = config.qrBackgroundColor;
    qrBorderColor = config.qrBorderColor;
    qrCodeColor = config.qrCodeColor;
    disableQrBorder = config.disableQrBorder;
    disableQrBackground = config.disableQrBackground;
    qrX = config.qrX;
    qrY = config.qrY;

    // Bottom
    enableDenomination = config.enableDenomination;
    denominationColor = config.denominationColor;
    bottomBoxColor = config.bottomBoxColor;
    bottomTextColor = config.bottomTextColor;
    customBottomText = config.customBottomText;
    denominationX = config.denominationX;
    denominationY = config.denominationY;

    // Custom Images
    customImages = [...config.customImages];

    // Guide Text
    enableGuideText = config.enableGuideText;
    guideText = config.guideText;
    guideTextColor = config.guideTextColor;
    guideBackgroundColor = config.guideBackgroundColor;
    guideBorderColor = config.guideBorderColor;
    disableGuideBorder = config.disableGuideBorder;
    disableGuideBackground = config.disableGuideBackground;
    guideX = config.guideX;
    guideY = config.guideY;
    guideWidth = config.guideWidth;
    guideHeight = config.guideHeight;
  }

  /**
   * Get current design as a config object
   */
  function getCurrentConfig(): MountainlakeTemplateConfig {
    return {
      bgGradientType,
      gradientType:
        bgGradientType === "solid"
          ? "linear"
          : (bgGradientType as "linear" | "radial"),
      bgSolidColor,
      gradientAngle,
      gradientStops: [...gradientStops],
      radialCenterX: radialCenterX ?? 50,
      radialCenterY: radialCenterY ?? 50,

      enableTopLeftIcon,
      topLeftIcon,
      customLogoUrl,
      topLeftIconColor,
      enableIconColorOverride,
      topLeftIconSize,
      topLeftIconX,
      topLeftIconY,
      topLeftIconOpacity,

      enableHeaderText,
      headerText,
      headerTextColor,
      headerTextX,
      headerTextY,

      enableQrCode,
      qrGradientType,
      qrGradientAngle,
      qrGradientStops: [...qrGradientStops],
      qrBackgroundColor,
      qrBorderColor,
      qrCodeColor,
      disableQrBorder,
      disableQrBackground,
      qrX,
      qrY,

      enableDenomination,
      denominationColor,
      bottomBoxColor,
      bottomTextColor,
      customBottomText,
      denominationX,
      denominationY,

      customImages: [...customImages],

      enableGuideText,
      guideText,
      guideTextColor,
      guideBackgroundColor,
      guideBorderColor,
      disableGuideBorder,
      disableGuideBackground,
      guideX,
      guideY,
      guideWidth,
      guideHeight,
    };
  }

  /**
   * Apply a preset template
   */
  async function applyPreset() {
    if (!selectedPreset) return;

    try {
      const template = await getTemplateByName(selectedPreset);
      if (!template) {
        toast.error('Template not found');
        return;
      }

      // Store current side
      const currentSide = activeSide;

      // Apply front design
      activeSide = "front";
      applyConfigToBindings(template.front);

      // Apply back design
      activeSide = "back";
      applyConfigToBindings(template.back);

      // Restore original side
      activeSide = currentSide;

      // Enable backside for templates
      enableBackside = true;

      toast.success(`Applied template: ${template.name}`);
    } catch (error) {
      console.error('Failed to apply preset:', error);
      toast.error('Failed to apply template');
    }
  }

  /**
   * Download current design as template
   */
  async function handleDownloadTemplate() {
    if (!templateName.trim()) {
      toast.error("Please enter a template name");
      return;
    }

    try {
      // Get current configs for both sides
      const currentSide = activeSide;

      // Get front config
      activeSide = "front";
      const frontConfig = getCurrentConfig();

      // Get back config
      activeSide = "back";
      const backConfig = getCurrentConfig();

      // Restore original side
      activeSide = currentSide;

      toast.info("Preparing template for download...");
      await downloadTemplate(
        templateName,
        frontConfig,
        backConfig,
        templateAuthor || undefined,
      );
      toast.success(`Template "${templateName}" downloaded!`);
    } catch (error) {
      toast.error(
        "Failed to download template: " +
          (error instanceof Error ? error.message : "Unknown error"),
      );
    }
  }

  /**
   * Upload and apply template from file
   */
  async function handleUploadTemplate(e: Event) {
    const target = e.target as HTMLInputElement;
    if (!target.files || target.files.length === 0) return;

    try {
      const template = await loadTemplateFromFile(target.files[0]);

      // Store current side
      const currentSide = activeSide;

      // Apply front design
      activeSide = "front";
      applyConfigToBindings(template.front);

      // Apply back design
      activeSide = "back";
      applyConfigToBindings(template.back);

      // Restore original side
      activeSide = currentSide;

      // Enable backside
      enableBackside = true;

      toast.success(`Loaded template: ${template.name}`);

      // Clear file input
      target.value = "";
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to load template",
      );
      target.value = "";
    }
  }

  /**
   * Copy a specific section from opposite side
   */
  function copyFromOppositeSide(section: 'background' | 'topLeftIcon' | 'topRightText' | 'qrCode' | 'bottom' | 'customImages' | 'guideText' | 'all') {
    if (!oppositeSideConfig) {
      toast.error("No opposite side configuration available");
      return;
    }

    const opposite = oppositeSideConfig;
    const sideName = activeSide === "front" ? "back" : "front";

    switch (section) {
      case 'background':
        bgGradientType = opposite.bgGradientType;
        bgSolidColor = opposite.bgSolidColor;
        gradientAngle = opposite.gradientAngle;
        gradientStops = [...opposite.gradientStops];
        toast.success(`Copied background from ${sideName} side`);
        break;

      case 'topLeftIcon':
        enableTopLeftIcon = opposite.enableTopLeftIcon;
        topLeftIcon = opposite.topLeftIcon;
        customLogoUrl = opposite.customLogoUrl;
        topLeftIconColor = opposite.topLeftIconColor;
        enableIconColorOverride = opposite.enableIconColorOverride;
        topLeftIconSize = opposite.topLeftIconSize;
        topLeftIconX = opposite.topLeftIconX;
        topLeftIconY = opposite.topLeftIconY;
        topLeftIconOpacity = opposite.topLeftIconOpacity;
        toast.success(`Copied top left icon from ${sideName} side`);
        break;

      case 'topRightText':
        enableHeaderText = opposite.enableHeaderText;
        headerText = opposite.headerText;
        headerTextColor = opposite.headerTextColor;
        headerTextX = opposite.headerTextX;
        headerTextY = opposite.headerTextY;
        toast.success(`Copied header text from ${sideName} side`);
        break;

      case 'qrCode':
        enableQrCode = opposite.enableQrCode;
        qrGradientType = opposite.qrGradientType;
        qrGradientAngle = opposite.qrGradientAngle;
        qrGradientStops = [...opposite.qrGradientStops];
        qrBackgroundColor = opposite.qrBackgroundColor;
        qrBorderColor = opposite.qrBorderColor;
        qrCodeColor = opposite.qrCodeColor;
        disableQrBorder = opposite.disableQrBorder;
        disableQrBackground = opposite.disableQrBackground;
        qrX = opposite.qrX;
        qrY = opposite.qrY;
        toast.success(`Copied QR code settings from ${sideName} side`);
        break;

      case 'bottom':
        enableDenomination = opposite.enableDenomination;
        denominationColor = opposite.denominationColor;
        bottomBoxColor = opposite.bottomBoxColor;
        bottomTextColor = opposite.bottomTextColor;
        customBottomText = opposite.customBottomText;
        denominationX = opposite.denominationX;
        denominationY = opposite.denominationY;
        toast.success(`Copied bottom/denomination from ${sideName} side`);
        break;

      case 'customImages':
        customImages = [...opposite.customImages];
        toast.success(`Copied custom images from ${sideName} side`);
        break;

      case 'guideText':
        enableGuideText = opposite.enableGuideText;
        guideText = opposite.guideText;
        guideTextColor = opposite.guideTextColor;
        guideBackgroundColor = opposite.guideBackgroundColor;
        guideBorderColor = opposite.guideBorderColor;
        disableGuideBorder = opposite.disableGuideBorder;
        disableGuideBackground = opposite.disableGuideBackground;
        guideX = opposite.guideX;
        guideY = opposite.guideY;
        guideWidth = opposite.guideWidth;
        guideHeight = opposite.guideHeight;
        toast.success(`Copied guide text from ${sideName} side`);
        break;

      case 'all':
        applyConfigToBindings(opposite);
        toast.success(`Copied all settings from ${sideName} side`);
        break;
    }
  }
</script>

<div class="bg-base-200 rounded-lg p-4 space-y-2">
  <div class="flex items-center justify-between mb-3">
    <h3 class="font-semibold">Mountainlake Design</h3>
    <span class="badge badge-sm badge-info">Fully Customizable</span>
  </div>

  <!-- Template Management Section -->
  <div class="collapse collapse-arrow bg-base-300 rounded-lg mb-4">
    <input type="checkbox" />
    <div class="collapse-title text-sm font-medium flex items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-4 h-4"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
        />
      </svg>
      Template Manager
    </div>
    <div class="collapse-content space-y-3">
      <!-- Preset Templates -->
      <div class="form-control">
        <div class="pb-1">
          <span class="text-xs font-medium">Load Preset Template</span>
        </div>
        <div class="flex gap-2">
          <select
            bind:value={selectedPreset}
            class="select select-bordered select-sm flex-1"
            disabled={templatesLoading}
          >
            {#if templatesLoading}
              <option value="">Loading templates...</option>
            {:else}
              {#each availableTemplates as template}
                <option value={template.name}>{template.name}</option>
              {/each}
            {/if}
          </select>
          <button
            class="btn btn-primary btn-sm"
            onclick={applyPreset}
            disabled={templatesLoading}
          >
            Apply
          </button>
        </div>
        {#if selectedPreset}
          {@const template = availableTemplates.find(
            (t) => t.name === selectedPreset,
          )}
          {#if template}
            <p class="text-xs opacity-70 mt-1">
              {template.description}
              {#if template.author}
                <span class="opacity-50">• by {template.author}</span>
              {/if}
            </p>
          {/if}
        {/if}
      </div>

      <div class="divider text-xs my-1">OR</div>

      <!-- Upload Template -->
      <div class="form-control">
        <div class="pb-1 flex items-center justify-between">
          <span class="text-xs font-medium">Upload Custom Template</span>
          <span class="text-xs opacity-60">.mountainlake.json</span>
        </div>
        <input
          type="file"
          accept=".json,.mountainlake.json"
          class="file-input file-input-bordered file-input-sm w-full"
          oninput={handleUploadTemplate}
        />
      </div>

      <div class="divider text-xs my-1">OR</div>

      <!-- Download Current Design -->
      <div class="form-control">
        <div class="pb-1">
          <span class="text-xs font-medium"
            >Save Current Design as Template</span
          >
        </div>
        <div class="space-y-2">
          <input
            type="text"
            bind:value={templateName}
            placeholder="Template name (required)"
            class="input input-bordered input-sm w-full"
          />
          <input
            type="text"
            bind:value={templateAuthor}
            placeholder="Your name (optional)"
            class="input input-bordered input-sm w-full"
          />
          <button
            class="btn btn-outline btn-sm w-full gap-2"
            onclick={handleDownloadTemplate}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
            Download Template File
          </button>
          <p class="text-xs opacity-60">
            💡 Download includes both front and back designs except custom images
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- Enable Backside Toggle -->
  <div class="form-control">
    <label class="label cursor-pointer justify-start gap-3">
      <input
        type="checkbox"
        bind:checked={enableBackside}
        class="checkbox checkbox-primary checkbox-sm"
      />
      <span class="label-text font-medium">Enable Backside Design</span>
    </label>
  </div>

  <!-- Front/Back Switcher -->
  {#if enableBackside}
    <div class="flex gap-2 mb-3">
      <button
        class="btn btn-sm flex-1"
        class:btn-primary={activeSide === "front"}
        class:btn-outline={activeSide === "back"}
        onclick={() => (activeSide = "front")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-4 h-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
          />
        </svg>
        Front Side
      </button>
      <button
        class="btn btn-sm flex-1"
        class:btn-primary={activeSide === "back"}
        class:btn-outline={activeSide === "front"}
        onclick={() => (activeSide = "back")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-4 h-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
          />
        </svg>
        Back Side
      </button>
    </div>

    <div class="alert alert-info py-2 text-xs mb-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="stroke-current shrink-0 w-4 h-4"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path></svg
      >
      <span
        >Designing: <strong>{activeSide === "front" ? "Front" : "Back"}</strong>
        side</span
      >
    </div>
  {/if}

  <!-- Background Section -->
  <div class="collapse collapse-arrow bg-base-100">
    <input type="checkbox" bind:checked={bgSectionOpen} />
    <div class="collapse-title text-sm font-medium pr-4">
      <div class="flex items-center justify-between">
        <span>Background</span>
        {#if enableBackside && oppositeSideConfig}
          <button
            class="btn btn-xs btn-ghost z-10 mr-5 gap-1"
            onclick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              copyFromOppositeSide('background');
            }}
            title="Copy background settings from {activeSide === 'front' ? 'back' : 'front'} side"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-3 h-3"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
              />
            </svg>
            Copy
          </button>
        {/if}
      </div>
    </div>
    <div class="collapse-content space-y-3">
      <!-- Type Selector -->
      <div class="flex gap-2">
        <button
          class="btn btn-sm flex-1"
          class:btn-primary={bgGradientType === "solid"}
          onclick={() => (bgGradientType = "solid")}
        >
          Solid
        </button>
        <button
          class="btn btn-sm flex-1"
          class:btn-primary={bgGradientType === "linear"}
          onclick={() => {
            bgGradientType = "linear";
            gradientType = "linear";
          }}
        >
          Linear
        </button>
        <button
          class="btn btn-sm flex-1"
          class:btn-primary={bgGradientType === "radial"}
          onclick={() => {
            bgGradientType = "radial";
            gradientType = "radial";
          }}
        >
          Radial
        </button>
      </div>

      {#if bgGradientType === "solid"}
        <label class="form-control">
          <div class="label pb-1">
            <span class="label-text text-xs">Color</span>
          </div>
          <input
            type="color"
            bind:value={bgSolidColor}
            class="h-10 w-20 rounded cursor-pointer"
          />
        </label>
      {:else}
        {#if bgGradientType === "linear"}
          <label class="form-control">
            <div class="label pb-1">
              <span class="label-text text-xs">Angle: {gradientAngle}°</span>
            </div>
            <input
              type="range"
              min="0"
              max="360"
              bind:value={gradientAngle}
              class="range range-sm range-primary"
            />
          </label>
        {/if}

        <div class="space-y-2">
          {#each gradientStops as stop, i}
            <div class="flex gap-2 items-center">
              <input
                type="color"
                bind:value={stop.color}
                class="h-8 w-12 rounded cursor-pointer"
              />
              <input
                type="range"
                min="0"
                max="100"
                bind:value={stop.offset}
                class="range range-xs flex-1"
              />
              <span class="text-xs w-10 text-right">{stop.offset}%</span>
              {#if gradientStops.length > 2}
                <button
                  class="btn btn-xs btn-ghost"
                  onclick={() => {
                    gradientStops = gradientStops.filter((_, idx) => idx !== i);
                  }}
                >
                  ×
                </button>
              {/if}
            </div>
          {/each}
        </div>

        {#if gradientStops.length < 5}
          <button
            class="btn btn-xs btn-outline w-full"
            onclick={() => {
              const lastStop = gradientStops[gradientStops.length - 1];
              const newOffset = Math.min(lastStop.offset + 20, 100);
              gradientStops = [
                ...gradientStops,
                { offset: newOffset, color: lastStop.color },
              ];
            }}
          >
            + Add Color
          </button>
        {/if}
      {/if}
    </div>
  </div>

  <!-- Top Left Icon Section -->
  <div class="collapse collapse-arrow bg-base-100">
    <input type="checkbox" bind:checked={topLeftSectionOpen} />
    <div class="collapse-title text-sm font-medium pr-4">
      <div class="flex items-center justify-between">
        <span>Top Left Icon</span>
        {#if enableBackside && oppositeSideConfig}
          <button
            class="btn btn-xs btn-ghost z-10 mr-5 gap-1"
            onclick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              copyFromOppositeSide('topLeftIcon');
            }}
            title="Copy icon settings from {activeSide === 'front' ? 'back' : 'front'} side"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-3 h-3"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
              />
            </svg>
            Copy
          </button>
        {/if}
      </div>
    </div>
    <div class="collapse-content space-y-2">
      <!-- Enable Toggle -->
      <div class="form-control">
        <label class="label cursor-pointer justify-start gap-2 py-1">
          <input
            type="checkbox"
            bind:checked={enableTopLeftIcon}
            class="checkbox checkbox-sm"
          />
          <span class="label-text text-sm font-medium">Show Icon</span>
        </label>
      </div>

      {#if enableTopLeftIcon}
        <select
          bind:value={topLeftIcon}
          class="select select-bordered select-sm w-full"
        >
          <option value="cashu-logo">Cashu Logo</option>
          <option value="bitcoin">Bitcoin</option>
          <option value="satoshi-v1">Satoshi v1</option>
          <option value="satoshi-v2">Satoshi v2</option>
          <option value="satoshi-v3">Satoshi v3</option>
          <option value="none">No Icon</option>
          <option value="custom">Custom Upload</option>
        </select>

        {#if topLeftIcon === "custom"}
          <label class="form-control">
            <div class="label pb-1">
              <span class="label-text text-xs">Upload Custom Icon</span>
            </div>
            <input
              type="file"
              class="file-input file-input-bordered file-input-sm"
              accept="image/*,.svg"
              oninput={(e) => {
                const target = e.target as HTMLInputElement;
                if (target.files && target.files[0]) {
                  customLogoUrl = URL.createObjectURL(target.files[0]);
                }
              }}
            />
            {#if customLogoUrl}
              <div class="mt-1 text-xs opacity-60">Custom icon loaded</div>
            {/if}
          </label>
        {/if}

        {#if topLeftIcon !== "none"}
          <!-- Color Override -->
          <div class="flex items-center gap-2">
            <label class="label cursor-pointer gap-2 p-0">
              <input
                type="checkbox"
                bind:checked={enableIconColorOverride}
                class="checkbox checkbox-sm"
              />
              <span class="label-text text-xs">Override Icon Color</span>
            </label>
          </div>

          {#if enableIconColorOverride}
            <label class="form-control">
              <div class="label pb-1">
                <span class="label-text text-xs">Icon Color</span>
              </div>
              <input
                type="color"
                bind:value={topLeftIconColor}
                class="h-10 w-20 rounded cursor-pointer"
              />
            </label>
          {/if}

          <!-- Size Control -->
          <label class="form-control">
            <div class="label pb-1">
              <span class="label-text text-xs"
                >Icon Size: {topLeftIconSize}px</span
              >
            </div>
            <input
              type="range"
              min="20"
              max="60"
              bind:value={topLeftIconSize}
              class="range range-sm range-primary"
            />
          </label>

          <!-- Position Controls -->
          <div class="grid grid-cols-2 gap-2">
            <label class="form-control">
              <div class="label pb-1">
                <span class="label-text text-xs"
                  >X Position: {topLeftIconX}</span
                >
              </div>
              <input
                type="range"
                min="0"
                max="160"
                bind:value={topLeftIconX}
                class="range range-xs range-primary"
              />
            </label>

            <label class="form-control">
              <div class="label pb-1">
                <span class="label-text text-xs"
                  >Y Position: {topLeftIconY}</span
                >
              </div>
              <input
                type="range"
                min="0"
                max="280"
                bind:value={topLeftIconY}
                class="range range-xs range-primary"
              />
            </label>
          </div>

          <!-- Opacity Control -->
          <label class="form-control">
            <div class="label pb-1">
              <span class="label-text text-xs"
                >Opacity: {topLeftIconOpacity}%</span
              >
            </div>
            <input
              type="range"
              min="0"
              max="100"
              bind:value={topLeftIconOpacity}
              class="range range-xs range-primary"
            />
          </label>
        {/if}
      {/if}
    </div>
  </div>

  <!-- Top Right Text Section -->
  <div class="collapse collapse-arrow bg-base-100">
    <input type="checkbox" bind:checked={topRightSectionOpen} />
    <div class="collapse-title text-sm font-medium pr-4">
      <div class="flex items-center justify-between">
        <span>Top Right Text</span>
        {#if enableBackside && oppositeSideConfig}
          <button
            class="btn btn-xs btn-ghost z-10 mr-5 gap-1"
            onclick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              copyFromOppositeSide('topRightText');
            }}
            title="Copy text settings from {activeSide === 'front' ? 'back' : 'front'} side"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-3 h-3"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
              />
            </svg>
            Copy
          </button>
        {/if}
      </div>
    </div>
    <div class="collapse-content space-y-3">
      <!-- Enable/Disable Toggle -->
      <label class="label cursor-pointer justify-start gap-3 py-2">
        <input
          type="checkbox"
          class="toggle toggle-sm toggle-primary"
          bind:checked={enableHeaderText}
        />
        <span class="label-text text-xs font-medium">Show Header Text</span>
      </label>

      {#if enableHeaderText}
        <label class="form-control">
          <div class="label pb-1">
            <span class="label-text text-xs">Header Text</span>
            <span class="label-text-alt text-xs opacity-60">3 lines</span>
          </div>
          <textarea
            bind:value={headerText}
            class="textarea textarea-bordered textarea-sm"
            rows="3"
            placeholder="Line 1&#10;Line 2&#10;Line 3"
          ></textarea>
        </label>

        <label class="form-control">
          <div class="label pb-1">
            <span class="label-text text-xs">Text Color</span>
          </div>
          <input
            type="color"
            bind:value={headerTextColor}
            class="h-10 w-20 rounded cursor-pointer"
          />
        </label>

        <!-- Position X -->
        <label class="form-control">
          <div class="label pb-1">
            <span class="label-text text-xs">Position X</span>
            <span class="label-text-alt text-xs">{headerTextX}px</span>
          </div>
          <input
            type="range"
            min="0"
            max="160"
            bind:value={headerTextX}
            class="range range-xs range-primary"
          />
        </label>

        <!-- Position Y -->
        <label class="form-control">
          <div class="label pb-1">
            <span class="label-text text-xs">Position Y</span>
            <span class="label-text-alt text-xs">{headerTextY}px</span>
          </div>
          <input
            type="range"
            min="0"
            max="280"
            bind:value={headerTextY}
            class="range range-xs range-primary"
          />
        </label>
      {/if}
    </div>
  </div>

  <!-- QR Code Section -->
  <div class="collapse collapse-arrow bg-base-100">
    <input type="checkbox" bind:checked={qrSectionOpen} />
    <div class="collapse-title text-sm font-medium pr-4">
      <div class="flex items-center justify-between">
        <span>QR Code</span>
        {#if enableBackside && oppositeSideConfig}
          <button
            class="btn btn-xs btn-ghost z-10 mr-5 gap-1"
            onclick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              copyFromOppositeSide('qrCode');
            }}
            title="Copy QR code settings from {activeSide === 'front' ? 'back' : 'front'} side"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-3 h-3"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
              />
            </svg>
            Copy
          </button>
        {/if}
      </div>
    </div>
    <div class="collapse-content space-y-3">
      <!-- Enable/Disable Toggle -->
      <label class="label cursor-pointer justify-start gap-3 py-2">
        <input
          type="checkbox"
          class="toggle toggle-sm toggle-primary"
          bind:checked={enableQrCode}
        />
        <span class="label-text text-xs font-medium">Show QR Code</span>
      </label>

      {#if enableQrCode}
        <!-- Position X -->
        <label class="form-control">
          <div class="label pb-1">
            <span class="label-text text-xs">Position X</span>
            <span class="label-text-alt text-xs">{qrX}px</span>
          </div>
          <input
            type="range"
            min="0"
            max="40"
            bind:value={qrX}
            class="range range-xs range-primary"
          />
        </label>

        <!-- Position Y -->
        <label class="form-control">
          <div class="label pb-1">
            <span class="label-text text-xs">Position Y</span>
            <span class="label-text-alt text-xs">{qrY}px</span>
          </div>
          <input
            type="range"
            min="0"
            max="280"
            bind:value={qrY}
            class="range range-xs range-primary"
          />
        </label>

        <!-- QR Code Color -->
        <label class="form-control">
          <div class="label pb-1">
            <span class="label-text text-xs">QR Code Color</span>
          </div>
          <input
            type="color"
            bind:value={qrCodeColor}
            class="h-10 w-20 rounded cursor-pointer"
          />
        </label>

        <!-- Border Toggle and Color -->
        <div class="flex gap-3 items-end">
          <label class="form-control" class:opacity-50={disableQrBorder}>
            <div class="label pb-1">
              <span class="label-text text-xs">Border Color</span>
            </div>
            <input
              type="color"
              bind:value={qrBorderColor}
              disabled={disableQrBorder}
              class="h-10 w-20 rounded cursor-pointer"
            />
          </label>
          <label class="label cursor-pointer gap-2">
            <input
              type="checkbox"
              bind:checked={disableQrBorder}
              class="checkbox checkbox-sm"
            />
            <span class="label-text text-xs">Disable</span>
          </label>
        </div>

        <!-- Background Type -->
        <div>
          <div class="label pb-1">
            <span class="label-text text-xs">Background</span>
          </div>
          <div class="flex gap-2 mb-3">
            <button
              class="btn btn-sm flex-1"
              class:btn-primary={qrGradientType === "solid"}
              onclick={() => (qrGradientType = "solid")}
              disabled={disableQrBackground}
            >
              Solid
            </button>
            <button
              class="btn btn-sm flex-1"
              class:btn-primary={qrGradientType === "linear"}
              onclick={() => (qrGradientType = "linear")}
              disabled={disableQrBackground}
            >
              Linear
            </button>
            <button
              class="btn btn-sm flex-1"
              class:btn-primary={qrGradientType === "radial"}
              onclick={() => (qrGradientType = "radial")}
              disabled={disableQrBackground}
            >
              Radial
            </button>
          </div>

          <label class="label cursor-pointer gap-2 mb-2">
            <span class="label-text text-xs">Disable Background</span>
            <input
              type="checkbox"
              bind:checked={disableQrBackground}
              class="checkbox checkbox-sm"
            />
          </label>

          {#if !disableQrBackground}
            {#if qrGradientType === "solid"}
              <input
                type="color"
                bind:value={qrBackgroundColor}
                class="h-10 w-20 rounded cursor-pointer"
              />
            {:else}
              {#if qrGradientType === "linear"}
                <label class="form-control mb-2">
                  <div class="label pb-1">
                    <span class="label-text text-xs"
                      >Angle: {qrGradientAngle}°</span
                    >
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    bind:value={qrGradientAngle}
                    class="range range-sm range-primary"
                  />
                </label>
              {/if}

              <div class="space-y-2">
                {#each qrGradientStops as stop, i}
                  <div class="flex gap-2 items-center">
                    <input
                      type="color"
                      bind:value={stop.color}
                      class="h-8 w-12 rounded cursor-pointer"
                    />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      bind:value={stop.offset}
                      class="range range-xs flex-1"
                    />
                    <span class="text-xs w-10 text-right">{stop.offset}%</span>
                    {#if qrGradientStops.length > 2}
                      <button
                        class="btn btn-xs btn-ghost"
                        onclick={() => {
                          qrGradientStops = qrGradientStops.filter(
                            (_, idx) => idx !== i,
                          );
                        }}
                      >
                        ×
                      </button>
                    {/if}
                  </div>
                {/each}
              </div>

              {#if qrGradientStops.length < 5}
                <button
                  class="btn btn-xs btn-outline w-full mt-2"
                  onclick={() => {
                    const lastStop =
                      qrGradientStops[qrGradientStops.length - 1];
                    const newOffset = Math.min(lastStop.offset + 20, 100);
                    qrGradientStops = [
                      ...qrGradientStops,
                      { offset: newOffset, color: lastStop.color },
                    ];
                  }}
                >
                  + Add Color
                </button>
              {/if}
            {/if}
          {/if}
        </div>
      {/if}
    </div>
  </div>

  <!-- Bottom Denomination Section -->
  <div class="collapse collapse-arrow bg-base-100">
    <input type="checkbox" bind:checked={bottomSectionOpen} />
    <div class="collapse-title text-sm font-medium pr-4">
      <div class="flex items-center justify-between">
        <span>Bottom Denomination</span>
        {#if enableBackside && oppositeSideConfig}
          <button
            class="btn btn-xs btn-ghost z-10 mr-5 gap-1"
            onclick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              copyFromOppositeSide('bottom');
            }}
            title="Copy denomination settings from {activeSide === 'front' ? 'back' : 'front'} side"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-3 h-3"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
              />
            </svg>
            Copy
          </button>
        {/if}
      </div>
    </div>
    <div class="collapse-content space-y-3">
      <!-- Enable/Disable Toggle -->
      <label class="label cursor-pointer justify-start gap-3 py-2">
        <input
          type="checkbox"
          class="toggle toggle-sm toggle-primary"
          bind:checked={enableDenomination}
        />
        <span class="label-text text-xs font-medium">Show Denomination</span>
      </label>

      {#if enableDenomination}
        <!-- Position Y -->
        <label class="form-control">
          <div class="label pb-1">
            <span class="label-text text-xs">Position Y</span>
            <span class="label-text-alt text-xs">{denominationY}px</span>
          </div>
          <input
            type="range"
            min="0"
            max="280"
            bind:value={denominationY}
            class="range range-xs range-primary"
          />
        </label>

        <label class="form-control">
          <div class="label pb-1">
            <span class="label-text text-xs">Denomination Color</span>
          </div>
          <input
            type="color"
            bind:value={denominationColor}
            class="h-10 w-20 rounded cursor-pointer"
          />
        </label>

        <label class="form-control">
          <div class="label pb-1">
            <span class="label-text text-xs">Background Color</span>
          </div>
          <input
            type="color"
            bind:value={bottomBoxColor}
            class="h-10 w-20 rounded cursor-pointer"
          />
        </label>

        <label class="form-control">
          <div class="label pb-1">
            <span class="label-text text-xs">Text Color</span>
          </div>
          <input
            type="color"
            bind:value={bottomTextColor}
            class="h-10 w-20 rounded cursor-pointer"
          />
        </label>

        <label class="form-control">
          <div class="label pb-1">
            <span class="label-text text-xs">Custom Text</span>
            <span class="label-text-alt text-xs opacity-60">Optional</span>
          </div>
          <textarea
            bind:value={customBottomText}
            class="textarea textarea-bordered textarea-sm"
            rows="2"
            placeholder="Custom message"
          ></textarea>
        </label>
      {/if}
    </div>
  </div>

  <!-- Guide Text Section -->
  <div class="collapse collapse-arrow bg-base-100">
    <input type="checkbox" />
    <div class="collapse-title text-sm font-medium pr-4">
      <div class="flex items-center justify-between">
        <span>Guide Text Box</span>
        {#if enableBackside && oppositeSideConfig}
          <button
            class="btn btn-xs btn-ghost z-10 mr-5 gap-1"
            onclick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              copyFromOppositeSide('guideText');
            }}
            title="Copy guide text from {activeSide === 'front' ? 'back' : 'front'} side"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-3 h-3"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
              />
            </svg>
            Copy
          </button>
        {/if}
      </div>
    </div>
    <div class="collapse-content space-y-3">
      <!-- Enable/Disable Toggle -->
      <label class="label cursor-pointer justify-start gap-3 py-2">
        <input
          type="checkbox"
          class="toggle toggle-sm toggle-primary"
          bind:checked={enableGuideText}
        />
        <span class="label-text text-xs font-medium">Show Guide Text</span>
      </label>

      {#if enableGuideText}
        <label class="form-control">
          <div class="label pb-1">
            <span class="label-text text-xs">Guide Text</span>
            <span class="label-text-alt text-xs opacity-60"
              >Instructions for users</span
            >
          </div>
          <textarea
            bind:value={guideText}
            class="textarea textarea-bordered textarea-sm"
            rows="4"
            placeholder="How to redeem:&#10;1. Download a Cashu wallet&#10;2. Scan the QR code&#10;3. Tokens are in your wallet"
          ></textarea>
        </label>

        <!-- Position Controls -->
        <div class="grid grid-cols-2 gap-2">
          <label class="form-control">
            <div class="label pb-1">
              <span class="label-text text-xs">X: {guideX}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="160"
              bind:value={guideX}
              class="range range-xs range-primary"
            />
          </label>

          <label class="form-control">
            <div class="label pb-1">
              <span class="label-text text-xs">Y: {guideY}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="280"
              bind:value={guideY}
              class="range range-xs range-primary"
            />
          </label>
        </div>

        <!-- Size Controls -->
        <div class="grid grid-cols-2 gap-2">
          <label class="form-control">
            <div class="label pb-1">
              <span class="label-text text-xs">Width: {guideWidth}px</span>
            </div>
            <input
              type="range"
              min="50"
              max="160"
              bind:value={guideWidth}
              class="range range-xs range-primary"
            />
          </label>

          <label class="form-control">
            <div class="label pb-1">
              <span class="label-text text-xs">Height: {guideHeight}px</span>
            </div>
            <input
              type="range"
              min="30"
              max="280"
              bind:value={guideHeight}
              class="range range-xs range-primary"
            />
          </label>
        </div>

        <label class="form-control">
          <div class="label pb-1">
            <span class="label-text text-xs">Text Color</span>
          </div>
          <input
            type="color"
            bind:value={guideTextColor}
            class="h-10 w-20 rounded cursor-pointer"
          />
        </label>

        <!-- Background Color -->
        <div class="flex gap-3 items-end">
          <label
            class="form-control flex-1"
            class:opacity-50={disableGuideBackground}
          >
            <div class="label pb-1">
              <span class="label-text text-xs">Background Color</span>
            </div>
            <input
              type="color"
              bind:value={guideBackgroundColor}
              disabled={disableGuideBackground}
              class="h-10 w-20 rounded cursor-pointer"
            />
          </label>
          <label class="label cursor-pointer gap-2">
            <input
              type="checkbox"
              bind:checked={disableGuideBackground}
              class="checkbox checkbox-sm"
            />
            <span class="label-text text-xs">No BG</span>
          </label>
        </div>

        <!-- Border Color -->
        <div class="flex gap-3 items-end">
          <label
            class="form-control flex-1"
            class:opacity-50={disableGuideBorder}
          >
            <div class="label pb-1">
              <span class="label-text text-xs">Border Color</span>
            </div>
            <input
              type="color"
              bind:value={guideBorderColor}
              disabled={disableGuideBorder}
              class="h-10 w-20 rounded cursor-pointer"
            />
          </label>
          <label class="label cursor-pointer gap-2">
            <input
              type="checkbox"
              bind:checked={disableGuideBorder}
              class="checkbox checkbox-sm"
            />
            <span class="label-text text-xs">No Border</span>
          </label>
        </div>
      {/if}
    </div>
  </div>

  <!-- Custom Images Section -->
  <div class="collapse collapse-arrow bg-base-100">
    <input type="checkbox" />
    <div class="collapse-title text-sm font-medium pr-4">
      <div class="flex items-center justify-between">
        <span>Custom Images</span>
        {#if enableBackside && oppositeSideConfig}
          <button
            class="btn btn-xs btn-ghost z-10 mr-5 gap-1"
            onclick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              copyFromOppositeSide('customImages');
            }}
            title="Copy custom images from {activeSide === 'front' ? 'back' : 'front'} side"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-3 h-3"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
              />
            </svg>
            Copy
          </button>
        {/if}
      </div>
    </div>
    <div class="collapse-content space-y-3">
      <div class="text-xs opacity-60 mb-2">
        Upload and position custom images on your note
      </div>

      {#each customImages as image, i (image.id)}
        <div class="border border-base-300 rounded-lg p-3 space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-xs font-medium">Image {i + 1}</span>
            <button
              class="btn btn-xs btn-ghost text-error"
              onclick={() => {
                customImages = customImages.filter(
                  (img) => img.id !== image.id,
                );
              }}
            >
              Remove
            </button>
          </div>

          <div class="grid grid-cols-2 gap-2">
            <label class="form-control">
              <div class="label pb-1">
                <span class="label-text text-xs">X: {image.x}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="160"
                bind:value={image.x}
                class="range range-xs range-primary"
              />
            </label>

            <label class="form-control">
              <div class="label pb-1">
                <span class="label-text text-xs">Y: {image.y}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="280"
                bind:value={image.y}
                class="range range-xs range-primary"
              />
            </label>
          </div>

          <div class="grid grid-cols-2 gap-2">
            <label class="form-control">
              <div class="label pb-1">
                <span class="label-text text-xs">Width: {image.width}px</span>
              </div>
              <input
                type="range"
                min="10"
                max="160"
                bind:value={image.width}
                class="range range-xs range-primary"
              />
            </label>

            <label class="form-control">
              <div class="label pb-1">
                <span class="label-text text-xs">Height: {image.height}px</span>
              </div>
              <input
                type="range"
                min="10"
                max="280"
                bind:value={image.height}
                class="range range-xs range-primary"
              />
            </label>
          </div>

          <label class="form-control">
            <div class="label pb-1">
              <span class="label-text text-xs">Opacity: {image.opacity}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              bind:value={image.opacity}
              class="range range-xs range-primary"
            />
          </label>
        </div>
      {/each}

      <label class="btn btn-sm btn-outline w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-4 h-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        Add Image
        <input
          type="file"
          class="hidden"
          accept="image/*"
          oninput={(e) => {
            const target = e.target as HTMLInputElement;
            if (target.files && target.files[0]) {
              const url = URL.createObjectURL(target.files[0]);
              const id = crypto.randomUUID();
              customImages = [
                ...customImages,
                {
                  id,
                  url,
                  x: 10,
                  y: 10,
                  width: 50,
                  height: 50,
                  opacity: 100,
                },
              ];
              target.value = "";
            }
          }}
        />
      </label>
    </div>
  </div>
</div>
