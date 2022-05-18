<template>
  <section>
    <base-dialog :show="!!error" title="An error occured" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>

    <div v-if="isLoading">
      <base-spinner></base-spinner>
    </div>
    <div v-else-if="chosenBooks.length">
      <ul v-for="book in chosenBooks" :key="book[1].id">
        <book-item :book="book[1]"> </book-item>
      </ul>
      <base-paginate :numOfPages="numOfPages" @pageChanged="onPageChanged"></base-paginate>
    </div>

    <base-card v-else>
      <h3>
        There are no books in your wishlist now. Adds some
        <router-link to="/books">books</router-link> now
      </h3>
    </base-card>
  </section>
</template>

<script>
import BookItem from './books/BookItem.vue';

export default {
  components: { BookItem },
  data() {
    return {
      isLoading: false,
      error: null,
      numOfPages: 0,
      chosenBooks: [],
    };
  },
  computed: {
    wishlistBooks() {
      return this.$store.getters['wishList/getWishlist'];
    },
  },
  methods: {
    handleError() {
      this.error = null;
    },
    async loadWishList() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('wishList/fetchFromWishList');

        this.numOfPages = Math.ceil(Object.keys(this.wishlistBooks).length / 10);

        this.getChosenBooks(1);
      } catch (err) {
        this.error = 'Something went wrong. Please try again later';
      }
      this.isLoading = false;
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
      this.chosenBooks = Object.entries(this.wishlistBooks).slice(
        (page - 1) * 10,
        (page - 1) * 10 + 10,
      );
    },
  },
  created() {
    this.loadWishList();
  },
};
</script>

<style scoped>
h3 {
  text-align: center;
}
</style>
