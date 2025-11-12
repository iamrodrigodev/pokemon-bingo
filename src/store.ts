import { reactive, readonly } from "vue";
import type { InjectionKey } from "vue";
const pokeapi = require("pokeapi-js-wrapper");

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

const state = reactive<StoreState>({
  called: [],
  get calledPokemon() {
    if (!this.shuffledPokemon) return [];
    const called: Pokemon[] = [];
    this.called.forEach(index => {
      if (this.shuffledPokemon) {
        called.push(this.shuffledPokemon[index]);
      }
    });
    return called;
  },
  allPokemon: null,
  shuffledPokemon: null,
  selected: []
});

const Pokedex = new pokeapi.Pokedex();

const actions = {
  async init() {
    const limit = 50;
    const offset = 0;
    const pokemonList = (
      await Pokedex.getPokemonsList({
        limit,
        offset
      })
    ).results;
    state.allPokemon = pokemonList.map((pokemon: { name: string; url: string }, index: number) => {
      return { ...pokemon, id: index + 1 };
    });
    this.shuffle();
  },

  shuffle() {
    if (state.allPokemon) {
      const cloned = [...state.allPokemon];
      state.shuffledPokemon = shuffle(cloned);
    }
  },

  toggleCell(index: number) {
    if (state.selected.includes(index)) {
      state.selected = state.selected.filter(i => i != index);
    } else {
      state.selected.push(index);
    }
  },

  call() {
    if (state.shuffledPokemon) {
      const randomOne = randomNumber(0, state.shuffledPokemon.length - 1);
      if (state.called.includes(randomOne)) {
        this.call();
      } else {
        state.called.push(randomOne);
      }
    }
  }
};

function shuffle<T>(array: T[]): T[] {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

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

export const store = {
  state: readonly(state),
  ...actions
};

export const storeKey: InjectionKey<typeof store> = Symbol("store");
