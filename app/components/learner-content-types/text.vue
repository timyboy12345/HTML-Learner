<template>
  <div class="p-4 flex flex-col gap-4">
    <div class="prose max-w-none bg-white p-4 rounded">
      <h1>{{ slide.title }}</h1>

      <article v-html="slide.content"></article>
    </div>

    <button @click="$emit('nextStep')" type="button"
            class="cursor-pointer transition duration-100 rounded py-2 px-4 bg-orange-600 hover:bg-orange-700 text-white">
      Volgende stap
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps(['slide'])
defineEmits(['nextStep'])
</script>
