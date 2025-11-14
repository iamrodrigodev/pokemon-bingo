<template>
  <div class="box" style="display: inline-block">
    <div
      v-for="i in dimensions[0]"
      :key="i"
      :style="`display: flex; margin: 0 auto; width: ${size * dimensions[1] + dimensions[1] * 5}px`"
    >
      <game-cell
        v-for="n in dimensions[1]"
        :key="n"
        :style="`margin: 5px; background: #eee; width: ${size}px; height: ${size}px`"
        :index="n + (i - 1) * dimensions[0]"
        :n="n"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import GameCell from '@/components/GameCell.vue';
import { ref } from 'vue';
import type { Ref } from 'vue';

const dimensions: Ref<[number, number]> = ref([4, 4]);
const size: Ref<number> = ref(160);
</script>
