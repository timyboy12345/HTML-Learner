<template>
  <div class="flex flex-row w-full h-screen bg-stone-100">
    <div class="w-[200px] bg-white border-r border-stone-300 p-2 flex flex-col justify-between">
      <div>
        <NuxtLink href="/learner" class="text-lg mb-2 font-bold hover:opacity-90 transition duration-100">Learner</NuxtLink>

        <div class="flex flex-col mt-4 gap-2">
          <div v-for="c in concepten" :key="c.name" class="py-1 px-2 rounded bg-stone-100 border border-stone-300">
            {{ c.name }}
          </div>
        </div>
      </div>

      <div>
        <div class="opacity-60 text-sm">Welkom {{ user.first_name }}</div>
        <NuxtLink href="/learner/account">Jouw Account</NuxtLink>
      </div>
    </div>

    <div class="flex-grow p-2">
      <slot/>
    </div>
  </div>
</template>

<script setup lang="ts">
const user = useDirectusUser();

const concepten = [{name: 'Basis HTML'}, {name: 'CSS'}, {name: 'JavaScript'}];
</script>
