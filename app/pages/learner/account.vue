<template>
  <div>
    <h1 class="text-xl mb-4">Jouw Account</h1>

    <div class="grid grid-cols-3 gap-4">
      <card title="Jouw Gegevens">
        <p>Naam: {{ user.first_name }}</p>
        <p>Email: {{ user.email }}</p>
      </card>

      <card title="Uitloggen">
        <button type="button" class="cursor-pointer text-red-800 hover:text-red-900" @click="submitLogout">Klik hier om
          uit te loggen
        </button>
      </card>
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
