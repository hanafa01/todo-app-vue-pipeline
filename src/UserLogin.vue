<template>
  <h1 class="app-welcome">Todo App, Welcome!</h1>
  <h2 class="app-title">Login</h2>

  <form @submit.prevent="login" class="auth-form">
    <div v-if="successMessage" class="success-message">
      {{ successMessage }}
    </div>
    <div v-if="serverError" class="server-error">{{ serverError }}</div>
    <div class="input-label">
      <label for="">Username / Email</label>
      <input
        type="text"
        placeholder="Enter Username / Email"
        v-model.trim="username"
      />
    </div>
    <div class="input-label">
      <label for="">Password</label>
      <input
        type="password"
        placeholder="Enter Password"
        v-model.trim="password"
      />
    </div>
    <div>
      <button type="submit" :disabled="loading">Login</button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      serverError: "",
      successMessage: this.dataSuccessMessage,
      loading: false,
    };
  },
  props: ["dataSuccessMessage"],
  methods: {
    login() {
      this.loading = true;
      this.$store
        .dispatch("retrieveToken", {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          this.loading = false;
          console.log(response);
          this.$router.push({ name: "todo" });
        })
        .catch((error) => {
          this.loading = false;
          this.serverError = error.response.data;
          this.password = "";
          this.successMessage = "";
        });
    },
  },
};
</script>