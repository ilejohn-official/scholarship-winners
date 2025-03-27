<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useFetch } from '#app/composables/fetch';

import * as Winner from "../server/types/winners";

const winners = ref<Winner[]>([]);
const limit = ref(5);
const loading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    const { data } = await useFetch(`/api/winners?limit=${limit.value}`);
    winners.value = data.value.data || [];

    console.log('response', winners.value);
  } catch (err) {
    error.value = "Failed to load winners.";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
  </div>
</template>
