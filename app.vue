<template>
  <div>
    <NuxtRouteAnnouncer />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useFetch } from '#app/composables/fetch';

import type { Winner } from "~/types/winners";

const winners = ref<Winner[]>([]);
const limit = ref<number>(5);
const loading = ref<boolean>(true);
const error = ref<string | null>(null);

const fetchWinners = async (): Promise<void> => {
  loading.value = true;
  try {
    const { data } = await useFetch<Winner[]>(`/api/winners?limit=${limit.value}`);
    winners.value = data.value ?? [];

    console.log('response', winners.value);
  } catch (err) {
    error.value = "Failed to load winners.";
  } finally {
    loading.value = false;
  }
};

watch(limit, fetchWinners, { immediate: true });

</script>
