import { defineNuxtPlugin } from '#app';
import PrimeVue from 'primevue/config';
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ProgressSpinner from "primevue/progressspinner";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, {
    ripple: true, // Enable ripple effect globally
    inputStyle: 'outlined', // Default input style
  });
  nuxtApp.vueApp.component("DataTable", DataTable);
  nuxtApp.vueApp.component("Column", Column);
  nuxtApp.vueApp.component("ProgressSpinner", ProgressSpinner);
});
