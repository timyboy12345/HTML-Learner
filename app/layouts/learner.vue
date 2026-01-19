<template>
  <div class="flex flex-row w-full h-screen color-gray-900">
    <div class="w-[250px] min-w-[250px] relative bg-white border-r border-gray-200 p-2 flex flex-col justify-between">
      <div>
        <div class="w-full bg-orange-600 h-1 absolute left-0 top-0"></div>
        <NuxtLink href="/learner" class="font-[IBM_Plex_Mono] text-2xl mb-2 font-bold hover:opacity-90 transition duration-100">
          Learner
        </NuxtLink>

        <div class="flex flex-col text-gray-800 mt-4 rounded border border-gray-200 divide-y divide-gray-200">
          <NuxtLink
              :href="`/learner/${c.slug}`"
              v-for="c in content.courses" :key="c.name"
              class="first:[&>.bar]:rounded-tl last:[&>.bar]:rounded-bl relative px-2 py-1 pl-3 hover:bg-gray-100 transition duration-100"
          >
            <div class="w-1 h-[100%] absolute left-0 top-0 bar transition duration-100" :class="{'bg-orange-600': route.params.theme_slug == c.slug}"/>
            <div>{{ c.name }}</div>
            <div class="text-sm opacity-60">{{ (c.subCourses ?? []).length }} onderwerpen</div>
          </NuxtLink>
        </div>
      </div>

      <div>
        <div class="opacity-60 text-sm">Welkom {{ user.first_name }}</div>
        <NuxtLink href="/learner/account">Jouw Account</NuxtLink>
      </div>
    </div>

    <div class="flex-grow">
      <slot/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useContentStore} from "~/store/contentStore";

const user = useDirectusUser();
const route = useRoute();
const content = useContentStore();
</script>

<style>
body {
  font-family: 'Lato', sans-serif;
}
</style>
