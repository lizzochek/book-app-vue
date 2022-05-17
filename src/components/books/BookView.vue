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
      <base-paginate :numOfPages="numOfPages"></base-paginate>
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
      numOfPages: 0,
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

        this.numOfPages = this.books.length / 10;
        filterBooks(this.books, 'alphabet-asc');
      } catch (err) {
        this.error = 'Something went wrong. Please try again later';
      }
      this.isLoading = false;
    },
    setSearchOption(input) {
      this.$store.dispatch('clearBooks');
      this.$store.dispatch('assignSearchOption', input);
      this.loadBooks();
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
    this.loadBooks();
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
