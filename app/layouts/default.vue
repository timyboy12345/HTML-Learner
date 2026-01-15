<template>
  <div class="flex flex-col">
    <div class="flex flex-row justify-between w-full fixed border-b border-gray-100 px-4 py-2">
      <NuxtLink href="/" class="opacity-60 hover:opacity-50 font-bold">Learner</NuxtLink>

      <div class="">
        <NuxtLink v-if="user" href="/learner">Naar leeromgeving</NuxtLink>
        <NuxtLink v-else href="/auth/login">Inloggen</NuxtLink>
      </div>
    </div>

    <div class="mt-14 mx-4 w-full lg:max-w-4xl lg:mx-auto">
      <slot/>
    </div>
  </div>
</template>

<script setup lang="ts">
const user = useDirectusUser();
</script>
