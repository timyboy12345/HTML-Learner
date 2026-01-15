<template>
  <div>
    <h1 class="text-xl mb-4">Home</h1>

    <div class="grid gap-4">
      <div class="bg-white border border-gray-300 rounded p-4">
        <h2 class="text-lg">Jouw Voortgang</h2>

        <div class="flex flex-row w-full mt-2">
          <div v-for="i in 6" :key="i" class="flex flex-row flex-grow items-center">
            <div class="size-8 rounded-full bg-emerald-700"/>
            <div v-if="i !== 6" class="bg-gray-200 h-0.5 mx-1 rounded-full flex-grow min-w-10"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({middleware: ["auth"],layout: "learner"})
</script>
