<script lang="ts">
  import { getEncodedTokenV4 } from "@cashu/cashu-ts";
  import CustomNote from "@/features/templates/custom/CustomNote.svelte";
  import MountainlakeNote from "@/features/templates/mountainlake/MountainlakeNote.svelte";
  import {
    preparedTokens,
    selectedNumberOfNotes,
    wallet,
  } from "@/state/stores/printing.svelte";
  import { getAmountForTokenSet } from "@/lib/utils";
  import ShareViaNostr from "@/features/printing/components/ShareViaNostr.svelte";
  import ComicNote from "@/features/templates/comic/ComicNote.svelte";
  import encodeQR from "qr";
  import JSZip from "jszip";
  import MountainlakeDesigner from "@/features/templates/mountainlake/MountainlakeDesigner.svelte";
  import {
    generatePdf,
    extractSvgFromElement,
    getPrintingInstructions,
    type NoteData,
  } from "@/lib/pdf-generator";
  import { toast } from "svelte-sonner";
  import { mount, unmount } from "svelte";

  type ActiveTab = "customize" | "print" | "share";
  type TemplateType = "comic" | "custom" | "mountainlake";

  // Active tab state
  let active = $state<ActiveTab>("customize");

  // Comic note design selection (3-25)
  let design = $state(3);

  // Selected template type
  let selectedTemplate = $state<TemplateType>("comic");

  // Custom note configuration
  let colorCode = $state("#5db075");
  let brandLogoURL = $state("");
  let cornerBrandLogoURL = $state("");

  // Mountainlake backside configuration
  let enableBackside = $state(false);
  let activeSide = $state<"front" | "back">("front");

  // Define the design configuration type
  interface CustomImage {
    id: string;
    url: string;
    x: number;
    y: number;
    opacity: number;
    width: number;
    height: number;
  }

  interface MountainlakeDesignConfig {
    // Top Left Icon
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
    enableTopLeftIcon: boolean;

    // Top Right Text
    headerText: string;
    headerTextColor: string;
    headerTextX: number;
    headerTextY: number;
    enableHeaderText: boolean;

    // Background
    bgGradientType: "linear" | "radial" | "solid";
    gradientType: "linear" | "radial";
    gradientAngle: number;
    gradientStops: Array<{ offset: number; color: string }>;
    radialCenterX: number;
    radialCenterY: number;
    bgSolidColor: string;

    // QR Code
    qrGradientType: "linear" | "radial" | "solid";
    qrGradientAngle: number;
    qrGradientStops: Array<{ offset: number; color: string }>;
    qrBackgroundColor: string;
    qrBorderColor: string;
    qrCodeColor: string;
    disableQrBorder: boolean;
    disableQrBackground: boolean;
    enableQrCode: boolean;
    qrX: number;
    qrY: number;

    // Bottom
    denominationColor: string;
    bottomBoxColor: string;
    bottomTextColor: string;
    customBottomText: string;
    enableDenomination: boolean;
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

  const defaultDesignConfig: MountainlakeDesignConfig = {
    topLeftIcon: "cashu-logo",
    customLogoUrl: "",
    topLeftIconColor: "#FFFFFF",
    enableIconColorOverride: false,
    topLeftIconSize: 35,
    topLeftIconX: 10,
    topLeftIconY: 10,
    topLeftIconOpacity: 100,
    enableTopLeftIcon: true,

    headerText: "Cashu Token\nRedeemable with Cashu\nWallet of choice",
    headerTextColor: "#FFFFFF",
    headerTextX: 150,
    headerTextY: 0,
    enableHeaderText: true,

    bgGradientType: "linear",
    gradientType: "linear",
    gradientAngle: 135,
    gradientStops: [
      { offset: 0, color: "#F77F00" },
      { offset: 100, color: "#7209B7" },
    ],
    radialCenterX: 50,
    radialCenterY: 50,
    bgSolidColor: "#F77F00",

    qrGradientType: "solid",
    qrGradientAngle: 90,
    qrGradientStops: [
      { offset: 0, color: "#FFFFFF" },
      { offset: 100, color: "#F0F0F0" },
    ],
    qrBackgroundColor: "#FFFFFF",
    qrBorderColor: "#F77F00",
    qrCodeColor: "#000000",
    disableQrBorder: false,
    disableQrBackground: false,
    enableQrCode: true,
    qrX: 20,
    qrY: 93,

    denominationColor: "#F77F00",
    bottomBoxColor: "#FFFFFF",
    bottomTextColor: "#666666",
    customBottomText: "",
    enableDenomination: true,
    denominationX: 0,
    denominationY: 219,

    // Custom Images
    customImages: [],

    // Guide Text Box
    enableGuideText: false,
    guideText:
      "How to redeem:\n1. Download a Cashu wallet\n2. Scan the QR code\n3. Tokens are now in your wallet",
    guideTextColor: "#333333",
    guideBackgroundColor: "#FFFFFF",
    guideBorderColor: "#F77F00",
    disableGuideBorder: false,
    disableGuideBackground: false,
    guideX: 10,
    guideY: 90,
    guideWidth: 140,
    guideHeight: 100,
  };

  // Front and back design configurations
  let frontDesign = $state<MountainlakeDesignConfig>({
    ...defaultDesignConfig,
  });
  let backDesign = $state<MountainlakeDesignConfig>({
    ...defaultDesignConfig,
    enableQrCode: false,
    enableDenomination: false,
    enableGuideText: true, // Enable guide text on back by default
    headerText: "Cashu Ecash\nDigital Bearer Asset\nSelf Custody",
  });

  // Get current active design based on side
  const currentDesign = $derived(
    activeSide === "front" ? frontDesign : backDesign,
  );

  // Get opposite side config for copying
  const oppositeSideConfig = $derived(
    activeSide === "front" ? backDesign : frontDesign,
  );

  // Collapsible sections state
  let bgSectionOpen = $state(false);
  let topLeftSectionOpen = $state(false);
  let topRightSectionOpen = $state(false);
  let qrSectionOpen = $state(false);
  let bottomSectionOpen = $state(false);

  // PDF Generation state
  let isGeneratingPdf = $state(false);
  let pdfProgress = $state({ current: 0, total: 0 });

  /**
   * Wait for images and QR code to be ready
   */
  const waitForImagesToLoad = async (container: HTMLElement, noteIndex: number): Promise<void> => {
    // Find all SVG image elements with any href
    const svgImages = container.querySelectorAll('image[href]');
    const imagePromises: Promise<void>[] = [];
    let imageCount = 0;
    
    svgImages.forEach((svgImg, idx) => {
      const href = svgImg.getAttribute('href');
      if (!href) return;
      
      // Skip data URLs (they load instantly)
      if (href.startsWith('data:')) return;
      
      // Wait for all external images (blob URLs, http/https URLs, and relative paths like /icon.svg)
      if (href.startsWith('blob:') || href.startsWith('http') || href.startsWith('/')) {
        imageCount++;
        const imageType = href.startsWith('blob:') ? 'blob' : href.startsWith('http') ? 'http' : 'local';
        console.log(`[Note ${noteIndex}] Found ${imageType} image ${idx}: ${href.substring(0, 60)}`);
        
        const promise = new Promise<void>((resolve) => {
          const img = new Image();
          let resolved = false;
          
          const cleanup = () => {
            if (!resolved) {
              resolved = true;
              resolve();
            }
          };
          
          img.onload = () => {
            console.log(`[Note ${noteIndex}] ✓ ${imageType} image ${idx} loaded (${img.naturalWidth}x${img.naturalHeight})`);
            cleanup();
          };
          
          img.onerror = (e) => {
            console.error(`[Note ${noteIndex}] ✗ ${imageType} image ${idx} FAILED:`, e);
            cleanup();
          };
          
          // Timeout after 5 seconds as safety net
          const timeout = setTimeout(() => {
            console.warn(`[Note ${noteIndex}] ⏱ ${imageType} image ${idx} timeout after 5s`);
            cleanup();
          }, 5000);
          
          // Clear timeout if image loads
          img.addEventListener('load', () => clearTimeout(timeout), { once: true });
          img.addEventListener('error', () => clearTimeout(timeout), { once: true });
          
          img.src = href;
        });
        
        imagePromises.push(promise);
      }
    });
    
    // Wait for all images to load
    if (imagePromises.length > 0) {
      console.log(`[Note ${noteIndex}] ⏳ Waiting for ${imageCount} images...`);
      await Promise.all(imagePromises);
      console.log(`[Note ${noteIndex}] ✅ All ${imageCount} images complete`);
    }
    
    // Additional wait for QR code canvas conversion (happens in onMount)
    await new Promise(resolve => setTimeout(resolve, 400));
  };

  /**
   * Generate and download PDF with all notes
   * Simplified version: A4 portrait, 3 notes per page, auto double-sided if backside enabled
   */
  const generateAndDownloadPdf = async () => {
    isGeneratingPdf = true;
    pdfProgress = { current: 0, total: $preparedTokens.length };

    try {
      // Create temporary container for rendering notes
      const container = document.createElement("div");
      container.style.position = "absolute";
      container.style.left = "-9999px";
      container.style.top = "-9999px";
      container.style.width = "200px";
      container.style.height = "300px";
      document.body.appendChild(container);

      const notes: NoteData[] = [];

      // Render each note and extract SVG
      for (let i = 0; i < $preparedTokens.length; i++) {
        // Update progress for UI
        pdfProgress = { current: i + 1, total: $preparedTokens.length };
        
        const token = $preparedTokens[i];
        const tokenString = getEncodedTokenV4(token);
        const denomination = getAmountForTokenSet(token.proofs);

        let frontSvg = "";
        let backSvg = "";

        if (selectedTemplate === "mountainlake") {
          // Render front side using Svelte 5 mount API
          const frontDiv = document.createElement("div");
          container.appendChild(frontDiv);

          const frontComponent = mount(MountainlakeNote, {
            target: frontDiv,
            props: {
              denomination,
              mintUrl: token.mint,
              token: tokenString,
              unit: $wallet?.unit,
              enableTopLeftIcon: frontDesign.enableTopLeftIcon,
              enableHeaderText: frontDesign.enableHeaderText,
              enableQrCode: frontDesign.enableQrCode,
              enableDenomination: frontDesign.enableDenomination,
              topLeftIcon: frontDesign.topLeftIcon,
              customLogoUrl: frontDesign.customLogoUrl,
              topLeftIconColor: frontDesign.topLeftIconColor,
              enableIconColorOverride: frontDesign.enableIconColorOverride,
              topLeftIconSize: frontDesign.topLeftIconSize,
              topLeftIconX: frontDesign.topLeftIconX,
              topLeftIconY: frontDesign.topLeftIconY,
              topLeftIconOpacity: frontDesign.topLeftIconOpacity,
              headerText: frontDesign.headerText,
              headerTextColor: frontDesign.headerTextColor,
              headerTextX: frontDesign.headerTextX,
              headerTextY: frontDesign.headerTextY,
              bgGradientType: frontDesign.bgGradientType,
              bgSolidColor: frontDesign.bgSolidColor,
              gradientType: frontDesign.gradientType,
              gradientStops: frontDesign.gradientStops,
              gradientAngle: frontDesign.gradientAngle,
              radialCenterX: frontDesign.radialCenterX,
              radialCenterY: frontDesign.radialCenterY,
              qrGradientType: frontDesign.qrGradientType,
              qrGradientAngle: frontDesign.qrGradientAngle,
              qrGradientStops: frontDesign.qrGradientStops,
              qrCodeColor: frontDesign.qrCodeColor,
              qrBackgroundColor: frontDesign.qrBackgroundColor,
              qrBorderColor: frontDesign.qrBorderColor,
              disableQrBorder: frontDesign.disableQrBorder,
              disableQrBackground: frontDesign.disableQrBackground,
              qrX: frontDesign.qrX,
              qrY: frontDesign.qrY,
              denominationColor: frontDesign.denominationColor,
              bottomBoxColor: frontDesign.bottomBoxColor,
              bottomTextColor: frontDesign.bottomTextColor,
              customBottomText: frontDesign.customBottomText,
              denominationX: frontDesign.denominationX,
              denominationY: frontDesign.denominationY,
              customImages: frontDesign.customImages,
              enableGuideText: frontDesign.enableGuideText,
              guideText: frontDesign.guideText,
              guideTextColor: frontDesign.guideTextColor,
              guideBackgroundColor: frontDesign.guideBackgroundColor,
              guideBorderColor: frontDesign.guideBorderColor,
              disableGuideBorder: frontDesign.disableGuideBorder,
              disableGuideBackground: frontDesign.disableGuideBackground,
              guideX: frontDesign.guideX,
              guideY: frontDesign.guideY,
              guideWidth: frontDesign.guideWidth,
              guideHeight: frontDesign.guideHeight,
            },
          });
          
          // Wait for component to render and images to load (QR codes mainly)
          await waitForImagesToLoad(frontDiv, i);

          const extractedFront = extractSvgFromElement(frontDiv);
          if (extractedFront) {
            frontSvg = extractedFront;
          }

          // Unmount component using Svelte 5 API
          unmount(frontComponent);

          // Render back side if enabled
          if (enableBackside) {
            const backDiv = document.createElement("div");
            container.appendChild(backDiv);

            const backComponent = mount(MountainlakeNote, {
              target: backDiv,
              props: {
                denomination,
                mintUrl: token.mint,
                token: tokenString,
                unit: $wallet?.unit,
                enableTopLeftIcon: backDesign.enableTopLeftIcon,
                enableHeaderText: backDesign.enableHeaderText,
                enableQrCode: backDesign.enableQrCode,
                enableDenomination: backDesign.enableDenomination,
                topLeftIcon: backDesign.topLeftIcon,
                customLogoUrl: backDesign.customLogoUrl,
                topLeftIconColor: backDesign.topLeftIconColor,
                enableIconColorOverride: backDesign.enableIconColorOverride,
                topLeftIconSize: backDesign.topLeftIconSize,
                topLeftIconX: backDesign.topLeftIconX,
                topLeftIconY: backDesign.topLeftIconY,
                topLeftIconOpacity: backDesign.topLeftIconOpacity,
                headerText: backDesign.headerText,
                headerTextColor: backDesign.headerTextColor,
                headerTextX: backDesign.headerTextX,
                headerTextY: backDesign.headerTextY,
                bgGradientType: backDesign.bgGradientType,
                bgSolidColor: backDesign.bgSolidColor,
                gradientType: backDesign.gradientType,
                gradientStops: backDesign.gradientStops,
                gradientAngle: backDesign.gradientAngle,
                radialCenterX: backDesign.radialCenterX,
                radialCenterY: backDesign.radialCenterY,
                qrGradientType: backDesign.qrGradientType,
                qrGradientAngle: backDesign.qrGradientAngle,
                qrGradientStops: backDesign.qrGradientStops,
                qrCodeColor: backDesign.qrCodeColor,
                qrBackgroundColor: backDesign.qrBackgroundColor,
                qrBorderColor: backDesign.qrBorderColor,
                disableQrBorder: backDesign.disableQrBorder,
                disableQrBackground: backDesign.disableQrBackground,
                qrX: backDesign.qrX,
                qrY: backDesign.qrY,
                denominationColor: backDesign.denominationColor,
                bottomBoxColor: backDesign.bottomBoxColor,
                bottomTextColor: backDesign.bottomTextColor,
                customBottomText: backDesign.customBottomText,
                denominationX: backDesign.denominationX,
                denominationY: backDesign.denominationY,
                customImages: backDesign.customImages,
                enableGuideText: backDesign.enableGuideText,
                guideText: backDesign.guideText,
                guideTextColor: backDesign.guideTextColor,
                guideBackgroundColor: backDesign.guideBackgroundColor,
                guideBorderColor: backDesign.guideBorderColor,
                disableGuideBorder: backDesign.disableGuideBorder,
                disableGuideBackground: backDesign.disableGuideBackground,
                guideX: backDesign.guideX,
                guideY: backDesign.guideY,
                guideWidth: backDesign.guideWidth,
                guideHeight: backDesign.guideHeight,
              },
            });

            await waitForImagesToLoad(backDiv, i);

            const extractedBack = extractSvgFromElement(backDiv);
            if (extractedBack) {
              backSvg = extractedBack;
            }

            unmount(backComponent);
          }
        } else if (selectedTemplate === "comic") {
          // Render Comic note
          const frontDiv = document.createElement("div");
          container.appendChild(frontDiv);

          const frontComponent = mount(ComicNote, {
            target: frontDiv,
            props: {
              denomination,
              mintUrl: token.mint,
              token: tokenString,
              unit: $wallet?.unit,
              design,
            },
          });

          await waitForImagesToLoad(frontDiv, i);

          const extractedFront = extractSvgFromElement(frontDiv);
          if (extractedFront) frontSvg = extractedFront;

          unmount(frontComponent);
        } else if (selectedTemplate === "custom") {
          // Render Custom note
          const frontDiv = document.createElement("div");
          container.appendChild(frontDiv);

          const frontComponent = mount(CustomNote, {
            target: frontDiv,
            props: {
              denomination,
              mintUrl: token.mint,
              token: tokenString,
              unit: $wallet?.unit,
              colorCode,
              brandLogoURL,
              cornerBrandLogoURL,
            },
          });

          await waitForImagesToLoad(frontDiv, i);

          const extractedFront = extractSvgFromElement(frontDiv);
          if (extractedFront) frontSvg = extractedFront;

          unmount(frontComponent);
        }

        notes.push({
          frontSvg,
          backSvg: backSvg || undefined,
          id: `note-${i}`,
          rotation: selectedTemplate === "mountainlake" ? 90 : 0, // Mountainlake is portrait (needs 90° rotation), Comic/Custom are landscape (no rotation)
        });

        container.innerHTML = "";
      }

      // Clean up container
      document.body.removeChild(container);

      // Generate PDF (auto double-sided if backside enabled)
      pdfProgress = { current: $preparedTokens.length + 1, total: $preparedTokens.length };
      const pdf = await generatePdf(notes, enableBackside, () => {
        // All notes already rendered, just creating PDF now
      });

      // Download PDF
      const dateStr = new Date().toISOString().split("T")[0];
      const sideStr = enableBackside ? "double-sided" : "single-sided";
      const fileName = `cashu_notes_${sideStr}_${$preparedTokens.length}_${dateStr}.pdf`;
      pdf.save(fileName);

      toast.success(
        `PDF generated successfully! ${$preparedTokens.length} notes`,
      );
    } catch (error) {
      console.error("PDF generation failed:", error);
      toast.error(
        "Failed to generate PDF: " +
          (error instanceof Error ? error.message : "Unknown error"),
      );
    } finally {
      isGeneratingPdf = false;
      pdfProgress = { current: 0, total: 0 };
    }
  };

  /**
   * Handle brand logo file upload
   */
  const getBrandURL = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      brandLogoURL = URL.createObjectURL(target.files[0]);
    }
  };

  /**
   * Handle corner logo file upload
   */
  const getCornerURL = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      cornerBrandLogoURL = URL.createObjectURL(target.files[0]);
    }
  };

  /**
   * Download all QR codes as a ZIP file
   * Generates individual SVG files for each token
   */
  const downloadQRs = async () => {
    const zip = new JSZip();

    // Generate QR code for each token
    $preparedTokens.forEach((token, index) => {
      let svg = encodeQR(getEncodedTokenV4(token), "svg");

      // Add white background to QR code SVG
      const svgStartIndex = svg.indexOf("<svg");
      if (svgStartIndex !== -1) {
        const contentStartIndex = svg.indexOf(">", svgStartIndex) + 1;
        if (contentStartIndex !== 0) {
          // Extract dimensions from viewBox
          const viewBoxMatch = svg.match(/viewBox="([^"]+)"/);
          let width = 100;
          let height = 100;

          if (viewBoxMatch && viewBoxMatch[1]) {
            const viewBoxValues = viewBoxMatch[1].split(" ");
            if (viewBoxValues.length >= 4) {
              width = parseFloat(viewBoxValues[2]);
              height = parseFloat(viewBoxValues[3]);
            }
          }

          // Insert white background rectangle
          const whiteRect = `<rect width="${width}" height="${height}" fill="white"/>`;
          svg =
            svg.slice(0, contentStartIndex) +
            whiteRect +
            svg.slice(contentStartIndex);
        }
      }

      // Create descriptive filename
      const amount = getAmountForTokenSet(token.proofs);
      const unit = token.unit || "sat";
      zip.file(`${amount}_${unit}_${index + 1}.svg`, svg);
    });

    // Generate and download ZIP file
    const zipBlob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(zipBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cashu_qr_codes.zip";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
</script>

<!-- Tab Navigation -->
<div class="flex w-full items-center justify-center">
  <div role="tablist" class="tabs tabs-boxed min-w-80 mb-2">
    <button
      role="tab"
      class="tab"
      class:tab-active={active === "customize"}
      onclick={() => (active = "customize")}>Templates</button
    >
    <button
      role="tab"
      class="tab"
      class:tab-active={active === "print"}
      onclick={() => (active = "print")}>Print</button
    >
    <button
      role="tab"
      class="tab"
      class:tab-active={active === "share"}
      onclick={() => (active = "share")}>Share</button
    >
  </div>
</div>

{#if active === "customize"}
  <div class="flex flex-col gap-4 items-center w-full max-w-7xl mx-auto px-4">
    <!-- Template Selection -->
    <div>
      <h3 class="text-sm font-semibold mb-2 text-center">
        Choose Design Template
      </h3>
      <div class="flex gap-3 flex-wrap justify-center items-start">
        <button
          onclick={() => (selectedTemplate = "comic")}
          class="w-32 p-1.5 border-2 rounded-lg transition-all {selectedTemplate ===
          'comic'
            ? 'border-primary shadow-lg'
            : 'border-base-300 hover:border-base-400'}"
          title="Comic design by @BitPopart"
        >
          <div class="text-xs font-medium mb-1">Comic</div>
          <div class="w-full">
            <ComicNote
              {design}
              denomination={getAmountForTokenSet(
                $preparedTokens[0]?.proofs ?? [],
              )}
              mintUrl={$wallet?.mint.mintUrl}
              token={"blabla"}
              unit={$preparedTokens[0]?.unit ?? "sat"}
              disableDownload={true}
            />
          </div>
        </button>
        <button
          onclick={() => (selectedTemplate = "custom")}
          class="w-32 p-1.5 border-2 rounded-lg transition-all {selectedTemplate ===
          'custom'
            ? 'border-primary shadow-lg'
            : 'border-base-300 hover:border-base-400'}"
          title="Custom design by @gandlaf21"
        >
          <div class="text-xs font-medium mb-1">Custom</div>
          <div class="w-full">
            <CustomNote
              {brandLogoURL}
              {colorCode}
              {cornerBrandLogoURL}
              denomination={getAmountForTokenSet(
                $preparedTokens[0]?.proofs ?? [],
              )}
              mintUrl={$wallet?.mint.mintUrl}
              token={"blabla"}
              unit={$preparedTokens[0]?.unit ?? "sat"}
            />
          </div>
        </button>
        <button
          onclick={() => (selectedTemplate = "mountainlake")}
          class="w-24 p-1.5 border-2 rounded-lg transition-all {selectedTemplate ===
          'mountainlake'
            ? 'border-primary shadow-lg'
            : 'border-base-300 hover:border-base-400'}"
          title="Fully customizable Mountainlake design"
        >
          <div class="text-xs font-medium mb-1">Mountainlake</div>
          <div class="w-full origin-top">
            <MountainlakeNote
              denomination={getAmountForTokenSet(
                $preparedTokens[0]?.proofs ?? [],
              )}
              mintUrl={$wallet?.mint.mintUrl}
              token={"blabla"}
              enableTopLeftIcon={frontDesign.enableTopLeftIcon}
              enableHeaderText={frontDesign.enableHeaderText}
              enableQrCode={frontDesign.enableQrCode}
              enableDenomination={frontDesign.enableDenomination}
              topLeftIcon={frontDesign.topLeftIcon}
              customLogoUrl={frontDesign.customLogoUrl}
              topLeftIconColor={frontDesign.topLeftIconColor}
              enableIconColorOverride={frontDesign.enableIconColorOverride}
              topLeftIconSize={frontDesign.topLeftIconSize}
              topLeftIconX={frontDesign.topLeftIconX}
              topLeftIconY={frontDesign.topLeftIconY}
              topLeftIconOpacity={frontDesign.topLeftIconOpacity}
              headerText={frontDesign.headerText}
              headerTextColor={frontDesign.headerTextColor}
              headerTextX={frontDesign.headerTextX}
              headerTextY={frontDesign.headerTextY}
              bgGradientType={frontDesign.bgGradientType}
              bgSolidColor={frontDesign.bgSolidColor}
              gradientType={frontDesign.gradientType}
              gradientStops={frontDesign.gradientStops}
              gradientAngle={frontDesign.gradientAngle}
              radialCenterX={frontDesign.radialCenterX}
              radialCenterY={frontDesign.radialCenterY}
              qrGradientType={frontDesign.qrGradientType}
              qrGradientAngle={frontDesign.qrGradientAngle}
              qrGradientStops={frontDesign.qrGradientStops}
              qrCodeColor={frontDesign.qrCodeColor}
              qrBackgroundColor={frontDesign.qrBackgroundColor}
              qrBorderColor={frontDesign.qrBorderColor}
              disableQrBorder={frontDesign.disableQrBorder}
              disableQrBackground={frontDesign.disableQrBackground}
              qrX={frontDesign.qrX}
              qrY={frontDesign.qrY}
              denominationColor={frontDesign.denominationColor}
              bottomBoxColor={frontDesign.bottomBoxColor}
              bottomTextColor={frontDesign.bottomTextColor}
              customBottomText={frontDesign.customBottomText}
              denominationX={frontDesign.denominationX}
              denominationY={frontDesign.denominationY}
              customImages={frontDesign.customImages}
              enableGuideText={frontDesign.enableGuideText}
              guideText={frontDesign.guideText}
              guideTextColor={frontDesign.guideTextColor}
              guideBackgroundColor={frontDesign.guideBackgroundColor}
              guideBorderColor={frontDesign.guideBorderColor}
              disableGuideBorder={frontDesign.disableGuideBorder}
              disableGuideBackground={frontDesign.disableGuideBackground}
              guideX={frontDesign.guideX}
              guideY={frontDesign.guideY}
              guideWidth={frontDesign.guideWidth}
              guideHeight={frontDesign.guideHeight}
            />
          </div>
        </button>
      </div>
    </div>
    <!-- Template Customization - Two Column Layout -->
    <div class="w-full grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6">
      <!-- Left: Customization Controls -->
      <div class="w-full">
        {#if selectedTemplate === "comic"}
          <div class="bg-base-200 rounded-lg p-4">
            <div class="flex items-center justify-between mb-3">
              <h3 class="font-semibold">Comic Design</h3>
              <a
                href="https://njump.me/npub1gwa27rpgum8mr9d30msg8cv7kwj2lhav2nvmdwh3wqnsa5vnudxqlta2sz"
                class="link link-primary text-xs"
                target="_blank">by @BitPopart</a
              >
            </div>

            <label class="form-control w-full">
              <div class="label pb-1">
                <span class="label-text text-sm">Design Variation</span>
                <span class="label-text-alt badge badge-sm">{design}</span>
              </div>
              <input
                type="range"
                min="3"
                max="25"
                bind:value={design}
                class="range range-primary range-sm"
              />
            </label>
          </div>
        {:else if selectedTemplate === "custom"}
          <div class="bg-base-200 rounded-lg p-4">
            <div class="flex items-center justify-between mb-3">
              <h3 class="font-semibold">Custom Design</h3>
              <a
                href="https://njump.me/npub1cj6ndx5akfazux7f0vjl4fyx9k0ulf682p437fe03a9ndwqjm0tqj886t6"
                class="link link-primary text-xs"
                target="_blank">by @gandlaf21</a
              >
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <label class="form-control">
                <div class="label pb-1">
                  <span class="label-text text-sm">Brand Color</span>
                </div>
                <input
                  type="color"
                  bind:value={colorCode}
                  class="w-full h-10 rounded cursor-pointer"
                />
              </label>

              <label class="form-control md:col-span-2">
                <div class="label pb-1">
                  <span class="label-text text-sm">Brand Logo</span>
                  <span class="label-text-alt text-xs opacity-60"
                    >Main center logo</span
                  >
                </div>
                <input
                  type="file"
                  class="file-input file-input-bordered file-input-sm"
                  accept="image/*"
                  oninput={getBrandURL}
                />
              </label>

              <label class="form-control md:col-span-2">
                <div class="label pb-1">
                  <span class="label-text text-sm">Corner Logo</span>
                  <span class="label-text-alt text-xs opacity-60"
                    >Small corner decoration</span
                  >
                </div>
                <input
                  type="file"
                  class="file-input file-input-bordered file-input-sm"
                  accept="image/*"
                  oninput={getCornerURL}
                />
              </label>
            </div>
          </div>
        {:else if selectedTemplate === "mountainlake"}
          <MountainlakeDesigner
            bind:enableBackside
            bind:activeSide
            oppositeSideConfig={enableBackside ? oppositeSideConfig : undefined}
            bind:bgSectionOpen
            bind:topLeftSectionOpen
            bind:topRightSectionOpen
            bind:qrSectionOpen
            bind:bottomSectionOpen
            bind:enableTopLeftIcon={currentDesign.enableTopLeftIcon}
            bind:enableHeaderText={currentDesign.enableHeaderText}
            bind:enableQrCode={currentDesign.enableQrCode}
            bind:enableDenomination={currentDesign.enableDenomination}
            bind:bgGradientType={currentDesign.bgGradientType}
            bind:bgSolidColor={currentDesign.bgSolidColor}
            bind:gradientType={currentDesign.gradientType}
            bind:gradientAngle={currentDesign.gradientAngle}
            bind:gradientStops={currentDesign.gradientStops}
            bind:radialCenterX={currentDesign.radialCenterX}
            bind:radialCenterY={currentDesign.radialCenterY}
            bind:topLeftIcon={currentDesign.topLeftIcon}
            bind:customLogoUrl={currentDesign.customLogoUrl}
            bind:topLeftIconColor={currentDesign.topLeftIconColor}
            bind:enableIconColorOverride={currentDesign.enableIconColorOverride}
            bind:topLeftIconSize={currentDesign.topLeftIconSize}
            bind:topLeftIconX={currentDesign.topLeftIconX}
            bind:topLeftIconY={currentDesign.topLeftIconY}
            bind:topLeftIconOpacity={currentDesign.topLeftIconOpacity}
            bind:headerText={currentDesign.headerText}
            bind:headerTextColor={currentDesign.headerTextColor}
            bind:headerTextX={currentDesign.headerTextX}
            bind:headerTextY={currentDesign.headerTextY}
            bind:qrGradientType={currentDesign.qrGradientType}
            bind:qrGradientAngle={currentDesign.qrGradientAngle}
            bind:qrGradientStops={currentDesign.qrGradientStops}
            bind:qrCodeColor={currentDesign.qrCodeColor}
            bind:qrBackgroundColor={currentDesign.qrBackgroundColor}
            bind:qrBorderColor={currentDesign.qrBorderColor}
            bind:disableQrBackground={currentDesign.disableQrBackground}
            bind:disableQrBorder={currentDesign.disableQrBorder}
            bind:qrX={currentDesign.qrX}
            bind:qrY={currentDesign.qrY}
            bind:denominationColor={currentDesign.denominationColor}
            bind:bottomBoxColor={currentDesign.bottomBoxColor}
            bind:bottomTextColor={currentDesign.bottomTextColor}
            bind:customBottomText={currentDesign.customBottomText}
            bind:denominationX={currentDesign.denominationX}
            bind:denominationY={currentDesign.denominationY}
            bind:customImages={currentDesign.customImages}
            bind:enableGuideText={currentDesign.enableGuideText}
            bind:guideText={currentDesign.guideText}
            bind:guideTextColor={currentDesign.guideTextColor}
            bind:guideBackgroundColor={currentDesign.guideBackgroundColor}
            bind:guideBorderColor={currentDesign.guideBorderColor}
            bind:disableGuideBorder={currentDesign.disableGuideBorder}
            bind:disableGuideBackground={currentDesign.disableGuideBackground}
            bind:guideX={currentDesign.guideX}
            bind:guideY={currentDesign.guideY}
            bind:guideWidth={currentDesign.guideWidth}
            bind:guideHeight={currentDesign.guideHeight}
          />
        {/if}
      </div>

      <!-- Right: Live Preview -->
      <div class="flex justify-center items-start self-start">
        <div class="bg-base-200 rounded-lg p-4 lg:sticky lg:top-2">
          <h4 class="text-sm font-semibold mb-3 text-center">Preview</h4>
          {#if selectedTemplate === "comic"}
            <ComicNote
              {design}
              denomination={getAmountForTokenSet(
                $preparedTokens[0]?.proofs ?? [],
              )}
              mintUrl={$wallet?.mint.mintUrl}
              token={"blabla"}
              unit={$preparedTokens[0]?.unit ?? "sat"}
              disableDownload={true}
            />
          {:else if selectedTemplate === "custom"}
            <CustomNote
              {brandLogoURL}
              {colorCode}
              {cornerBrandLogoURL}
              denomination={getAmountForTokenSet(
                $preparedTokens[0]?.proofs ?? [],
              )}
              mintUrl={$wallet?.mint.mintUrl}
              token={"blabla"}
              unit={$preparedTokens[0]?.unit ?? "sat"}
            />
          {:else if selectedTemplate === "mountainlake"}
            <!-- Front preview -->
            <MountainlakeNote
              denomination={getAmountForTokenSet(
                $preparedTokens[0]?.proofs ?? [],
              )}
              mintUrl={$wallet?.mint.mintUrl}
              token={"blabla"}
              enableTopLeftIcon={frontDesign.enableTopLeftIcon}
              enableHeaderText={frontDesign.enableHeaderText}
              enableQrCode={frontDesign.enableQrCode}
              enableDenomination={frontDesign.enableDenomination}
              topLeftIcon={frontDesign.topLeftIcon}
              customLogoUrl={frontDesign.customLogoUrl}
              topLeftIconColor={frontDesign.topLeftIconColor}
              enableIconColorOverride={frontDesign.enableIconColorOverride}
              topLeftIconSize={frontDesign.topLeftIconSize}
              topLeftIconX={frontDesign.topLeftIconX}
              topLeftIconY={frontDesign.topLeftIconY}
              topLeftIconOpacity={frontDesign.topLeftIconOpacity}
              headerText={frontDesign.headerText}
              headerTextColor={frontDesign.headerTextColor}
              headerTextX={frontDesign.headerTextX}
              headerTextY={frontDesign.headerTextY}
              bgGradientType={frontDesign.bgGradientType}
              bgSolidColor={frontDesign.bgSolidColor}
              gradientType={frontDesign.gradientType}
              gradientStops={frontDesign.gradientStops}
              gradientAngle={frontDesign.gradientAngle}
              radialCenterX={frontDesign.radialCenterX}
              radialCenterY={frontDesign.radialCenterY}
              qrGradientType={frontDesign.qrGradientType}
              qrGradientAngle={frontDesign.qrGradientAngle}
              qrGradientStops={frontDesign.qrGradientStops}
              qrCodeColor={frontDesign.qrCodeColor}
              qrBackgroundColor={frontDesign.qrBackgroundColor}
              qrBorderColor={frontDesign.qrBorderColor}
              disableQrBorder={frontDesign.disableQrBorder}
              disableQrBackground={frontDesign.disableQrBackground}
              qrX={frontDesign.qrX}
              qrY={frontDesign.qrY}
              denominationColor={frontDesign.denominationColor}
              bottomBoxColor={frontDesign.bottomBoxColor}
              bottomTextColor={frontDesign.bottomTextColor}
              customBottomText={frontDesign.customBottomText}
              denominationX={frontDesign.denominationX}
              denominationY={frontDesign.denominationY}
              customImages={frontDesign.customImages}
              enableGuideText={frontDesign.enableGuideText}
              guideText={frontDesign.guideText}
              guideTextColor={frontDesign.guideTextColor}
              guideBackgroundColor={frontDesign.guideBackgroundColor}
              guideBorderColor={frontDesign.guideBorderColor}
              disableGuideBorder={frontDesign.disableGuideBorder}
              disableGuideBackground={frontDesign.disableGuideBackground}
              guideX={frontDesign.guideX}
              guideY={frontDesign.guideY}
              guideWidth={frontDesign.guideWidth}
              guideHeight={frontDesign.guideHeight}
            />
            {#if enableBackside}
              <div class="divider my-2"></div>
              <!-- Back preview below -->
              <MountainlakeNote
                denomination={getAmountForTokenSet(
                  $preparedTokens[0]?.proofs ?? [],
                )}
                mintUrl={$wallet?.mint.mintUrl}
                token={"blabla"}
                enableTopLeftIcon={backDesign.enableTopLeftIcon}
                enableHeaderText={backDesign.enableHeaderText}
                enableQrCode={backDesign.enableQrCode}
                enableDenomination={backDesign.enableDenomination}
                topLeftIcon={backDesign.topLeftIcon}
                customLogoUrl={backDesign.customLogoUrl}
                topLeftIconColor={backDesign.topLeftIconColor}
                enableIconColorOverride={backDesign.enableIconColorOverride}
                topLeftIconSize={backDesign.topLeftIconSize}
                topLeftIconX={backDesign.topLeftIconX}
                topLeftIconY={backDesign.topLeftIconY}
                topLeftIconOpacity={backDesign.topLeftIconOpacity}
                headerText={backDesign.headerText}
                headerTextColor={backDesign.headerTextColor}
                headerTextX={backDesign.headerTextX}
                headerTextY={backDesign.headerTextY}
                bgGradientType={backDesign.bgGradientType}
                bgSolidColor={backDesign.bgSolidColor}
                gradientType={backDesign.gradientType}
                gradientStops={backDesign.gradientStops}
                gradientAngle={backDesign.gradientAngle}
                radialCenterX={backDesign.radialCenterX}
                radialCenterY={backDesign.radialCenterY}
                qrGradientType={backDesign.qrGradientType}
                qrGradientAngle={backDesign.qrGradientAngle}
                qrGradientStops={backDesign.qrGradientStops}
                qrCodeColor={backDesign.qrCodeColor}
                qrBackgroundColor={backDesign.qrBackgroundColor}
                qrBorderColor={backDesign.qrBorderColor}
                disableQrBorder={backDesign.disableQrBorder}
                disableQrBackground={backDesign.disableQrBackground}
                qrX={backDesign.qrX}
                qrY={backDesign.qrY}
                denominationColor={backDesign.denominationColor}
                bottomBoxColor={backDesign.bottomBoxColor}
                bottomTextColor={backDesign.bottomTextColor}
                customBottomText={backDesign.customBottomText}
                denominationX={backDesign.denominationX}
                denominationY={backDesign.denominationY}
                customImages={backDesign.customImages}
                enableGuideText={backDesign.enableGuideText}
                guideText={backDesign.guideText}
                guideTextColor={backDesign.guideTextColor}
                guideBackgroundColor={backDesign.guideBackgroundColor}
                guideBorderColor={backDesign.guideBorderColor}
                disableGuideBorder={backDesign.disableGuideBorder}
                disableGuideBackground={backDesign.disableGuideBackground}
                guideX={backDesign.guideX}
                guideY={backDesign.guideY}
                guideWidth={backDesign.guideWidth}
                guideHeight={backDesign.guideHeight}
              />
            {/if}
          {/if}
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="w-full max-w-md mt-6">
      <div class="flex items-center gap-2 justify-center mb-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5 text-success"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <h2 class="font-semibold">Ready to Print</h2>
        <span class="badge badge-success badge-sm"
          >{$selectedNumberOfNotes} notes</span
        >
      </div>

      <div class="flex flex-col gap-2">
        <button
          class="btn btn-primary btn-sm"
          onclick={() => (active = "print")}
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
              d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z"
            />
          </svg>
          Print Now! BRRRRRR
        </button>
        <button
          class="btn btn-outline btn-secondary btn-sm"
          onclick={downloadQRs}
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
          Download QR Codes ZIP
        </button>
        <button
          class="btn btn-outline btn-info btn-sm"
          onclick={() => (active = "share")}
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
              d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
            />
          </svg>
          Share via Nostr
        </button>
      </div>
    </div>
  </div>
{:else if active === "print"}
  <div class="flex flex-col items-center gap-6 max-w-5xl mx-auto w-full px-4">
    <!-- PDF Info and Instructions Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full max-w-4xl">
      <!-- PDF Info Card -->
      <div class="card bg-base-200">
        <div class="card-body">
          <h3 class="card-title text-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z"
              />
            </svg>
            Print-Ready PDF
          </h3>
          <div class="space-y-2 text-sm">
            <div class="flex items-start gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5 text-success mt-0.5 flex-shrink-0"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <span><strong>A4 Portrait</strong> format</span>
            </div>
            <div class="flex items-start gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5 text-success mt-0.5 flex-shrink-0"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <span><strong>3 notes per page</strong></span>
            </div>
            {#if selectedTemplate === "mountainlake"}
              <div class="flex items-start gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5 text-success mt-0.5 flex-shrink-0"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <span><strong>90° rotation</strong></span>
              </div>
            {/if}
            <div class="flex items-start gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5 text-success mt-0.5 flex-shrink-0"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <span><strong>5mm bleed</strong> for cutting</span>
            </div>
            <div class="flex items-start gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5 text-success mt-0.5 flex-shrink-0"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <span><strong>Cut marks</strong> included</span>
            </div>
            <div class="flex items-start gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5 text-success mt-0.5 flex-shrink-0"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <span><strong>High quality</strong> (4× resolution)</span>
            </div>
            {#if enableBackside}
              <div class="flex items-start gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5 text-info mt-0.5 flex-shrink-0"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.25m-12 0A2.25 2.25 0 0 0 4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5A2.25 2.25 0 0 1 4.5 7.5h15a2.25 2.25 0 0 1 2.25 2.25v7.5"
                  />
                </svg>
                <span><strong>Double-sided</strong> enabled</span>
              </div>
            {/if}
          </div>
        </div>
      </div>

      <!-- Printing Instructions Card -->
      <div class="card bg-base-200">
        <div class="card-body">
          <h3 class="card-title text-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
              />
            </svg>
            How to Print
          </h3>
          <div class="text-xs font-mono bg-base-300 p-3 rounded whitespace-pre-wrap leading-relaxed">
            {getPrintingInstructions(enableBackside)}
          </div>
        </div>
      </div>
    </div>

    <!-- Generation Button -->
    <div class="w-full max-w-md">
      <button
        class="btn btn-primary btn-lg w-full gap-2"
        onclick={generateAndDownloadPdf}
        disabled={isGeneratingPdf}
      >
        {#if isGeneratingPdf}
          <span class="loading loading-spinner"></span>
          {#if pdfProgress.current === 0}
            Preparing...
          {:else if pdfProgress.current <= pdfProgress.total}
            Rendering note {pdfProgress.current}/{pdfProgress.total}
          {:else}
            Creating PDF...
          {/if}
        {:else}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>
          Generate Print-Ready PDF
        {/if}
      </button>
      
      {#if isGeneratingPdf}
        <div class="mt-2 text-center text-sm opacity-70">
          {#if pdfProgress.current === 0}
            Initializing PDF generation...
          {:else if pdfProgress.current <= pdfProgress.total}
            <div class="flex flex-col gap-1">
              <progress 
                class="progress progress-primary w-full" 
                value={pdfProgress.current} 
                max={pdfProgress.total}
              ></progress>
              <span>Please wait, this may take a minute...</span>
            </div>
          {:else}
            Finalizing PDF document...
          {/if}
        </div>
      {/if}
    </div>
  </div>
{:else if active === "share"}
  <ShareViaNostr></ShareViaNostr>
{/if}
