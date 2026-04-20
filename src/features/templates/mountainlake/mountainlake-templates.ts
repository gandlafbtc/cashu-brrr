/**
 * Mountainlake Note Template System
 * Allows saving, loading, and sharing complete note designs
 */

export interface CustomImage {
  id: string;
  url: string;
  x: number;
  y: number;
  opacity: number;
  width: number;
  height: number;
}

export interface MountainlakeTemplateConfig {
  // Top Left Icon
  topLeftIcon: "cashu-logo" | "bitcoin" | "satoshi-v1" | "satoshi-v2" | "satoshi-v3" | "none" | "custom";
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
  bgGradientType: 'linear' | 'radial' | 'solid';
  gradientType: 'linear' | 'radial';
  gradientAngle: number;
  gradientStops: Array<{ offset: number; color: string }>;
  radialCenterX: number;
  radialCenterY: number;
  bgSolidColor: string;
  
  // QR Code
  qrGradientType: 'linear' | 'radial' | 'solid';
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

export interface MountainlakeTemplate {
  // Metadata
  name: string;
  description: string;
  author?: string;
  version: string;
  createdAt: string;
  
  // Design Configuration
  front: MountainlakeTemplateConfig;
  back: MountainlakeTemplateConfig;
}

/**
 * Cache for loaded templates
 */
let templatesCache: MountainlakeTemplate[] | null = null;
let defaultTemplate: MountainlakeTemplate | null = null;

/**
 * Get the default template (Sunset Orange)
 */
export async function getDefaultTemplate(): Promise<MountainlakeTemplate> {
  if (defaultTemplate) {
    return defaultTemplate;
  }

  try {
    const response = await fetch('/mountainlake-templates/sunset-orange.mountainlake.json');
    if (response.ok) {
      const template = await response.json();
      if (isValidTemplate(template)) {
        defaultTemplate = template;
        return template;
      }
    }
  } catch (error) {
    console.warn('Failed to load default template:', error);
  }

  // Fallback if sunset-orange.json fails to load
  throw new Error('Default template not available');
}

/**
 * Load all available templates from the public/mountainlake-templates/ directory
 */
export async function loadAvailableTemplates(): Promise<MountainlakeTemplate[]> {
  // Return cached templates if already loaded
  if (templatesCache !== null) {
    return templatesCache;
  }

  const templates: MountainlakeTemplate[] = [];

  try {
    // Load template files from the public directory
    const templateFiles = [
      'bitcoinbaden-red.mountainlake.json',
      'light-monochrome.mountainlake.json',
      'mountainlake-blue.mountainlake.json',
      'mountainlake-design-blue.mountainlake.json',
      'satoshi-blue.mountainlake.json',
      'sunset-orange.mountainlake.json',
      // Add more template files here as they are added to the public folder
      // This list is automatically updated by running: npm run addTemplate
    ];

    // Load each template file
    for (const filename of templateFiles) {
      try {
        const response = await fetch(`/mountainlake-templates/${filename}`);
        if (response.ok) {
          const templateData = await response.json();
          if (isValidTemplate(templateData)) {
            templates.push(templateData);
          } else {
            console.warn(`Invalid template format in ${filename}`);
          }
        } else {
          console.warn(`Failed to load template: ${filename}`);
        }
      } catch (error) {
        console.warn(`Error loading template ${filename}:`, error);
      }
    }
  } catch (error) {
    console.warn('Error loading templates:', error);
  }

  // Cache the loaded templates
  templatesCache = templates;
  return templates;
}

/**
 * Get a template by name
 */
export async function getTemplateByName(name: string): Promise<MountainlakeTemplate | undefined> {
  const templates = await loadAvailableTemplates();
  return templates.find(t => t.name === name);
}

/**
 * Refresh the template cache (call this when new templates might have been added)
 */
export function refreshTemplateCache(): void {
  templatesCache = null;
  defaultTemplate = null;
}

/**
 * Convert a blob URL to a data URL
 */
async function blobUrlToDataUrl(blobUrl: string): Promise<string> {
  try {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Failed to convert blob URL to data URL:', error);
    return ''; // Return empty string if conversion fails
  }
}

/**
 * Convert blob URLs to data URLs in a config
 */
async function convertBlobUrlsToDataUrls(config: MountainlakeTemplateConfig): Promise<MountainlakeTemplateConfig> {
  const newConfig = { ...config };
  
  // Convert customLogoUrl if it's a blob URL
  if (newConfig.customLogoUrl && newConfig.customLogoUrl.startsWith('blob:')) {
    newConfig.customLogoUrl = await blobUrlToDataUrl(newConfig.customLogoUrl);
  }
  
  // Convert custom images
  if (newConfig.customImages && newConfig.customImages.length > 0) {
    newConfig.customImages = await Promise.all(
      newConfig.customImages.map(async (img) => {
        if (img.url && img.url.startsWith('blob:')) {
          return {
            ...img,
            url: await blobUrlToDataUrl(img.url)
          };
        }
        return img;
      })
    );
  }
  
  return newConfig;
}

/**
 * Export template as JSON file
 */
export async function downloadTemplate(
  name: string,
  front: MountainlakeTemplateConfig,
  back: MountainlakeTemplateConfig,
  author?: string
): Promise<void> {
  // Convert blob URLs to data URLs before saving
  const frontWithDataUrls = await convertBlobUrlsToDataUrls(front);
  const backWithDataUrls = await convertBlobUrlsToDataUrls(back);
  
  const template: MountainlakeTemplate = {
    name,
    description: `Custom template: ${name}`,
    author: author || "Custom User",
    version: "1.0",
    createdAt: new Date().toISOString(),
    front: frontWithDataUrls,
    back: backWithDataUrls,
  };

  const json = JSON.stringify(template, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `${name.toLowerCase().replace(/\s+/g, '-')}.mountainlake.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Validate template structure
 */
function isValidTemplate(data: any): data is MountainlakeTemplate {
  return (
    data &&
    typeof data === 'object' &&
    typeof data.name === 'string' &&
    typeof data.version === 'string' &&
    data.front &&
    data.back &&
    typeof data.front === 'object' &&
    typeof data.back === 'object'
  );
}

/**
 * Import template from JSON file
 */
export async function loadTemplateFromFile(file: File): Promise<MountainlakeTemplate> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const data = JSON.parse(text);
        
        if (!isValidTemplate(data)) {
          throw new Error('Invalid template format');
        }
        
        resolve(data);
      } catch (error) {
        reject(new Error('Failed to parse template file: ' + (error instanceof Error ? error.message : 'Unknown error')));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read template file'));
    };
    
    reader.readAsText(file);
  });
}

/**
 * Apply template to design configs
 */
export function applyTemplate(
  template: MountainlakeTemplate,
  setFront: (config: MountainlakeTemplateConfig) => void,
  setBack: (config: MountainlakeTemplateConfig) => void
): void {
  // Deep clone to avoid reference issues
  setFront(JSON.parse(JSON.stringify(template.front)));
  setBack(JSON.parse(JSON.stringify(template.back)));
}
