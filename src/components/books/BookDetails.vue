<template>
  <base-card>
    <h3>{{ selectedBook.title }}</h3>

    <h4>{{ selectedBook.authors }}</h4>
    <img v-if="selectedBook.thumbnail" :src="selectedBook.thumbnail" alt="Book cover" width="200" />

    <div>
      <base-badge v-for="category in selectedBook.categories" :key="category" :title="category">
      </base-badge>
    </div>

    <h4>Description</h4>
    <p>{{ selectedBook.description }}</p>

    <h4>Average rating:</h4>
    <p>{{ selectedBook.averageRating }}</p>

    <h4>Publisher:</h4>
    <p>{{ selectedBook.publisher }}</p>

    <h4>Number of pages:</h4>
    <p>{{ selectedBook.pageCount }}</p>

    <h4>Publication date:</h4>
    <p>{{ selectedBook.publishedDate }}</p>

    <div v-if="selectedBook.buyLink">
      <h4>Buy it here:</h4>
      <p>{{ selectedBook.buyLink }}</p>
    </div>
  </base-card>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      selectedBook: null,
    };
  },
  async created() {
    // To load when not redirecting from all books
    if (this.$store.getters.getBooks.length === 0) await this.$store.dispatch('fetchBooks');

    this.selectedBook = this.$store.getters.getBookById(this.id);
  },
};
</script>
