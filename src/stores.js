import { writable } from 'svelte/store';
import * as json from './elements.json';

export const elements = writable(json.elements);
export const correctPoints = writable(0);
export const totalPoints = writable(0);
export const status = writable("");
export const mode = writable("guessSymbol");
export const guessedElements = writable([]); // [{name: "Seaborgium", symbol: "sg", number: "106", atomic_mass: "269", category: "transition metals"}]