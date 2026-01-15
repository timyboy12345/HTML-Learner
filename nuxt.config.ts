// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: true},
    modules: ['@nuxt/eslint', '@nuxt/fonts', '@nuxt/icon', '@nuxtjs/tailwindcss', 'nuxt-directus'],

    // Directus configuration
    runtimeConfig: {
        public: {
            url: process.env.DIRECTUS_URL || 'https://your-directus-instance.com'
        }
    }
})