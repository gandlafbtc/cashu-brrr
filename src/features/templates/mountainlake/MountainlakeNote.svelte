<script lang="ts">
  import { onMount } from "svelte";
  import { QRCodeImage } from "svelte-qrcode-image";
  import { secp256k1 } from "@noble/curves/secp256k1";
  import { bytesToHex } from "@noble/curves/abstract/utils";

  interface GradientStop {
    offset: number; // 0-100
    color: string;
  }

  interface CustomLayer {
    id: string;
    type: "image" | "text" | "shape";
    x: number;
    y: number;
    width: number;
    height: number;
    content: string; // URL for image, text content for text
    rotation?: number;
    opacity?: number;
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
    /** Token denomination value */
    denomination: number;
    /** Mint URL */
    mintUrl?: string;
    /** Encoded Cashu token */
    token: string;

    /** Enable/disable toggles for each section */
    enableTopLeftIcon?: boolean;
    enableHeaderText?: boolean;
    enableQrCode?: boolean;
    enableDenomination?: boolean;

    /** Top left icon type */
    topLeftIcon?:
      | "cashu-logo"
      | "bitcoin"
      | "satoshi-v1"
      | "satoshi-v2"
      | "satoshi-v3"
      | "custom"
      | "none";
    /** Custom logo URL if topLeftIcon is 'custom' */
    customLogoUrl?: string;
    /** Top left icon color (when color override is enabled) */
    topLeftIconColor?: string;
    /** Enable color override for icon */
    enableIconColorOverride?: boolean;
    /** Icon size in pixels */
    topLeftIconSize?: number;
    /** Icon X position */
    topLeftIconX?: number;
    /** Icon Y position */
    topLeftIconY?: number;
    /** Icon opacity (0-100) */
    topLeftIconOpacity?: number;

    /** Header text (supports newlines) */
    headerText?: string;
    /** Header text color */
    headerTextColor?: string;
    /** Header text X position */
    headerTextX?: number;
    /** Header text Y position */
    headerTextY?: number;

    /** Background gradient type (solid, linear, or radial) */
    bgGradientType?: "linear" | "radial" | "solid";
    /** Solid background color (used when bgGradientType is 'solid') */
    bgSolidColor?: string;
    /** Background gradient type (deprecated, use bgGradientType) */
    gradientType?: "linear" | "radial";
    /** Background gradient stops (multi-color support) */
    gradientStops?: GradientStop[];
    /** Background gradient angle for linear (0-360) */
    gradientAngle?: number;
    /** Radial gradient center X (0-100) */
    radialCenterX?: number;
    /** Radial gradient center Y (0-100) */
    radialCenterY?: number;

    /** Legacy: Background gradient start color (deprecated, use gradientStops) */
    gradientStart?: string;
    /** Legacy: Background gradient end color (deprecated, use gradientStops) */
    gradientEnd?: string;

    /** QR code background type */
    qrGradientType?: "linear" | "radial" | "solid";
    /** QR background gradient stops */
    qrGradientStops?: GradientStop[];
    /** QR gradient angle */
    qrGradientAngle?: number;
    /** QR code border color */
    qrBorderColor?: string;
    /** Disable QR code background */
    disableQrBackground?: boolean;
    /** Disable QR code border */
    disableQrBorder?: boolean;
    /** QR code foreground color */
    qrCodeColor?: string;
    /** QR X position */
    qrX?: number;
    /** QR Y position */
    qrY?: number;

    /** Legacy QR props (deprecated) */
    qrBackgroundColor?: string;
    qrBackgroundGradientEnd?: string;
    useQrGradient?: boolean;

    /** Denomination text color */
    denominationColor?: string;
    /** Denomination X position */
    denominationX?: number;
    /** Denomination Y position */
    denominationY?: number;

    /** Bottom box gradient type */
    denomGradientType?: "linear" | "radial" | "solid";
    /** Bottom box gradient stops */
    denomGradientStops?: GradientStop[];
    /** Bottom box gradient angle */
    denomGradientAngle?: number;
    /** Disable bottom box background */
    disableDenomBackground?: boolean;
    /** Bottom text color */
    bottomTextColor?: string;
    /** Custom bottom text */
    customBottomText?: string;

    /** Legacy denom props (deprecated) */
    bottomBoxColor?: string;
    bottomBoxGradientEnd?: string;
    useDenomGradient?: boolean;

    /** Custom layers for images/graphics */
    customLayers?: CustomLayer[];

    /** Custom images */
    customImages?: CustomImage[];

    /** Guide text box */
    enableGuideText?: boolean;
    guideText?: string;
    guideTextColor?: string;
    guideBackgroundColor?: string;
    guideBorderColor?: string;
    disableGuideBorder?: boolean;
    disableGuideBackground?: boolean;
    guideX?: number;
    guideY?: number;
    guideWidth?: number;
    guideHeight?: number;
  }

  let {
    denomination,
    mintUrl,
    token,

    enableTopLeftIcon = true,
    enableHeaderText = true,
    enableQrCode = true,
    enableDenomination = true,

    topLeftIcon = "cashu-logo",
    customLogoUrl = "",
    topLeftIconColor = "#FFFFFF",
    enableIconColorOverride = false,
    topLeftIconSize = 35,
    topLeftIconX = 10,
    topLeftIconY = 10,
    topLeftIconOpacity = 100,

    headerText = "Cashu Token\nRedeemable with Cashu\nWallet of choice",
    headerTextColor = "#FFFFFF",
    headerTextX = 150,
    headerTextY = 0,

    bgGradientType = "linear",
    bgSolidColor = "#F77F00",
    gradientType = "linear",
    gradientStops,
    gradientAngle = 135,
    radialCenterX = 50,
    radialCenterY = 50,

    // Legacy support
    gradientStart = "#F77F00",
    gradientEnd = "#7209B7",

    qrGradientType = "solid",
    qrGradientStops,
    qrGradientAngle = 90,
    qrBorderColor = "#F77F00",
    disableQrBackground = false,
    disableQrBorder = false,
    qrCodeColor = "#000000",
    qrX = 20,
    qrY = 90,

    // Legacy QR support
    qrBackgroundColor = "#FFFFFF",
    qrBackgroundGradientEnd = "#FFFFFF",
    useQrGradient = false,

    denominationColor = "#F77F00",
    denominationY = 219,

    denomGradientType = "solid",
    denomGradientStops,
    denomGradientAngle = 90,
    disableDenomBackground = false,
    bottomTextColor = "#666666",
    customBottomText = "",

    // Legacy denom support
    bottomBoxColor = "#FFFFFF",
    bottomBoxGradientEnd = "#FFFFFF",
    useDenomGradient = false,

    customLayers = [],
    customImages = [],

    enableGuideText = false,
    guideText = "How to redeem:\n1. Download a Cashu wallet\n2. Scan the QR code\n3. Tokens are in your wallet",
    guideTextColor = "#333333",
    guideBackgroundColor = "#FFFFFF",
    guideBorderColor = "#F77F00",
    disableGuideBorder = false,
    disableGuideBackground = false,
    guideX = 10,
    guideY = 90,
    guideWidth = 140,
    guideHeight = 100,
  }: Props = $props();

  let imageURL = $state("");
  let originalQRCanvas = $state<HTMLCanvasElement | null>(null);
  const randomID = bytesToHex(secp256k1.utils.randomPrivateKey()).slice(0, 12);

  // Convert legacy gradient props to new format - use $derived for reactivity
  const bgStops = $derived(
    gradientStops || [
      { offset: 0, color: gradientStart },
      { offset: 100, color: gradientEnd },
    ],
  );

  const qrStops = $derived(
    qrGradientStops ||
      (useQrGradient
        ? [
            { offset: 0, color: qrBackgroundColor },
            { offset: 100, color: qrBackgroundGradientEnd },
          ]
        : [{ offset: 0, color: qrBackgroundColor }]),
  );

  const denomStops = $derived(
    denomGradientStops ||
      (useDenomGradient
        ? [
            { offset: 0, color: bottomBoxColor },
            { offset: 100, color: bottomBoxGradientEnd },
          ]
        : [{ offset: 0, color: bottomBoxColor }]),
  );

  // Calculate gradient coordinates from angle
  const getLinearGradientCoords = (angle: number) => {
    const radians = (angle * Math.PI) / 180;
    const x1 = 50 - 50 * Math.cos(radians);
    const y1 = 50 - 50 * Math.sin(radians);
    const x2 = 50 + 50 * Math.cos(radians);
    const y2 = 50 + 50 * Math.sin(radians);
    return { x1: `${x1}%`, y1: `${y1}%`, x2: `${x2}%`, y2: `${y2}%` };
  };

  const bgCoords = $derived(getLinearGradientCoords(gradientAngle));
  const qrCoords = $derived(getLinearGradientCoords(qrGradientAngle));
  const denomCoords = $derived(getLinearGradientCoords(denomGradientAngle));

  const processQRCode = () => {
    const canvas = document.getElementById(
      `qr-${randomID}`,
    ) as HTMLCanvasElement | null;
    if (canvas) {
      // Save original canvas if not already saved
      if (!originalQRCanvas) {
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const tempCtx = tempCanvas.getContext("2d");
        if (tempCtx) {
          tempCtx.drawImage(canvas, 0, 0);
          originalQRCanvas = tempCanvas;
        }
      }

      // Start from the original QR code
      if (originalQRCanvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          // Clear and redraw from original
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(originalQRCanvas, 0, 0);

          // Apply custom QR code color if specified
          if (qrCodeColor !== "#000000") {
            const imageData = ctx.getImageData(
              0,
              0,
              canvas.width,
              canvas.height,
            );
            const data = imageData.data;

            // Convert hex color to RGB
            const hex = qrCodeColor.replace("#", "");
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);

            // Replace black pixels with custom color
            for (let i = 0; i < data.length; i += 4) {
              if (data[i] === 0 && data[i + 1] === 0 && data[i + 2] === 0) {
                data[i] = r; // Red
                data[i + 1] = g; // Green
                data[i + 2] = b; // Blue
                // Alpha stays the same
              }
            }

            ctx.putImageData(imageData, 0, 0);
          }

          imageURL = canvas.toDataURL();
        }
      }
    }
  };

  onMount(() => {
    processQRCode();
  });

  // Reactive effect to update QR code color when it changes
  $effect(() => {
    // Track qrCodeColor as a dependency
    void qrCodeColor;

    // Process QR code whenever qrCodeColor changes
    if (imageURL) {
      processQRCode();
    }
  });

  // Compute default bottom text and support {MINT} placeholder replacement
  const mintHostUpper = $derived.by(() => {
    if (!mintUrl) return "";
    try {
      const u = new URL(mintUrl);
      return (u.host || mintUrl).toUpperCase();
    } catch {
      return mintUrl.toUpperCase();
    }
  });

  const bottomTextComputed = $derived.by(() => {
    const tpl = (customBottomText ?? "").trim();
    if (tpl.length > 0) {
      return tpl.replaceAll("{MINT}", mintHostUpper);
    }
    return mintHostUpper ? `${mintHostUpper}\n` : "";
  });
</script>

<!-- QR Code Generator (Hidden) -->
<div class="invisible h-0">
  <QRCodeImage
    text={token}
    scale={9}
    displayType="canvas"
    displayID={`qr-${randomID}`}
  />
</div>

<!-- SVG Note Design -->
<div class="w-full">
  <svg
    viewBox="0 0 160 280"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    class="w-full"
  >
    <defs>
      <!-- Background Gradient -->
      {#if bgGradientType === "solid"}
        <!-- No gradient needed for solid color -->
      {:else if (bgGradientType || gradientType) === "linear"}
        <linearGradient
          id="bgGradient-{randomID}"
          x1={bgCoords.x1}
          y1={bgCoords.y1}
          x2={bgCoords.x2}
          y2={bgCoords.y2}
        >
          {#each bgStops as stop}
            <stop
              offset="{stop.offset}%"
              style="stop-color:{stop.color};stop-opacity:1"
            />
          {/each}
        </linearGradient>
      {:else}
        <radialGradient
          id="bgGradient-{randomID}"
          cx="{radialCenterX}%"
          cy="{radialCenterY}%"
          r="70%"
        >
          {#each bgStops as stop}
            <stop
              offset="{stop.offset}%"
              style="stop-color:{stop.color};stop-opacity:1"
            />
          {/each}
        </radialGradient>
      {/if}

      <!-- QR Background Gradient -->
      {#if qrGradientType === "linear"}
        <linearGradient
          id="qrGradient-{randomID}"
          x1={qrCoords.x1}
          y1={qrCoords.y1}
          x2={qrCoords.x2}
          y2={qrCoords.y2}
        >
          {#each qrStops as stop}
            <stop
              offset="{stop.offset}%"
              style="stop-color:{stop.color};stop-opacity:1"
            />
          {/each}
        </linearGradient>
      {:else if qrGradientType === "radial"}
        <radialGradient id="qrGradient-{randomID}" cx="50%" cy="50%" r="70%">
          {#each qrStops as stop}
            <stop
              offset="{stop.offset}%"
              style="stop-color:{stop.color};stop-opacity:1"
            />
          {/each}
        </radialGradient>
      {/if}

      <!-- Denomination Background Gradient -->
      {#if denomGradientType === "linear"}
        <linearGradient
          id="denomGradient-{randomID}"
          x1={denomCoords.x1}
          y1={denomCoords.y1}
          x2={denomCoords.x2}
          y2={denomCoords.y2}
        >
          {#each denomStops as stop}
            <stop
              offset="{stop.offset}%"
              style="stop-color:{stop.color};stop-opacity:1"
            />
          {/each}
        </linearGradient>
      {:else if denomGradientType === "radial"}
        <radialGradient id="denomGradient-{randomID}" cx="50%" cy="50%" r="70%">
          {#each denomStops as stop}
            <stop
              offset="{stop.offset}%"
              style="stop-color:{stop.color};stop-opacity:1"
            />
          {/each}
        </radialGradient>
      {/if}

      <!-- Icon Color Override Filter -->
      {#if enableIconColorOverride}
        <filter
          id="iconColorFilter-{randomID}"
          color-interpolation-filters="sRGB"
        >
          <!-- Step 1: Extract the alpha channel -->
          <feColorMatrix
            type="matrix"
            values="
            0 0 0 0 0
            0 0 0 0 0
            0 0 0 0 0
            0 0 0 1 0
          "
            result="alphaOnly"
          />

          <!-- Step 2: Create a flood with the target color -->
          <feFlood flood-color={topLeftIconColor} result="colorFlood" />

          <!-- Step 3: Composite the color with the alpha -->
          <feComposite in="colorFlood" in2="alphaOnly" operator="in" />
        </filter>
      {/if}
    </defs>

    <!-- Background -->
    <rect
      width="160"
      height="280"
      fill={bgGradientType === "solid"
        ? bgSolidColor
        : `url(#bgGradient-${randomID})`}
      rx="0"
    />

    <!-- Top Left Logo -->
    {#if enableTopLeftIcon && topLeftIcon !== "none"}
      <g
        id="logo-placeholder"
        transform="translate({topLeftIconX ?? 10}, {topLeftIconY ?? 10})"
        opacity={(topLeftIconOpacity ?? 100) / 100}
      >
        {#if topLeftIcon === "cashu-logo"}
          <!-- Cashu Logo from /public/icon.svg -->
          <image
            href="/icon.svg"
            width={topLeftIconSize ?? 35}
            height={topLeftIconSize ?? 35}
            filter={enableIconColorOverride
              ? `url(#iconColorFilter-${randomID})`
              : undefined}
            preserveAspectRatio="xMidYMid meet"
          />
        {:else if topLeftIcon === "bitcoin"}
          <!-- Bitcoin Logo from /public/bitcoin.svg -->
          <image
            href="/bitcoin.svg"
            width={topLeftIconSize ?? 35}
            height={topLeftIconSize ?? 35}
            filter={enableIconColorOverride
              ? `url(#iconColorFilter-${randomID})`
              : undefined}
            preserveAspectRatio="xMidYMid meet"
          />
        {:else if topLeftIcon === "satoshi-v1"}
          <!-- Satoshi v1 from /public/satoshi-v1.svg -->
          <image
            href="/satoshi-v1.svg"
            width={topLeftIconSize ?? 35}
            height={topLeftIconSize ?? 35}
            filter={enableIconColorOverride
              ? `url(#iconColorFilter-${randomID})`
              : undefined}
            preserveAspectRatio="xMidYMid meet"
          />
        {:else if topLeftIcon === "satoshi-v2"}
          <!-- Satoshi v2 from /public/satoshi-v2.svg -->
          <image
            href="/satoshi-v2.svg"
            width={topLeftIconSize ?? 35}
            height={topLeftIconSize ?? 35}
            filter={enableIconColorOverride
              ? `url(#iconColorFilter-${randomID})`
              : undefined}
            preserveAspectRatio="xMidYMid meet"
          />
        {:else if topLeftIcon === "satoshi-v3"}
          <!-- Satoshi v3 from /public/satoshi-v3.svg -->
          <image
            href="/satoshi-v3.svg"
            width={topLeftIconSize ?? 35}
            height={topLeftIconSize ?? 35}
            filter={enableIconColorOverride
              ? `url(#iconColorFilter-${randomID})`
              : undefined}
            preserveAspectRatio="xMidYMid meet"
          />
        {:else if topLeftIcon === "custom" && customLogoUrl}
          <!-- Custom uploaded image -->
          <image
            href={customLogoUrl}
            width={topLeftIconSize ?? 35}
            height={topLeftIconSize ?? 35}
            filter={enableIconColorOverride
              ? `url(#iconColorFilter-${randomID})`
              : undefined}
            preserveAspectRatio="xMidYMid meet"
          />
        {/if}
      </g>
    {/if}

    <!-- Top Right Header Text -->
    {#if enableHeaderText}
      <g id="header-text" transform="translate({headerTextX}, {headerTextY})">
        {#each headerText.split("\n").slice(0, 3) as line, i}
          <text
            x="0"
            y={13 + i * 6.7}
            font-family="'Noto Sans Adlam', Arial, sans-serif"
            font-size="5.33"
            font-weight="500"
            fill={headerTextColor}
            text-anchor="end"
          >
            {line.length > 25 ? line.slice(0, 25) + "..." : line}
          </text>
        {/each}
      </g>
    {/if}

    <!-- QR Code Area Background -->
    {#if enableQrCode && !disableQrBackground}
      <rect
        id="qr-container"
        x={qrX}
        y={qrY}
        width={120}
        height={120}
        fill={qrGradientType === "solid"
          ? qrStops[0].color
          : `url(#qrGradient-${randomID})`}
        rx="6.74"
        stroke={disableQrBorder ? "none" : qrBorderColor}
        stroke-width={disableQrBorder ? "0" : "1.67"}
      />
    {/if}

    <!-- QR Code Image -->
    {#if enableQrCode && imageURL}
      <image
        href={imageURL}
        x={qrX + 12}
        y={qrY + 12}
        width={96}
        height={96}
        preserveAspectRatio="xMidYMid meet"
        style="mix-blend-mode: multiply;"
      />
    {/if}

    <!-- Bottom Box -->
    {#if enableDenomination && !disableDenomBackground}
      <rect
        id="bottom-box"
        x="0"
        y={denominationY}
        width="160"
        height="56.08"
        fill={denomGradientType === "solid"
          ? denomStops[0].color
          : `url(#denomGradient-${randomID})`}
      />
    {/if}

    <!-- Custom Layers (images, text, shapes) -->
    {#each customLayers as layer (layer.id)}
      {#if layer.type === "image"}
        <image
          href={layer.content}
          x={layer.x}
          y={layer.y}
          width={layer.width}
          height={layer.height}
          transform={layer.rotation
            ? `rotate(${layer.rotation} ${layer.x + layer.width / 2} ${layer.y + layer.height / 2})`
            : ""}
          opacity={layer.opacity ?? 1}
        />
      {:else if layer.type === "text"}
        <text
          x={layer.x}
          y={layer.y}
          font-family="Arial"
          font-size={layer.height || 12}
          fill={layer.content}
          transform={layer.rotation
            ? `rotate(${layer.rotation} ${layer.x} ${layer.y})`
            : ""}
          opacity={layer.opacity ?? 1}
        >
          {layer.content}
        </text>
      {:else if layer.type === "shape"}
        <rect
          x={layer.x}
          y={layer.y}
          width={layer.width}
          height={layer.height}
          fill={layer.content}
          transform={layer.rotation
            ? `rotate(${layer.rotation} ${layer.x + layer.width / 2} ${layer.y + layer.height / 2})`
            : ""}
          opacity={layer.opacity ?? 1}
        />
      {/if}
    {/each}

    <!-- Custom Images -->
    {#each customImages as image (image.id)}
      <image
        href={image.url}
        x={image.x}
        y={image.y}
        width={image.width}
        height={image.height}
        opacity={image.opacity / 100}
        preserveAspectRatio="xMidYMid meet"
      />
    {/each}

    <!-- Guide Text Box -->
    {#if enableGuideText}
      <!-- Background -->
      {#if !disableGuideBackground}
        <rect
          x={guideX}
          y={guideY}
          width={guideWidth}
          height={guideHeight}
          fill={guideBackgroundColor}
          stroke={disableGuideBorder ? "none" : guideBorderColor}
          stroke-width={disableGuideBorder ? "0" : "1"}
          rx="3"
        />
      {/if}

      <!-- Text -->
      <text
        x={guideX + 5}
        y={guideY + 10}
        font-family="Arial"
        font-size="6"
        fill={guideTextColor}
        text-anchor="start"
      >
        {#each guideText.split("\n") as line, i}
          <tspan x={guideX + 5} dy={i === 0 ? 0 : 8}>{line}</tspan>
        {/each}
      </text>
    {/if}

    <!-- Denomination Group -->
    {#if enableDenomination}
      <g id="denomination" transform="translate(0, {denominationY})">
        <!-- Denomination Number -->
        <text
          x="6"
          y="26"
          font-family="Arial"
          font-size="20"
          font-weight="700"
          fill={denominationColor}
        >
          {denomination.toLocaleString()}
        </text>

        <!-- Bottom Text -->
        <g id="bottom-text" transform="translate(6, 37)">
          {#each bottomTextComputed.split("\n") as line, i}
            <text
              x="0"
              y={i * 8}
              font-family="Arial"
              font-size="7"
              fill={bottomTextColor}
              text-anchor="start"
            >
              {line}
            </text>
          {/each}
        </g>
      </g>
    {/if}</svg
  >
</div>
