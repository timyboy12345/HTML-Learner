<template>
  <div>
    <div class="w-full border-b border-gray-200 py-2 px-4 font-[IBM_Plex_Mono] text-2xl">
      Home
    </div>

    <div class="grid gap-4 m-4">
      <card title="Jouw Voortgang">
        <div class="flex flex-col -m-4 divide-y divide-gray-200">
          <NuxtLink
              v-for="(m, i) in content.modules"
              :key="i"
              :href="`/learner/${m.slug}`"
              class="px-4 py-2 relative flex flex-col hover:bg-gray-100 transition-all duration-100"
          >
            <div class="flex flex-row items-center">
              <Icon class="text-gray-400 mr-1.5" name="material-symbols:lock-open-rounded"></Icon>
              {{ m.name }}
            </div>
            <div class="text-sm text-gray-600">{{ m.description }}</div>
          </NuxtLink>
        </div>
      </card>

      <card title="Hoe werkt het?">
        <p>Kies hierboven de module die je wilt volgen</p>
        <p>Test</p>
      </card>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useContentStore} from "~/store/contentStore";

definePageMeta({middleware: ["auth"], layout: "learner"})

const content = useContentStore();
</script>
