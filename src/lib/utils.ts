import {
  CashuMint,
  CashuWallet,
  type GetInfoResponse,
  type MintActiveKeys,
  type MintAllKeysets,
  type OutputAmounts,
  type Proof,
} from "@cashu/cashu-ts";
import {
  selectedDenomination,
  selectedNumberOfNotes,
  wallet,
} from "./stores.svelte";
import { get } from "svelte/store";
import { toast } from "svelte-sonner";

export const getAmountForTokenSet = (tokens: Array<Proof>): number => {
  return tokens.reduce((acc, t) => {
    return acc + t.amount;
  }, 0);
};

export const formatAmount = (amount: number, unit?: string): string => {
  if (!unit) {
    unit = "sat";
  }
  if (unit === "sat") {
    return formatSats(amount);
  }
  if (unit === "msat") {
    return formatMSats(amount);
  } else {
    return formatFiat(amount, unit);
  }
};

const formatSats = (amount: number): string => {
  return "₿ " + new Intl.NumberFormat("en-US").format(amount) + " sat";
};

const formatMSats = (amount: number): string => {
  return (
    "₿ " +
    new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    }).format(amount / 1000) +
    " sat"
  );
};

export const getUnitSymbol = (unit: string, isLong = true): string => {
  switch (unit) {
    case "sat":
      return "₿" + (isLong ? " (sat)" : "");
    case "msat":
      return "₿" + (isLong ? " (msat)" : "");
    case "btc":
      return "₿" + (isLong ? " (btc)" : "");
    case "usd":
      return "$" + (isLong ? " (usd)" : "");
    case "eur":
      return "€" + (isLong ? " (eur)" : "");
    case "gbp":
      return "£" + (isLong ? " (gbp)" : "");
    case "jpy":
      return "¥" + (isLong ? " (jpy)" : "");
    case "krw":
      return "₩" + (isLong ? " (krw)" : "");
    default:
      return unit;
  }
};
const formatFiat = (amount: number, unit?: string): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    currency: unit?.toUpperCase(),
  }).format(amount / 100);
};

export type Mint = {
  url: string;
  keys: MintActiveKeys;
  keysets: MintAllKeysets;
  info: GetInfoResponse;
};

export const loadMint = async (mintUrl: string): Promise<Mint> => {
  try {
    const cashuMint = new CashuMint(mintUrl);
    const mintInfo = await cashuMint.getInfo();
    const mintAllKeysets = await cashuMint.getKeySets();
    const mintActiveKeys: MintActiveKeys = await cashuMint.getKeys();
    const mint = {
      info: mintInfo,
      keys: mintActiveKeys,
      keysets: mintAllKeysets,
      url: mintUrl,
    };

    return mint;
  } catch (error) {
    throw new Error(`Could not load mint`, {
      cause: error,
    });
  }
};

export const getWalletWithUnit = async (
  mint: Mint,
  unit = "sat",
): Promise<CashuWallet> => {
  const keys = mint.keys.keysets.find((ks) => ks.unit);
  const keysets = mint.keysets.keysets.filter((ks) => ks.unit === unit);
  const wallet = new CashuWallet(new CashuMint(mint.url), {
    mintInfo: mint.info,
    unit: unit,
    keys,
    keysets,
  });
  await wallet.getKeys();
  return wallet;
};

export const createOutputAmounts = async (
  denomination: number,
  n: number,
  isMint = false,
) => {
  const outputAmount = await createOutputAmount(denomination);
  const outputAmounts: OutputAmounts = {
    sendAmounts: [],
    keepAmounts: [],
  };
  for (let i = 0; i < n; i++) {
    if (isMint) {
      //@ts-ignore
      outputAmounts.keepAmounts.push(...outputAmount);
    } else {
      outputAmounts.sendAmounts.push(...outputAmount);
    }
  }
  return outputAmounts;
};

export const createOutputAmount = async (denomination: number) => {
  const w = get(wallet);
  const keys = await w.getKeys();
  const availableAmounts: number[] = Object.keys(keys.keys)
    .map((k) => parseInt(k))
    .sort((a, b) => b - a);
  const constructedToken: number[] = [];

  for (const amount of availableAmounts) {
    const accumulated = constructedToken.reduce((acc, curr) => acc + curr, 0);
    if (accumulated + amount < denomination) {
      constructedToken.push(amount);
    } else if (accumulated + amount === denomination) {
      constructedToken.push(amount);
      return constructedToken;
    }
  }
  throw new Error(
    `Could not create amount ${denomination} from available amounts: ${availableAmounts.join(", ")}`,
  );
};

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

function fallbackCopyTextToClipboard(text: string) {
  var textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand("copy");
    if (successful) {
      toast.info("copied!");
    }
  } catch (err) {
    console.error("Fallback: Oops, unable to copy", err);
  }

  document.body.removeChild(textArea);
}
export function copyTextToClipboard(text: string) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(
    function () {
      toast.info("copied!");
    },
    function (err) {
      console.error("Async: Could not copy text: ", err);
    },
  );
}
