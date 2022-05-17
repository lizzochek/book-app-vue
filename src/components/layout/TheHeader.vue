<template>
  <header>
    <nav>
      <h1><router-link to="/">Find books now!</router-link></h1>

      <ul>
        <li>
          <router-link to="/books">Books</router-link>
        </li>
        <li v-if="isLoggedIn">
          <router-link to="/wish-list">Wishlist</router-link>
        </li>
        <li v-else>
          <router-link to="/authentication">Login</router-link>
        </li>
        <li v-if="isLoggedIn">
          <base-button @click="logout">Log out</base-button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import BaseButton from '../base/BaseButton.vue';

export default {
  components: { BaseButton },
  computed: {
    isLoggedIn() {
      return this.$store.getters['authentication/isLoggedIn'];
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.replace('/books');
    },
  },
};
</script>

<style scoped>
header {
  width: 100%;
  height: 5rem;
  background-color: #3d008d;
  display: flex;
  justify-content: center;
  align-items: center;
}
header a {
  text-decoration: none;
  color: #f391e3;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}
a:active,
a:hover,
a.router-link-active {
  border: 1px solid #f391e3;
}
h1 {
  margin: 0;
  font-size: 2rem;
}
h1 a {
  color: white;
  margin: 0;
}
h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}
header nav {
  width: 60%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: none;
}
header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
li {
  margin: 0 0.5rem;
}
</style>
