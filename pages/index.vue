<template>
  <!-- Show loading spinner on fresh page load -->
  <div v-if="isFreshLoad" class="loading-overlay">
    <ClientOnly>
      <ProgressSpinner />
    </ClientOnly>
  </div>

  <div v-if="!isFreshLoad">
    <h1>Scholarship Winners</h1>

    <!-- Show error message -->
    <p v-if="err && !loading" class="error">{{ err }}</p>

    <!-- Winners Table Component -->
    <WinnerTable v-if="!err && winners.length > 0" :winners="winners" :tableLoading="loading" />

    <p v-if="!err && winners.length < 1">No scholarship winners found.</p>

    <!-- Pagination Controls -->
    <Paginator :rows="limit" :totalRecords="totalRecords" :rowsPerPageOptions="[5, 10, 20, 30]"
      :first="(currentPage - 1) * limit" @page="onPageChange" @update:rows="onRowChange" />
  </div>
</template>

<script setup lang="ts">
import type { Winner, WinnersResponse } from "~/shared/types/winners";

useHead({
  title: "Scholarship Winners | ScholarshipOwl",
  meta: [{ name: "description", content: "List of winners from ScholarshipOwl." }]
});

const route = useRoute();
const router = useRouter();

const currentPage = ref<number>(Number(route.query.page) || 1);
const limit = ref<number>(Number(route.query.limit) || 5);
const isFreshLoad = ref(true);

// Server-side data fetching
const { data, pending, error } = await useWinnersRepo().getWinners(currentPage, limit);

// Use computed properties to track state changes
const winners = computed<Winner[]>(() => data.value?.data ?? []);
const totalRecords = computed<number>(() => data.value?.meta?.pagination?.total ?? 0);
const loading = computed<boolean>(() => pending.value);
const err = computed<string | null>(() => error.value ? "Failed to load winners." : null);

onMounted(() => {
  isFreshLoad.value = false;
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
