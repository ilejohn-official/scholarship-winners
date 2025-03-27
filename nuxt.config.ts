// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: true, // Enables Server-Side Rendering
  typescript: {
    strict: true,
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: "https://scholarshipowl.com/jsonapi",
    },
  },
})
