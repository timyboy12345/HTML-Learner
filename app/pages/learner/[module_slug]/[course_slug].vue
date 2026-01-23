<template>
  <div v-if="isFinished" class="w-full h-full overflow-y-scroll bg-gray-900">
    <div class="p-4 flex flex-col gap-4">
      <div class="prose p-4 bg-white rounded max-w-none">
        <h1>Gefinisht</h1>
        <p>Je hebt het einde van deze cursus gehaald, lekker bezig! Klik op de knop hieronder om verder te gaan naar de
          volgende cursus.</p>
      </div>

      <button type="button" :class="{'bg-orange-600 hover:bg-orange-700 cursor-pointer': !isSaving}"
              class="text-white rounded text-lg text-center py-2 w-full" @click="saveProgress">
        Doorgaan
      </button>
    </div>
  </div>

  <div v-else-if="course" class="w-full h-full overflow-y-scroll bg-gray-900">
    <component
        :is="type()"
        v-if="course && course.slides.length > 0"
        :slide="course.slides[step].item"
        :slide-id="course.slides[step]"
        @next-step="handleNextStep()"
    />

    <div v-else class="p-4">
      <div class="bg-white rounded p-4 prose max-w-none">
        <h1>Hier ging iets fout :(</h1>
        <p>Voor deze module is nog geen inhoud beschikbaar</p>
      </div>
    </div>
  </div>

  <div v-else-if="pending">
    Data wordt nog geladen
  </div>

  <div v-else>
    <div class="w-full border-b border-gray-200 py-2 px-4 font-[IBM_Plex_Mono] text-2xl">
      Cursus niet gevonden
    </div>

    <p class="p-4">
      Deze cursus of module bestaat niet, check of de URL correct is.
    </p>
  </div>
</template>

<script setup lang="ts">
import {LearnerContentTypesEditor, LearnerContentTypesText, LearnerContentTypesLearn} from '#components'
import {useContentStore} from "~/store/contentStore";
import {ref} from 'vue'
import type {Course} from "~/store/contentStore";
import type {Ref} from 'vue'

const {getItems} = useDirectusItems();

definePageMeta({middleware: ["auth"], layout: "learner"})

const route = useRoute();
const content = useContentStore();
const course: Ref<null | Course> = ref(null);
const step = ref(0);
const isFinished = ref(false);
const isSaving = ref(false);

const {
  data: fetchedCourses,
  pending,
  error,
  refresh,
} = await useAsyncData(`module_${route.params.module_slug}_course_${route.params.course_slug}`, () =>
    getItems<any>({
      collection: 'learner_course',
      params: {fields: ['*', 'slides.*', 'slides.item.*'], filter: {slug: route.params.course_slug}},
    })
);

if (fetchedCourses.value && fetchedCourses.value.length > 0) {
  course.value = fetchedCourses.value[0];
}

function type() {
  if (!course.value) return;

  switch (course.value.slides[step.value].collection) {
    case 'learner_slide_type_editor':
      return LearnerContentTypesEditor;
    case 'learner_slide_type_text':
      return LearnerContentTypesText;
    case 'learner_slide_type_learn':
      return LearnerContentTypesLearn;
  }
}

function handleNextStep() {
  if (!course.value) return;

  const numberOfSubSteps = course.value.slides.length;

  if (numberOfSubSteps - 1 > step.value) {
    step.value++;
  } else {
    isFinished.value = true;
  }
}

function saveProgress() {
  if (isSaving.value) return;

  isSaving.value = true;
  refresh().then(() => isSaving.value = false);
}
</script>
