<template>
  <div>
    <ul></ul>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('fetchBooks');
    console.log(this.$store.state.books);
  },
};
</script>
