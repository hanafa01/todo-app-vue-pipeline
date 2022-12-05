<template>
  <ul class="nav">
    <li>
      <router-link :to="{ name: 'todo' }">Todo</router-link>
    </li>
    <li v-if="!loggedIn">
      <router-link :to="{ name: 'login' }">Login</router-link>
    </li>
    <li v-if="!loggedIn">
      <router-link :to="{ name: 'register' }">Register</router-link>
    </li>
    <li v-if="loggedIn"><a @click="logout">Logout</a></li>
  </ul>
</template>

<script>
export default {
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("clearTodos");

      this.$store.dispatch("destroyToken").then((response) => {
        console.log(response);
        this.$router.push({ name: "login" });
      });
    },
  },
};
</script>

<style scoped>
.flex-center {
  display: flex;
  justify-content: center;
}
.nav {
  display: flex;
  list-style: none;
  padding: 15px 0;
  margin: 0;
  justify-content: flex-end;
  border-bottom: 1px solid lightgrey;
}
.nav a {
  color: white;
  padding: 0 25px;
  /* font-size: 14px; */
  /* font-weight: 600; */
  /* letter-spacing: .1rem; */
  text-decoration: none;
  text-transform: uppercase;
  cursor: pointer;
}
</style>