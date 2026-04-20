/**
 * Cashu Wallet Operations
*/

import {
    CashuMint,
    CashuWallet,
    type MintActiveKeys,
    type OutputAmounts,
    type Proof,
} from '@cashu/cashu-ts';
import type { Mint } from '@/types/cashu';

/**
 * Load mint information from URL
 * 
 * @param mintUrl - Mint URL
 * @returns Mint information
 */
export async function loadMint(mintUrl: string): Promise<Mint> {
    try {
        const cashuMint = new CashuMint(mintUrl);
        const mintInfo = await cashuMint.getInfo();
        const mintAllKeysets = await cashuMint.getKeySets();
        const mintActiveKeys: MintActiveKeys = await cashuMint.getKeys();

        return {
            info: mintInfo,
            keys: mintActiveKeys,
            keysets: mintAllKeysets,
            url: mintUrl,
        };
    } catch (error) {
        throw new Error(`Could not load mint: ${mintUrl}`, {
            cause: error,
        });
    }
}

/**
 * Create a Cashu wallet for a specific mint and unit
 * 
 * @param mint - Mint information
 * @param unit - Unit (sat, usd, etc.)
 * @returns Configured wallet
 */
export async function createWallet(
    mint: Mint,
    unit = 'sat'
): Promise<CashuWallet> {
    const keys = mint.keys.keysets.find((ks) => ks.unit === unit);
    const keysets = mint.keysets.keysets.filter((ks) => ks.unit === unit);

    const wallet = new CashuWallet(new CashuMint(mint.url), {
        mintInfo: mint.info,
        unit,
        keys,
        keysets,
    });

    await wallet.getKeys();
    return wallet;
}

/**
 * Calculate total amount from proofs
 * 
 * @param proofs - Array of proofs
 * @returns Total amount
 */
export function calculateProofsAmount(proofs: Proof[]): number {
    return proofs.reduce((sum, proof) => sum + proof.amount, 0);
}

/**
 * Get available denominations from wallet keys
 * 
 * @param wallet - Cashu wallet
 * @returns Sorted array of available denominations
 */
export async function getAvailableDenominations(
    wallet: CashuWallet
): Promise<number[]> {
    const keys = await wallet.getKeys();
    return Object.keys(keys.keys)
        .map((k) => parseInt(k))
        .sort((a, b) => a - b);
}

/**
 * Create output amounts for minting/sending tokens
 * Uses greedy algorithm to minimize number of proofs
 * 
 * @param wallet - Cashu wallet
 * @param denomination - Amount per token
 * @param count - Number of tokens
 * @param isMint - Whether this is for minting (vs sending)
 * @returns Output amounts configuration
 */
export async function createOutputAmounts(
    wallet: CashuWallet,
    denomination: number,
    count: number,
    isMint = false
): Promise<OutputAmounts> {
    const singleOutput = await createSingleOutput(wallet, denomination);

    const outputAmounts: OutputAmounts = {
        sendAmounts: [],
        keepAmounts: [],
    };

    for (let i = 0; i < count; i++) {
        if (isMint) {
            if (!outputAmounts.keepAmounts) outputAmounts.keepAmounts = [];
            outputAmounts.keepAmounts.push(...singleOutput);
        } else {
            if (!outputAmounts.sendAmounts) outputAmounts.sendAmounts = [];
            outputAmounts.sendAmounts.push(...singleOutput);
        }
    }

    return outputAmounts;
}

/**
 * Create output for a single token amount
 * Uses greedy algorithm with available denominations
 * 
 * @param wallet - Cashu wallet
 * @param amount - Target amount
 * @returns Array of denominations that sum to amount
 */
async function createSingleOutput(
    wallet: CashuWallet,
    amount: number
): Promise<number[]> {
    const availableDenoms = await getAvailableDenominations(wallet);
    const result: number[] = [];
    let remaining = amount;

    // Greedy algorithm: use largest denominations first
    for (let i = availableDenoms.length - 1; i >= 0; i--) {
        const denom = availableDenoms[i];
        while (remaining >= denom) {
            result.push(denom);
            remaining -= denom;
        }
    }

    if (remaining > 0) {
        throw new Error(
            `Cannot create amount ${amount} with available denominations: ${availableDenoms.join(', ')}`
        );
    }

    return result;
}

/**
 * Format amount for display
 * 
 * @param amount - Amount to format
 * @param unit - Unit (sat, msat, usd, etc.)
 * @returns Formatted string
 */
export function formatAmount(amount: number, unit = 'sat'): string {
    switch (unit) {
        case 'sat':
            return formatSats(amount);
        case 'msat':
            return formatMSats(amount);
        case 'btc':
            return formatBTC(amount);
        default:
            return formatFiat(amount, unit);
    }
}

/**
 * Format satoshis
 */
function formatSats(amount: number): string {
    return '₿ ' + amount.toLocaleString('en-US') + ' sat';
}

/**
 * Format millisatoshis
 */
function formatMSats(amount: number): string {
    return (
        '₿ ' +
        (amount / 1000).toLocaleString('en-US', {
            minimumFractionDigits: 3,
            maximumFractionDigits: 3,
        }) +
        ' sat'
    );
}

/**
 * Format bitcoin
 */
function formatBTC(amount: number): string {
    return (
        '₿ ' +
        (amount / 100_000_000).toLocaleString('en-US', {
            minimumFractionDigits: 8,
            maximumFractionDigits: 8,
        })
    );
}

/**
 * Format fiat currency
 */
function formatFiat(amount: number, currency: string): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency.toUpperCase(),
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount / 100);
}

/**
 * Get unit symbol
 * 
 * @param unit - Unit code
 * @param isLong - Include full unit name
 * @returns Symbol string
 */
export function getUnitSymbol(unit: string, isLong = true): string {
    switch (unit.toLowerCase()) {
        case 'sat':
            return '₿' + (isLong ? ' (sat)' : '');
        case 'msat':
            return '₿' + (isLong ? ' (msat)' : '');
        case 'btc':
            return '₿' + (isLong ? ' (btc)' : '');
        case 'usd':
            return '$' + (isLong ? ' (usd)' : '');
        case 'eur':
            return '€' + (isLong ? ' (eur)' : '');
        case 'gbp':
            return '£' + (isLong ? ' (gbp)' : '');
        case 'jpy':
            return '¥' + (isLong ? ' (jpy)' : '');
        case 'krw':
            return '₩' + (isLong ? ' (krw)' : '');
        default:
            return unit;
    }
}

/**
 * Validate token structure
 * 
 * @param token - Token string or proofs
 * @returns Validation result
 */
export function validateToken(token: string | { proofs: Proof[] }): {
    isValid: boolean;
    error?: string;
    amount?: number;
} {
    try {
        if (typeof token === 'string') {
            // Basic token string validation
            if (!token.startsWith('cashu')) {
                return { isValid: false, error: 'Invalid token format' };
            }
            return { isValid: true };
        } else {
            // Validate proofs structure
            if (!token.proofs || !Array.isArray(token.proofs)) {
                return { isValid: false, error: 'Missing or invalid proofs array' };
            }

            const amount = calculateProofsAmount(token.proofs);

            if (amount === 0) {
                return { isValid: false, error: 'Token has zero value' };
            }

            return { isValid: true, amount };
        }
    } catch (error) {
        return {
            isValid: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}

/**
 * Split proofs into individual notes
 * Useful for creating multiple physical notes from one token
 * 
 * @param proofs - Array of proofs
 * @param denomination - Target denomination per note
 * @returns Array of proof arrays, each representing one note
 */
export function splitProofsIntoNotes(
    proofs: Proof[],
    denomination: number
): Proof[][] {
    const notes: Proof[][] = [];
    let currentNote: Proof[] = [];
    let currentAmount = 0;

    // Sort proofs by amount (ascending)
    const sortedProofs = [...proofs].sort((a, b) => a.amount - b.amount);

    for (const proof of sortedProofs) {
        if (currentAmount + proof.amount <= denomination) {
            currentNote.push(proof);
            currentAmount += proof.amount;

            if (currentAmount === denomination) {
                notes.push(currentNote);
                currentNote = [];
                currentAmount = 0;
            }
        }
    }

    return notes;
}
