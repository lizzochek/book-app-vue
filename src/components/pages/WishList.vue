<template>
  <section>
    <base-dialog :show="!!error" title="An error occured" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>

    <div v-if="isLoading">
      <base-spinner></base-spinner>
    </div>
    <div v-else-if="wishlistBooks.length">
      <ul v-for="book in wishlistBooks" :key="book.id">
        <book-item :book="book"> </book-item>
      </ul>
      <base-paginate :numOfPages="numOfPages" @pageChanged="onPageChanged"></base-paginate>
    </div>
    <h3 v-else>No books found</h3>
  </section>
</template>

<script>
export default {
  data() {
    return {
      wishlistBooks: [],
      isLoading: false,
      error: null,
    };
  },
};
</script>
