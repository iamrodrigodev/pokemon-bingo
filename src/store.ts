import { reactive } from 'vue';
import type { InjectionKey } from 'vue';
import { Pokedex } from 'pokeapi-js-wrapper';

// Interfaces for type safety
interface Pokemon {
  name: string;
  url: string;
  id: number;
}

interface StoreState {
  called: number[];
  readonly calledPokemon: Pokemon[];
  allPokemon: Pokemon[] | null;
  shuffledPokemon: Pokemon[] | null;
  selected: number[];
}

interface StoreActions {
  init(): Promise<void>;
  shuffle(): void;
  toggleCell(index: number): void;
  call(): void;
}

export interface Store {
  readonly state: StoreState;
  init(): Promise<void>;
  shuffle(): void;
  toggleCell(index: number): void;
  call(): void;
}

const state = reactive<StoreState>({
  called: [],
  get calledPokemon(): Pokemon[] {
    if (!this.shuffledPokemon) return [];
    const called: Pokemon[] = [];
    this.called.forEach((index: number) => {
      if (this.shuffledPokemon) {
        called.push(this.shuffledPokemon[index]);
      }
    });
    return called;
  },
  allPokemon: null,
  shuffledPokemon: null,
  selected: [],
});

const Pokedex_instance: Pokedex = new Pokedex();

const actions: StoreActions = {
  async init(): Promise<void> {
    const limit = 151;
    const offset = 0;
    const pokemonList = (
      await Pokedex_instance.getPokemonsList({
        limit,
        offset,
      })
    ).results;
    state.allPokemon = pokemonList.map(
      (pokemon: { name: string; url: string }, index: number): Pokemon => {
        return { ...pokemon, id: index + 1 };
      }
    );
    this.shuffle();
  },

  shuffle(): void {
    if (state.allPokemon) {
      const cloned: Pokemon[] = [...state.allPokemon];
      state.shuffledPokemon = shuffle(cloned);
    }
  },

  toggleCell(index: number): void {
    if (state.selected.includes(index)) {
      state.selected = state.selected.filter((i: number) => i !== index);
    } else {
      state.selected.push(index);
    }
  },

  call(): void {
    if (state.shuffledPokemon) {
      const randomOne = randomNumber(0, state.shuffledPokemon.length - 1);
      if (state.called.includes(randomOne)) {
        this.call();
      } else {
        state.called.push(randomOne);
      }
    }
  },
};

function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length;
  let temporaryValue: T;
  let randomIndex: number;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

export const store: Store = {
  state: state,
  ...actions,
};

export const storeKey: InjectionKey<Store> = Symbol('store');
export type { Pokemon };
