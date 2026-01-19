<template>
  <div class="w-full h-full bg-gray-900">
    <component :substep="content.getSubCourseBySlug(route.params.theme_slug, route.params.chapter_slug).content[step]"
               v-if="hasContent"
               :is="type()" @nextStep="handleNextStep()"/>

    <div v-else class="p-4">
      <div class="bg-white rounded p-4 prose max-w-none">
        <h1>Hier ging iets fout :(</h1>
        <p>Voor deze module is nog geen inhoud beschikbaar</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {LearnerContentTypesEditor, LearnerContentTypesText} from '#components'
import {useContentStore} from "~/store/contentStore";

definePageMeta({middleware: ["auth"], layout: "learner"})

const route = useRoute();
const content = useContentStore();
const step = ref(0);

const hasContent = computed(() => {
  const subcourse = content.getSubCourseBySlug(route.params.theme_slug, route.params.chapter_slug)
  if (!subcourse) return false;
  if (!subcourse.content) return false;
  return subcourse.content.length > 0;
});

function type() {
  const subcourse = content.getSubCourseBySlug(route.params.theme_slug, route.params.chapter_slug);

  if (!subcourse) {
    return;
  }

  if (!subcourse.content) {
    return;
  }

  if (!subcourse.content[step.value]) {
    return;
  }

  switch (subcourse.content[step.value].type) {
    case 'editor':
      return LearnerContentTypesEditor;
    case 'text':
      return LearnerContentTypesText;
  }
}

function handleNextStep() {
  const numberOfSubSteps = content.getSubCourseBySlug(route.params.theme_slug, route.params.chapter_slug).content.length;

  if (numberOfSubSteps - 1 > step.value) {
    step.value++;
  } else {
    console.log(`Next step not possible (going to ${step.value + 1} from ${numberOfSubSteps})`)
  }
}
</script>
