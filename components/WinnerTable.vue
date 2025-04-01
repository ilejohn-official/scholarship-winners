<template>
  <DataTable :value="winners" class="p-datatable-striped">
    <!-- Winner Photo -->
    <Column header="Photo">
      <template #body="{ data }">
        <Image :src="data.attributes.winnerPhoto" alt="Winner Photo" width="50" height="50" preview />
      </template>
    </Column>

    <!-- Winner Name -->
    <Column field="attributes.winnerName" header="Winner Name" />

    <!-- Scholarship Title -->
    <Column field="attributes.scholarshipTitle" header="Scholarship Title" />

    <!-- Amount Won -->
    <Column field="attributes.amountWon" header="Amount Won">
      <template #body="{ data }">
        ${{ data.attributes.amountWon.toLocaleString() }}
      </template>
    </Column>

    <!-- Date Won -->
    <Column field="attributes.wonAt" header="Date Won">
      <template #body="{ data }">
        {{ formatDate(data.attributes.wonAt) }}
      </template>
    </Column>
  </DataTable>
</template>

<script setup lang="ts">
import type { Winner } from "~/shared/types/winners";

defineProps<{ winners: Winner[]; }>();
</script>

<style scoped>
.p-datatable-striped {
  width: 100%;
}
</style>
