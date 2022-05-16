<template>
  <section>
    <base-dialog :show="!!error" title="An error occured" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <div v-if="isLoading">
      <base-spinner></base-spinner>
    </div>
    <div v-else-if="books.length">
      <ul v-for="book in books" :key="book.id">
        <book-item :book="book"> </book-item>
      </ul>
    </div>
    <h3 v-else>No books found</h3>
  </section>
</template>

<script>
import BookItem from './BookItem.vue';

export default {
  components: { BookItem },
  data() {
    return {
      isLoading: false,
      error: false,
    };
  },
  computed: {
    books() {
      return this.$store.getters.getBooks;
    },
  },
  methods: {
    async loadBooks() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('fetchBooks');
      } catch (err) {
        this.error = 'Something went wrong. Please try again later';
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
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
