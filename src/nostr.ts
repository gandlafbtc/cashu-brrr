import {
  type Event,
  type Filter,
  finalizeEvent,
  generateSecretKey,
  getPublicKey,
  nip04,
  nip19,
  type UnsignedEvent,
} from "nostr-tools";
import { EncryptedDirectMessage } from "nostr-tools/kinds";
import { discoveredContacts, pool } from "@/state/stores/printing.svelte";
export const sendViaNostr = async (toPub: string, message: string) => {
  const sk = generateSecretKey();
  const pk = getPublicKey(sk);
  const event: UnsignedEvent = {
    kind: EncryptedDirectMessage,
    //@ts-ignore
    tags: [["p", toPub]],
    content: await nip04.encrypt(sk, toPub, message),
    created_at: Math.floor(Date.now() / 1000),
    pubkey: pk,
  };
  const signedEvent = finalizeEvent(event, sk);
  pool.publish(DEFAULT_RELAYS, signedEvent);
};

export const DEFAULT_RELAYS = [
  "wss://relay.damus.io",
  "wss://relay.primal.net",
];
export const NUTSTASH_PUBKEY =
  "ca1d8486abd03d6e91aa042cb856a7da0da95e7b68180b22337aea2cd2ed0469";

export const discoverContacts = async (npub: string) => {
  discoveredContacts.set([]);
  const filter: Filter = {
    kinds: [3],
    limit: 1000,
    authors: [nip19.decode(npub).data as string],
  };
  const sub = pool.subscribeMany(DEFAULT_RELAYS, [filter], {
    onevent: (event: Event) => {
      const contacts = [];
      for (const tag of event.tags) {
        if (tag[0] !== "p") {
          continue;
        }
        contacts.push(tag[1]);
      }
      sub.close();
      discoverContactsDetails(contacts);
    },
  });
};

const discoverContactsDetails = async (contacts: string[]) => {
  const filter: Filter = { kinds: [0], limit: 1000, authors: contacts };
  pool.subscribeMany(DEFAULT_RELAYS, [filter], {
    onevent: (event: Event) => {
      const content = JSON.parse(event.content);
      discoveredContacts.add(
        nip19.npubEncode(event.pubkey),
        content.name,
        content.picture,
      );
    },
  });
};
