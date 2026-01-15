<template>
  <div>
    <form class="flex flex-col gap-4" @submit="handleSubmit">
      <div class="flex flex-col">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" v-model="email">
      </div>

      <div class="flex flex-col">
        <label for="password">Wachtwoord</label>
        <input type="password" name="password" id="password" v-model="password">
      </div>
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
