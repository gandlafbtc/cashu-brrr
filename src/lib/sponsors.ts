export type Sponsor = {
  name: string;
  link: string;
  imageLink: string;
  tier: "GOLD" | "SILVER" | "BRONZE";
  amount: string;
};

export const SPONSORS: Sponsor[] = [
  {
    name: "Marius",
    link: "https://njump.me/npub18kmu5s4gaq7qf02je6pk4xqckm5s2t5782596gkzk0r3tufpl9hs3gxwnr",
    tier: "SILVER",
    imageLink: "https://i.nostr.build/kYAs8I4cZJgKt1fV.jpg",
    amount: "100K",
  },
  {
    name: "⚡ats 'N' Fact⚡",
    link: "https://geyser.fund/project/satsnfacts",
    tier: "SILVER",
    imageLink: "https://image.nostr.build/2a0ee43dca043f29a4c03a1c83bebebd07dfa6678cc6fba31e239db2f3ad2143.png",
    amount: "100K"
}]
