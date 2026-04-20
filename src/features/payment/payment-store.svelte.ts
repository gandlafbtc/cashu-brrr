/**
 * Payment Store
 * 
 * State management for payment flow.
 */

import type { Proof } from '@cashu/cashu-ts';

interface PaymentState {
  invoice: string | null;
  isPaid: boolean;
  proofs: Proof[];
  isProcessing: boolean;
  error: string | null;
}

class PaymentStore {
  private state = $state<PaymentState>({
    invoice: null,
    isPaid: false,
    proofs: [],
    isProcessing: false,
    error: null,
  });

  // Getters
  get invoice() {
    return this.state.invoice;
  }

  get isPaid() {
    return this.state.isPaid;
  }

  get proofs() {
    return this.state.proofs;
  }

  get isProcessing() {
    return this.state.isProcessing;
  }

  get error() {
    return this.state.error;
  }

  // Setters
  setInvoice(invoice: string): void {
    this.state.invoice = invoice;
    this.state.isPaid = false;
  }

  setProofs(proofs: Proof[]): void {
    this.state.proofs = proofs;
    this.state.isPaid = true;
  }

  setProcessing(isProcessing: boolean): void {
    this.state.isProcessing = isProcessing;
  }

  setError(error: string | null): void {
    this.state.error = error;
  }

  reset(): void {
    this.state.invoice = null;
    this.state.isPaid = false;
    this.state.proofs = [];
    this.state.isProcessing = false;
    this.state.error = null;
  }
}

// Export singleton instance
export const paymentStore = new PaymentStore();
