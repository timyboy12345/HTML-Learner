<template>
  <div>
    <div class="w-full border-b border-gray-200 py-2 px-4 font-[IBM_Plex_Mono] text-2xl">
      Home
    </div>

    <div class="grid gap-4 m-4">
      <card title="Jouw Voortgang">
        <div class="flex flex-row w-full">
          <div v-for="i in 6" :key="i" class="flex flex-row flex-grow items-center">
            <div class="size-8 rounded-full bg-orange-600"/>
            <div v-if="i !== 6" class="bg-gray-200 h-0.5 mx-1 rounded-full flex-grow min-w-10"/>
          </div>
        </div>
      </card>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({middleware: ["auth"], layout: "learner"})
</script>
