import { jsPDF } from 'jspdf';

export interface NoteData {
  frontSvg: string;
  backSvg?: string;
  id: string;
  rotation?: number; // 0 for landscape (no rotation), 90 for portrait (rotate 90°)
  dimensions?: { width: number; height: number }; // Optional: detected dimensions in mm
}

// A4 Portrait constants - FIXED configuration
const A4_WIDTH = 210; // mm
const A4_HEIGHT = 297; // mm
const BLEED = 5; // mm - fixed 5mm bleed on sides and between notes
const NOTES_PER_PAGE = 3; // Always 3 notes per page, stacked vertically
const DPI_SCALE = 2; // Balanced quality rendering (2x resolution - good quality, reasonable file size)

/**
 * Auto-detect note dimensions from SVG viewBox
 */
export function detectNoteDimensions(svgString: string): { width: number; height: number } | null {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, 'image/svg+xml');
    const svg = doc.querySelector('svg');

    if (!svg) return null;

    const viewBox = svg.getAttribute('viewBox');
    if (viewBox) {
      const [, , widthPx, heightPx] = viewBox.split(' ').map(Number);
      // Convert pixels to mm at 96 DPI (standard web DPI)
      // 1 inch = 25.4mm, 96 DPI means 1px = 25.4/96 mm
      const MM_PER_PIXEL = 25.4 / 96;
      return {
        width: widthPx * MM_PER_PIXEL,
        height: heightPx * MM_PER_PIXEL
      };
    }

    // Fallback to width/height attributes
    const widthAttr = svg.getAttribute('width');
    const heightAttr = svg.getAttribute('height');
    if (widthAttr && heightAttr) {
      const MM_PER_PIXEL = 25.4 / 96;
      return {
        width: parseFloat(widthAttr) * MM_PER_PIXEL,
        height: parseFloat(heightAttr) * MM_PER_PIXEL
      };
    }

    return null;
  } catch (error) {
    console.error('Failed to detect note dimensions:', error);
    return null;
  }
}

/**
 * Calculate the fitted dimensions for a note to fit on A4 page with 3 notes stacked
 * Handles different aspect ratios and centers them properly
 * For portrait notes (rotation 90/270), uses almost full width (~155mm) for better print quality
 */
function calculateNoteFit(
  originalWidth: number,
  originalHeight: number,
  rotation: number
): { fittedWidth: number; fittedHeight: number } {
  // Available space - use more aggressive margins for portrait notes
  const isPortrait = rotation === 90 || rotation === 270;

  // Cut marks extend: 2mm gap + 5mm mark = 7mm on each side
  const CUT_MARK_SPACE = 7;

  // For portrait notes: use 155mm width (leaves room for cut marks and margins)
  // For landscape notes: use standard available width with bleed
  const targetWidth = isPortrait ? 155 : A4_WIDTH - (2 * BLEED) - (2 * CUT_MARK_SPACE);

  // Calculate available height per note, accounting for cut marks
  const totalVerticalSpace = A4_HEIGHT - (2 * BLEED);
  const spacePerNote = totalVerticalSpace / NOTES_PER_PAGE;
  const availableHeightPerNote = spacePerNote - (2 * CUT_MARK_SPACE);

  // Dimensions after rotation
  const rotatedWidth = isPortrait ? originalHeight : originalWidth;
  const rotatedHeight = isPortrait ? originalWidth : originalHeight;

  // Calculate scale to fit
  const scaleX = targetWidth / rotatedWidth;
  const scaleY = availableHeightPerNote / rotatedHeight;
  const scale = Math.min(scaleX, scaleY); // Allow scaling up for small SVGs like Mountainlake

  return {
    fittedWidth: rotatedWidth * scale,
    fittedHeight: rotatedHeight * scale
  };
}

/**
 * Extract SVG string from a DOM element
 */
export function extractSvgFromElement(element: HTMLElement): string | null {
  const svg = element.querySelector('svg');
  if (!svg) return null;

  return new XMLSerializer().serializeToString(svg);
}

/**
 * Convert SVG to canvas and then to PNG data URL with rotation
 */
async function addSvgToPdf(
  pdf: jsPDF,
  svgString: string,
  x: number,
  y: number,
  width: number,
  height: number,
  rotation: number = 90
): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      reject(new Error('Failed to get canvas context'));
      return;
    }

    // High DPI rendering for crisp text
    if (rotation === 90 || rotation === 270) {
      canvas.width = height * DPI_SCALE * 3.7795; // Swap dimensions for rotation, convert mm to px
      canvas.height = width * DPI_SCALE * 3.7795;
    } else {
      canvas.width = width * DPI_SCALE * 3.7795;
      canvas.height = height * DPI_SCALE * 3.7795;
    }

    img.onload = () => {
      // Clear canvas
      ctx.fillStyle = 'transparent';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Apply rotation
      ctx.save();

      if (rotation === 90) {
        ctx.translate(canvas.width, 0);
        ctx.rotate(Math.PI / 2);
        ctx.drawImage(img, 0, 0, canvas.height, canvas.width);
      } else if (rotation === 270) {
        ctx.translate(0, canvas.height);
        ctx.rotate(-Math.PI / 2);
        ctx.drawImage(img, 0, 0, canvas.height, canvas.width);
      } else if (rotation === 180) {
        ctx.translate(canvas.width, canvas.height);
        ctx.rotate(Math.PI);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      } else {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }

      ctx.restore();

      // Convert to JPEG with compression for much smaller file sizes
      // Quality 0.92 provides excellent visual quality while significantly reducing file size
      const imageData = canvas.toDataURL('image/jpeg', 0.92);

      if (rotation === 90 || rotation === 270) {
        pdf.addImage(imageData, 'JPEG', x, y, height, width, undefined, 'FAST');
      } else {
        pdf.addImage(imageData, 'JPEG', x, y, width, height, undefined, 'FAST');
      }

      resolve();
    };

    img.onerror = () => {
      reject(new Error('Failed to load SVG image'));
    };

    // Convert SVG to data URL
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    img.src = URL.createObjectURL(blob);
  });
}

/**
 * Draw professional crop/cut marks (registration marks) for printing
 * Uses standard printing industry style with marks extending beyond the trim area
 */
function drawCutMarks(pdf: jsPDF, x: number, y: number, width: number, height: number): void {
  const markLength = 5; // mm - longer marks for easier cutting
  const gap = 2; // mm - gap between mark and trim edge

  pdf.setDrawColor(0, 0, 0);
  pdf.setLineWidth(0.25); // Professional mark thickness

  // Top-left corner
  pdf.line(x - gap - markLength, y, x - gap, y); // Horizontal mark (left of corner)
  pdf.line(x, y - gap - markLength, x, y - gap); // Vertical mark (above corner)

  // Top-right corner
  pdf.line(x + width + gap, y, x + width + gap + markLength, y); // Horizontal mark (right of corner)
  pdf.line(x + width, y - gap - markLength, x + width, y - gap); // Vertical mark (above corner)

  // Bottom-left corner
  pdf.line(x - gap - markLength, y + height, x - gap, y + height); // Horizontal mark (left of corner)
  pdf.line(x, y + height + gap, x, y + height + gap + markLength); // Vertical mark (below corner)

  // Bottom-right corner
  pdf.line(x + width + gap, y + height, x + width + gap + markLength, y + height); // Horizontal mark (right of corner)
  pdf.line(x + width, y + height + gap, x + width, y + height + gap + markLength); // Vertical mark (below corner)
}

/**
 * Generate PDF with notes
 * Adaptive layout: A4 Portrait, 3 notes per page, proper centering for all templates
 */
export async function generatePdf(
  notes: NoteData[],
  enableDoubleSided: boolean,
  onProgress?: (current: number, total: number) => void
): Promise<jsPDF> {
  // Create PDF in A4 Portrait
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // Vertical spacing
  const totalVerticalSpace = A4_HEIGHT - 2 * BLEED;
  const spacePerNote = totalVerticalSpace / NOTES_PER_PAGE;

  let isFirstPage = true;
  const totalOperations = enableDoubleSided ? notes.length * 2 : notes.length;
  let currentOperation = 0;

  if (enableDoubleSided) {
    // Double-sided: fronts and backs on consecutive pages
    const totalPages = Math.ceil(notes.length / NOTES_PER_PAGE);

    for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
      const pageStartIdx = pageIndex * NOTES_PER_PAGE;
      const pageEndIdx = Math.min(pageStartIdx + NOTES_PER_PAGE, notes.length);
      const notesOnThisPage = notes.slice(pageStartIdx, pageEndIdx);

      // Add front page
      if (!isFirstPage) {
        pdf.addPage();
      }
      isFirstPage = false;

      // Render fronts
      for (let i = 0; i < notesOnThisPage.length; i++) {
        const note = notesOnThisPage[i];

        // Get dimensions - detect from SVG or use provided dimensions
        const dims = note.dimensions || detectNoteDimensions(note.frontSvg) || { width: 80, height: 140 };
        const rotation = note.rotation ?? 90;

        // Calculate fitted size and positioning
        const { fittedWidth, fittedHeight } = calculateNoteFit(dims.width, dims.height, rotation);

        // Center horizontally
        const x = (A4_WIDTH - fittedWidth) / 2;

        // Center vertically within this note's slot
        const slotY = BLEED + i * spacePerNote;
        const y = slotY + (spacePerNote - fittedHeight) / 2;

        // Draw cut marks
        drawCutMarks(pdf, x, y, fittedWidth, fittedHeight);

        // Add front SVG with rotation - use fitted dimensions for proper scaling
        // For rotated notes, swap dimensions back since addSvgToPdf will rotate them
        const pdfWidth = rotation === 90 || rotation === 270 ? fittedHeight : fittedWidth;
        const pdfHeight = rotation === 90 || rotation === 270 ? fittedWidth : fittedHeight;
        await addSvgToPdf(pdf, note.frontSvg, x, y, pdfWidth, pdfHeight, rotation);

        currentOperation++;
        if (onProgress) {
          onProgress(currentOperation, totalOperations);
        }
      }

      // Add back page if any note has a backside
      const hasBacksides = notesOnThisPage.some(n => n.backSvg);
      if (hasBacksides) {
        pdf.addPage();

        // Render backs in same positions with 180° flip for proper alignment when physical paper is flipped
        for (let i = 0; i < notesOnThisPage.length; i++) {
          const note = notesOnThisPage[i];
          if (!note.backSvg) {
            currentOperation++;
            if (onProgress) {
              onProgress(currentOperation, totalOperations);
            }
            continue;
          }

          // Get dimensions (detect from back SVG or use front dimensions)
          const dims = note.dimensions || detectNoteDimensions(note.backSvg) || detectNoteDimensions(note.frontSvg) || { width: 80, height: 140 };
          const frontRotation = note.rotation ?? 90;

          // Calculate fitted size (should match front for alignment)
          const { fittedWidth, fittedHeight } = calculateNoteFit(dims.width, dims.height, frontRotation);

          // Use EXACT same position as front
          const x = (A4_WIDTH - fittedWidth) / 2;
          const slotY = BLEED + i * spacePerNote;
          const y = slotY + (spacePerNote - fittedHeight) / 2;

          // Draw cut marks in EXACT same position as front
          drawCutMarks(pdf, x, y, fittedWidth, fittedHeight);

          // Add back SVG with 180° additional rotation for proper flip
          const backRotation = (frontRotation + 180) % 360;
          // For rotated notes, swap dimensions back since addSvgToPdf will rotate them
          const pdfWidth = frontRotation === 90 || frontRotation === 270 ? fittedHeight : fittedWidth;
          const pdfHeight = frontRotation === 90 || frontRotation === 270 ? fittedWidth : fittedHeight;
          await addSvgToPdf(pdf, note.backSvg, x, y, pdfWidth, pdfHeight, backRotation);

          currentOperation++;
          if (onProgress) {
            onProgress(currentOperation, totalOperations);
          }
        }
      }
    }
  } else {
    // Single-sided: just fronts
    for (let i = 0; i < notes.length; i++) {
      const note = notes[i];
      const positionOnPage = i % NOTES_PER_PAGE;

      // Add new page if needed
      if (positionOnPage === 0 && !isFirstPage) {
        pdf.addPage();
      }
      isFirstPage = false;

      // Get dimensions
      const dims = note.dimensions || detectNoteDimensions(note.frontSvg) || { width: 80, height: 140 };
      const rotation = note.rotation ?? 90;

      // Calculate fitted size and positioning
      const { fittedWidth, fittedHeight } = calculateNoteFit(dims.width, dims.height, rotation);

      // Center horizontally
      const x = (A4_WIDTH - fittedWidth) / 2;

      // Center vertically within this note's slot
      const slotY = BLEED + positionOnPage * spacePerNote;
      const y = slotY + (spacePerNote - fittedHeight) / 2;

      // Draw cut marks
      drawCutMarks(pdf, x, y, fittedWidth, fittedHeight);

      // Add SVG with rotation - use fitted dimensions for proper scaling
      // For rotated notes, swap dimensions back since addSvgToPdf will rotate them
      const pdfWidth = rotation === 90 || rotation === 270 ? fittedHeight : fittedWidth;
      const pdfHeight = rotation === 90 || rotation === 270 ? fittedWidth : fittedHeight;
      await addSvgToPdf(pdf, note.frontSvg, x, y, pdfWidth, pdfHeight, rotation);

      currentOperation++;
      if (onProgress) {
        onProgress(currentOperation, totalOperations);
      }
    }
  }

  return pdf;
}

/**
 * Get printing instructions based on whether double-sided is enabled
 */
export function getPrintingInstructions(enableDoubleSided: boolean): string {
  if (enableDoubleSided) {
    return `DOUBLE-SIDED PRINTING INSTRUCTIONS:

1. **Print Settings:**
   - Paper: A4 (210mm × 297mm)
   - Orientation: Portrait
   - Double-sided: Flip on SHORT edge
   - Quality: Best/Highest quality
   - Scale: 100% (no scaling)
   - Margins: None (full bleed)

2. **Printing Process:**
   - Page 1: First 3 notes (front side)
   - Page 2: First 3 notes (back side) 
   - Page 3: Next 3 notes (front side)
   - Page 4: Next 3 notes (back side)
   - Continue this pattern...

3. **Important:**
   - Use "Flip on SHORT edge" for proper back alignment
   - Do NOT use "Flip on LONG edge"
   - Test with 1-2 sheets first to verify alignment

4. **Cutting:**
   - Each page has 3 notes stacked vertically
   - Use the corner cut marks as guides
   - 5mm bleed included between notes
   - Cut along the marks for perfectly sized notes`;
  } else {
    return `SINGLE-SIDED PRINTING INSTRUCTIONS:

1. **Print Settings:**
   - Paper: A4 (210mm × 297mm)
   - Orientation: Portrait
   - Quality: Best/Highest quality
   - Scale: 100% (no scaling)
   - Margins: None (full bleed)

2. **Layout:**
   - Each page contains 3 notes stacked vertically
   - Notes are rotated 90° for optimal use of page width

3. **Cutting:**
   - Use the corner cut marks as guides
   - 5mm bleed included between notes
   - Cut along the marks for perfectly sized notes`;
  }
}
