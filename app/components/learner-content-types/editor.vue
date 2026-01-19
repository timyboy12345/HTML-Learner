<template>
  <div class="flex flex-row divide-x divide-gray-800 h-full">
    <div class="w-full p-4 relative">
      <div class="bg-white rounded p-4 mb-4 prose prose-sm" v-if="slide.content" v-html="slide.content"/>
      <textarea
          v-model="htmlContent"
          class="w-full text-white p-4 font-[Source_Code_Pro] resize-none rounded focus:outline-none"
          placeholder="Enter HTML code here..."
          @input="debouncedUpdate"
      />

      <button
          v-if="slide.preset"
          @click="resetInput()" type="button"
          class="cursor-pointer rounded bg-orange-600 py-1 px-2 text-sm text-white absolute left-4 bottom-4">
        Reset
      </button>
    </div>
    <div class="w-full p-4">
      <div
          class="w-full h-full bg-gray-100 p-2 rounded overflow-auto prose"
          v-html="sanitizedContent"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {useDebounceFn} from '@vueuse/core'

definePageMeta({middleware: ["auth"], layout: "learner"})
const {slide} = defineProps(['slide'])

const route = useRoute();
const htmlContent = ref('');
const debouncedContent = ref('');

const debouncedUpdate = useDebounceFn(() => {
  debouncedContent.value = htmlContent.value;
}, 2000);

const sanitizedContent = computed(() => {
  // Basic XSS protection by removing script tags
  return debouncedContent.value.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
});

function resetInput() {
  htmlContent.value = slide.preset;
  debouncedUpdate();
}

if (slide.preset) {
  resetInput();
}
</script>
