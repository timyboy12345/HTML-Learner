<template>
  <div v-if="content.courseSlugExists(route.params.theme_slug)">
    <div class="w-full border-b border-gray-200 py-2 px-4 font-[IBM_Plex_Mono] text-2xl">
      Cursus: {{ course?.name }}
    </div>

    <div class="p-4">
      <card title="Jouw Voortgang">
        <div class="flex flex-col divide-y divide-gray-200 -m-4">
          <NuxtLink
              v-for="(c, i) in course?.subCourses"
              :key="c.slug"
              :href="`/learner/${course?.slug}/${c.slug}`"
              class="flex flex-row items-center py-2 px-4 hover:bg-gray-100 transition duration-100">
            <div
                class="size-2 rounded mr-2" :class="{
              'bg-gray-300': i > 2,
              'bg-orange-600': i <= 2
            }"/>
            <div>{{ c.name }}</div>
          </NuxtLink>
        </div>
      </card>
    </div>
  </div>

  <div v-else>
    <div class="w-full border-b border-gray-200 py-2 px-4 font-[IBM_Plex_Mono] text-2xl">
      Cursus niet gevonden
    </div>

    <p class="p-4">
      Deze cursus bestaat niet, check of de URL correct is.
    </p>
  </div>
</template>

<script setup lang="ts">
import {useContentStore} from "~/store/contentStore";

definePageMeta({middleware: ["auth"], layout: "learner"})
const content = useContentStore();

const route = useRoute();
const course = computed(() => content.getCourseBySlug(route.params.theme_slug));
</script>
