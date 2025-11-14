<template>
  <div
    style="
      display: flex;
      align-content: center;
      justify-content: center;
      flex-wrap: wrap;
      cursor: pointer;
    "
    :class="{ isSelected }"
    @click="store?.toggleCell(index)"
  >
    <img
      v-if="pokemon"
      :src="imgUrl"
      style="max-width: 70%; max-height: 70%; margin: 0 auto; display: block"
      :alt="pokemon.name"
    />
    <div v-if="pokemon" style="width: 100%; margin-top: 5px; text-transform: capitalize">
      {{ pokemon.name }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, inject } from 'vue';
import { storeKey } from '@/store';
import type { Store, Pokemon } from '@/store';

const props = defineProps<{
  index: number;
  n: number;
}>();

const store = inject(storeKey) as Store;

const pokemon = computed<Pokemon | null>(() => {
  if (!store?.state.shuffledPokemon) return null;
  return store.state.shuffledPokemon[props.index];
});

const imgUrl = computed<string>(() => {
  if (!pokemon.value) return '';
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.value.id}.svg`;
});

const isSelected = computed<boolean>(() => {
  return store?.state.selected.includes(props.index) ?? false;
});
</script>
<style>
.isSelected {
  background: #73b7ff !important;
}
</style>
