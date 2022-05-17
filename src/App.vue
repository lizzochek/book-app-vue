<template>
  <div>
    <the-header></the-header>
    <router-view></router-view>
  </div>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';

export default {
  components: { TheHeader },
  created() {
    this.$store.dispatch('authentication/autoLogIn');
  },
};
</script>
