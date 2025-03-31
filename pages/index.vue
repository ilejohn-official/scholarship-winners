<template>
  <ul v-for="winner in winners" :key="winner.id">
    <img :src="winner.attributes.winnerPhoto" alt="">
    <li>{{ winner.attributes.winnerName }}</li>
  </ul>
</template>

<script setup lang="ts">
import type { Winner, WinnersResponse } from "~/shared/types/winners";

const winners = ref<Winner[]>([]);
const limit = ref<number>(5);
const loading = ref<boolean>(true);
const err = ref<string | null>(null);

const { data, status, error } = await useAsyncData<WinnersResponse>('winners', async () => {
  return await $fetch(`/api/winners?limit=${limit.value}`);
}, {
  watch: [limit]
});

if (status.value == "success") {
  winners.value = data.value?.data ?? [];
  console.log('response', winners.value);
}

if (status.value == "error") {
  err.value = "Failed to load winners.";
  console.log('error', error.value);
}

loading.value = false;
</script>
