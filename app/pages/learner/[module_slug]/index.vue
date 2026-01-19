<template>
  <div v-if="module">
    <div class="w-full border-b border-gray-200 py-2 px-4 font-[IBM_Plex_Mono] text-2xl">
      Module: {{ module.name }}
    </div>

    <div class="p-4">
      <card title="Jouw Voortgang van deze module">
        <div v-if="module.courses && module.courses.length > 0" class="flex flex-col divide-y divide-gray-200 -m-4">
          <NuxtLink
              v-for="(c, i) in module.courses"
              :key="c.slug"
              :href="`/learner/${module.slug}/${c.slug}`"
              class="flex flex-row items-center py-2 px-4 hover:bg-gray-100 transition duration-100">
            <div
                class="size-2 rounded mr-2" :class="{
              'bg-gray-300': i > 2,
              'bg-orange-600': i <= 2
            }"/>
            <div>{{ c.name }}</div>
          </NuxtLink>
        </div>

        <div v-if="module.courses.length === 0">
          Er zijn cursussen aan deze module gekoppeld.
        </div>
      </card>
    </div>
  </div>

  <div v-else>
    <div class="w-full border-b border-gray-200 py-2 px-4 font-[IBM_Plex_Mono] text-2xl">
      Module niet gevonden
    </div>

    <p class="p-4">
      Deze module bestaat niet, check of de URL correct is.
    </p>
  </div>
</template>

<script setup lang="ts">
import {useContentStore} from "~/store/contentStore";

definePageMeta({middleware: ["auth"], layout: "learner"})
const content = useContentStore();

const route = useRoute();
const module = computed(() => content.getModuleBySlug(route.params.module_slug));
</script>
