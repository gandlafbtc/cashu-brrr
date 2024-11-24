import type { CashuWallet, MintQuoteResponse, Proof, Token } from '@cashu/cashu-ts';

import { writable } from 'svelte/store';
import type { Mint } from './utils';

export type Print = {
    tokens: Token[]
    mint: string
    ts: number
}

const initialValueSting: string = window.localStorage.getItem('prints') ?? '[]'

let initialValue: Array<Print> = JSON.parse(initialValueSting);

//migrate old prints
if (initialValue[0]?.tokens[0]?.token) {
    const newPrints: Print[] = []
    for (const print of initialValue) {
        const newPrint: Print = {
            mint: print.mint,
            ts: print.ts,
            tokens: print.tokens.map(t => t.token[0])
        }
        newPrints.push(newPrint)
    }
    initialValue = newPrints
}

export const prints = writable<Array<Print>>(initialValue);

prints.subscribe((value) => {
    window.localStorage.setItem('prints', JSON.stringify(value));
});


const initialValueStingProofs: string = window.localStorage.getItem('proofs') ?? '[]'

const initialValueProofs: Array<Proof> = JSON.parse(initialValueStingProofs);

export const proofs = writable<Array<Proof>>(initialValueProofs);

proofs.subscribe((value) => {
    window.localStorage.setItem('proofs', JSON.stringify(value));
});




export const wallet = writable<CashuWallet>()
export const mint = writable<Mint>()

export const step = writable<number>(1)
export const selectedDenomination = writable<number>(1)
export const selectedNumberOfNotes = writable<number>(1)
export const preparedTokens = writable<Token[]>([])

export const currentQuote = writable<MintQuoteResponse>()

export type DiscoveredMint = {
    url: string,
    reviews: number,
}

const createDiscoveredMintsStore = () => {
    const store = writable<DiscoveredMint[]>([]);

    const add = (url: string) => {
        store.update((mints) => {
            const existingMint = mints.find(m => m.url === url)
            if (!existingMint) {
                mints = [...mints, { url, reviews: 1 }]
            }
            else {
                existingMint.reviews++
            }
            mints.sort((a, b) => b.reviews - a.reviews)
            return mints
        });
    }

    return { ...store, add }
}

export const discoveredMints = createDiscoveredMintsStore()
