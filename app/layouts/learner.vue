<template>
  <div v-if="!pending" class="flex flex-row w-full h-screen color-gray-900">
    <div class="w-[250px] min-w-[250px] relative bg-white border-r border-gray-200 p-2 flex flex-col justify-between">
      <div>
        <div class="w-full bg-orange-600 h-1 absolute left-0 top-0"></div>
        <NuxtLink href="/learner"
                  class="font-[IBM_Plex_Mono] text-2xl mb-2 font-bold hover:opacity-90 transition duration-100">
          Learner
        </NuxtLink>

        <div class="flex flex-col text-gray-800 mt-4 rounded border border-gray-200 divide-y divide-gray-200">
          <NuxtLink
              :href="`/learner/${m.slug}`"
              v-for="m in content.modules" :key="m.name"
              class="first:[&>.bar]:rounded-tl last:[&>.bar]:rounded-bl relative px-2 py-1 pl-3 hover:bg-gray-100 transition duration-100"
          >
            <div class="w-1 h-[100%] absolute left-0 top-0 bar transition duration-100"
                 :class="{'bg-orange-600': route.params.module_slug === m.slug}"/>
            <div>{{ m.name }}</div>
            <div class="text-sm opacity-60">{{ (m.courses ?? []).length }} onderwerpen</div>
          </NuxtLink>
        </div>
      </div>

      <div v-if="user">
        <div class="opacity-60 text-sm">Welkom {{ user.first_name }}</div>
        <NuxtLink href="/learner/account">Jouw Account</NuxtLink>
        <NuxtLink href="/" class="opacity-60 text-xs mt-2 block">Naar de homepagina</NuxtLink>
      </div>
    </div>

    <div class="flex-grow">
      <slot/>
    </div>
  </div>

  <div v-else>
    Wordt geladen
  </div>
</template>

<script setup lang="ts">
import {useContentStore} from "~/store/contentStore";

const user = useDirectusUser();
const route = useRoute();
const content = useContentStore();

const {getItems} = useDirectusItems();
const {
  data: myCollection,
  pending,
  error,
  refresh,
} = await useAsyncData("modules", () =>
    getItems({
      collection: 'learner_module',
      params: {fields: ['*', 'courses.*']},
    })
);

content.$patch({modules: myCollection.value ?? []});
</script>

<style>
body {
  font-family: 'Lato', sans-serif;
}
</style>
