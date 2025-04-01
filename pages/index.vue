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

// const loading = ref<boolean>(true);
// const winners = ref<Winner[]>([]);
// const limit = ref<number>(Number(route.query.limit) || 5);
// const totalRecords = ref<number>(0);
// const currentPage = ref<number>(Number(route.query.page) || 1);
// const err = ref<string | null>(null);

// const { data, pending, status, error, refresh } = await useAsyncData<WinnersResponse>(
//   `winners-${currentPage.value}-${limit.value}`, async () => {
//     //loading.value = true;
//     return await $fetch(`/api/winners?page=${currentPage.value}&limit=${limit.value}`
//     );
//   },
//   {
//     watch: [limit, currentPage], immediate: true
//   });

// loading.value = pending.value;

// if (status.value == "success") {
//   setPage();
// }

// if (status.value == "error") {
//   err.value = "Failed to load winners.";
//   console.log('error', error.value);
// }

// watch(pending, (newPending) => {
//   loading.value = newPending;
//   setPage();
// });

// const onPageChange = (event: { page: number, rows: number }) => {
//   currentPage.value = event.page + 1;
//   limit.value = event.rows;

//   router.push({ query: { page: currentPage.value, limit: limit.value } });
// };

// const onRowChange = (event: number) => {
//   limit.value = event;

//   router.push({ query: { page: currentPage.value, limit: limit.value } });
// };

// function setPage() {
//   winners.value = data.value?.data ?? [];
//   totalRecords.value = data.value?.meta?.pagination.total ?? 0;
// }

// const fetchData = async () => {
//   loading.value = true;

//   const { data, pending, status, error } = await useAsyncData<WinnersResponse>(
//     `winners-${currentPage.value}-${limit.value}`, async () => {
//       return await $fetch(`/api/winners?page=${currentPage.value}&limit=${limit.value}`);
//     }
//   );

//   loading.value = pending.value;

//   if (status.value == "success") {
//     winners.value = data.value?.data ?? [];
//     totalRecords.value = data.value?.meta?.pagination.total ?? 0;
//   }

//   if (status.value == "error") {
//     err.value = "Failed to load winners.";
//     console.log('error', error.value);
//   }
// };

// // Initial data fetch
// await fetchData();

// // Watch for changes in the route query parameters
// watch(
//   () => route.query,
//   async (newQuery) => await fetchData(), // Re-fetch data when route query changes
//   { deep: true } // Watch deeply for changes within the query object
// );

// const onPageChange = (event: { page: number, rows: number }) => {
//   currentPage.value = event.page + 1;
//   limit.value = event.rows;

//   router.push({ query: { page: currentPage.value, limit: limit.value } });
// };

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
  max-width: 800px;
  margin: auto;
  text-align: center;
  position: relative;
}

.error {
  color: red;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background-color: rgba(255, 255, 255, 0.8); */
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}
</style>
