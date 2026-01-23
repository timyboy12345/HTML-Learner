<template>
  <div class="flex flex-row divide-x divide-gray-800 h-full">
    <div class="w-full p-4 relative">
      <div v-if="slide.content" class="bg-white rounded p-4 mb-4 prose prose-sm">
        <h1 v-if="slide.title">{{ slide.title }}</h1>
        <article v-html="slide.content"/>
      </div>

      <textarea
          v-model="htmlContent"
          class="w-full text-white p-4 font-[Source_Code_Pro] resize-none rounded focus:outline-none mb-8"
          placeholder="Enter HTML code here..."
          @input="debouncedUpdate"
      />

      <button
          v-if="slide.preset"
          class="cursor-pointer rounded bg-gray-600 hover:bg-gray-700 transition duration-100 py-1 px-2 text-sm text-white absolute left-4 bottom-4"
          type="button"
          @click="resetInput()">
        Reset
      </button>

      <div class="flex flex-col gap-1">
        <button
            type="button"
            class="transition duration-100 rounded py-2 px-4"
            :class="{'cursor-pointer bg-orange-600 hover:bg-orange-700 text-white': canContinue, 'bg-gray-600 hover:bg-gray-700 text-gray-200': !canContinue}"
            @click="canContinue ? $emit('nextStep') : null"
        >
          Volgende stap
        </button>

        <div v-show="!canContinue" class="transition duration-100 text-gray-400 text-xs text-center">
          Je moet eerst de juiste code hebben, voor je door kan gaan
        </div>
      </div>
    </div>
    <div class="w-full p-4 relative">
      <div
          class="w-full h-full bg-gray-100 p-2 rounded overflow-auto prose"
          v-html="sanitizedContent"
      />

      <div v-show="isProcessing" role="status" class="absolute left-8 bottom-8">
      <svg aria-hidden="true" class="w-8 h-8 text-gray-300 animate-spin fill-orange-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useDebounceFn} from '@vueuse/core'

definePageMeta({middleware: ["auth"], layout: "learner"})
defineEmits(['nextStep'])
const {slide} = defineProps(['slide'])

const route = useRoute();
const htmlContent = ref('');
const debouncedContent = ref('');
const isProcessing = ref(false);

const debouncedUpdate = useDebounceFn(() => {
  debouncedContent.value = htmlContent.value;
  isProcessing.value = false;
}, 2000);

watch(htmlContent, () => {
  isProcessing.value = true;
});

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

const canContinue = computed(() => {
  return sanitizedContent.value.replace(/\s/g, '').toLowerCase() === slide.answer.replace(/\s/g, '').toLowerCase();
});
</script>
