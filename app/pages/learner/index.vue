<template>
  <div>
    <div class="w-full border-b border-gray-200 py-2 px-4 font-[IBM_Plex_Mono] text-2xl">
      Home
    </div>

    <div class="grid gap-4 m-4">
      <card title="Jouw Voortgang">
        <div class="flex flex-col">
          <NuxtLink
              v-for="(m, i) in content.modules"
              :key="i"
              :href="`/learner/${m.slug}`"
              class="flex flex-row flex-grow items-start group transition-all duration-100"
          >
            <div class="flex flex-col items-center">
              <div class="size-8 rounded-full group-hover:bg-orange-700 transition duration-100 bg-orange-600"/>
              <div v-if="i !== content.modules.length - 1" class="bg-gray-200 my-2 h-6 w-1 rounded-full flex-grow"/>
            </div>

            <div class="ml-2 group-hover:border-gray-200 border-1 border-transparent rounded py-1 px-2">{{ m.name }}</div>
          </NuxtLink>
        </div>
      </card>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useContentStore} from "~/store/contentStore";

definePageMeta({middleware: ["auth"], layout: "learner"})

const content = useContentStore();
</script>
