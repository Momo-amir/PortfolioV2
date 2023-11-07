export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ["nuxt3-leaflet"],

  runtimeConfig: {
    GARCHI_APIURL: "https://garchi.co.uk/api/v2",
    SPACE_UID:
      "#78d344c1-6062-4ed1-815d-18432565a46cb7afdf3c-8dbd-4253-bf35-c55c",
    GARCHI_APIKEY: "112|3LeoU5krxjJgdvVJXAiVvNdydejNbE1zwuDTEqXza065ebef",
  },
});
