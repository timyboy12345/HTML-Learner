<template>
  <div class="p-4 flex flex-col gap-4">
    <!--    <div v-html="slide.content" class="prose max-w-none bg-white p-4 rounded"></div>-->
    <div class="bg-white rounded p-4 flex flex-col gap-8">
      <div>
        Om verschillende op verschillende paragrafen te zetten kan je de HTML-tag "paragraph" gebruiken. Aan het begin
        van een paragraaf staat altijd een <input v-model="questions[0][1]"
                                                  class="w-10 rounded border border-gray-200 bg-gray-100 mx-1">, en aan het
        einde van een zin staat altijd een <input v-model="questions[1][1]"
                                                  class="w-10 rounded border border-gray-200 bg-gray-100 mx-1">.
      </div>

      <!-- Interactive Editor -->
      <div class="rounded border border-gray-200 overflow-hidden">
        <div class="bg-gray-900 text-gray-100">
          <textarea @input="debouncedUpdate" class="w-full text-white p-4 font-[Source_Code_Pro] resize-none rounded focus:outline-none" v-model="givenHtml"/>
        </div>
        <div class="p-4">
          <div class="text-xs opacity-60 mb-2">Dit is de uitvoer van de code hierboven</div>
          <div v-html="sanitizedContent"/>
        </div>
      </div>
      <!-- End Interactive Editor -->
    </div>

    <div class="flex flex-col gap-1">
      <button
          type="button"
          class="transition duration-100 rounded py-2 px-4"
          :class="{'cursor-pointer bg-orange-600 hover:bg-orange-700 text-white': canContinue, 'bg-gray-600 hover:bg-gray-700 text-gray-200': !canContinue}"
          @click="canContinue ? $emit('nextStep') : checkAnswer()"
      >
        Volgende stap
      </button>

      <div v-show="!canContinue" class="transition duration-100 text-gray-400 text-xs text-center">Je moet eerst alle
        vragen goed hebben beantwoord, voor je door kan gaan
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useDebounceFn} from "@vueuse/core";

defineProps(['slide'])
defineEmits(['nextStep'])

const questions = ref([['<p>', ''], ['</p>', '']])
const example = "Dit is een regel. Dit is nog een regel.";
const givenHtml = ref("Dit is een regel. Dit is nog een regel.");
const answer = "<p>Dit is een regel.</p><p>Dit is nog een regel.</p>";
const debouncedContent = ref('');

const debouncedUpdate = useDebounceFn(() => {
  debouncedContent.value = givenHtml.value;
}, 200);

const sanitizedContent = computed(() => {
  // Basic XSS protection by removing script tags
  return debouncedContent.value.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
});

const canContinue = computed(() => {
  for (const [key, value] of Object.entries(questions.value)) {
    if (value[0] !== value[1]) return false;
  }

  if (givenHtml.value.replace(/\s/g, '').toLowerCase() !== answer.replace(/\s/g, '').toLowerCase()) return false;

  return true;
});

function checkAnswer() {
  for (const [key, value] of Object.entries(questions.value)) {
    console.log(`${key}: ${value[0]} === ${value[1]}`);
  }

  console.log()
}

debouncedUpdate();
</script>
