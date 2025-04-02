import PrimeVue from 'primevue/config';
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Image from "primevue/image";
import Paginator from "primevue/paginator";
import ProgressSpinner from "primevue/progressspinner";
import Aura from '@primeuix/themes/aura';
import Skeleton from 'primevue/skeleton';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, {
    ripple: true,
    inputStyle: 'outlined',
    theme: {
      preset: Aura,
      options: {
        prefix: 'p',
        darkModeSelector: false,
        cssLayer: false
      }
    }
  });
  nuxtApp.vueApp.component("DataTable", DataTable);
  nuxtApp.vueApp.component("Column", Column);
  nuxtApp.vueApp.component("Image", Image);
  nuxtApp.vueApp.component("Paginator", Paginator);
  nuxtApp.vueApp.component("ProgressSpinner", ProgressSpinner);
  nuxtApp.vueApp.component("Skeleton", Skeleton)
});
