import type { Proof, Token } from '@cashu/cashu-ts';

import { writable } from 'svelte/store';

export type Print = {
    tokens: Token[]
    mint: string
    ts: number
}

const initialValueSting: string = window.localStorage.getItem('prints') ?? '[]'

const initialValue: Array<Print> = JSON.parse(initialValueSting);

const prints = writable<Array<Print>>(initialValue);

prints.subscribe((value) => {
		window.localStorage.setItem('prints', JSON.stringify(value));
});

export { prints };
