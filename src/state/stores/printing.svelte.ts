/**
 * Global State Management
 * Handles application state using Svelte stores
 */
import type {
  CashuWallet,
  MintQuoteResponse,
  Proof,
  Token,
} from "@cashu/cashu-ts";
import { writable } from "svelte/store";
import type { Mint, Print, DiscoveredMint, Contact } from "@/types/cashu";
import { SimplePool } from "nostr-tools";

// Initialize print history from localStorage
const initialPrintsString = window.localStorage.getItem("prints") ?? "[]";
const initialPrints: Print[] = JSON.parse(initialPrintsString);

// Initialize proofs from localStorage
const initialProofsString = window.localStorage.getItem("proofs") ?? "[]";
const initialProofs: Proof[] = JSON.parse(initialProofsString);

// Stores with localStorage persistence
export const prints = writable<Print[]>(initialPrints);
prints.subscribe((value) => {
  window.localStorage.setItem("prints", JSON.stringify(value));
});

export const proofs = writable<Proof[]>(initialProofs);
proofs.subscribe((value) => {
  window.localStorage.setItem("proofs", JSON.stringify(value));
});

// Wallet and mint stores
export const wallet = writable<CashuWallet>();
export const mint = writable<Mint>();

// Application state
export const step = writable<number>(1);
export const selectedDenomination = writable<number>(1);
export const selectedNumberOfNotes = writable<number>(1);
export const donation = writable<number>(0);
export const preparedTokens = writable<Token[]>([]);
export const currentQuote = writable<MintQuoteResponse>();

/**
 * Create a store for discovered mints with review tracking
 */
const createDiscoveredMintsStore = () => {
  const store = writable<DiscoveredMint[]>([]);

  const add = (url: string) => {
    store.update((mints) => {
      const existingMint = mints.find((m) => m.url === url);
      if (!existingMint) {
        mints = [...mints, { url, reviews: 1 }];
      } else {
        existingMint.reviews++;
      }
      mints.sort((a, b) => b.reviews - a.reviews);
      return mints;
    });
  };

  return { ...store, add };
};

/**
 * Create a store for discovered Nostr contacts
 */
const createDiscoveredContactsStore = () => {
  const store = writable<Contact[]>([]);

  const add = (npub: string, alias?: string, picture?: string) => {
    store.update((contacts) => [
      ...contacts,
      { npub, alias: alias ?? "", picture },
    ]);
  };

  return { ...store, add };
};

// Nostr-related stores
export const discoveredContacts = createDiscoveredContactsStore();
export const discoveredMints = createDiscoveredMintsStore();

export const pool = new SimplePool();
