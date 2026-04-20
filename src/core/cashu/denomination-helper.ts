/**
 * Denomination Helper
 * 
 * Provides utilities for suggesting optimal denominations for Cashu tokens,
 * considering QR code size, token complexity, and usability.
 * 
 * QR Code Complexity Considerations:
 * - Cashu tokens contain proofs, which grow in size with more denominations
 * - Simpler denominations (powers of 2) create smaller tokens
 * - Smaller tokens = smaller QR codes = easier to scan
 * - Better for physical notes with limited print area
 */

/**
 * Standard Cashu denomination sets
 * Powers of 2 are optimal for QR code generation
 */
export const DENOMINATION_SETS = {
    /** Powers of 2 - optimal for smallest QR codes */
    BINARY: [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768, 65536],

    /** Common round numbers - more human-friendly but larger QR codes */
    DECIMAL: [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000, 100000],

    /** Popular preset amounts for physical notes */
    PRESET: [1, 10, 21, 100, 210, 1000, 2100, 10000, 21000, 100000, 210000],
} as const;

/**
 * QR code version (size) estimates based on token complexity
 * These are approximate - actual size depends on error correction level
 */
interface QRComplexity {
    estimatedVersion: number; // QR code version (1-40)
    modulesPerSide: number;    // Number of modules (squares) per side
    recommendation: 'optimal' | 'acceptable' | 'large' | 'too-large';
}

/**
 * Estimate QR code complexity for a given amount
 * 
 * @param amount - The amount in sats
 * @returns QR complexity estimation
 */
export function estimateQRComplexity(amount: number): QRComplexity {
    // Approximate token size calculation
    // Base overhead: ~100 chars
    // Per proof: ~200-300 chars depending on denomination breakdown

    const baseSize = 100;
    const proofEstimate = 250; // Average per proof

    // Calculate how many proofs needed (worst case: all powers of 2)
    const proofsNeeded = Math.ceil(Math.log2(amount + 1)) || 1;
    const estimatedTokenSize = baseSize + (proofsNeeded * proofEstimate);

    // QR code version estimation
    // Version 1: ~25 chars, Version 10: ~250 chars, Version 20: ~1000 chars, Version 40: ~3000 chars
    let version: number;
    let recommendation: QRComplexity['recommendation'];

    if (estimatedTokenSize < 150) {
        version = 5;
        recommendation = 'optimal';
    } else if (estimatedTokenSize < 400) {
        version = 10;
        recommendation = 'acceptable';
    } else if (estimatedTokenSize < 1000) {
        version = 20;
        recommendation = 'large';
    } else {
        version = 30;
        recommendation = 'too-large';
    }

    const modulesPerSide = 21 + ((version - 1) * 4);

    return {
        estimatedVersion: version,
        modulesPerSide,
        recommendation
    };
}

/**
 * Suggest optimal denominations based on target amount
 * Returns denominations that will create the smallest QR codes
 * 
 * @param targetAmount - Desired amount in sats
 * @param preferBinary - Prefer powers of 2 (optimal QR size)
 * @returns Suggested denominations sorted by QR code efficiency
 */
export function suggestDenominations(
    targetAmount: number,
    preferBinary = true
): number[] {
    const denomSet = preferBinary ? DENOMINATION_SETS.BINARY : DENOMINATION_SETS.DECIMAL;

    // Filter denominations that are <= target amount
    const applicable = denomSet.filter(d => d <= targetAmount);

    // Score each denomination based on:
    // 1. QR code size (smaller is better)
    // 2. Human readability (round numbers are better)
    // 3. Proximity to target amount

    const scored = applicable.map(denom => {
        const complexity = estimateQRComplexity(denom);
        const proximity = Math.abs(targetAmount - denom) / targetAmount;
        const isRound = denom % 10 === 0 || denom % 21 === 0; // Bitcoin-themed or round

        // Score calculation (lower is better)
        let score = complexity.estimatedVersion * 10; // Prefer smaller QR codes
        score += proximity * 100; // Prefer closer to target
        score -= isRound ? 5 : 0; // Small bonus for round numbers

        return { denom, score, complexity };
    });

    // Sort by score and return top suggestions
    return scored
        .sort((a, b) => a.score - b.score)
        .map(s => s.denom);
}

/**
 * Get the closest optimal denomination to a target amount
 * 
 * @param targetAmount - Desired amount in sats
 * @param preferBinary - Prefer powers of 2
 * @returns Single best denomination
 */
export function getOptimalDenomination(
    targetAmount: number,
    preferBinary = true
): number {
    const suggestions = suggestDenominations(targetAmount, preferBinary);
    return suggestions[0] || 1;
}

/**
 * Get all recommended denominations with complexity info
 * Useful for displaying options to users
 * 
 * @param maxAmount - Maximum amount to consider
 * @param limit - Maximum number of suggestions
 * @returns Array of denominations with QR complexity info
 */
export function getRecommendedDenominations(
    maxAmount = 100000,
    limit = 10
): Array<{ amount: number; complexity: QRComplexity; label: string }> {
    const suggestions = suggestDenominations(maxAmount, true);

    return suggestions
        .slice(0, limit)
        .map(amount => {
            const complexity = estimateQRComplexity(amount);
            let label = `${amount.toLocaleString()} sats`;

            // Add bitcoin-themed labels
            if (amount === 21) label += ' (🧡 21)';
            if (amount === 210) label += ' (🧡 210)';
            if (amount === 2100) label += ' (🧡 2100)';
            if (amount === 21000) label += ' (🧡 21k)';
            if (amount === 210000) label += ' (🧡 210k)';

            // Add QR complexity indicator
            if (complexity.recommendation === 'optimal') {
                label += ' ⚡ Best QR';
            } else if (complexity.recommendation === 'too-large') {
                label += ' ⚠️ Large QR';
            }

            return { amount, complexity, label };
        });
}

/**
 * Calculate how many proofs will be needed for an amount
 * (Assumes binary/powers-of-2 denomination set)
 * 
 * @param amount - Amount in sats
 * @returns Number of proofs needed
 */
export function estimateProofCount(amount: number): number {
    if (amount === 0) return 0;

    // Count set bits in binary representation
    let count = 0;
    let n = amount;
    while (n > 0) {
        count += n & 1;
        n >>= 1;
    }
    return count;
}

/**
 * Break down an amount into optimal denominations
 * (Greedy algorithm using powers of 2)
 * 
 * @param amount - Amount in sats
 * @param availableDenoms - Available denominations from mint
 * @returns Array of denominations that sum to amount
 */
export function breakdownAmount(
    amount: number,
    availableDenoms: readonly number[] = DENOMINATION_SETS.BINARY
): number[] {
    const sorted = [...availableDenoms].sort((a, b) => b - a);
    const result: number[] = [];
    let remaining = amount;

    for (const denom of sorted) {
        while (remaining >= denom) {
            result.push(denom);
            remaining -= denom;
        }
    }

    if (remaining > 0) {
        throw new Error(`Cannot break down ${amount} with available denominations`);
    }

    return result.sort((a, b) => a - b);
}

/**
 * Validate if a denomination is suitable for QR code printing
 * 
 * @param amount - Amount in sats
 * @param minQRSize - Minimum acceptable QR code size (mm)
 * @param maxQRSize - Maximum acceptable QR code size (mm)
 * @returns Validation result
 */
export function validateDenominationForPrint(
    amount: number,
    minQRSize = 20,
    maxQRSize = 50
): {
    isValid: boolean;
    reason?: string;
    suggestedAlternative?: number;
} {
    const complexity = estimateQRComplexity(amount);

    // Rough calculation: 1 module ≈ 0.5mm at 300 DPI
    const estimatedSizeMM = complexity.modulesPerSide * 0.5;

    if (estimatedSizeMM < minQRSize) {
        return {
            isValid: true, // Small is always OK
            reason: `QR code will be very small (~${estimatedSizeMM.toFixed(0)}mm) and easy to scan`
        };
    }

    if (estimatedSizeMM > maxQRSize) {
        const suggestion = getOptimalDenomination(amount);
        return {
            isValid: false,
            reason: `QR code too large (~${estimatedSizeMM.toFixed(0)}mm). Recommend smaller denomination.`,
            suggestedAlternative: suggestion
        };
    }

    return {
        isValid: true,
        reason: `QR code size OK (~${estimatedSizeMM.toFixed(0)}mm)`
    };
}
