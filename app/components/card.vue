<template>
  <div class="bg-white border border-gray-200 rounded">
    <h2 v-if="title" class="text-lg px-4 py-2 font-[IBM_Plex_Mono] bg-gray-100 border-b border-gray-200">
      {{ title }}
    </h2>

    <div class="p-4">
      <slot/>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps(['title'])
</script>
