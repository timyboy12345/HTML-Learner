<template>
  <div class="flex flex-col">
    <div class="flex flex-row justify-between items-center w-full fixed border-b border-gray-100 px-4 py-2">
      <div class="flex flex-row items-center gap-4">
        <NuxtLink href="/" class="font-[IBM_Plex_Mono] font-bold hover:opacity-70 transition duration-100">
          Learner
        </NuxtLink>

        <div class="flex flex-row gap-4">
          <div>Werkwijze</div>
          <div>Prijs</div>
          <div>Voor klassen en scholen</div>
        </div>
      </div>

      <div class="">
        <NuxtLink
            v-if="user"
            class="rounded bg-orange-600 hover:bg-orange-700 transition duration-100 cursor-pointer py-1 px-2 text-white text-sm"
            href="/learner">
          Naar leeromgeving
        </NuxtLink>
        <NuxtLink
            v-else
            class="rounded bg-orange-600 hover:bg-orange-700 transition duration-100 cursor-pointer py-1 px-2 text-white text-sm"
            href="/auth/login">
          Inloggen
        </NuxtLink>
      </div>
    </div>

    <div class="mt-14 mx-4 lg:w-full lg:max-w-4xl lg:mx-auto">
      <slot/>
    </div>
  </div>
</template>

<script setup lang="ts">
const user = useDirectusUser();
</script>
