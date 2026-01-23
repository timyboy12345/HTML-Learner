<template>
  <div>
    <div class="w-full border-b border-gray-200 py-2 px-4 font-[IBM_Plex_Mono] text-2xl">
      Jouw Account
    </div>

    <div class="grid gap-4 m-4 grid-cols-2">
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
