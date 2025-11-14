<template>
  <div class="admin" style="margin: 0 auto; margin-top: 30px; max-width: 900px">
    <button @click="store?.call()">
      {{ lastCalled ? "Next Pokemon" : "Start Game" }}
    </button>

    <div
      class="box"
      style="
        display: flex;
        max-width: 1200px;
        margin: 30px auto;
        justify-content: center;
      "
    >
      <div class="next-up" style="width: 70%; font-size: 2.5rem">
        <div v-if="lastCalled">
          <h1 style="text-transform: capitalize; margin: 0">
            {{ lastCalled.name }}
          </h1>
          <img
            :src="
              `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${lastCalled.id}.svg`
            "
            :alt="lastCalled.name"
            style="height: 375px; max-width: 100%"
          />
        </div>
      </div>

      <div
        class="running-list"
        style="
          height: 550px;
          overflow: auto;
          background: #eee;
          margin-left: 30px;
          width: 300px;
        "
      >
        <input
          type="text"
          v-model="search"
          placeholder="Search"
          style="
            font-size: 1rem;
            display: block;
            padding: 10px;
            width: calc(100% - 4px);
            margin: 2px;
          "
        />
        <ul style="margin: 0 auto; padding: 20px; list-style: none">
          <li v-if="!filtered.length">No pokemon called yet</li>
          <li
            v-for="pokemon in filtered"
            :key="pokemon.id"
            style="display: flex; align-items: center; margin-bottom: 20px"
          >
            <img
              :src="
                `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`
              "
              :alt="pokemon.name"
              width="60"
            />
            <span
              style="
                display: inline-block;
                margin-left: 10px;
                text-transform: capitalize;
              "
            >
              {{ pokemon.name }}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject } from "vue";
import { storeKey, type Store } from "@/store";

const search = ref<string | null>(null);
const store = inject(storeKey) as Store;

const reversed = computed(() => {
  if (!store) return [];
  const clone = [...store.state.calledPokemon];
  return clone.reverse();
});

const filtered = computed(() => {
  if (!search.value) return reversed.value;
  return reversed.value.filter(pokemon =>
    pokemon.name.includes(search.value?.toLowerCase() ?? "")
  );
});

const lastCalled = computed(() => {
  if (!store) return null;
  const called = store.state.calledPokemon;
  if (!called || called.length === 0) return null;
  return called[called.length - 1];
});
</script>

<style>
button {
  padding: 10px;
  font-size: 1.5rem;
  color: #3c68ac;
  background: #f8cc46;
  border: 3px solid #3c68ac;
  border-radius: 5px;
  text-transform: uppercase;
  font-weight: bold;
  cursor: pointer;
}
</style>
