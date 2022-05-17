<template>
  <section>
    <base-dialog :show="!!error" title="An error occured" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>

    <div v-if="isLoading">
      <base-spinner></base-spinner>
    </div>
    <div v-else-if="books.length">
      <book-filter @change-filter="filterBooks" @searchBooks="setSearchOption"></book-filter>
      <ul v-for="book in books" :key="book.id">
        <book-item :book="book"> </book-item>
      </ul>
    </div>
    <h3 v-else>No books found</h3>
  </section>
</template>

<script>
import BookFilter from './BookFilter.vue';
import BookItem from './BookItem.vue';
import { filterBooks } from '../../store/helpers';

export default {
  components: { BookItem, BookFilter },
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
    async loadBooks(payload) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('fetchBooks', payload);
        filterBooks(this.books, 'alphabet-asc');
      } catch (err) {
        this.error = 'Something went wrong. Please try again later';
      }
      this.isLoading = false;
    },
    setSearchOption(input) {
      this.$store.dispatch('clearBooks');
      this.loadBooks(input);
    },
    handleError() {
      this.error = null;
    },
    filterBooks(updateFilter) {
      filterBooks(this.books, updateFilter);
    },
  },
  created() {
    this.$store.dispatch('clearBooks');
    this.loadBooks('Stephen King');
  },
  beforeRouteLeave(to, from, next) {
    next();
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
