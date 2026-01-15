<template>
  <div>
    <form class="flex flex-col gap-4" @submit="handleSubmit">
      <fieldset class="w-full fieldset">
        <legend class="fieldset-legend">Email</legend>
        <input v-model="email" type="email" class="w-full input" placeholder="Email-adres" />
        <p class="label">Het emailadres dat je hebt gebruikt bij registratie</p>
      </fieldset>

      <fieldset class="w-full fieldset">
        <legend class="fieldset-legend">Wachtwoord</legend>
        <input v-model="password" type="password" class="w-full input" placeholder="Wachtwoord" />
        <p class="label">Het wachtwoord dat je hebt ingesteld bij registratie</p>
      </fieldset>

      <button type="submit" class="btn">
        Inloggen
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
const email = ref('')
const password = ref('')
const {login} = useDirectusAuth();

function handleSubmit(e: Event) {
  e.preventDefault();

  login({email: email.value, password: password.value})
      .then(() => navigateTo('/learner'))
      .catch(() => alert('Login mislukt!'));
}
</script>
