<template>
  <section>
    <div>
      <ul v-for="book in books" :key="book.id">
        <book-item :book="book"> </book-item>
      </ul>
    </div>
  </section>
</template>

<script>
import BookItem from './BookItem.vue';

export default {
  components: { BookItem },
  computed: {
    books() {
      return this.$store.getters.getBooks;
    },
  },
  methods: {
    loadBooks() {
      this.$store.dispatch('fetchBooks');
    },
  },
  created() {
    this.loadBooks();
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
