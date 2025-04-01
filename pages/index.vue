<template>
  <div class="container">
    <h1>Scholarship Winners</h1>

    <!-- Show loading spinner -->
    <div v-if="loading" class="loading-overlay">
      <ProgressSpinner />
    </div>

    <!-- Show error message -->
    <p v-if="err && !loading" class="error">{{ err }}</p>

    <!-- Winners Table Component -->
    <WinnerTable v-if="!loading && !err" :winners="winners" />

    <!-- Pagination Controls -->
    <div class="card">
      <Paginator :rows="limit" :totalRecords="totalRecords" :rowsPerPageOptions="[5, 10, 20, 30]"
        :first="(currentPage - 1) * limit" @page="onPageChange" @update:rows="onRowChange" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Winner, WinnersResponse } from "~/shared/types/winners";

const route = useRoute();
const router = useRouter();

const currentPage = ref<number>(Number(route.query.page) || 1);
const limit = ref<number>(Number(route.query.limit) || 5);

// Server-side data fetching
const { data, pending, error, refresh } = await useAsyncData<WinnersResponse>(
  `winners-${currentPage.value}-${limit.value}`,
  () => $fetch(`/api/winners?page=${currentPage.value}&limit=${limit.value}`),
  { server: true }
);

// Use computed properties to track state changes
const winners = computed<Winner[]>(() => data.value?.data ?? []);
const totalRecords = computed<number>(() => data.value?.meta?.pagination.total ?? 0);
const loading = computed<boolean>(() => pending.value);
const err = computed<string | null>(() => error.value ? "Failed to load winners." : null);

// Watch query changes
watch(() => [route.query.page, route.query.limit], async ([newPage, newLimit], [oldPage, oldLimit]): Promise<void> => {
  if (newPage !== oldPage || newLimit !== oldLimit) {
    currentPage.value = Number(newPage) || 1;
    limit.value = Number(newLimit) || 5;
    await refresh();
  }
});

// Pagination handlers
const onPageChange = (event: { page: number; rows: number }): void => {
  currentPage.value = event.page + 1;
  limit.value = event.rows;
  router.push({ query: { page: String(currentPage.value), limit: String(limit.value) } });
};

const onRowChange = (rows: number): void => {
  limit.value = rows;
  router.push({ query: { page: String(currentPage.value), limit: String(limit.value) } });
};
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: auto;
  text-align: center;
}

.error {
  color: red;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}
</style>
