<template>
  <DataTable :value="winners" class="p-datatable-striped">
    <!-- Winner Photo -->
    <Column header="Photo">
      <template #body="{ data }">
        <Skeleton v-if="tableLoading" width="50px" height="50px" borderRadius="50%" />
        <Image v-else :src="data.attributes.winnerPhoto" alt="Winner Photo" width="50" height="50" borderRadius="50%"
          preview />
      </template>
    </Column>

    <!-- Winner Name -->
    <Column field="attributes.winnerName" header="Winner Name">
      <template #body="{ data }">
        <Skeleton v-if="tableLoading" width="100px" />
        <span v-else>{{ data.attributes.winnerName }}</span>
      </template>
    </Column>

    <!-- Scholarship Title -->
    <Column field="attributes.scholarshipTitle" header="Scholarship Title">
      <template #body="{ data }">
        <Skeleton v-if="tableLoading" width="150px" />
        <span v-else>{{ data.attributes.scholarshipTitle }}</span>
      </template>
    </Column>

    <!-- Amount Won -->
    <Column field="attributes.amountWon" header="Amount Won">
      <template #body="{ data }">
        <Skeleton v-if="tableLoading" width="80px" />
        <span v-else>${{ data.attributes.amountWon.toLocaleString() }}</span>
      </template>
    </Column>

    <!-- Date Won -->
    <Column field="attributes.wonAt" header="Date Won">
      <template #body="{ data }">
        <Skeleton v-if="tableLoading" width="100px" />
        <span v-else>{{ formatDate(data.attributes.wonAt) }}</span>
      </template>
    </Column>
  </DataTable>
</template>

<script setup lang="ts">
import type { Winner } from "~/shared/types/winners";

defineProps<{ winners: Winner[]; tableLoading: boolean }>();
</script>

<style scoped>
.p-datatable-striped {
  width: 100%;
}
</style>
