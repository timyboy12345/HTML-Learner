<template>
  <div>
    <h1 class="text-xl mb-4">Jouw Account</h1>

    <div class="grid grid-cols-3 gap-4">
      <div class="bg-white border border-gray-300 rounded p-4">
        <h2 class="text-lg">Jouw Gegevens</h2>
        <p>Naam: {{ user.first_name }}</p>
        <p>Email: {{ user.email }}</p>
      </div>

      <div class="bg-white border border-gray-300 rounded p-4">
        <h2 class="text-lg">Uitloggen</h2>
        <button type="button" class="cursor-pointer text-red-800 hover:text-red-900" @click="submitLogout">Klik hier om
          uit te loggen
        </button>
      </div>
    </div>
  </div>
</template>

<script type="ts" setup>
const user = useDirectusUser();
const {logout} = useDirectusAuth();

definePageMeta({middleware: ["auth"], layout: "learner"})

function submitLogout() {
  logout()
      .then(() => navigateTo('/'));
}
</script>
