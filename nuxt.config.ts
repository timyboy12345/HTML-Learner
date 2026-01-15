// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: true},
    modules: ['@nuxt/eslint', '@nuxt/fonts', '@nuxt/icon', 'nuxt-directus'],

    // Directus configuration
    runtimeConfig: {
        public: {
            url: 'https://your-directus-instance.com OR NUXT_PUBLIC_DIRECTUS_URL'
        }
    },

    vite: {
        plugins: [tailwindcss()],
    },
    css: ["./app/tailwind.css"],
})
