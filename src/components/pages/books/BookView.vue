<template>
  <section>
    <book-filter @change-filter="filterBooks" @searchBooks="setSearchOption"></book-filter>

    <base-dialog :show="!!error" title="An error occured" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>

    <div v-if="isLoading">
      <base-spinner></base-spinner>
    </div>

    <div v-else-if="chosenBooks.length">
      <ul v-for="book in chosenBooks" :key="book.id">
        <book-item :book="book"> </book-item>
      </ul>
      <base-paginate :numOfPages="numOfPages" @pageChanged="onPageChanged"></base-paginate>
    </div>
    <base-card v-else>
      <h3>No books were found. Please try again</h3>
    </base-card>
  </section>
</template>

<script>
import BookFilter from './BookFilter.vue';
import BookItem from './BookItem.vue';
import { filterBooks } from '../../../store/helpers';

export default {
  components: { BookItem, BookFilter },
  data() {
    return {
      isLoading: false,
      error: false,
      numOfPages: 0,
      chosenBooks: [],
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

        this.getChosenBooks(1);
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
      this.getChosenBooks(1);
    },
    onPageChanged(page) {
      this.getChosenBooks(page);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    },
    getChosenBooks(page) {
      this.chosenBooks = this.books.slice((page - 1) * 10, (page - 1) * 10 + 10);
    },
  },
  created() {
    this.$store.dispatch('clearBooks');
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

h3 {
  text-align: center;
}
</style>
