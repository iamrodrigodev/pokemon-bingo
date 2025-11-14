declare module 'pokeapi-js-wrapper' {
  export class Pokedex {
    getPokemonsList(options: { limit: number; offset: number }): Promise<{
      results: Array<{ name: string; url: string }>;
    }>;
  }
}
