/**
 * Wallet Store
 * Manages Cashu wallet state using Svelte 5 runes
 */

import { writable } from 'svelte/store';
import type { WalletState } from '@/types/cashu';

const initialState: WalletState = {
  wallet: null,
  mint: null,
  isConnecting: false,
  error: null,
};

function createWalletStore() {
  const { subscribe, set, update } = writable<WalletState>(initialState);

  return {
    subscribe,

    setWallet: (wallet: WalletState['wallet']) =>
      update(state => ({ ...state, wallet, error: null })),

    setMint: (mint: WalletState['mint']) =>
      update(state => ({ ...state, mint, error: null })),

    setConnecting: (isConnecting: boolean) =>
      update(state => ({ ...state, isConnecting })),

    setError: (error: Error | null) =>
      update(state => ({ ...state, error, isConnecting: false })),

    reset: () => set(initialState),
  };
}

export const walletStore = createWalletStore();
